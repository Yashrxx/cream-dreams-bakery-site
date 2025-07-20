import { useState, useEffect } from 'react';
import { ShoppingCart, Menu, X, Heart, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';

const FloatingNav = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Home', href: '/' },
    { name: 'Cakes', href: '/products' },
    { name: 'About', href: '/about' },
    { name: 'Reviews', href: '/#testimonials' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      isScrolled 
        ? 'bg-ivory/95 backdrop-blur-md shadow-lg' 
        : 'bg-transparent'
    }`}>
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="font-playfair text-2xl md:text-3xl font-bold gradient-text">
            Cake N Cream
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-cocoa hover:text-rose-gold transition-colors duration-300 font-lato font-medium"
              >
                {item.name}
              </a>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon" className="hover:bg-peach-light">
              <Search className="w-5 h-5" />
            </Button>
            <Button variant="ghost" size="icon" className="hover:bg-peach-light">
              <Heart className="w-5 h-5" />
            </Button>
            <Button variant="ghost" size="icon" className="hover:bg-peach-light relative">
              <ShoppingCart className="w-5 h-5" />
              <span className="absolute -top-2 -right-2 bg-rose-gold text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                3
              </span>
            </Button>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden hover:bg-peach-light"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-border">
            <div className="flex flex-col space-y-4 pt-4">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-cocoa hover:text-rose-gold transition-colors duration-300 font-lato font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default FloatingNav;