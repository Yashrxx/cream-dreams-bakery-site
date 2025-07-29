-- Create storage policies for product-images bucket
CREATE POLICY "Allow public access to product images" 
ON storage.objects 
FOR SELECT 
USING (bucket_id = 'product-images');

CREATE POLICY "Allow authenticated users to upload product images" 
ON storage.objects 
FOR INSERT 
WITH CHECK (bucket_id = 'product-images');

CREATE POLICY "Allow authenticated users to update product images" 
ON storage.objects 
FOR UPDATE 
USING (bucket_id = 'product-images');

CREATE POLICY "Allow authenticated users to delete product images" 
ON storage.objects 
FOR DELETE 
USING (bucket_id = 'product-images');

-- Create storage policies for user-uploads bucket
CREATE POLICY "Allow public access to user uploads" 
ON storage.objects 
FOR SELECT 
USING (bucket_id = 'user-uploads');

CREATE POLICY "Allow authenticated users to upload files" 
ON storage.objects 
FOR INSERT 
WITH CHECK (bucket_id = 'user-uploads');

CREATE POLICY "Allow authenticated users to update their uploads" 
ON storage.objects 
FOR UPDATE 
USING (bucket_id = 'user-uploads');

CREATE POLICY "Allow authenticated users to delete their uploads" 
ON storage.objects 
FOR DELETE 
USING (bucket_id = 'user-uploads');