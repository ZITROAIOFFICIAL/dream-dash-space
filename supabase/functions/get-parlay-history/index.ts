import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    const url = new URL(req.url);
    const shopDomain = url.searchParams.get('shop_domain');

    console.log('📥 Chargement historique parlays pour:', shopDomain);

    let query = supabase
      .from('parlay_history')
      .select('*')
      .order('created_at', { ascending: false });

    if (shopDomain) {
      query = query.eq('shop_domain', shopDomain);
    }

    const { data: parlays, error } = await query;

    if (error) {
      console.error('❌ Erreur chargement:', error);
      throw error;
    }

    // Calculer les statistiques
    let totalWins = 0;
    let totalLosses = 0;
    let totalUnits = 0;

    parlays.forEach((parlay) => {
      const betUnits = parseFloat(parlay.bet_units || "1");
      
      if (parlay.result === 'win') {
        totalWins++;
        totalUnits += (betUnits * (parseFloat(parlay.multiplier) - 1));
      } else if (parlay.result === 'loose') {
        totalLosses++;
        totalUnits -= betUnits;
      }
    });

    console.log(`✅ ${parlays.length} parlays chargés (${totalWins}W/${totalLosses}L)`);

    return new Response(
      JSON.stringify({
        parlays,
        total_wins: totalWins,
        total_losses: totalLosses,
        total_units: parseFloat(totalUnits.toFixed(2))
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('❌ Erreur:', error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : 'Unknown error' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
