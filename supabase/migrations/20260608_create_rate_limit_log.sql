-- Rate-limit log for the DB-backed sliding-window limiter used by the public
-- API routes (waitlist, contact). Each row is a single recorded "hit" for a
-- key; the limiter prunes rows older than the window on every call.
--
-- Keys used by the app:
--   waitlist:hour:{ip}  -- max 3 per IP per hour
--   waitlist:day:{ip}   -- max 10 per IP per day
--   contact:{ip}        -- max 5 per IP per hour
--
-- Access is server-side only via the service-role client (which bypasses RLS).
-- RLS is enabled with no policies, so the anon/public key can neither read nor
-- write this table.

CREATE TABLE IF NOT EXISTS rate_limit_log (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  key TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_rate_limit_key_time ON rate_limit_log(key, created_at);

ALTER TABLE rate_limit_log ENABLE ROW LEVEL SECURITY;
