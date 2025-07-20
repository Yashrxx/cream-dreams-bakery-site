import { useState } from 'react';
import { Heart, ShoppingCart, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import cakeCollection from '@/assets/cake-collection.jpg';

const ProductGrid = () => {
  const [activeCategory, setActiveCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'All Cakes' },
    { id: 'birthday', name: 'Birthday' },
    { id: 'wedding', name: 'Wedding' },
    { id: 'cupcakes', name: 'Cupcakes' },
    { id: 'custom', name: 'Custom' },
  ];

  const products = [
    {
      id: 1,
      name: 'Rose Gold Dream',
      category: 'wedding',
      price: 89.99,
      originalPrice: 109.99,
      rating: 5,
      reviews: 24,
      image: cakeCollection,
      isNew: true,
    },
    {
      id: 2,
      name: 'Chocolate Fantasy',
      category: 'birthday',
      price: 45.99,
      rating: 4.8,
      reviews: 18,
      image: cakeCollection,
      isPopular: true,
    },
    {
      id: 3,
      name: 'Vanilla Cupcake Set',
      category: 'cupcakes',
      price: 24.99,
      rating: 4.9,
      reviews: 32,
      image: cakeCollection,
    },
    {
      id: 4,
      name: 'Custom Anniversary',
      category: 'custom',
      price: 125.99,
      rating: 5,
      reviews: 12,
      image: cakeCollection,
    },
    {
      id: 5,
      name: 'Strawberry Delight',
      category: 'birthday',
      price: 38.99,
      rating: 4.7,
      reviews: 28,
      image: cakeCollection,
    },
    {
      id: 6,
      name: 'Elegant Tiered',
      category: 'wedding',
      price: 199.99,
      rating: 5,
      reviews: 8,
      image: cakeCollection,
      isNew: true,
    },
  ];

  const filteredProducts = activeCategory === 'all' 
    ? products 
    : products.filter(product => product.category === activeCategory);

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
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
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
                    <h3 className="font-playfair text-xl font-semibold text-cocoa mb-2">
                      {product.name}
                    </h3>
                    
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
                      <span className="font-playfair text-2xl font-bold text-rose-gold">
                        ${product.price}
                      </span>
                      {product.originalPrice && (
                        <span className="text-gray-400 line-through font-lato">
                          ${product.originalPrice}
                        </span>
                      )}
                    </div>

                    <Button className="btn-primary px-4 py-2 font-lato font-medium group">
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