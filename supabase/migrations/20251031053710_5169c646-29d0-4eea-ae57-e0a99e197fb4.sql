-- Vérifier et activer pg_cron si nécessaire
CREATE EXTENSION IF NOT EXISTS pg_cron WITH SCHEMA extensions;
CREATE EXTENSION IF NOT EXISTS pg_net WITH SCHEMA extensions;

-- Supprimer l'ancien job s'il existe
SELECT cron.unschedule('update-member-count-job');

-- Créer le cron job pour appeler l'Edge Function toutes les 10 secondes
SELECT cron.schedule(
  'update-member-count-job',
  '*/10 * * * * *',
  $$
  SELECT extensions.http_post(
    url := 'https://ycvfyorgkhuxcosfrsxs.supabase.co/functions/v1/update-member-count',
    headers := '{"Content-Type": "application/json", "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InljdmZ5b3Jna2h1eGNvc2Zyc3hzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjE4Njc0NTcsImV4cCI6MjA3NzQ0MzQ1N30.vQEzzlScCD6a52rM1CMfK2fFLKKqz-_WuZQ09YdTsdU"}'::jsonb,
    body := '{}'::jsonb
  ) as request_id;
  $$
);