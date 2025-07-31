import { Heart, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { useImageManager } from '@/hooks/useImageManager';
import ImageWithFallback from '@/components/ImageWithFallback';
import heroChocolateCake from '@/assets/hero-chocolate-cake.jpg';
import heroChocolateCake_2 from '@/assets/hero-cake.jpg';
import heroChocolateCake_3 from '@/assets/cake-collection.jpg';
import { Link } from 'react-router-dom';

interface FeaturedCakesProps {
  onAddToCart?: (item: { id: string; name: string; price: number; image: string }) => void;
}

const FeaturedCakes = ({ onAddToCart }: FeaturedCakesProps) => {
  const { toast } = useToast();
  const { images: productImages, loading } = useImageManager('product-images', 'featured');

  // Default cake data - will use dynamic images when available
  const defaultCakes = [
    {
      id: 1,
      name: 'Belgian Berry Fudge',
      price: 34.50,
      originalPrice: 44.50,
      description: 'Decadent chocolate fudge cake topped with luscious berries and golden caramel swirls',
      image: heroChocolateCake,
      rating: 4.9,
      isPopular: true,
    },
    {
      id: 2,
      name: 'Rose Gold Vanilla Bloom',
      price: 30.75,
      description: 'Elegant vanilla cake adorned with rose gold petals and handcrafted floral accents',
      image: heroChocolateCake_2,
      rating: 4.8,
      isNew: true,
    },
    {
      id: 3,
      name: 'Strawberry Velvet Cupcake Set',
      price: 37.25,
      description: 'Moist chocolate cupcakes layered with strawberry filling and cream cheese rose frosting',
      image: heroChocolateCake_3,
      rating: 4.9,
    },
  ];

  // Merge default cakes with dynamic images when available
  const cakes = defaultCakes.map((cake, index) => {
    const dynamicImage = productImages[index];
    return {
      ...cake,
      image: dynamicImage ? dynamicImage.url : cake.image
    };
  });

  return (
    <section id="featured" className="py-20 bg-gradient-to-br from-peach-light via-ivory to-cream">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4 px-6 py-2 text-rose-gold border-rose-gold">
            Featured Selection
          </Badge>
          <h2 className="font-playfair text-4xl md:text-5xl font-bold text-cocoa mb-6">
            Our Signature Cakes
          </h2>
          <p className="text-xl text-cocoa-light max-w-3xl mx-auto font-lato leading-relaxed">
            Indulge in our carefully curated selection of premium cakes, crafted with love and the finest ingredients
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {cakes.map((cake) => (
            <Card key={cake.id} className="group card-hover bg-white/90 backdrop-blur-sm border-0 rounded-2xl overflow-hidden">
              <div className="relative overflow-hidden rounded-t-2xl">
                <ImageWithFallback
                  src={cake.image}
                  alt={cake.name}
                  className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                  fallbackSrc={heroChocolateCake}
                />

                {/* Badges */}
                <div className="absolute top-4 left-4 space-y-2">
                  {cake.isNew && (
                    <Badge className="bg-emerald-500 hover:bg-emerald-600 text-white font-lato">
                      New
                    </Badge>
                  )}
                  {cake.isPopular && (
                    <Badge className="bg-rose-gold hover:bg-rose-gold/90 text-white font-lato">
                      Popular
                    </Badge>
                  )}
                </div>

                {/* Wishlist Button */}
                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <Button size="icon" className="bg-white/90 hover:bg-white text-cocoa shadow-lg">
                    <Heart className="w-4 h-4" />
                  </Button>
                </div>

                {/* Discount Badge */}
                {cake.originalPrice && (
                  <div className="absolute bottom-4 left-4">
                    <Badge variant="destructive" className="font-lato">
                      Save ${(cake.originalPrice - cake.price).toFixed(2)}
                    </Badge>
                  </div>
                )}
              </div>

              <CardContent className="p-6">
                <div className="space-y-4">
                  <div>
                    <h3 className="font-playfair text-xl font-semibold text-cocoa mb-2">
                      {cake.name}
                    </h3>
                    <p className="text-cocoa-light font-lato leading-relaxed">
                      {cake.description}
                    </p>
                  </div>

                  {/* Rating */}
                  <div className="flex items-center space-x-2">
                    <div className="flex items-center space-x-1">
                      {[...Array(5)].map((_, i) => (
                        <span
                          key={i}
                          className={`text-lg ${i < Math.floor(cake.rating) ? 'text-yellow-400' : 'text-gray-300'
                            }`}
                        >
                          ★
                        </span>
                      ))}
                    </div>
                    <span className="text-sm text-cocoa-light font-lato">
                      {cake.rating}/5
                    </span>
                  </div>

                  {/* Price and Add to Cart */}
                  <div className="flex items-center justify-between pt-4">
                    <div className="space-x-2">
                      <span className="font-playfair text-2xl font-bold text-rose-gold">
                        ${cake.price}
                      </span>
                      {cake.originalPrice && (
                        <span className="text-gray-400 line-through font-lato">
                          ${cake.originalPrice}
                        </span>
                      )}
                    </div>

                    <Button
                      className="btn-primary px-6 py-3 font-lato font-medium group hover:shadow-lg transition-all"
                      onClick={() => {
                        const cartItem = {
                          id: cake.id.toString(),
                          name: cake.name,
                          price: cake.price,
                          image: cake.image
                        };
                        if (onAddToCart) {
                          onAddToCart(cartItem);
                        }
                        toast({
                          title: "Added to Cart! 🎂",
                          description: `${cake.name} has been added to your cart.`,
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

        {/* Call to Action */}
        <div className="text-center mt-16">
          <Link to="/products">
            <Button
              variant="outline"
              size="lg"
              className="border-rose-gold text-rose-gold hover:bg-rose-gold hover:text-white font-lato font-semibold px-8 py-3 rounded-full"
            >
              View All Cakes
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedCakes;