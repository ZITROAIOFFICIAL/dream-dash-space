// Configuration Supabase (sera initialisée depuis window.SUPABASE_CONFIG)
var SUPABASE_URL = window.SUPABASE_URL || "";
var SHOP_DOMAIN = window.SHOP_DOMAIN || "";

// Initialisation
function initSupabaseConfig() {
  if (window.SUPABASE_CONFIG) {
    SUPABASE_URL = window.SUPABASE_CONFIG.url;
    SHOP_DOMAIN = window.SUPABASE_CONFIG.shopDomain;
    // Mémoriser sur window pour éviter redéclaration et réutiliser
    window.SUPABASE_URL = SUPABASE_URL;
    window.SHOP_DOMAIN = SHOP_DOMAIN;
    console.log("✅ Configuration Supabase initialisée", { SUPABASE_URL, SHOP_DOMAIN });
  } else {
    console.error("❌ Configuration Supabase manquante");
  }
}

// Utils URL des fonctions
function getFunctionsBase() {
  // Fallback si la config n'est pas fournie par le thème Shopify
  if (!SUPABASE_URL) return "https://ycvfyorgkhuxcosfrsxs.functions.supabase.co";
  if (SUPABASE_URL.includes(".functions.supabase.co")) return SUPABASE_URL;
  return SUPABASE_URL.replace(".supabase.co", ".functions.supabase.co");
}

// Sanitize des URLs de logos pour éviter les 404 (gère // et erreurs Liquid)
function sanitizeLogo(url) {
  const pixel = "data:image/gif;base64,R0lGODlhAQABAAAAACw=";
  if (!url) return pixel;
  const u = String(url).trim();
  if (/Liquid error/i.test(u)) return pixel;
  if (u.startsWith("//")) return "https:" + u;
  if (/^https?:\/\//.test(u)) return u;
  return pixel;
}

// ==================== EXTRACTION DE DONNÉES ====================
// Extraire toutes les données d'un bet_card
function extractBetData(blockElement) {
  const blockId = blockElement.getAttribute("data-block-id") || blockElement.id;

  const data = {
    shop_domain: SHOP_DOMAIN,
    block_id: blockId,
    sport_type: blockElement.getAttribute("data-sport-type"),
    ai_data_count: parseInt(blockElement.getAttribute("data-ai-data-count")) || 0,
    win_percentage: parseInt(blockElement.getAttribute("data-win-percentage")) || 0,
    bet_type: blockElement.getAttribute("data-bet-type"),
    team1_name: blockElement.getAttribute("data-team1-name"),
    team1_logo: blockElement.getAttribute("data-team1-logo"),
    team2_name: blockElement.getAttribute("data-team2-name"),
    team2_logo: blockElement.getAttribute("data-team2-logo"),
    match_time: blockElement.getAttribute("data-match-time"),
    match_date: blockElement.getAttribute("data-match-date"),
    multiplier: parseFloat(blockElement.getAttribute("data-multiplier")) || 0,
    bet_units: blockElement.getAttribute("data-bet-units"),
    odds: parseInt(blockElement.getAttribute("data-odds")) || 0,
    best_bookmaker: blockElement.getAttribute("data-best-bookmaker"),
    best_odds: parseInt(blockElement.getAttribute("data-best-odds")) || 0,
    result: blockElement.getAttribute("data-result") || "pending",
    spread_value: blockElement.getAttribute("data-spread-value"),
    spread_team: blockElement.getAttribute("data-spread-team"),
    over_under_type: blockElement.getAttribute("data-over-under-type"),
    over_under_value: blockElement.getAttribute("data-over-under-value"),
    over_under_stat_type: blockElement.getAttribute("data-over-under-stat-type"),
    over_under_text_custom: blockElement.getAttribute("data-over-under-text-custom"),
    moneyline_team: blockElement.getAttribute("data-moneyline-team"),
  };

  console.log("📤 Données bet extraites:", data);
  return data;
}

// Extraire toutes les données d'un parlay_card
function extractParlayData(blockElement) {
  const blockId = blockElement.getAttribute("data-block-id") || blockElement.id;

  const data = {
    shop_domain: SHOP_DOMAIN,
    block_id: blockId,
    sport_type: blockElement.getAttribute("data-sport-type"),
    ai_data_count: parseInt(blockElement.getAttribute("data-ai-data-count")) || 0,
    win_percentage: parseInt(blockElement.getAttribute("data-win-percentage")) || 0,
    multiplier: parseFloat(blockElement.getAttribute("data-multiplier")) || 0,
    bet_units: blockElement.getAttribute("data-bet-units"),
    odds: parseInt(blockElement.getAttribute("data-odds")) || 0,
    best_bookmaker: blockElement.getAttribute("data-best-bookmaker"),
    best_odds: parseInt(blockElement.getAttribute("data-best-odds")) || 0,
    match_date: blockElement.getAttribute("data-match-date"),
    match_time: blockElement.getAttribute("data-match-time"),
    result: blockElement.getAttribute("data-result") || "pending",
    legs: [],
  };

  // Extraire les legs depuis les attributs data-legs (JSON)
  const legsJson = blockElement.getAttribute("data-legs");
  if (legsJson) {
    try {
      data.legs = JSON.parse(legsJson);
    } catch (e) {
      console.error("Erreur parsing legs:", e);
      data.legs = [];
    }
  }

  return data;
}

// ==================== SAUVEGARDE DANS SUPABASE ====================

// Sauvegarder un bet dans Supabase
async function saveBetToSupabase(blockElement) {
  try {
    console.log("💾 Sauvegarde du bet dans Supabase...");

    const data = extractBetData(blockElement);

    const response = await fetch(`${getFunctionsBase()}/save-bet-to-history`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`Erreur ${response.status}: ${response.statusText}`);
    }

    const result = await response.json();
    console.log("✅ Bet sauvegardé:", result);

    showSuccessToast("Bet sauvegardé dans l'historique !");

    // Rafraîchir l'historique automatiquement après la sauvegarde
    await loadBetHistory();
  } catch (error) {
    console.error("❌ Erreur lors de la sauvegarde:", error);
    showErrorToast("Erreur lors de la sauvegarde. Vérifiez la console.");
  }
}

