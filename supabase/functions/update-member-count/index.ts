// ========== 🎛️ PARAMÈTRES DU COMPTEUR (MODIFIER ICI) ==========

const COMPTEUR_INITIAL = 100; // 👈 Nombre de départ
const HEURES_POINTE_MIN = 18; // 👈 Début heures de pointe (18h)
const HEURES_POINTE_MAX = 22; // 👈 Fin heures de pointe (22h)
const CIBLE_HEURES_POINTE = 2500; // 👈 Cible pendant heures de pointe
const CIBLE_HEURES_CREUSES = 800; // 👈 Cible pendant heures creuses
const HEURES_CREUSES_MIN = 2; // 👈 Début heures creuses (2h)
const HEURES_CREUSES_MAX = 8; // 👈 Fin heures creuses (8h)
const AUGMENTATION_MIN = 1; // 👈 Montée minimum
const AUGMENTATION_MAX = 5; // 👈 Montée maximum
const DIMINUTION_MIN = 1; // 👈 Descente minimum
const DIMINUTION_MAX = 3; // 👈 Descente maximum
const TRANSITION_STEP = 3; // 👈 Vitesse de transition entre périodes

// ============================================================

import { createClient } from "https://esm.sh/@supabase/supabase-js@2.78.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// Fonctions utilitaires
function isInTimeRange(currentHour: number, minHour: number, maxHour: number): boolean {
  if (minHour <= maxHour) {
    return currentHour >= minHour && currentHour < maxHour;
  } else {
    // Gestion du cas où la plage traverse minuit (ex: 22h-2h)
    return currentHour >= minHour || currentHour < maxHour;
  }
}

function isPeakHours(currentHour: number): boolean {
  return isInTimeRange(currentHour, HEURES_POINTE_MIN, HEURES_POINTE_MAX);
}

function isLowHours(currentHour: number): boolean {
  return isInTimeRange(currentHour, HEURES_CREUSES_MIN, HEURES_CREUSES_MAX);
}

function getRandomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function calculateNewMemberCount(currentCount: number, currentTarget: number): { newCount: number; newTarget: number } {
  const now = new Date();
  const currentHour = now.getHours();

  // Déterminer la cible en fonction de la période
  let targetBase: number;
  let period: string;

  if (isPeakHours(currentHour)) {
    targetBase = CIBLE_HEURES_POINTE;
    period = "POINTE";
  } else if (isLowHours(currentHour)) {
    targetBase = CIBLE_HEURES_CREUSES;
    period = "CREUSES";
  } else {
    targetBase = COMPTEUR_INITIAL;
    period = "NORMALE";
  }

  // Faire évoluer currentTarget graduellement vers targetBase
  let newTarget = currentTarget;
  if (currentTarget < targetBase) {
    newTarget = Math.min(currentTarget + TRANSITION_STEP, targetBase);
  } else if (currentTarget > targetBase) {
    newTarget = Math.max(currentTarget - TRANSITION_STEP, targetBase);
  }

  // Décision aléatoire : montée ou descente (50/50)
  const shouldIncrease = Math.random() < 0.5;

  let newCount = currentCount;
  let variation = 0;

  if (shouldIncrease) {
    variation = getRandomInt(AUGMENTATION_MIN, AUGMENTATION_MAX);
    newCount += variation;
    console.log(`⬆️ Montée de: ${variation} (entre ${AUGMENTATION_MIN} et ${AUGMENTATION_MAX})`);
  } else {
    variation = getRandomInt(DIMINUTION_MIN, DIMINUTION_MAX);
    newCount -= variation;
    console.log(`⬇️ Descente de: ${variation} (entre ${DIMINUTION_MIN} et ${DIMINUTION_MAX})`);
  }

  // Garder le nombre dans une plage raisonnable autour de currentTarget
  const minBound = Math.max(targetBase - 200, 0);
  const maxBound = targetBase + 200;

  newCount = Math.max(minBound, Math.min(newCount, maxBound));

  console.log(`🎯 Période: ${period} | Target: ${targetBase} | CurrentTarget: ${newTarget}`);
  console.log(`📊 Nouveau compteur: ${newCount} (était: ${currentCount})`);

  return { newCount, newTarget };
}

Deno.serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log("🚀 Début de la mise à jour du compteur");

    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    // 1. Lire le compteur actuel (ou l'initialiser si vide)
    let { data: currentData, error: fetchError } = await supabase
      .from("live_member_count")
      .select("id, current_count, current_target")
      .single();

    // Si la table est vide, initialiser avec COMPTEUR_INITIAL
    if (fetchError && fetchError.code === 'PGRST116') {
      console.log("🔧 Initialisation de la table avec COMPTEUR_INITIAL:", COMPTEUR_INITIAL);
      const { data: insertedData, error: insertError } = await supabase
        .from("live_member_count")
        .insert({
          current_count: COMPTEUR_INITIAL,
          current_target: COMPTEUR_INITIAL,
        })
        .select("id, current_count, current_target")
        .single();
      
      if (insertError) {
        console.error("❌ Erreur initialisation:", insertError);
        throw insertError;
      }
      
      currentData = insertedData;
      fetchError = null;
    }

    if (fetchError || !currentData) {
      console.error("❌ Erreur lecture:", fetchError);
      throw new Error("Impossible de lire ou créer le compteur");
    }

    console.log(`📖 Valeur actuelle: ${currentData.current_count}, Target: ${currentData.current_target}`);

    // 2. Calculer la nouvelle valeur
    const { newCount, newTarget } = calculateNewMemberCount(currentData.current_count, currentData.current_target);

    // 3. Mettre à jour dans Supabase
    const { error: updateError } = await supabase
      .from("live_member_count")
      .update({
        current_count: newCount,
        current_target: newTarget,
        last_updated: new Date().toISOString(),
      })
      .eq("id", currentData.id);

    if (updateError) {
      console.error("❌ Erreur mise à jour:", updateError);
      throw updateError;
    }

    console.log(`✅ Compteur mis à jour: ${newCount}`);

    return new Response(
      JSON.stringify({
        success: true,
        previous: currentData.current_count,
        current: newCount,
        target: newTarget,
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      },
    );
  } catch (error) {
    console.error("❌ Erreur globale:", error);
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    return new Response(JSON.stringify({ error: errorMessage }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});
