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
-- FIXED: Use net.http_post instead of extensions.http_post
SELECT cron.schedule(
  'update-member-count-job',
  '* * * * *',
  $$
  SELECT net.http_post(
    url := 'https://ycvfyorgkhuxcosfrsxs.supabase.co/functions/v1/update-member-count',
    headers := '{"Content-Type": "application/json"}'::jsonb,
    body := '{}'::jsonb
  );
  $$
);

-- Reset the counter to initial value (100)
UPDATE live_member_count 
SET current_count = 100, 
    current_target = 100,
    last_updated = now();