// Sauvegarder un parlay dans Supabase
async function saveParlayToSupabase(blockElement) {
  try {
    console.log("💾 Sauvegarde du parlay dans Supabase...");

    const data = extractParlayData(blockElement);

    const response = await fetch(`${getFunctionsBase()}/save-parlay-to-history`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`Erreur ${response.status}: ${response.statusText}`);
    }

    const result = await response.json();
    console.log("✅ Parlay sauvegardé:", result);

    showSuccessToast("Parlay sauvegardé dans l'historique !");

    // Rafraîchir l'historique automatiquement après la sauvegarde
    await loadParlayHistory();
  } catch (error) {
    console.error("❌ Erreur lors de la sauvegarde:", error);
    showErrorToast("Erreur lors de la sauvegarde. Vérifiez la console.");
  }
}

// ==================== CHARGEMENT DE L'HISTORIQUE ====================

// Charger l'historique des bets depuis Supabase
async function loadBetHistory() {
  try {
    // S'assurer que la config est initialisée
    if (!SHOP_DOMAIN) initSupabaseConfig();

    console.log("📥 Chargement de l'historique des bets...");
    const url = `${getFunctionsBase()}/get-bet-history?shop_domain=${SHOP_DOMAIN}`;
    console.log("↗️ Requête:", url);
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Erreur ${response.status}`);
    }

    const data = await response.json();
    console.log("✅ Historique chargé:", data);

    displayBetHistory(data);
  } catch (error) {
    console.error("❌ Erreur chargement historique:", error);
    const emptyState = document.getElementById("bet-empty-state");
    if (emptyState) emptyState.style.display = "block";
  }
}

// Charger l'historique des parlays depuis Supabase
async function loadParlayHistory() {
  try {
    // S'assurer que la config est initialisée
    if (!SHOP_DOMAIN) initSupabaseConfig();

    console.log("📥 Chargement de l'historique des parlays...");
    const url = `${getFunctionsBase()}/get-parlay-history?shop_domain=${SHOP_DOMAIN}`;
    console.log("↗️ Requête:", url);
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Erreur ${response.status}`);
    }

    const data = await response.json();
    console.log("✅ Historique chargé:", data);

    displayParlayHistory(data);
  } catch (error) {
    console.error("❌ Erreur chargement historique:", error);
    const emptyState = document.getElementById("parlay-empty-state");
    if (emptyState) emptyState.style.display = "block";
  }
}

// ==================== AFFICHAGE DE L'HISTORIQUE ====================

// Afficher l'historique des bets
function displayBetHistory(data) {
  const container = document.getElementById("bet-history-container");
  const statsContainer = document.getElementById("bet-stats");
  const emptyState = document.getElementById("bet-empty-state");

  if (!container || !statsContainer) return;

  // Si aucun bet
  if (!data.bets || data.bets.length === 0) {
    if (emptyState) emptyState.style.display = "block";
    return;
  }

  if (emptyState) emptyState.style.display = "none";

  // Afficher les statistiques avec couleurs
  const winsColor = (data.total_wins - data.total_losses >= 0) 
    ? "rgba(34, 197, 94, 0.2)" 
    : "rgba(239, 68, 68, 0.2)";

  const unitsColor = (data.total_units >= 0) 
    ? "rgba(34, 197, 94, 0.2)" 
    : "rgba(239, 68, 68, 0.2)";

  statsContainer.innerHTML = `
    <div style="background: ${winsColor}; border: 1px solid rgba(255, 255, 255, 0.15); border-radius: 0.5rem; padding: 1rem; text-align: center;">
      <div style="color: rgba(255, 255, 255, 0.9); font-weight: 700; font-size: 2rem;">
        ${data.total_wins - data.total_losses >= 0 ? "+" : ""}${data.total_wins - data.total_losses}
      </div>
      <div style="color: rgba(255, 255, 255, 0.7); font-size: 0.75rem; margin-top: 0.25rem; font-weight: 600;">PARIS EN +</div>
    </div>
    <div style="background: ${unitsColor}; border: 1px solid rgba(255, 255, 255, 0.15); border-radius: 0.5rem; padding: 1rem; text-align: center;">
      <div style="color: rgba(255, 255, 255, 0.9); font-weight: 700; font-size: 2rem;">
        ${data.total_units >= 0 ? "+" : ""}${data.total_units.toFixed(2)}
      </div>
      <div style="color: rgba(255, 255, 255, 0.7); font-size: 0.75rem; margin-top: 0.25rem; font-weight: 600;">UNITS EN +</div>
    </div>
  `;

  // Afficher chaque bet
  container.innerHTML = data.bets.map((bet) => generateBetCardHTML(bet)).join("");
}

