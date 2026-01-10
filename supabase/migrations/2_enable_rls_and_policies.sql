/*
# [Enable RLS and Define Security Policies]
This script enables Row Level Security (RLS) on the `profiles`, `qr_codes`, and `qr_scans` tables and creates policies to ensure data privacy and proper access control.

## Query Description: [This is a critical security update. It restricts data access based on user authentication. Without this, all user data would be publicly exposed. It ensures users can only manage their own QR codes and profiles, while allowing public read access for shared QR codes and anonymous scan tracking.]

## Metadata:
- Schema-Category: "Structural"
- Impact-Level: "High"
- Requires-Backup: false
- Reversible: true

## Structure Details:
- Tables affected: `profiles`, `qr_codes`, `qr_scans`
- Operations: `ALTER TABLE ... ENABLE ROW LEVEL SECURITY`, `CREATE POLICY`

## Security Implications:
- RLS Status: Enabled
- Policy Changes: Yes
- Auth Requirements: Policies are based on `auth.uid()` for authenticated users.

## Performance Impact:
- Indexes: None
- Triggers: None
- Estimated Impact: Negligible. RLS adds a small overhead to queries, but it's essential for security.
*/

-- 1. Enable RLS on the profiles table
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- 2. Create policies for the profiles table
CREATE POLICY "Users can view their own profile."
ON public.profiles FOR SELECT
USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile."
ON public.profiles FOR UPDATE
USING (auth.uid() = id);


-- 3. Enable RLS on the qr_codes table
ALTER TABLE public.qr_codes ENABLE ROW LEVEL SECURITY;

-- 4. Create policies for the qr_codes table
CREATE POLICY "Users can manage their own QR codes."
ON public.qr_codes FOR ALL
USING (auth.uid() = user_id);

CREATE POLICY "QR codes can be viewed publicly via share link."
ON public.qr_codes FOR SELECT
USING (true);


-- 5. Enable RLS on the qr_scans table
ALTER TABLE public.qr_scans ENABLE ROW LEVEL SECURITY;

-- 6. Create policies for the qr_scans table
CREATE POLICY "Anyone can insert a scan record."
ON public.qr_scans FOR INSERT
WITH CHECK (true);

CREATE POLICY "Users can view scans for their own QR codes."
ON public.qr_scans FOR SELECT
USING (
  EXISTS (
    SELECT 1
    FROM qr_codes
    WHERE qr_codes.id = qr_scans.qr_id AND qr_codes.user_id = auth.uid()
  )
);
