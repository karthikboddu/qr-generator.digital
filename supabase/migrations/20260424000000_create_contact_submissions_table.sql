/*
  # Create Contact Submissions Table

  1. New Tables
    - `contact_submissions`
      - `id` (uuid, primary key)
      - `name` (text, not null)
      - `email` (text, not null)
      - `message` (text, not null)
      - `user_id` (uuid, optional, references auth.users)
      - `created_at` (timestamptz, default now())

  2. Security
    - Enable RLS on `contact_submissions` table
    - Add policy for anyone to insert a contact submission
*/

CREATE TABLE IF NOT EXISTS public.contact_submissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  message TEXT NOT NULL,
  user_id UUID REFERENCES auth.users(id),
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.contact_submissions ENABLE ROW LEVEL SECURITY;

-- Allow anyone to insert (public contact form)
CREATE POLICY "Anyone can submit a contact form" ON public.contact_submissions
  FOR INSERT WITH CHECK (true);

-- Only authenticated users (or maybe admins later) can view their own submissions if they were logged in
-- For now, let's just let users see what they submitted if they were logged in.
CREATE POLICY "Users can view their own submissions" ON public.contact_submissions
  FOR SELECT USING (auth.uid() = user_id);