// Afficher l'historique des parlays
function displayParlayHistory(data) {
  const container = document.getElementById("parlay-history-container");
  const statsContainer = document.getElementById("parlay-stats");
  const emptyState = document.getElementById("parlay-empty-state");

  if (!container || !statsContainer) return;

  // Si aucun parlay
  if (!data.parlays || data.parlays.length === 0) {
    if (emptyState) emptyState.style.display = "block";
    return;
  }

  if (emptyState) emptyState.style.display = "none";

  // Afficher les statistiques avec couleurs
  const winsColor = (data.total_wins - data.total_losses >= 0) 
    ? "rgba(34, 197, 94, 0.2)" 
    : "rgba(239, 68, 68, 0.2)";

  const unitsColor = (data.total_units >= 0) 
    ? "rgba(34, 197, 94, 0.2)" 
    : "rgba(239, 68, 68, 0.2)";

  statsContainer.innerHTML = `
    <div style="background: ${winsColor}; border: 1px solid rgba(255, 255, 255, 0.15); border-radius: 0.5rem; padding: 1rem; text-align: center;">
      <div style="color: rgba(255, 255, 255, 0.9); font-weight: 700; font-size: 2rem;">
        ${data.total_wins - data.total_losses >= 0 ? "+" : ""}${data.total_wins - data.total_losses}
      </div>
      <div style="color: rgba(255, 255, 255, 0.7); font-size: 0.75rem; margin-top: 0.25rem; font-weight: 600;">PARLAYS EN +</div>
    </div>
    <div style="background: ${unitsColor}; border: 1px solid rgba(255, 255, 255, 0.15); border-radius: 0.5rem; padding: 1rem; text-align: center;">
      <div style="color: rgba(255, 255, 255, 0.9); font-weight: 700; font-size: 2rem;">
        ${data.total_units >= 0 ? "+" : ""}${data.total_units.toFixed(2)}
      </div>
      <div style="color: rgba(255, 255, 255, 0.7); font-size: 0.75rem; margin-top: 0.25rem; font-weight: 600;">UNITS EN +</div>
    </div>
  `;

  // Afficher chaque parlay
  container.innerHTML = data.parlays.map((parlay) => generateParlayCardHTML(parlay)).join("");
}

// ==================== GÉNÉRATION HTML ====================

