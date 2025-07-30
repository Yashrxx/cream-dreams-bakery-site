import { useState, useEffect } from 'react';
import { Heart, ShoppingCart, Star, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { useImageManager } from '@/hooks/useImageManager';
import ImageWithFallback from '@/components/ImageWithFallback';
import productShowcase from '@/assets/product-showcase.jpg';
import { useSearchParams } from 'react-router-dom';

interface ProductGridProps {
  onAddToCart?: (item: { id: string; name: string; price: number; image: string }) => void;
}

const ProductGrid = ({ onAddToCart }: ProductGridProps) => {
  const { toast } = useToast();
  const [searchParams] = useSearchParams();
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const { images: productImages, loading } = useImageManager('product-images', 'products');

  // Set category from URL params on component mount
  useEffect(() => {
    const categoryParam = searchParams.get('category');
    if (categoryParam) {
      setActiveCategory(categoryParam);
    }
  }, [searchParams]);

  const categories = [
    { id: 'all', name: 'All Products' },
    { id: 'flavours', name: 'Flavours / Sizing' },
    { id: 'custom-cakes', name: 'Custom Cakes' },
    { id: 'tea-cakes', name: 'Tea Cakes' },
    { id: 'wedding-cakes', name: 'Wedding Cakes' },
    { id: 'two-tier', name: 'Two-Tier Cakes' },
    { id: 'three-tier', name: 'Three-Tier Cakes' },
    { id: 'wedding-favors', name: 'Wedding Favors' },
    { id: 'cupcake-packs', name: 'Cupcake Packs' },
    { id: 'mini-cupcakes', name: 'Mini Cupcakes' },
    { id: 'brownies', name: 'Brownies' },
    { id: 'macarons', name: 'Macarons' },
    { id: 'eclairs', name: 'Eclairs' },
    { id: 'cake-jars', name: 'Cake Jars' },
  ];

  const defaultProducts = [
    // Flavours / Sizing
    {
      id: 1,
      name: 'Classic Vanilla Layer Cake',
      category: 'flavours',
      price: 25.99,
      rating: 4.8,
      reviews: 34,
      image: productShowcase,
      description: 'Available in 6", 8", 10" sizes',
    },
    {
      id: 2,
      name: 'Rich Chocolate Fudge',
      category: 'flavours',
      price: 28.99,
      rating: 4.9,
      reviews: 42,
      image: productShowcase,
      description: 'Decadent chocolate layers',
    },
    
    // Custom Cakes
    {
      id: 3,
      name: 'Bespoke Anniversary Design',
      category: 'custom-cakes',
      price: 75.99,
      rating: 5,
      reviews: 18,
      image: productShowcase,
      isNew: true,
      description: 'Fully customizable design',
    },
    {
      id: 4,
      name: 'Themed Birthday Creation',
      category: 'custom-cakes',
      price: 85.99,
      rating: 4.9,
      reviews: 25,
      image: productShowcase,
      description: 'Any theme, any design',
    },

    // Tea Cakes
    {
      id: 5,
      name: 'Earl Grey Sponge',
      category: 'tea-cakes',
      price: 18.99,
      rating: 4.7,
      reviews: 28,
      image: productShowcase,
      description: 'Perfect for afternoon tea',
    },
    {
      id: 6,
      name: 'Lemon Drizzle Delight',
      category: 'tea-cakes',
      price: 16.99,
      rating: 4.8,
      reviews: 31,
      image: productShowcase,
      description: 'Light and citrusy',
    },

    // Wedding Cakes
    {
      id: 7,
      name: 'Elegant White Rose',
      category: 'wedding-cakes',
      price: 220.99,
      rating: 5,
      reviews: 12,
      image: productShowcase,
      isPopular: true,
      description: 'Classic white with sugar roses',
    },
    {
      id: 8,
      name: 'Rustic Buttercream Beauty',
      category: 'wedding-cakes',
      price: 245.99,
      rating: 5,
      reviews: 8,
      image: productShowcase,
      description: 'Semi-naked style with fresh flowers',
    },

    // Two-Tier Cakes
    {
      id: 9,
      name: 'Two-Tier Celebration (6" & 4")',
      category: 'two-tier',
      price: 155.99,
      rating: 4.9,
      reviews: 15,
      image: productShowcase,
      description: 'Perfect for intimate celebrations',
    },
    {
      id: 10,
      name: 'Two-Tier Elegance (8" & 6")',
      category: 'two-tier',
      price: 185.99,
      rating: 5,
      reviews: 11,
      image: productShowcase,
      description: 'Sophisticated design for special occasions',
    },

    // Three-Tier Cakes
    {
      id: 11,
      name: 'Three-Tier Grandeur (8", 6", 4")',
      category: 'three-tier',
      price: 285.99,
      rating: 5,
      reviews: 7,
      image: productShowcase,
      isNew: true,
      description: 'Stunning centerpiece cake',
    },
    {
      id: 12,
      name: 'Three-Tier Majesty (9", 7", 5")',
      category: 'three-tier',
      price: 325.99,
      rating: 5,
      reviews: 5,
      image: productShowcase,
      description: 'Grand celebration cake',
    },

    // Wedding Favors
    {
      id: 13,
      name: 'Mini Wedding Cookies (Set of 12)',
      category: 'wedding-favors',
      price: 36.99,
      rating: 4.8,
      reviews: 22,
      image: productShowcase,
      description: 'Personalized wedding favors',
    },
    {
      id: 14,
      name: 'Chocolate Truffle Boxes',
      category: 'wedding-favors',
      price: 4.99,
      rating: 4.9,
      reviews: 18,
      image: productShowcase,
      description: 'Elegant gift boxes, minimum 20',
    },

    // Cupcake Packs
    {
      id: 15,
      name: 'Classic Cupcake Pack (12)',
      category: 'cupcake-packs',
      price: 36.99,
      rating: 4.8,
      reviews: 45,
      image: productShowcase,
      isPopular: true,
      description: 'Mix of vanilla and chocolate',
    },
    {
      id: 16,
      name: 'Gourmet Cupcake Pack (6)',
      category: 'cupcake-packs',
      price: 24.99,
      rating: 4.9,
      reviews: 32,
      image: productShowcase,
      description: 'Premium flavors and decorations',
    },

    // Mini Cupcakes
    {
      id: 17,
      name: 'Mini Cupcake Assortment (24)',
      category: 'mini-cupcakes',
      price: 42.99,
      rating: 4.7,
      reviews: 28,
      image: productShowcase,
      description: 'Perfect for parties',
    },
    {
      id: 18,
      name: 'Mini Wedding Cupcakes (36)',
      category: 'mini-cupcakes',
      price: 58.99,
      rating: 4.8,
      reviews: 19,
      image: productShowcase,
      description: 'Elegant mini treats',
    },

    // Brownies
    {
      id: 19,
      name: 'Triple Chocolate Brownies',
      category: 'brownies',
      price: 3.99,
      rating: 4.9,
      reviews: 56,
      image: productShowcase,
      description: 'Rich and fudgy',
    },
    {
      id: 20,
      name: 'Salted Caramel Brownies',
      category: 'brownies',
      price: 4.49,
      rating: 4.8,
      reviews: 41,
      image: productShowcase,
      description: 'Gooey caramel center',
    },

    // Macarons
    {
      id: 21,
      name: 'French Macaron Box (12)',
      category: 'macarons',
      price: 32.99,
      rating: 4.9,
      reviews: 38,
      image: productShowcase,
      description: 'Assorted flavors',
    },
    {
      id: 22,
      name: 'Seasonal Macaron Selection',
      category: 'macarons',
      price: 2.99,
      rating: 4.8,
      reviews: 29,
      image: productShowcase,
      description: 'Individual macarons',
    },

    // Eclairs
    {
      id: 23,
      name: 'Classic Vanilla Eclair',
      category: 'eclairs',
      price: 4.99,
      rating: 4.7,
      reviews: 24,
      image: productShowcase,
      description: 'Light choux pastry with vanilla cream',
    },
    {
      id: 24,
      name: 'Chocolate Eclair Delight',
      category: 'eclairs',
      price: 5.49,
      rating: 4.8,
      reviews: 21,
      image: productShowcase,
      description: 'Rich chocolate cream filling',
    },

    // Cake Jars
    {
      id: 25,
      name: 'Layered Cake Jar Trio',
      category: 'cake-jars',
      price: 24.99,
      rating: 4.8,
      reviews: 15,
      image: productShowcase,
      description: 'Three individual dessert jars',
    },
    {
      id: 26,
      name: 'Red Velvet Cake Jar',
      category: 'cake-jars',
      price: 8.99,
      rating: 4.9,
      reviews: 19,
      image: productShowcase,
      description: 'Individual portion perfect for gifting',
    },
  ];

  // Merge default products with dynamic images when available
  const products = defaultProducts.map((product, index) => {
    const dynamicImage = productImages[index];
    return {
      ...product,
      image: dynamicImage ? dynamicImage.url : product.image
    };
  });

  const filteredProducts = products.filter(product => {
    const matchesCategory = activeCategory === 'all' || product.category === activeCategory;
    const matchesSearch = searchTerm === '' || 
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (product.description && product.description.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <section id="products" className="py-20 bg-gradient-to-b from-ivory to-peach-light">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="font-playfair text-4xl md:text-5xl font-bold text-cocoa mb-4">
            Our Sweet Collection
          </h2>
          <p className="text-xl text-cocoa-light max-w-2xl mx-auto font-lato">
            Discover our handcrafted cakes, each made with passion and the finest ingredients
          </p>
        </div>

        {/* Search Bar */}
        <div className="max-w-md mx-auto mb-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              type="text"
              placeholder="Search by cake type, flavor, or category..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 w-full rounded-full border-rose-gold/30 focus:border-rose-gold bg-white/80 backdrop-blur-sm"
            />
          </div>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <Button
              key={category.id}
              variant={activeCategory === category.id ? "default" : "outline"}
              className={`font-lato font-medium px-6 py-2 rounded-full transition-all duration-300 ${
                activeCategory === category.id
                  ? 'btn-primary'
                  : 'border-rose-gold text-rose-gold hover:bg-rose-gold hover:text-white'
              }`}
              onClick={() => setActiveCategory(category.id)}
            >
              {category.name}
            </Button>
          ))}
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((product) => (
            <Card key={product.id} className="group card-hover bg-white/80 backdrop-blur-sm border-0 rounded-2xl overflow-hidden">
              <div className="relative">
                <ImageWithFallback
                  src={product.image}
                  alt={product.name}
                  className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                  fallbackSrc={productShowcase}
                />
                
                {/* Badges */}
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

                {/* Actions */}
                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 space-y-2">
                  <Button size="icon" className="bg-white/90 hover:bg-white text-cocoa shadow-lg">
                    <Heart className="w-4 h-4" />
                  </Button>
                </div>

                {/* Discount Badge */}
                {(product as any).originalPrice && (
                  <div className="absolute bottom-4 left-4">
                    <span className="bg-red-500 text-white px-2 py-1 rounded-full text-sm font-lato font-medium">
                      Save ${((product as any).originalPrice - product.price).toFixed(2)}
                    </span>
                  </div>
                )}
              </div>

              <CardContent className="p-6">
                <div className="space-y-4">
                  <div>
                    <h3 className="font-playfair text-xl font-semibold text-cocoa mb-2">
                      {product.name}
                    </h3>
                    
                    {/* Description */}
                    {product.description && (
                      <p className="text-sm text-cocoa-light font-lato mb-2">
                        {product.description}
                      </p>
                    )}
                    
                    {/* Rating */}
                    <div className="flex items-center space-x-2 mb-3">
                      <div className="flex items-center space-x-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${
                              i < Math.floor(product.rating)
                                ? 'text-yellow-400 fill-current'
                                : 'text-gray-300'
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-sm text-cocoa-light font-lato">
                        {product.rating} ({product.reviews} reviews)
                      </span>
                    </div>
                  </div>

                  {/* Price */}
                  <div className="flex items-center justify-between">
                    <div className="space-x-2">
                      <span className="font-playfair text-lg font-bold text-rose-gold">
                        Starting from ${product.price}
                      </span>
                      {(product as any).originalPrice && (
                        <span className="text-gray-400 line-through font-lato">
                          ${(product as any).originalPrice}
                        </span>
                      )}
                    </div>

                    <Button 
                      className="btn-primary px-4 py-2 font-lato font-medium group"
                      onClick={() => {
                        const cartItem = {
                          id: product.id.toString(),
                          name: product.name,
                          price: product.price,
                          image: product.image
                        };
                        if (onAddToCart) {
                          onAddToCart(cartItem);
                        }
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

        {/* Load More */}
        <div className="text-center mt-12">
          <Button variant="outline" className="border-rose-gold text-rose-gold hover:bg-rose-gold hover:text-white font-lato font-semibold px-8 py-3">
            Load More Cakes
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ProductGrid;