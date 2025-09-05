-- Create storage buckets for the bakery website
INSERT INTO storage.buckets (id, name, public) 
VALUES 
  ('product-images', 'product-images', true),
  ('user-uploads', 'user-uploads', true);

-- Create storage policies for product-images bucket
CREATE POLICY "Anyone can view product images" 
ON storage.objects 
FOR SELECT 
USING (bucket_id = 'product-images');

CREATE POLICY "Authenticated users can upload product images" 
ON storage.objects 
FOR INSERT 
WITH CHECK (bucket_id = 'product-images' AND auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can update product images" 
ON storage.objects 
FOR UPDATE 
USING (bucket_id = 'product-images' AND auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can delete product images" 
ON storage.objects 
FOR DELETE 
USING (bucket_id = 'product-images' AND auth.role() = 'authenticated');

-- Create storage policies for user-uploads bucket
CREATE POLICY "Anyone can view user uploads" 
ON storage.objects 
FOR SELECT 
USING (bucket_id = 'user-uploads');

CREATE POLICY "Authenticated users can upload files" 
ON storage.objects 
FOR INSERT 
WITH CHECK (bucket_id = 'user-uploads' AND auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can update their uploads" 
ON storage.objects 
FOR UPDATE 
USING (bucket_id = 'user-uploads' AND auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can delete their uploads" 
ON storage.objects 
FOR DELETE 
USING (bucket_id = 'user-uploads' AND auth.role() = 'authenticated');