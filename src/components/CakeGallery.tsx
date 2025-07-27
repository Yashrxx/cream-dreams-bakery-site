import { useState } from 'react';
import { ChevronLeft, ChevronRight, Eye, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import bakeryInterior from '@/assets/bakery-interior.jpg';
import cakeCollection from '@/assets/cake-collection.jpg';
import heroImage from '@/assets/hero-cake.jpg';
import productShowcase from '@/assets/product-showcase.jpg';

const CakeGallery = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const galleryImages = [
    {
      id: 1,
      src: heroImage,
      title: "Wedding Elegance",
      category: "Wedding Cakes"
    },
    {
      id: 2,
      src: cakeCollection,
      title: "Sweet Collection",
      category: "Birthday Cakes"
    },
    {
      id: 3,
      src: productShowcase,
      title: "Artistic Creations",
      category: "Custom Designs"
    },
    {
      id: 4,
      src: bakeryInterior,
      title: "Our Bakery",
      category: "Behind the Scenes"
    }
  ];

  const nextImage = () => {
    setCurrentImageIndex((prev) => 
      prev === galleryImages.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => 
      prev === 0 ? galleryImages.length - 1 : prev - 1
    );
  };

  return (
    <div className="mt-16">
      <div className="text-center mb-12">
        <h3 className="font-playfair text-3xl md:text-4xl font-bold text-cocoa mb-4">
          Our Cake Gallery
        </h3>
        <p className="text-lg text-cocoa-light max-w-xl mx-auto font-lato">
          Take a peek at some of our beautiful creations and the artistry behind each cake
        </p>
      </div>

      {/* Main Gallery Display */}
      <div className="relative max-w-4xl mx-auto mb-8">
        <Card className="bg-white/90 backdrop-blur-sm border-0 rounded-3xl overflow-hidden shadow-2xl">
          <div className="relative h-96 overflow-hidden">
            <img
              src={galleryImages[currentImageIndex].src}
              alt={galleryImages[currentImageIndex].title}
              className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
            />
            
            {/* Overlay Info */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6">
              <div className="text-white">
                <h4 className="font-playfair text-2xl font-bold mb-2">
                  {galleryImages[currentImageIndex].title}
                </h4>
                <p className="font-lato text-lg opacity-90">
                  {galleryImages[currentImageIndex].category}
                </p>
              </div>
            </div>

            {/* Navigation Arrows */}
            <Button
              variant="ghost"
              size="icon"
              onClick={prevImage}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white"
            >
              <ChevronLeft className="w-6 h-6" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={nextImage}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white"
            >
              <ChevronRight className="w-6 h-6" />
            </Button>

            {/* Action Buttons */}
            <div className="absolute top-4 right-4 flex space-x-2">
              <Button
                size="icon"
                variant="ghost"
                className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white"
              >
                <Heart className="w-5 h-5" />
              </Button>
              <Button
                size="icon"
                variant="ghost"
                className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white"
              >
                <Eye className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </Card>
      </div>

      {/* Thumbnail Gallery */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
        {galleryImages.map((image, index) => (
          <Card
            key={image.id}
            className={`cursor-pointer overflow-hidden rounded-2xl transition-all duration-300 ${
              index === currentImageIndex
                ? 'ring-4 ring-rose-gold shadow-lg scale-105'
                : 'hover:shadow-md hover:scale-102'
            }`}
            onClick={() => setCurrentImageIndex(index)}
          >
            <div className="relative h-24 overflow-hidden">
              <img
                src={image.src}
                alt={image.title}
                className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/20 hover:bg-black/10 transition-colors duration-300" />
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default CakeGallery;