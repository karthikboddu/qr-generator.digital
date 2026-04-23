/*
  # Create Storage Buckets and Policies

  1. New Buckets
    - `pdfs`: Stores uploaded PDF menus and documents.
  
  2. Security
    - Enable public read access for PDFs.
    - Allow authenticated users to upload their own PDFs.
*/

-- Create bucket for PDFs if not exists
INSERT INTO storage.buckets (id, name, public)
VALUES ('pdfs', 'pdfs', true)
ON CONFLICT (id) DO NOTHING;

-- Policy: Allow anyone to view PDFs
CREATE POLICY "Public Access" ON storage.objects
  FOR SELECT USING (bucket_id = 'pdfs');

-- Policy: Allow authenticated users to upload PDFs
CREATE POLICY "Authenticated users can upload PDFs" ON storage.objects
  FOR INSERT WITH CHECK (
    bucket_id = 'pdfs' AND 
    auth.role() = 'authenticated'
  );

-- Policy: Allow users to update their own PDFs
CREATE POLICY "Users can update their own PDFs" ON storage.objects
  FOR UPDATE USING (
    bucket_id = 'pdfs' AND 
    auth.uid() = owner
  );

-- Policy: Allow users to delete their own PDFs
CREATE POLICY "Users can delete their own PDFs" ON storage.objects
  FOR DELETE USING (
    bucket_id = 'pdfs' AND 
    auth.uid() = owner
  );
