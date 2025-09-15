import { useEffect, useState } from "react";
import { Search, ShoppingCart, Heart, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { useImageManager } from "@/hooks/useImageManager";
import ImageWithFallback from "@/components/ImageWithFallback";
import productShowcase from "@/assets/Product-fallback.jpg";
import { supabase } from "@/integrations/supabase/client";

const LoadingSpinner = () => (
  <div className="flex justify-center items-center py-32">
    <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-rose-gold border-opacity-50"></div>
  </div>
);

const ProductGrid = ({ onAddToCart }: { onAddToCart?: (item: any) => void }) => {
  const { toast } = useToast();

  const [defaultProducts, setDefaultProducts] = useState<any[]>([]);
  const [loadingProducts, setLoadingProducts] = useState(true);
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  // Static fallback products from local assets (used if Supabase returns no data)
  const birthdayAssets = import.meta.glob<{ default: string }>("@/assets/birthday/*", { eager: true });
  const weddingAssets = import.meta.glob<{ default: string }>("@/assets/weddings/*", { eager: true });
  const customAssets = import.meta.glob<{ default: string }>("@/assets/custom/*", { eager: true });
  const cupcakesAssets = import.meta.glob<{ default: string }>("@/assets/cupcakes/*", { eager: true });
  

  const buildFallback = (mods: Record<string, { default: string }>, category: string) =>
    Object.values(mods).map((m, idx) => ({
      id: `${category}-${idx + 1}`,
      name: `${category[0].toUpperCase() + category.slice(1)} Delight ${idx + 1}`,
      description: 'Handcrafted with premium ingredients.',
      category,
      price: 25 + (idx % 6) * 5,
      rating: 4.8,
      reviews: 120 + idx,
      image: m.default,
    }));

  const fallbackProducts = [
    ...buildFallback(birthdayAssets, 'birthday'),
    ...buildFallback(weddingAssets, 'weddings'),
    ...buildFallback(customAssets, 'custom'),
    ...buildFallback(cupcakesAssets, 'cupcakes'),
    
  ];

  // ✅ Proper usage of hooks (NO loops)
  const birthday = useImageManager("product-images", "birthday");
  const wedding = useImageManager("product-images", "weddings");
  const custom = useImageManager("product-images", "custom");
  const cupcakes = useImageManager("product-images", "cupcakes");
  

  const productImages = [
    ...birthday.images,
    ...wedding.images,
    ...custom.images,
    ...cupcakes.images,
    
  ];

  const loadingImages =
    birthday.loading || wedding.loading || custom.loading || cupcakes.loading;

  const categories = [
    { id: "all", name: "All" },
    { id: "birthday", name: "Birthday Cakes" },
    { id: "weddings", name: "Wedding Cakes" },
    { id: "custom", name: "Custom Cakes" },
    { id: "cupcakes", name: "Cupcakes" },
    
  ];

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoadingProducts(true);
        const { data, error } = await supabase
          .from('products')
          .select('*')
          .order('created_at', { ascending: false });
        
        if (error) {
          console.warn("Supabase fetch error, will use fallbacks to fill:", error);
        }

        // Ensure exactly 5 items per category (birthday, weddings, custom, cupcakes)
        const cats = categories.filter(c => c.id !== "all").map(c => c.id);

        const fallbackByCategory = fallbackProducts.reduce((acc: Record<string, any[]>, p: any) => {
          (acc[p.category] ||= []).push(p);
          return acc;
        }, {} as Record<string, any[]>);

        const supaData = Array.isArray(data) ? data : [];
        const merged: any[] = [];

        for (const cat of cats) {
          // Keep up to 5 from Supabase, then fill the rest from local fallbacks
          const supaAll = supaData.filter((p: any) => p.category === cat);
          const supaItems = supaAll.slice(0, 5);
          const needed = Math.max(0, 5 - supaItems.length);
          const fb = (fallbackByCategory[cat] || [])
            .filter((f: any) => !supaItems.some((s: any) => s.name === f.name))
            .slice(0, needed);

          merged.push(...supaItems, ...fb);
        }

        setDefaultProducts(merged);

      } catch (error) {
        console.error("Failed to fetch products:", error);
      } finally {
        setLoadingProducts(false);
      }
    };

    fetchProducts();
  }, []);

  const products = defaultProducts.map((product: any) => {
    const imagePath = product.image_key ? `${product.category}/${product.image_key}` : undefined;
    const imageObj = imagePath
      ? productImages.find((img) => `${img.category}/${img.name}` === imagePath)
      : undefined;
    const imageFromSupabase = imageObj?.url as string | undefined;
    const imageFromURL = (product as any).image_url as string | undefined;
    const localImage = (product as any).image as string | undefined;

    return {
      ...product,
      image: imageFromSupabase || imageFromURL || localImage || productShowcase,
    };
  });

  const filteredProducts = products.filter((product) => {
    const matchesCategory = activeCategory === "all" || product.category === activeCategory;
    const matchesSearch =
      searchTerm === "" ||
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (product.description && product.description.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <section id="products" className="py-20 bg-gradient-to-b from-ivory to-peach-light">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="font-playfair text-4xl md:text-5xl font-bold text-cocoa mb-4">Our Sweet Collection</h2>
          <p className="text-xl text-cocoa-light max-w-2xl mx-auto font-lato">
            Discover our handcrafted cakes, each made with passion and the finest ingredients
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <Button
              key={category.id}
              variant={activeCategory === category.id ? "default" : "outline"}
              className={`font-lato font-medium px-6 py-2 rounded-full transition-all duration-300 ${
                activeCategory === category.id
                  ? "btn-primary"
                  : "border-rose-gold text-rose-gold hover:bg-rose-gold hover:text-white"
              }`}
              onClick={() => setActiveCategory(category.id)}
            >
              {category.name}
            </Button>
          ))}
        </div>

        {loadingProducts || loadingImages ? (
          <LoadingSpinner />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map((product) => (
              <Card
                key={product.id}
                className="group card-hover bg-white/80 backdrop-blur-sm border-0 rounded-2xl overflow-hidden"
              >
                <div className="relative">
                  <ImageWithFallback
                    src={product.image}
                    alt={product.name}
                    className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                    fallbackSrc={productShowcase}
                  />

                  <div className="absolute top-4 left-4 space-y-2">
                    {product.is_new && (
                      <span className="bg-rose-gold text-white px-3 py-1 rounded-full text-sm font-lato font-medium">
                        New
                      </span>
                    )}
                    {product.is_popular && (
                      <span className="bg-peach text-cocoa px-3 py-1 rounded-full text-sm font-lato font-medium">
                        Popular
                      </span>
                    )}
                  </div>

                  <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 space-y-2">
                    <Button size="icon" className="bg-white/90 hover:bg-white text-cocoa shadow-lg">
                      <Heart className="w-4 h-4" />
                    </Button>
                  </div>

                  {product.original_price && (
                    <div className="absolute bottom-4 left-4">
                      <span className="bg-red-500 text-white px-2 py-1 rounded-full text-sm font-lato font-medium">
                        Save ${(product.original_price - product.price).toFixed(2)}
                      </span>
                    </div>
                  )}
                </div>

                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-playfair text-xl font-semibold text-cocoa mb-2">{product.name}</h3>
                      <p className="text-sm text-cocoa-light font-lato mb-2">{product.description}</p>
                      <div className="flex items-center space-x-2 mb-3">
                        <div className="flex items-center space-x-1">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-4 h-4 ${
                                i < Math.floor(product.rating) ? "text-yellow-400 fill-current" : "text-gray-300"
                              }`}
                            />
                          ))}
                        </div>
                        <span className="text-sm text-cocoa-light font-lato">
                          {product.rating} ({product.reviews} reviews)
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-x-2">
                        <span className="font-playfair text-lg font-bold text-rose-gold">
                          Starting from ${product.price}
                        </span>
                        {product.original_price && (
                          <span className="text-gray-400 line-through font-lato">
                            ${product.original_price}
                          </span>
                        )}
                      </div>

                      <Button
                        className="btn-primary px-4 py-2 font-lato font-medium group"
                        onClick={() => {
                          const cartItem = {
                            id: product.id,
                            name: product.name,
                            price: product.price,
                            image: product.image,
                          };
                          onAddToCart?.(cartItem);
                          toast({
                            title: "Added to Cart! 🎂",
                            description: `${product.name} has been added to your cart.`,
                          });
                        }}
                      >
                        <ShoppingCart className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" />
                        Add to Cart
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        <div className="text-center mt-12">
          <Button
            variant="outline"
            className="border-rose-gold text-rose-gold hover:bg-rose-gold hover:text-white font-lato font-semibold px-8 py-3"
          >
            Load More Cakes
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ProductGrid;