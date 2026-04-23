/*
  # Add Lead Capture to Dynamic QRs

  1. New Columns
    - `lead_capture_enabled` (boolean, default false)
    - `lead_capture_fields` (jsonb, default '[]')
    - `lead_capture_title` (text, default 'Contact Information')
    - `lead_capture_message` (text, default 'Please fill out the form to continue.')

  2. New Tables
    - `lead_submissions`
      - `id` (uuid, primary key)
      - `dynamic_qr_id` (uuid, references dynamic_qrs)
      - `data` (jsonb)
      - `created_at` (timestamptz, default now())
*/

-- Update dynamic_qrs table
ALTER TABLE public.dynamic_qrs 
ADD COLUMN IF NOT EXISTS lead_capture_enabled BOOLEAN DEFAULT false,
ADD COLUMN IF NOT EXISTS lead_capture_fields JSONB DEFAULT '[]',
ADD COLUMN IF NOT EXISTS lead_capture_title TEXT DEFAULT 'Contact Information',
ADD COLUMN IF NOT EXISTS lead_capture_message TEXT DEFAULT 'Please fill out the form to continue.';

-- Create lead_submissions table
CREATE TABLE IF NOT EXISTS public.lead_submissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  dynamic_qr_id UUID REFERENCES public.dynamic_qrs(id) ON DELETE CASCADE,
  data JSONB NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.lead_submissions ENABLE ROW LEVEL SECURITY;

-- Allow anyone to insert (public form)
CREATE POLICY "Anyone can submit leads" ON public.lead_submissions
  FOR INSERT WITH CHECK (true);

-- Only QR owner can view leads
CREATE POLICY "QR owners can view their leads" ON public.lead_submissions
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.dynamic_qrs
      WHERE id = dynamic_qr_id AND user_id = auth.uid()
    )
  );
