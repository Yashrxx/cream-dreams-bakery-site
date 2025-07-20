import { useState, useEffect } from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import heroImage from '@/assets/hero-chocolate-cake.jpg';

const Hero = () => {
  const [confettiPieces, setConfettiPieces] = useState<number[]>([]);

  useEffect(() => {
    // Generate confetti pieces
    const pieces = Array.from({ length: 20 }, (_, i) => i);
    setConfettiPieces(pieces);
  }, []);

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-peach-light via-ivory to-rose-gold-light opacity-30" />
      
      {/* Floating Confetti */}
      <div className="absolute inset-0 pointer-events-none">
        {confettiPieces.map((piece) => (
          <div
            key={piece}
            className="confetti"
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${3 + Math.random() * 2}s`,
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-6 py-20 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="text-center lg:text-left space-y-8">
            <div className="space-y-4">
              <h1 className="font-playfair text-5xl md:text-6xl lg:text-7xl font-bold text-cocoa leading-tight">
                Sweet Dreams
                <span className="block gradient-text">Come True</span>
              </h1>
              <p className="text-lg md:text-xl text-cocoa-light max-w-2xl font-lato">
                Indulge in our handcrafted luxury cakes and desserts. Each creation is a masterpiece, 
                made with love and the finest ingredients for your special moments.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <a href="/products">
                <Button className="btn-primary font-lato font-semibold px-8 py-6 text-lg group">
                  Explore Our Cakes
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </a>
              <a href="/contact">
                <Button variant="outline" className="border-rose-gold text-rose-gold hover:bg-rose-gold hover:text-white font-lato font-semibold px-8 py-6 text-lg">
                  Custom Orders
                </Button>
              </a>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 pt-8">
              <div className="text-center">
                <div className="font-playfair text-3xl md:text-4xl font-bold text-rose-gold">500+</div>
                <div className="text-cocoa-light font-lato">Happy Customers</div>
              </div>
              <div className="text-center">
                <div className="font-playfair text-3xl md:text-4xl font-bold text-rose-gold">100+</div>
                <div className="text-cocoa-light font-lato">Cake Designs</div>
              </div>
              <div className="text-center">
                <div className="font-playfair text-3xl md:text-4xl font-bold text-rose-gold">5⭐</div>
                <div className="text-cocoa-light font-lato">Rating</div>
              </div>
            </div>
          </div>

          {/* Hero Image */}
          <div className="relative">
            <div className="relative float group">
              <img
                src={heroImage}
                alt="Luxury Wedding Cake"
                className="w-full h-auto rounded-3xl shadow-2xl hover-scale"
              />
              
              {/* Floating Elements */}
              <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full p-3 shadow-lg float">
                <Sparkles className="w-6 h-6 text-rose-gold" />
              </div>
              
              <div className="absolute bottom-8 left-8 bg-white/90 backdrop-blur-sm rounded-2xl p-4 shadow-lg">
                <div className="font-playfair text-lg font-semibold text-cocoa">Fresh Daily</div>
                <div className="text-cocoa-light font-lato text-sm">Premium Ingredients</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
        <div className="w-6 h-10 border-2 border-rose-gold rounded-full flex justify-center">
          <div className="w-1 h-3 bg-rose-gold rounded-full mt-2 animate-bounce"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;