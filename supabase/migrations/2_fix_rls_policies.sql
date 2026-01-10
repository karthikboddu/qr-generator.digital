/*
          # [Operation Name] Fix and Apply RLS Policies
          [This script enables Row Level Security (RLS) on the public tables and creates policies to ensure users can only access their own data. It drops existing policies to prevent errors from re-running the script.]

          ## Query Description: [This operation secures your database. It enables RLS on the `profiles`, `qr_codes`, and `qr_scans` tables. It then creates security policies that:
          1. Allow users to manage their own profiles.
          2. Allow users to manage their own QR codes.
          3. Allow anyone to view a specific QR code (for sharing).
          4. Allow anyone to create a scan record (for tracking).
          This is a critical security update and has no impact on existing data.]
          
          ## Metadata:
          - Schema-Category: ["Security", "Structural"]
          - Impact-Level: ["High"]
          - Requires-Backup: [false]
          - Reversible: [true]
          
          ## Structure Details:
          - Tables affected: `profiles`, `qr_codes`, `qr_scans`
          - Operations: `ALTER TABLE`, `DROP POLICY IF EXISTS`, `CREATE POLICY`
          
          ## Security Implications:
          - RLS Status: [Enabled]
          - Policy Changes: [Yes]
          - Auth Requirements: [Policies are based on `auth.uid()`]
          
          ## Performance Impact:
          - Indexes: [None]
          - Triggers: [None]
          - Estimated Impact: [Low. RLS adds a minor overhead to queries, which is negligible for this use case but essential for security.]
          */

-- Enable RLS for all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.qr_codes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.qr_scans ENABLE ROW LEVEL SECURITY;

-- Drop existing policies to avoid conflicts
DROP POLICY IF EXISTS "Users can view their own profile." ON public.profiles;
DROP POLICY IF EXISTS "Users can insert their own profile." ON public.profiles;
DROP POLICY IF EXISTS "Users can update their own profile." ON public.profiles;

DROP POLICY IF EXISTS "Users can manage their own QR codes." ON public.qr_codes;
DROP POLICY IF EXISTS "Anyone can view a specific QR code." ON public.qr_codes;

DROP POLICY IF EXISTS "Anyone can create a scan record." ON public.qr_scans;
DROP POLICY IF EXISTS "Users can view scans for their own QR codes." ON public.qr_scans;


-- Create Policies for 'profiles' table
CREATE POLICY "Users can view their own profile."
ON public.profiles FOR SELECT
USING (auth.uid() = id);

CREATE POLICY "Users can insert their own profile."
ON public.profiles FOR INSERT
WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update their own profile."
ON public.profiles FOR UPDATE
USING (auth.uid() = id)
WITH CHECK (auth.uid() = id);


-- Create Policies for 'qr_codes' table
CREATE POLICY "Users can manage their own QR codes."
ON public.qr_codes FOR ALL
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Anyone can view a specific QR code."
ON public.qr_codes FOR SELECT
USING (true);


-- Create Policies for 'qr_scans' table
CREATE POLICY "Anyone can create a scan record."
ON public.qr_scans FOR INSERT
WITH CHECK (true);

CREATE POLICY "Users can view scans for their own QR codes."
ON public.qr_scans FOR SELECT
USING (auth.uid() = (SELECT user_id FROM qr_codes WHERE qr_codes.id = qr_scans.qr_id));
