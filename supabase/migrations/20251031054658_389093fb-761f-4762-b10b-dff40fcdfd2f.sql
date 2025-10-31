-- Ensure required extensions
CREATE EXTENSION IF NOT EXISTS pg_cron WITH SCHEMA extensions;
CREATE EXTENSION IF NOT EXISTS pg_net WITH SCHEMA extensions;

-- Unschedule previous job by name if it exists (ignore errors if not found)
DO $$
BEGIN
  PERFORM cron.unschedule('update-member-count-job');
EXCEPTION WHEN others THEN
  -- ignore
  NULL;
END $$;

-- Schedule the updater every minute (pg_cron standard granularity)
SELECT cron.schedule(
  'update-member-count-job',
  '* * * * *',
  $$
  SELECT extensions.http_post(
    url := 'https://ycvfyorgkhuxcosfrsxs.supabase.co/functions/v1/update-member-count',
    headers := '{"Content-Type": "application/json"}'::jsonb,
    body := '{}'::jsonb
  );
  $$
);
