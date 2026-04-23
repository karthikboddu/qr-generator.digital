-- Add short_id column to qr_codes table
ALTER TABLE public.qr_codes ADD COLUMN IF NOT EXISTS short_id TEXT;

-- Generate short_ids for existing rows (using MD5 of the ID for simplicity in migration)
UPDATE public.qr_codes SET short_id = substring(md5(id::text) from 1 for 8) WHERE short_id IS NULL;

-- Make short_id NOT NULL and UNIQUE
ALTER TABLE public.qr_codes ALTER COLUMN short_id SET NOT NULL;
ALTER TABLE public.qr_codes ADD CONSTRAINT qr_codes_short_id_unique UNIQUE (short_id);

-- Add index
CREATE INDEX IF NOT EXISTS idx_qr_codes_short_id ON public.qr_codes(short_id);
