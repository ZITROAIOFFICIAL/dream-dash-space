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

    const parlayData = await req.json();
    
    console.log('💾 Sauvegarde parlay:', parlayData.block_id);
    console.log('📊 Leg results:', parlayData.leg_results);

    // Upsert: insert ou update si block_id existe déjà
    const { data, error } = await supabase
      .from('parlay_history')
      .upsert(parlayData, {
        onConflict: 'shop_domain,block_id'
      })
      .select()
      .single();

    if (error) {
      console.error('❌ Erreur sauvegarde:', error);
      throw error;
    }

    console.log('✅ Parlay sauvegardé:', data.id);

    return new Response(
      JSON.stringify({ success: true, data }),
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