// Générer le HTML d'une carte de bet
function generateBetCardHTML(bet) {
  console.log("🖼️ Génération bet card, logos:", { team1_logo: bet.team1_logo, team2_logo: bet.team2_logo });
  // Calculer les units et la couleur selon le résultat
  let unitsText, unitsColor;
  const betUnits = parseFloat(bet.bet_units || "1");

  if (bet.result === "win") {
    const unitsValue = (betUnits * (bet.multiplier - 1)).toFixed(2);
    unitsText = `Win +${unitsValue} UNITS`;
    unitsColor = "rgba(34, 197, 94, 0.2)";
  } else if (bet.result === "loose") {
    const unitsValue = betUnits.toFixed(2);
    unitsText = `Lose -${unitsValue} UNITS`;
    unitsColor = "rgba(239, 68, 68, 0.2)";
  } else {
    unitsText = "EN ATTENTE";
    unitsColor = "rgba(255, 255, 255, 0.10)";
  }

  // Générer le HTML selon le type de bet
  let matchHTML = "";

  if (bet.bet_type === "moneyline") {
    const showTeam1Win = bet.moneyline_team === "team1" && bet.result === "win";
    const showTeam2Win = bet.moneyline_team === "team2" && bet.result === "win";
    const showTeam1Loss = bet.moneyline_team === "team1" && bet.result === "loose";
    const showTeam2Loss = bet.moneyline_team === "team2" && bet.result === "loose";

    matchHTML = `
      <div style="text-align: center; color: rgba(255, 255, 255, 0.7); font-size: 2rem; font-weight: 600; margin-bottom: 2rem;">MONEYLINE</div>
      <div style="display: flex; align-items: center; justify-content: center; gap: 1.5rem;">
        <div style="text-align: center; flex: 1;">
          <div style="width: 7rem; height: 7rem; border-radius: 50%; background: #ffffff; display: flex; align-items: center; justify-content: center; margin: 0 auto 1.25rem; padding: 1rem; ${showTeam1Win ? "border: 5px solid rgba(255, 255, 255, 0.5);" : ""} ${showTeam1Loss ? "border: 5px solid rgba(255, 255, 255, 0.2);" : ""}">
            <img src="${sanitizeLogo(bet.team1_logo)}" alt="${bet.team1_name}" style="width: 100%; height: 100%; object-fit: contain;">
          </div>
          <div style="font-size: 1.3rem; font-weight: 600; color: #ffffff; text-align: center;">${bet.team1_name}</div>
          ${showTeam1Win ? '<div style="font-size: 1.75rem; font-weight: 700; color: rgba(255, 255, 255, 0.9); margin-top: 1rem; text-align: center;">VICTOIRE</div>' : ""}
          ${showTeam1Loss ? '<div style="font-size: 1.75rem; font-weight: 700; color: rgba(255, 255, 255, 0.6); margin-top: 1rem; text-align: center;">DÉFAITE</div>' : ""}
        </div>
        <div style="text-align: center;">
          <div style="font-size: 3rem; font-weight: 700; color: rgba(255, 255, 255, 0.5);">VS</div>
        </div>
        <div style="text-align: center; flex: 1;">
          <div style="width: 7rem; height: 7rem; border-radius: 50%; background: #ffffff; display: flex; align-items: center; justify-content: center; margin: 0 auto 1.25rem; padding: 1rem; ${showTeam2Win ? "border: 5px solid rgba(255, 255, 255, 0.5);" : ""} ${showTeam2Loss ? "border: 5px solid rgba(255, 255, 255, 0.2);" : ""}">
            <img src="${sanitizeLogo(bet.team2_logo)}" alt="${bet.team2_name}" style="width: 100%; height: 100%; object-fit: contain;">
          </div>
          <div style="font-size: 1.3rem; font-weight: 600; color: #ffffff; text-align: center;">${bet.team2_name}</div>
          ${showTeam2Win ? '<div style="font-size: 1.75rem; font-weight: 700; color: rgba(255, 255, 255, 0.9); margin-top: 1rem; text-align: center;">VICTOIRE</div>' : ""}
          ${showTeam2Loss ? '<div style="font-size: 1.75rem; font-weight: 700; color: rgba(255, 255, 255, 0.6); margin-top: 1rem; text-align: center;">DÉFAITE</div>' : ""}
        </div>
      </div>
    `;
  } else if (bet.bet_type === "spread") {
    matchHTML = `
      <div style="text-align: center; color: rgba(255, 255, 255, 0.7); font-size: 2rem; font-weight: 600; margin-bottom: 2rem;">SPREAD</div>
      <div style="display: flex; align-items: center; justify-content: center; gap: 1.5rem;">
        <div style="text-align: center; flex: 1;">
          <div style="width: 7rem; height: 7rem; border-radius: 50%; background: #ffffff; display: flex; align-items: center; justify-content: center; margin: 0 auto 1.25rem; padding: 1rem; ${bet.spread_team === "team1" ? "border: 5px solid rgba(255, 255, 255, 0.5);" : ""}">
            <img src="${sanitizeLogo(bet.team1_logo)}" alt="${bet.team1_name}" style="width: 100%; height: 100%; object-fit: contain;">
          </div>
          <div style="font-size: 1.3rem; font-weight: 600; color: #ffffff; text-align: center;">${bet.team1_name}</div>
          ${bet.spread_team === "team1" ? `<div style="font-size: 1.75rem; font-weight: 700; color: rgba(255, 255, 255, 0.9); margin-top: 1rem; text-align: center;">${bet.spread_value}</div>` : ""}
        </div>
        <div style="text-align: center;">
          <div style="font-size: 3rem; font-weight: 700; color: rgba(255, 255, 255, 0.5);">VS</div>
        </div>
        <div style="text-align: center; flex: 1;">
          <div style="width: 7rem; height: 7rem; border-radius: 50%; background: #ffffff; display: flex; align-items: center; justify-content: center; margin: 0 auto 1.25rem; padding: 1rem; ${bet.spread_team === "team2" ? "border: 5px solid rgba(255, 255, 255, 0.5);" : ""}">
            <img src="${sanitizeLogo(bet.team2_logo)}" alt="${bet.team2_name}" style="width: 100%; height: 100%; object-fit: contain;">
          </div>
          <div style="font-size: 1.3rem; font-weight: 600; color: #ffffff; text-align: center;">${bet.team2_name}</div>
          ${bet.spread_team === "team2" ? `<div style="font-size: 1.75rem; font-weight: 700; color: rgba(255, 255, 255, 0.9); margin-top: 1rem; text-align: center;">${bet.spread_value}</div>` : ""}
        </div>
      </div>
    `;
  } else if (bet.bet_type === "over_under") {
    const displayText = bet.over_under_text_custom || bet.over_under_type;
    matchHTML = `
      <div style="text-align: center; color: rgba(255, 255, 255, 0.7); font-size: 2rem; font-weight: 600; margin-bottom: 2rem;">${displayText?.toUpperCase()}</div>
      <div style="display: flex; align-items: center; justify-content: center; gap: 1.5rem;">
        <div style="text-align: center; flex: 1;">
          <div style="width: 7rem; height: 7rem; border-radius: 50%; background: #ffffff; display: flex; align-items: center; justify-content: center; margin: 0 auto 1.25rem; padding: 1rem;">
            <img src="${sanitizeLogo(bet.team1_logo)}" alt="${bet.team1_name}" style="width: 100%; height: 100%; object-fit: contain;">
          </div>
          <div style="font-size: 1.3rem; font-weight: 600; color: #ffffff; text-align: center;">${bet.team1_name}</div>
        </div>
        <div style="text-align: center;">
          <div style="font-size: 3rem; font-weight: 700; color: rgba(255, 255, 255, 0.5);">VS</div>
          <div class="history-over-under-display" style="background: rgba(255, 255, 255, 0.05); border: 1px solid rgba(255, 255, 255, 0.15); border-radius: 0.5rem; padding: 1rem 1.25rem; margin-top: 1.25rem; max-width: 150px; margin-left: auto; margin-right: auto;">
            <div class="history-over-under-type" style="font-size: 1.5rem; font-weight: 700; color: rgba(255, 255, 255, 0.9); text-align: center; word-spacing: 9999px; line-height: 1.3;">${displayText?.toUpperCase()}</div>
            <div class="history-over-under-value" style="font-size: 2rem; font-weight: 700; color: #ffffff; margin-top: 0.5rem; text-align: center;">${bet.over_under_value}</div>
            ${bet.over_under_stat_type ? `<div class="history-over-under-stat" style="font-size: 1.5rem; color: rgba(255, 255, 255, 0.6); margin-top: 0.5rem; text-align: center; word-spacing: 9999px; line-height: 1.3;">${bet.over_under_stat_type}</div>` : ""}
          </div>
        </div>
        <div style="text-align: center; flex: 1;">
          <div style="width: 7rem; height: 7rem; border-radius: 50%; background: #ffffff; display: flex; align-items: center; justify-content: center; margin: 0 auto 1.25rem; padding: 1rem;">
            <img src="${sanitizeLogo(bet.team2_logo)}" alt="${bet.team2_name}" style="width: 100%; height: 100%; object-fit: contain;">
          </div>
          <div style="font-size: 1.3rem; font-weight: 600; color: #ffffff; text-align: center;">${bet.team2_name}</div>
        </div>
      </div>
    `;
  }

  return `
    <div class="card-wrapper">
    <!-- Badge UNITS -->
    <div style="max-width: 32rem; margin: 2rem auto 0.5rem; padding: 0 2rem;">
      <div style="background: ${unitsColor}; color: #ffffff; padding: 1rem 2rem; border-radius: 0.5rem; font-size: 1.5rem; font-weight: 700; text-align: center;">
        ${unitsText}
      </div>
    </div>
    
    <!-- Carte -->
    <div class="history-card" style="background: #000000; border: 2px solid ${unitsColor}; border-radius: 1rem; padding: 4rem; margin: 0 auto 2rem; max-width: 36rem; width: 100%; display: flex; flex-direction: column; align-items: center;">
      <!-- Cote en haut -->
      <div style="text-align: center; margin-bottom: 2rem;">
        <div style="font-size: 1rem; color: rgba(255, 255, 255, 0.5); text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 0.5rem;">COTE</div>
        <div style="font-size: 2.5rem; font-weight: 700; color: #ffffff;">${bet.multiplier}</div>
      </div>
      
      <div style="text-align: center; color: rgba(255, 255, 255, 0.7); font-size: 1.5rem; margin-bottom: 2.5rem;">
        ${bet.match_date} - ${bet.match_time}
      </div>
      ${matchHTML}
    </div>
    </div>
  `;
}

