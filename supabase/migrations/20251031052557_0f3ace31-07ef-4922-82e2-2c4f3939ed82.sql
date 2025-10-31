-- Activer les extensions nécessaires
CREATE EXTENSION IF NOT EXISTS pg_cron;
CREATE EXTENSION IF NOT EXISTS pg_net;

-- Créer le cron job (toutes les 10 secondes)
SELECT cron.schedule(
  'update-member-count-job',
  '*/10 * * * * *',
  $$
  SELECT net.http_post(
    url := 'https://ycvfyorgkhuxcosfrsxs.supabase.co/functions/v1/update-member-count',
    headers := '{"Content-Type": "application/json", "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InljdmZ5b3Jna2h1eGNvc2Zyc3hzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjE4Njc0NTcsImV4cCI6MjA3NzQ0MzQ1N30.vQEzzlScCD6a52rM1CMfK2fFLKKqz-_WuZQ09YdTsdU"}'::jsonb,
    body := '{}'::jsonb
  ) as request_id;
  $$
);