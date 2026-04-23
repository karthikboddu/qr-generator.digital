-- Adds growth-oriented controls for dynamic QR codes and social hubs.

ALTER TABLE public.dynamic_qrs
  ADD COLUMN IF NOT EXISTS access_password TEXT,
  ADD COLUMN IF NOT EXISTS redirect_rules JSONB NOT NULL DEFAULT '{}'::jsonb;

CREATE OR REPLACE FUNCTION public.increment_social_hub_scans(hub_short_id TEXT)
RETURNS VOID AS $$
BEGIN
  UPDATE public.social_hubs
  SET scan_count = scan_count + 1, updated_at = now()
  WHERE short_id = hub_short_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
