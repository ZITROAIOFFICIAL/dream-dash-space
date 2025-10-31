-- Table pour l'historique des bets individuels
CREATE TABLE public.bet_history (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz NOT NULL DEFAULT now(),
  shop_domain text NOT NULL,
  block_id text NOT NULL,
  sport_type text NOT NULL,
  ai_data_count integer,
  win_percentage integer,
  bet_type text NOT NULL,
  team1_name text NOT NULL,
  team1_logo text,
  team2_name text NOT NULL,
  team2_logo text,
  match_time text,
  match_date text,
  multiplier numeric,
  bet_units text,
  odds integer,
  best_bookmaker text,
  best_odds integer,
  result text DEFAULT 'pending',
  spread_value text,
  spread_team text,
  over_under_type text,
  over_under_value text,
  over_under_stat_type text,
  UNIQUE(shop_domain, block_id)
);

-- Index pour performance
CREATE INDEX idx_bet_history_shop_domain ON public.bet_history(shop_domain);
CREATE INDEX idx_bet_history_created_at ON public.bet_history(created_at DESC);
CREATE INDEX idx_bet_history_result ON public.bet_history(result);

-- Enable RLS
ALTER TABLE public.bet_history ENABLE ROW LEVEL SECURITY;

-- Policies pour lecture publique
CREATE POLICY "Allow public read access to bet_history"
  ON public.bet_history
  FOR SELECT
  TO anon, authenticated
  USING (true);

-- Policies pour insertion publique
CREATE POLICY "Allow public insert to bet_history"
  ON public.bet_history
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Policies pour update publique
CREATE POLICY "Allow public update to bet_history"
  ON public.bet_history
  FOR UPDATE
  TO anon, authenticated
  USING (true);

-- Table pour l'historique des parlays
CREATE TABLE public.parlay_history (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz NOT NULL DEFAULT now(),
  shop_domain text NOT NULL,
  block_id text NOT NULL,
  sport_type text NOT NULL,
  ai_data_count integer,
  win_percentage integer,
  multiplier numeric,
  bet_units text,
  odds integer,
  best_bookmaker text,
  best_odds integer,
  match_date text,
  match_time text,
  result text DEFAULT 'pending',
  legs jsonb NOT NULL DEFAULT '[]'::jsonb,
  UNIQUE(shop_domain, block_id)
);

-- Index pour performance
CREATE INDEX idx_parlay_history_shop_domain ON public.parlay_history(shop_domain);
CREATE INDEX idx_parlay_history_created_at ON public.parlay_history(created_at DESC);
CREATE INDEX idx_parlay_history_result ON public.parlay_history(result);

-- Enable RLS
ALTER TABLE public.parlay_history ENABLE ROW LEVEL SECURITY;

-- Policies pour lecture publique
CREATE POLICY "Allow public read access to parlay_history"
  ON public.parlay_history
  FOR SELECT
  TO anon, authenticated
  USING (true);

-- Policies pour insertion publique
CREATE POLICY "Allow public insert to parlay_history"
  ON public.parlay_history
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Policies pour update publique
CREATE POLICY "Allow public update to parlay_history"
  ON public.parlay_history
  FOR UPDATE
  TO anon, authenticated
  USING (true);