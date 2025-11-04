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

    console.log('📥 Chargement historique bets pour:', shopDomain);

    let query = supabase
      .from('bet_history')
      .select('*')
      .order('created_at', { ascending: false });

    if (shopDomain) {
      query = query.eq('shop_domain', shopDomain);
    }

    const { data: bets, error } = await query;

    if (error) {
      console.error('❌ Erreur chargement:', error);
      throw error;
    }

    // Calculer les statistiques
    let totalWins = 0;
    let totalLosses = 0;
    let totalUnits = 0;

    bets.forEach((bet) => {
      const betUnits = parseFloat(bet.bet_units || "1");
      
      if (bet.result === 'win') {
        totalWins++;
        totalUnits += (betUnits * (parseFloat(bet.multiplier) - 1));
      } else if (bet.result === 'loose') {
        totalLosses++;
        totalUnits -= betUnits;
      }
    });

    console.log(`✅ ${bets.length} bets chargés (${totalWins}W/${totalLosses}L)`);

    return new Response(
      JSON.stringify({
        bets,
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
