-- Create ai_qr_codes table
CREATE TABLE IF NOT EXISTS public.ai_qr_codes (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id),
  prompt text,
  theme text,
  qr_data text,
  image_url text,
  created_at timestamp default now()
);

-- Enable RLS
ALTER TABLE public.ai_qr_codes ENABLE ROW LEVEL SECURITY;

-- Allow users to view their own AI QR codes
CREATE POLICY "Users can view their own AI QR codes" ON public.ai_qr_codes
  FOR SELECT USING (auth.uid() = user_id);

-- Allow users to insert their own AI QR codes
CREATE POLICY "Users can insert their own AI QR codes" ON public.ai_qr_codes
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Insert bucket for ai_qr_codes
INSERT INTO storage.buckets (id, name, public) 
VALUES ('ai_qr_codes', 'ai_qr_codes', true)
ON CONFLICT (id) DO NOTHING;

-- Bucket policies
CREATE POLICY "Public Access" ON storage.objects FOR SELECT USING (bucket_id = 'ai_qr_codes');
CREATE POLICY "Auth Insert" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'ai_qr_codes' AND auth.role() = 'authenticated');
