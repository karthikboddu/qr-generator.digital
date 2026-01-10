/*
# [Enable RLS and Create Security Policies]
This script secures the database by enabling Row Level Security (RLS) on all user-data tables and creating policies to control data access. It also creates a function to safely increment scan counts.

## Query Description: This is a critical security update. It will restrict all database access to only be allowed through the policies defined below. If policies are incorrect, users may not be able to see their own data. No data will be lost by this operation.

## Metadata:
- Schema-Category: "Structural"
- Impact-Level: "High"
- Requires-Backup: false
- Reversible: true (by disabling RLS)

## Structure Details:
- Tables affected: `profiles`, `qr_codes`, `qr_scans`
- Functions created: `increment_scan_count`

## Security Implications:
- RLS Status: Enabled
- Policy Changes: Yes, policies for SELECT, INSERT, UPDATE, DELETE are created.
- Auth Requirements: Policies are based on the authenticated user's ID (`auth.uid()`).

## Performance Impact:
- Indexes: None
- Triggers: None
- Estimated Impact: Negligible. RLS checks are highly optimized by PostgreSQL.
*/

-- 1. Enable RLS on the tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.qr_codes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.qr_scans ENABLE ROW LEVEL SECURITY;

-- 2. Create Policies for `profiles` table
-- Users can view their own profile.
CREATE POLICY "Allow individual user access to their own profile"
ON public.profiles FOR SELECT
USING (auth.uid() = id);

-- Users can update their own profile.
CREATE POLICY "Allow individual user to update their own profile"
ON public.profiles FOR UPDATE
USING (auth.uid() = id)
WITH CHECK (auth.uid() = id);


-- 3. Create Policies for `qr_codes` table
-- Users can view their own QR codes.
CREATE POLICY "Allow individual user access to their own QR codes"
ON public.qr_codes FOR SELECT
USING (auth.uid() = user_id);

-- Users can create QR codes.
CREATE POLICY "Allow individual user to create QR codes"
ON public.qr_codes FOR INSERT
WITH CHECK (auth.uid() = user_id);

-- Users can update their own QR codes.
CREATE POLICY "Allow individual user to update their own QR codes"
ON public.qr_codes FOR UPDATE
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

-- Users can delete their own QR codes.
CREATE POLICY "Allow individual user to delete their own QR codes"
ON public.qr_codes FOR DELETE
USING (auth.uid() = user_id);

-- ANYONE can view a specific QR code for the shared page.
CREATE POLICY "Allow public read access for shared QR codes"
ON public.qr_codes FOR SELECT
USING (true);


-- 4. Create Policies for `qr_scans` table
-- Users can view scan history for their own QR codes.
CREATE POLICY "Allow user to view scans for their QR codes"
ON public.qr_scans FOR SELECT
USING ((SELECT user_id FROM public.qr_codes WHERE id = qr_scans.qr_code_id) = auth.uid());

-- ANYONE can insert a scan record. This is needed for public tracking.
CREATE POLICY "Allow public insert for scan tracking"
ON public.qr_scans FOR INSERT
WITH CHECK (true);


-- 5. Create RPC function to increment scan count
-- This is a secure way to allow scan counts to be updated without giving broad update permissions.
CREATE OR REPLACE FUNCTION increment_scan_count(qr_id_param UUID)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER -- Important: runs with the privileges of the function owner
AS $$
BEGIN
  -- Increment the scan_count on the qr_codes table
  UPDATE public.qr_codes
  SET scan_count = scan_count + 1
  WHERE id = qr_id_param;

  -- Insert a record into the qr_scans table
  INSERT INTO public.qr_scans(qr_code_id)
  VALUES(qr_id_param);
END;
$$;
