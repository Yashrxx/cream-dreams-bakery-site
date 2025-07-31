import { useEffect, useState } from "react";
import { Search, ShoppingCart, Heart, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { useImageManager } from "@/hooks/useImageManager";
import ImageWithFallback from "@/components/ImageWithFallback";
import productShowcase from "@/assets/product-fallback.jpg";

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

  // ✅ Proper usage of hooks (NO loops)
  const birthday = useImageManager("product-images", "birthday");
  const wedding = useImageManager("product-images", "wedding");
  const custom = useImageManager("product-images", "custom");
  const cupcakes = useImageManager("product-images", "cupcakes");
  const desserts = useImageManager("product-images", "desserts");

  const productImages = [
    ...birthday.images,
    ...wedding.images,
    ...custom.images,
    ...cupcakes.images,
    ...desserts.images,
  ];

  const loadingImages =
    birthday.loading || wedding.loading || custom.loading || cupcakes.loading || desserts.loading;

  const categories = [
    { id: "all", name: "All" },
    { id: "birthday", name: "Birthday Cakes" },
    { id: "wedding", name: "Wedding Cakes" },
    { id: "custom", name: "Custom Cakes" },
    { id: "cupcakes", name: "Cupcakes" },
    { id: "desserts", name: "Desserts / Treats" },
  ];

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoadingProducts(true);
        const res = await fetch("https://cream-dreams-bakery-site.onrender.com/api/products");
        const data = await res.json();
        setDefaultProducts(data);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      } finally {
        setLoadingProducts(false);
      }
    };

    fetchProducts();
  }, []);

  const products = defaultProducts.map((product) => {
    const imagePath = `${product.category}/${product.imageKey}`;
    const imageObj = productImages.find(
      (img) => `${img.category}/${img.name}` === imagePath
    );
    const imageFromSupabase = imageObj?.url;
    const imageFromURL = product.imageURL;

    return {
      ...product,
      image: imageFromSupabase || imageFromURL || productShowcase,
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
                key={product._id}
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
                    {product.isNew && (
                      <span className="bg-rose-gold text-white px-3 py-1 rounded-full text-sm font-lato font-medium">
                        New
                      </span>
                    )}
                    {product.isPopular && (
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

                  {product.originalPrice && (
                    <div className="absolute bottom-4 left-4">
                      <span className="bg-red-500 text-white px-2 py-1 rounded-full text-sm font-lato font-medium">
                        Save ${(product.originalPrice - product.price).toFixed(2)}
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
                        {product.originalPrice && (
                          <span className="text-gray-400 line-through font-lato">
                            ${product.originalPrice}
                          </span>
                        )}
                      </div>

                      <Button
                        className="btn-primary px-4 py-2 font-lato font-medium group"
                        onClick={() => {
                          const cartItem = {
                            id: product._id,
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