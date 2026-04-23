-- ============================================
-- DYNAMIC QR CODES TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS public.dynamic_qrs (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id     UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  short_id    TEXT NOT NULL UNIQUE,
  title       TEXT NOT NULL DEFAULT 'Untitled QR',
  destination_url TEXT NOT NULL,
  is_active   BOOLEAN NOT NULL DEFAULT true,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at  TIMESTAMPTZ NOT NULL DEFAULT now(),
  expires_at  TIMESTAMPTZ,
  scan_count  INTEGER NOT NULL DEFAULT 0,
  customization_options JSONB,
  image_url   TEXT,
  qr_type     TEXT NOT NULL DEFAULT 'url'
);

-- ============================================
-- QR SCAN EVENTS TABLE (analytics)
-- ============================================
CREATE TABLE IF NOT EXISTS public.qr_scan_events (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  dynamic_qr_id UUID REFERENCES public.dynamic_qrs(id) ON DELETE CASCADE,
  scanned_at  TIMESTAMPTZ NOT NULL DEFAULT now(),
  ip_address  TEXT,
  user_agent  TEXT,
  device_type TEXT,   -- 'mobile' | 'tablet' | 'desktop'
  browser     TEXT,
  os          TEXT,
  country     TEXT,
  city        TEXT,
  referrer    TEXT
);

-- ============================================
-- SOCIAL HUB PAGES TABLE (Linktree-style)
-- ============================================
CREATE TABLE IF NOT EXISTS public.social_hubs (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id     UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  short_id    TEXT NOT NULL UNIQUE,
  title       TEXT NOT NULL DEFAULT 'My Links',
  bio         TEXT,
  avatar_url  TEXT,
  theme       TEXT NOT NULL DEFAULT 'dark',
  links       JSONB NOT NULL DEFAULT '[]',
  scan_count  INTEGER NOT NULL DEFAULT 0,
  is_active   BOOLEAN NOT NULL DEFAULT true,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ============================================
-- INDEXES
-- ============================================
CREATE INDEX IF NOT EXISTS idx_dynamic_qrs_user_id ON public.dynamic_qrs(user_id);
CREATE INDEX IF NOT EXISTS idx_dynamic_qrs_short_id ON public.dynamic_qrs(short_id);
CREATE INDEX IF NOT EXISTS idx_qr_scan_events_dynamic_qr_id ON public.qr_scan_events(dynamic_qr_id);
CREATE INDEX IF NOT EXISTS idx_qr_scan_events_scanned_at ON public.qr_scan_events(scanned_at);
CREATE INDEX IF NOT EXISTS idx_social_hubs_short_id ON public.social_hubs(short_id);
CREATE INDEX IF NOT EXISTS idx_social_hubs_user_id ON public.social_hubs(user_id);

-- ============================================
-- ROW LEVEL SECURITY
-- ============================================
ALTER TABLE public.dynamic_qrs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.qr_scan_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.social_hubs ENABLE ROW LEVEL SECURITY;

-- dynamic_qrs policies
CREATE POLICY "Users can manage their own dynamic QRs"
  ON public.dynamic_qrs FOR ALL
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Anyone can read active dynamic QRs for redirect"
  ON public.dynamic_qrs FOR SELECT
  USING (is_active = true);

-- qr_scan_events policies
CREATE POLICY "Users can read scans for their QRs"
  ON public.qr_scan_events FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.dynamic_qrs
      WHERE id = dynamic_qr_id AND user_id = auth.uid()
    )
  );

CREATE POLICY "Anyone can insert scan events"
  ON public.qr_scan_events FOR INSERT
  WITH CHECK (true);

-- social_hubs policies
CREATE POLICY "Users can manage their own social hubs"
  ON public.social_hubs FOR ALL
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Anyone can read active social hubs"
  ON public.social_hubs FOR SELECT
  USING (is_active = true);

-- ============================================
-- FUNCTION: increment scan count
-- ============================================
CREATE OR REPLACE FUNCTION increment_dynamic_qr_scans(qr_short_id TEXT)
RETURNS VOID AS $$
BEGIN
  UPDATE public.dynamic_qrs
  SET scan_count = scan_count + 1, updated_at = now()
  WHERE short_id = qr_short_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
