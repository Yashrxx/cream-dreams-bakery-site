-- Create storage buckets for images
INSERT INTO storage.buckets (id, name, public) VALUES ('product-images', 'product-images', true);
INSERT INTO storage.buckets (id, name, public) VALUES ('user-uploads', 'user-uploads', true);

-- Create policies for product images (public access)
CREATE POLICY "Public Access for Product Images" ON storage.objects
FOR SELECT USING (bucket_id = 'product-images');

CREATE POLICY "Admin Upload for Product Images" ON storage.objects
FOR INSERT WITH CHECK (bucket_id = 'product-images');

CREATE POLICY "Admin Update for Product Images" ON storage.objects
FOR UPDATE USING (bucket_id = 'product-images');

CREATE POLICY "Admin Delete for Product Images" ON storage.objects
FOR DELETE USING (bucket_id = 'product-images');

-- Create policies for user uploads
CREATE POLICY "Public Access for User Uploads" ON storage.objects
FOR SELECT USING (bucket_id = 'user-uploads');

CREATE POLICY "Users can upload their own files" ON storage.objects
FOR INSERT WITH CHECK (bucket_id = 'user-uploads');

CREATE POLICY "Users can update their own files" ON storage.objects
FOR UPDATE USING (bucket_id = 'user-uploads');

CREATE POLICY "Users can delete their own files" ON storage.objects
FOR DELETE USING (bucket_id = 'user-uploads');