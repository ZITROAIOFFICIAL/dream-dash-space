-- Table pour stocker le compteur global des membres
CREATE TABLE IF NOT EXISTS public.live_member_count (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  current_count INTEGER NOT NULL DEFAULT 1000,
  current_target INTEGER NOT NULL DEFAULT 1000,
  last_updated TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insérer une seule ligne (le compteur global)
INSERT INTO public.live_member_count (current_count, current_target)
VALUES (1000, 1000)
ON CONFLICT DO NOTHING;

-- RLS : permettre la lecture à tout le monde
ALTER TABLE public.live_member_count ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read access to live_member_count"
ON public.live_member_count FOR SELECT
TO public
USING (true);

-- Activer Realtime pour synchronisation instantanée
ALTER PUBLICATION supabase_realtime ADD TABLE public.live_member_count;