// Générer le HTML d'une carte de parlay
function generateParlayCardHTML(parlay) {
  // Calculer les units et la couleur selon le résultat
  let unitsText, unitsColor;
  const betUnits = parseFloat(parlay.bet_units || "1");

  if (parlay.result === "win") {
    const unitsValue = (betUnits * (parlay.multiplier - 1)).toFixed(2);
    unitsText = `Win +${unitsValue} UNITS`;
    unitsColor = "rgba(34, 197, 94, 0.2)";
  } else if (parlay.result === "loose") {
    const unitsValue = betUnits.toFixed(2);
    unitsText = `Lose -${unitsValue} UNITS`;
    unitsColor = "rgba(239, 68, 68, 0.2)";
  } else {
    unitsText = "EN ATTENTE";
    unitsColor = "rgba(255, 255, 255, 0.10)";
  }

  // Générer le HTML des legs
  const legsHTML = parlay.legs
    .map((leg, index) => {
      // Déterminer le statut de la leg
      const legResult = leg.result || "pending";
      
      // Définir les styles selon le résultat
    const legBorderColor = legResult === "win" ? "rgba(255, 255, 255, 0.50)" 
                     : legResult === "loose" ? "rgba(255, 255, 255, 0.20)" 
                     : "#ffffff";
      const legBorderWidth = legResult === "pending" ? "1px" : "4px";
      const legOpacity = legResult === "loose" ? "0.6" : "1";
      
      // Badge de statut
    const statusBadge = legResult === "win" 
  ? '<div style="position:absolute;top:0.5rem;right:0.5rem;background:rgba(255,255,255,0.20);color:#fff;padding:0.5rem 1rem;border-radius:0.5rem;font-weight:700;font-size:1rem;">✓ GAGNÉ</div>'
  : legResult === "loose" 
  ? '<div style="position:absolute;top:0.5rem;right:0.5rem;background:rgba(255,255,255,0.10);color:#fff;padding:0.5rem 1rem;border-radius:0.5rem;font-weight:700;font-size:1rem;">✗ PERDU</div>'
  : '';

      let legHTML = "";

      if (leg.bet_type === "moneyline") {
        const showTeam1Win = leg.moneyline_team === "team1" && legResult === "win";
        const showTeam2Win = leg.moneyline_team === "team2" && legResult === "win";
        const showTeam1Loss = leg.moneyline_team === "team1" && legResult === "loose";
        const showTeam2Loss = leg.moneyline_team === "team2" && legResult === "loose";

        legHTML = `
        <div style="text-align: center; color: rgba(255, 255, 255, 0.6); font-size: 1.5rem; margin-bottom: 1.25rem;">MONEYLINE</div>
        <div style="display: flex; align-items: center; justify-content: center; gap: 1rem;">
          <div style="text-align: center; flex: 1;">
            <div style="width: 4.5rem; height: 4.5rem; border-radius: 50%; background: #ffffff; display: flex; align-items: center; justify-content: center; margin: 0 auto 1rem; padding: 0.75rem; ${showTeam1Win ? "border: 4px solid rgba(255, 255, 255, 0.5);" : ""} ${showTeam1Loss ? "border: 4px solid rgba(255, 255, 255, 0.2);" : ""}">
              <img src="${sanitizeLogo(leg.team1_logo)}" alt="${leg.team1_name}" style="width: 100%; height: 100%; object-fit: contain;">
            </div>
            <div style="font-size: 1rem; font-weight: 600; color: #ffffff; text-align: center;">${leg.team1_name}</div>
            ${showTeam1Win ? '<div style="font-size: 1.125rem; font-weight: 700; color: rgba(255, 255, 255, 0.9); margin-top: 0.5rem; text-align: center;">VICTOIRE</div>' : ""}
            ${showTeam1Loss ? '<div style="font-size: 1.125rem; font-weight: 700; color: rgba(255, 255, 255, 0.6); margin-top: 0.5rem; text-align: center;">DÉFAITE</div>' : ""}
          </div>
          <div style="text-align: center;">
            <div style="font-size: 2rem; font-weight: 700; color: rgba(255, 255, 255, 0.5);">VS</div>
          </div>
          <div style="text-align: center; flex: 1;">
            <div style="width: 4.5rem; height: 4.5rem; border-radius: 50%; background: #ffffff; display: flex; align-items: center; justify-content: center; margin: 0 auto 1rem; padding: 0.75rem; ${showTeam2Win ? "border: 4px solid rgba(255, 255, 255, 0.5);" : ""} ${showTeam2Loss ? "border: 4px solid rgba(255, 255, 255, 0.2);" : ""}">
              <img src="${sanitizeLogo(leg.team2_logo)}" alt="${leg.team2_name}" style="width: 100%; height: 100%; object-fit: contain;">
            </div>
            <div style="font-size: 1rem; font-weight: 600; color: #ffffff; text-align: center;">${leg.team2_name}</div>
            ${showTeam2Win ? '<div style="font-size: 1.125rem; font-weight: 700; color: rgba(255, 255, 255, 0.9); margin-top: 0.5rem; text-align: center;">VICTOIRE</div>' : ""}
            ${showTeam2Loss ? '<div style="font-size: 1.125rem; font-weight: 700; color: rgba(255, 255, 255, 0.6); margin-top: 0.5rem; text-align: center;">DÉFAITE</div>' : ""}
          </div>
        </div>
      `;
      } else if (leg.bet_type === "spread") {
        legHTML = `
        <div style="text-align: center; color: rgba(255, 255, 255, 0.6); font-size: 1.5rem; margin-bottom: 1.25rem;">SPREAD</div>
        <div style="display: flex; align-items: center; justify-content: center; gap: 1rem;">
          <div style="text-align: center; flex: 1;">
            <div style="width: 4.5rem; height: 4.5rem; border-radius: 50%; background: #ffffff; display: flex; align-items: center; justify-content: center; margin: 0 auto 1rem; padding: 0.75rem; ${leg.spread_team === "team1" ? "border: 4px solid rgba(255, 255, 255, 0.5);" : ""}">
              <img src="${sanitizeLogo(leg.team1_logo)}" alt="${leg.team1_name}" style="width: 100%; height: 100%; object-fit: contain;">
            </div>
            <div style="font-size: 1rem; font-weight: 600; color: #ffffff; text-align: center;">${leg.team1_name}</div>
            ${leg.spread_team === "team1" ? `<div style="font-size: 1.25rem; font-weight: 700; color: rgba(255, 255, 255, 0.9); margin-top: 0.75rem; text-align: center;">${leg.spread_value}</div>` : ""}
          </div>
          <div style="text-align: center;">
            <div style="font-size: 2rem; font-weight: 700; color: rgba(255, 255, 255, 0.5);">VS</div>
          </div>
          <div style="text-align: center; flex: 1;">
            <div style="width: 4.5rem; height: 4.5rem; border-radius: 50%; background: #ffffff; display: flex; align-items: center; justify-content: center; margin: 0 auto 1rem; padding: 0.75rem; ${leg.spread_team === "team2" ? "border: 4px solid rgba(255, 255, 255, 0.5);" : ""}">
              <img src="${sanitizeLogo(leg.team2_logo)}" alt="${leg.team2_name}" style="width: 100%; height: 100%; object-fit: contain;">
            </div>
            <div style="font-size: 1rem; font-weight: 600; color: #ffffff; text-align: center;">${leg.team2_name}</div>
            ${leg.spread_team === "team2" ? `<div style="font-size: 1.25rem; font-weight: 700; color: rgba(255, 255, 255, 0.9); margin-top: 0.75rem; text-align: center;">${leg.spread_value}</div>` : ""}
          </div>
        </div>
      `;
      } else if (leg.bet_type === "over_under") {
        const displayText = leg.over_under_text_custom || leg.over_under_type;
        legHTML = `
        <div style="text-align: center; color: rgba(255, 255, 255, 0.6); font-size: 1.5rem; margin-bottom: 1.25rem;">${displayText?.toUpperCase()}</div>
        <div style="display: flex; align-items: center; justify-content: center; gap: 1rem;">
          <div style="text-align: center; flex: 1;">
            <div style="width: 4.5rem; height: 4.5rem; border-radius: 50%; background: #ffffff; display: flex; align-items: center; justify-content: center; margin: 0 auto 1rem; padding: 0.75rem;">
              <img src="${sanitizeLogo(leg.team1_logo)}" alt="${leg.team1_name}" style="width: 100%; height: 100%; object-fit: contain;">
            </div>
            <div style="font-size: 1rem; font-weight: 600; color: #ffffff; text-align: center;">${leg.team1_name}</div>
          </div>
          <div style="text-align: center;">
            <div style="font-size: 2rem; font-weight: 700; color: rgba(255, 255, 255, 0.5);">VS</div>
            <div class="history-over-under-display" style="background: rgba(255, 255, 255, 0.05); border: 1px solid rgba(255, 255, 255, 0.15); border-radius: 0.5rem; padding: 0.75rem 1rem; margin-top: 1rem; max-width: 120px; margin-left: auto; margin-right: auto;">
              <div class="history-over-under-type" style="font-size: 0.5625rem; font-weight: 700; color: rgba(255, 255, 255, 0.9); text-align: center; word-spacing: 9999px; line-height: 1.3;">${displayText?.toUpperCase()}</div>
              <div class="history-over-under-value" style="font-size: 0.875rem; font-weight: 700; color: #ffffff; margin-top: 0.4rem; text-align: center;">${leg.over_under_value}</div>
              ${leg.over_under_stat_type ? `<div class="history-over-under-stat" style="font-size: 0.65rem; color: rgba(255, 255, 255, 0.6); margin-top: 0.4rem; text-align: center; word-spacing: 9999px; line-height: 1.3;">${leg.over_under_stat_type}</div>` : ""}
            </div>
          </div>
          <div style="text-align: center; flex: 1;">
            <div style="width: 4.5rem; height: 4.5rem; border-radius: 50%; background: #ffffff; display: flex; align-items: center; justify-content: center; margin: 0 auto 1rem; padding: 0.75rem;">
              <img src="${sanitizeLogo(leg.team2_logo)}" alt="${leg.team2_name}" style="width: 100%; height: 100%; object-fit: contain;">
            </div>
            <div style="font-size: 1rem; font-weight: 600; color: #ffffff; text-align: center;">${leg.team2_name}</div>
          </div>
        </div>
      `;
      }

      return `
      <div style="position:relative;background:#000000;border:${legBorderWidth} solid ${legBorderColor};border-radius:1rem;padding:2rem;margin-bottom:${index < parlay.legs.length - 1 ? "1.5rem" : "0"};opacity:${legOpacity};">
        ${statusBadge}
        ${legHTML}
      </div>
    `;
    })
    .join("");

  return `
    <div class="card-wrapper">
    <!-- Badge UNITS -->
    <div style="max-width: 32rem; margin: 2rem auto 0.5rem; padding: 0 2rem;">
      <div style="background: ${unitsColor}; color: #ffffff; padding: 1rem 2rem; border-radius: 0.5rem; font-size: 1.5rem; font-weight: 700; text-align: center;">
        ${unitsText}
      </div>
    </div>
    
    <!-- Carte -->
    <div class="history-card" style="background: #000000; border: 2px solid ${unitsColor}; border-radius: 1rem; padding: 4rem; margin: 0 auto 2rem; max-width: 36rem; width: 100%; display: flex; flex-direction: column; align-items: center;">
      <!-- Cote en haut -->
      <div style="text-align: center; margin-bottom: 2rem;">
        <div style="font-size: 1rem; color: rgba(255, 255, 255, 0.5); text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 0.5rem;">COTE</div>
        <div style="font-size: 2.5rem; font-weight: 700; color: #ffffff;">${parlay.multiplier}</div>
      </div>
      
      <div style="text-align: center; color: rgba(255, 255, 255, 0.7); font-size: 1.5rem; margin-bottom: 2.5rem;">
        ${parlay.match_date} - ${parlay.match_time}
      </div>
      ${legsHTML}
    </div>
    </div>
    </div>
  `;
}

