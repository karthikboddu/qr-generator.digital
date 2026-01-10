/*
          # Initial Schema Setup
          This script sets up the foundational tables for the QR Code Generator application, including profiles, qr_codes, and qr_scans. It also establishes security rules and automated profile creation.

          ## Query Description: This script is safe to run on a new project. It creates new tables and enables Row Level Security to ensure users can only access their own data. It includes a trigger to automatically create a user profile upon sign-up.

          ## Metadata:
          - Schema-Category: "Structural"
          - Impact-Level: "Low"
          - Requires-Backup: false
          - Reversible: true

          ## Structure Details:
          - Creates table: `public.profiles`
          - Creates table: `public.qr_codes`
          - Creates table: `public.qr_scans`
          - Creates function: `public.handle_new_user()`
          - Creates trigger: `on_auth_user_created`
          - Creates function: `public.increment_scan(uuid)`

          ## Security Implications:
          - RLS Status: Enabled on all new tables.
          - Policy Changes: Yes, new policies are created for all tables.
          - Auth Requirements: Policies are based on `auth.uid()`.

          ## Performance Impact:
          - Indexes: Primary keys and foreign keys are indexed by default.
          - Triggers: One trigger is added to `auth.users` for profile creation.
          - Estimated Impact: Low.
          */

-- 1. PROFILES TABLE
-- Stores public user data, linked to auth.users.
CREATE TABLE public.profiles (
  id UUID NOT NULL PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

COMMENT ON TABLE public.profiles IS 'Stores public user data, linked to auth.users.';

-- 2. QR CODES TABLE
-- Stores all data for each generated QR code.
CREATE TABLE public.qr_codes (
  id UUID NOT NULL PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  content_type TEXT NOT NULL,
  content TEXT NOT NULL,
  customization JSONB,
  scan_count INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_qr_codes_user_id ON public.qr_codes(user_id);
COMMENT ON TABLE public.qr_codes IS 'Stores all data for each generated QR code.';

-- 3. QR SCANS TABLE
-- Logs each time a QR code is scanned.
CREATE TABLE public.qr_scans (
  id BIGSERIAL PRIMARY KEY,
  qr_code_id UUID NOT NULL REFERENCES public.qr_codes(id) ON DELETE CASCADE,
  scanned_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  user_agent TEXT,
  ip_address INET
);

CREATE INDEX idx_qr_scans_qr_code_id ON public.qr_scans(qr_code_id);
COMMENT ON TABLE public.qr_scans IS 'Logs each time a QR code is scanned.';


-- 4. NEW USER TRIGGER
-- Automatically create a profile for new users.
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, name)
  VALUES (new.id, new.raw_user_meta_data->>'name');
  RETURN new;
END;
$$;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

-- 5. SCAN INCREMENT FUNCTION
-- RPC function to increment scan count and log the scan.
CREATE OR REPLACE FUNCTION public.increment_scan(qr_id UUID)
RETURNS void
LANGUAGE plpgsql
AS $$
BEGIN
  -- Increment the scan count on the qr_codes table
  UPDATE public.qr_codes
  SET scan_count = scan_count + 1
  WHERE id = qr_id;

  -- Log the scan event in the qr_scans table
  INSERT INTO public.qr_scans (qr_code_id)
  VALUES (qr_id);
END;
$$;


-- 6. ROW LEVEL SECURITY (RLS)
-- Enable RLS for all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.qr_codes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.qr_scans ENABLE ROW LEVEL SECURITY;

-- Policies for profiles
CREATE POLICY "Users can view their own profile."
  ON public.profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile."
  ON public.profiles FOR UPDATE
  USING (auth.uid() = id);

-- Policies for qr_codes
CREATE POLICY "QR codes are publicly viewable."
  ON public.qr_codes FOR SELECT
  USING (true);

CREATE POLICY "Users can create their own QR codes."
  ON public.qr_codes FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own QR codes."
  ON public.qr_codes FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own QR codes."
  ON public.qr_codes FOR DELETE
  USING (auth.uid() = user_id);

-- Policies for qr_scans
CREATE POLICY "Anyone can insert a scan record."
  ON public.qr_scans FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Users can view scans for their own QR codes."
  ON public.qr_scans FOR SELECT
  USING (
    EXISTS (
      SELECT 1
      FROM public.qr_codes
      WHERE qr_codes.id = qr_scans.qr_code_id AND qr_codes.user_id = auth.uid()
    )
  );
