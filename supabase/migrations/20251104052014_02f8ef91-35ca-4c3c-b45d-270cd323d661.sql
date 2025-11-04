-- Add leg_results column to parlay_history table
ALTER TABLE public.parlay_history 
ADD COLUMN IF NOT EXISTS leg_results jsonb DEFAULT '{}'::jsonb;

COMMENT ON COLUMN public.parlay_history.leg_results IS 'Status of each leg: {"leg_0": "win", "leg_1": "loss", "leg_2": "pending"}';
