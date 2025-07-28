import { Star, Heart, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import cakeCollection from '@/assets/cake-collection.jpg';
import heroImage from '@/assets/hero-cake.jpg';
import productShowcase from '@/assets/product-showcase.jpg';

interface FeaturedCakesProps {
  onAddToCart?: (item: { id: string; name: string; price: number; image: string }) => void;
}

const FeaturedCakes = ({ onAddToCart }: FeaturedCakesProps) => {
  const { toast } = useToast();
  const featuredCakes = [
    {
      id: 1,
      name: "Royal Wedding Cake",
      image: heroImage,
      price: 299,
      originalPrice: 349,
      rating: 5,
      reviews: 128,
      badge: "Best Seller",
      description: "Elegant 3-tier wedding cake with rose gold details"
    },
    {
      id: 2,
      name: "Chocolate Dream Deluxe",
      image: cakeCollection,
      price: 89,
      rating: 4.9,
      reviews: 85,
      badge: "Popular",
      description: "Rich chocolate layers with premium cocoa"
    },
    {
      id: 3,
      name: "Birthday Special Collection",
      image: productShowcase,
      price: 65,
      rating: 4.8,
      reviews: 156,
      badge: "New",
      description: "Colorful and fun designs for all ages"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-ivory to-peach-light">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="font-playfair text-4xl md:text-5xl font-bold text-cocoa mb-4">
            Featured Creations
          </h2>
          <p className="text-xl text-cocoa-light max-w-2xl mx-auto font-lato">
            Discover our most loved cakes, crafted with passion and premium ingredients
          </p>
        </div>

        {/* Featured Cakes Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {featuredCakes.map((cake) => (
            <Card key={cake.id} className="group bg-white/90 backdrop-blur-sm border-0 rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
              <div className="relative overflow-hidden">
                <img
                  src={cake.image}
                  alt={cake.name}
                  className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                
                {/* Badge */}
                <Badge className={`absolute top-4 left-4 ${
                  cake.badge === 'Best Seller' ? 'bg-rose-gold text-white' :
                  cake.badge === 'Popular' ? 'bg-orange-500 text-white' :
                  'bg-green-500 text-white'
                }`}>
                  {cake.badge}
                </Badge>

                {/* Discount Badge */}
                {cake.originalPrice && (
                  <Badge className="absolute top-4 right-4 bg-red-500 text-white">
                    -${cake.originalPrice - cake.price}
                  </Badge>
                )}

                {/* Wishlist Button */}
                <Button
                  size="icon"
                  variant="ghost"
                  className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white opacity-0 group-hover:opacity-100 transition-all duration-300"
                >
                  <Heart className="w-5 h-5 text-rose-gold" />
                </Button>
              </div>

              <CardContent className="p-6">
                <div className="space-y-4">
                  {/* Rating */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < Math.floor(cake.rating)
                              ? 'text-yellow-400 fill-current'
                              : 'text-gray-300'
                          }`}
                        />
                      ))}
                      <span className="text-sm text-cocoa-light ml-2">
                        {cake.rating} ({cake.reviews})
                      </span>
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="font-playfair text-xl font-semibold text-cocoa">
                    {cake.name}
                  </h3>

                  {/* Description */}
                  <p className="text-cocoa-light font-lato text-sm">
                    {cake.description}
                  </p>

                  {/* Price and Actions */}
                  <div className="flex items-center justify-between pt-4">
                    <div className="flex items-center space-x-2">
                      <span className="font-playfair text-2xl font-bold text-rose-gold">
                        ${cake.price}
                      </span>
                      {cake.originalPrice && (
                        <span className="text-lg text-gray-400 line-through">
                          ${cake.originalPrice}
                        </span>
                      )}
                    </div>
                    
                    <Button 
                      className="btn-primary"
                      onClick={() => {
                        const cartItem = {
                          id: cake.id.toString(),
                          name: cake.name,
                          price: cake.price,
                          image: cake.image
                        };
                        if (onAddToCart) {
                          onAddToCart(cartItem);
                        } else {
                          toast({
                            title: "Added to Cart",
                            description: `${cake.name} has been added to your cart.`,
                          });
                        }
                      }}
                    >
                      <ShoppingCart className="w-4 h-4 mr-2" />
                      Add to Cart
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <a href="/products">
            <Button className="btn-secondary font-lato font-semibold px-8 py-4 text-lg">
              View All Cakes
            </Button>
          </a>
        </div>
      </div>
    </section>
  );
};

export default FeaturedCakes;