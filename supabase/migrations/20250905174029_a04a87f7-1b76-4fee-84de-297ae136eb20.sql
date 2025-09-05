-- Create products table for the bakery
CREATE TABLE public.products (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  category TEXT NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  original_price DECIMAL(10,2),
  rating DECIMAL(3,2) DEFAULT 4.5,
  reviews INTEGER DEFAULT 0,
  description TEXT,
  is_new BOOLEAN DEFAULT false,
  is_popular BOOLEAN DEFAULT false,
  image_key TEXT,
  image_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;

-- Create policy for public read access
CREATE POLICY "Anyone can view products" 
ON public.products 
FOR SELECT 
USING (true);

-- Create policy for authenticated users to manage products
CREATE POLICY "Authenticated users can manage products" 
ON public.products 
FOR ALL
USING (auth.role() = 'authenticated');

-- Insert sample products
INSERT INTO public.products (name, category, price, original_price, rating, reviews, description, is_new, is_popular, image_key) VALUES
('Chocolate Birthday Cake', 'birthday', 45.00, NULL, 4.8, 127, 'Rich chocolate cake with vanilla buttercream frosting', false, true, 'birthday-cake-1.jpg'),
('Vanilla Rainbow Cake', 'birthday', 50.00, 65.00, 4.7, 89, 'Colorful rainbow layers with vanilla cream', true, false, 'birthday-cake-2.jpg'),
('Strawberry Birthday Delight', 'birthday', 42.00, NULL, 4.9, 156, 'Fresh strawberry cake with cream cheese frosting', false, true, 'birthday-cake-3.jpg'),
('Classic Wedding Cake', 'weddings', 150.00, NULL, 4.9, 45, 'Three-tier elegant wedding cake with roses', false, true, 'wedding-image-1.jpeg'),
('Vintage Wedding Tower', 'weddings', 200.00, 250.00, 4.8, 32, 'Vintage-style multi-tier wedding cake', false, false, 'wedding-image-2.jpeg'),
('Custom Character Cake', 'custom', 75.00, NULL, 4.6, 78, 'Personalized cake with custom design', true, false, 'custom-image-1.jpeg'),
('Themed Celebration Cake', 'custom', 65.00, NULL, 4.7, 65, 'Custom themed cake for special occasions', false, false, 'custom-image-2.jpg'),
('Chocolate Cupcakes (6 pack)', 'cupcakes', 18.00, NULL, 4.5, 234, 'Rich chocolate cupcakes with buttercream', false, true, 'cupcake-1.jpg'),
('Vanilla Cupcakes (6 pack)', 'cupcakes', 16.00, 20.00, 4.4, 198, 'Classic vanilla cupcakes with colorful frosting', false, false, 'cupcake-2.jpg'),
('Gourmet Brownies', 'desserts', 25.00, NULL, 4.6, 145, 'Fudgy brownies with premium chocolate', false, false, 'dessert-image-1.jpeg'),
('Fruit Tart Collection', 'desserts', 30.00, NULL, 4.8, 87, 'Assorted fresh fruit tarts', true, false, 'dessert-image-2.jpeg');

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_products_updated_at
  BEFORE UPDATE ON public.products
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();