// ==================== FEEDBACK VISUEL ====================

function showSuccessToast(message) {
  // Ne montrer les toasts que dans l'éditeur Shopify
  const isShopifyEditor = window.Shopify && window.Shopify.designMode;
  if (!isShopifyEditor) return;

  const toast = document.createElement("div");
  toast.textContent = "✅ " + message;
  toast.style.cssText =
    "position:fixed;top:20px;right:20px;background:rgba(255,255,255,0.15);color:#fff;padding:1rem 2rem;border-radius:0.5rem;font-weight:600;z-index:9999;box-shadow:0 4px 6px rgba(0,0,0,0.3);";
  document.body.appendChild(toast);
  setTimeout(() => toast.remove(), 3000);
}

function showErrorToast(message) {
  // Ne montrer les toasts que dans l'éditeur Shopify
  const isShopifyEditor = window.Shopify && window.Shopify.designMode;
  if (!isShopifyEditor) return;

  const toast = document.createElement("div");
  toast.textContent = "❌ " + message;
  toast.style.cssText =
    "position:fixed;top:20px;right:20px;background:rgba(255,255,255,0.10);color:#fff;padding:1rem 2rem;border-radius:0.5rem;font-weight:600;z-index:9999;box-shadow:0 4px 6px rgba(0,0,0,0.3);";
  document.body.appendChild(toast);
  setTimeout(() => toast.remove(), 3000);
}

// ==================== EVENT LISTENERS ====================

// Détecter les blocks avec send_to_history = true au chargement
function checkAndSaveBlocks() {
  console.log("🔍 Recherche des cartes à sauvegarder...");
  // Vérifier tous les bet_card
  document.querySelectorAll('[data-block-type="bet_card"]').forEach((card) => {
    const sendToHistory = card.getAttribute("data-send-to-history");
    console.log("🔎 Bet card trouvé:", {
      blockId: card.getAttribute("data-block-id"),
      sendToHistory: sendToHistory,
      visible: card.style.display !== "none",
    });
    if (sendToHistory === "true") {
      console.log("📋 Détection bet à sauvegarder:", card.getAttribute("data-block-id"));
      saveBetToSupabase(card);
    }
  });

  // Vérifier tous les parlay_card
  document.querySelectorAll('[data-block-type="parlay_card"]').forEach((card) => {
    const sendToHistory = card.getAttribute("data-send-to-history");
    console.log("🔎 Parlay card trouvé:", {
      blockId: card.getAttribute("data-block-id"),
      sendToHistory: sendToHistory,
      visible: card.style.display !== "none",
    });
    if (sendToHistory === "true") {
      console.log("📋 Détection parlay à sauvegarder:", card.getAttribute("data-block-id"));
      saveParlayToSupabase(card);
    }
  });
}

// Initialisation au chargement de la page
document.addEventListener("DOMContentLoaded", function () {
  console.log("🚀 Initialisation du système d'historique Supabase");
  initSupabaseConfig();
  console.log("🔗 Functions base:", getFunctionsBase(), "Shop domain:", SHOP_DOMAIN);
  checkAndSaveBlocks();
});

// Exposer les fonctions globalement pour pouvoir les appeler depuis le code Liquid
window.loadBetHistory = loadBetHistory;
window.loadParlayHistory = loadParlayHistory;
window.saveBetToSupabase = saveBetToSupabase;
window.saveParlayToSupabase = saveParlayToSupabase;
