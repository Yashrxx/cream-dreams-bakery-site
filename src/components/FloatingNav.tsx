import { useState, useEffect } from 'react';
import { ShoppingCart, Menu, X, Heart, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import CartSidebar from './CartSidebar';
import WishlistSidebar from './WishlistSidebar';
import { useToast } from '@/hooks/use-toast';

const FloatingNav = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const { toast } = useToast();

  // Sample data - replace with actual state management
  const [cartItems, setCartItems] = useState([
    {
      id: '1',
      name: 'Chocolate Cake',
      price: 25.99,
      quantity: 2,
      image: '/src/assets/hero-chocolate-cake.jpg'
    },
    {
      id: '2',
      name: 'Vanilla Cupcake',
      price: 4.99,
      quantity: 1,
      image: '/src/assets/cake-collection.jpg'
    }
  ]);

  const [wishlistItems, setWishlistItems] = useState([
    {
      id: '3',
      name: 'Red Velvet Cake',
      price: 29.99,
      image: '/src/assets/hero-cake.jpg',
      rating: 5
    }
  ]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleWishlistClick = () => {
    setIsWishlistOpen(true);
  };

  const handleCartClick = () => {
    setIsCartOpen(true);
  };

  const handleUpdateCartQuantity = (id: string, quantity: number) => {
    if (quantity === 0) {
      setCartItems(cartItems.filter(item => item.id !== id));
    } else {
      setCartItems(cartItems.map(item =>
        item.id === id ? { ...item, quantity } : item
      ));
    }
  };

  const handleRemoveFromCart = (id: string) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };

  const handleRemoveFromWishlist = (id: string) => {
    setWishlistItems(wishlistItems.filter(item => item.id !== id));
  };

  const handleAddToCart = (wishlistItem: any) => {
    const existingItem = cartItems.find(item => item.id === wishlistItem.id);
    if (existingItem) {
      handleUpdateCartQuantity(wishlistItem.id, existingItem.quantity + 1);
    } else {
      setCartItems([...cartItems, {
        ...wishlistItem,
        quantity: 1
      }]);
    }
  };

  const navItems = [
    { name: 'Home', to: '/' },
    { name: 'Cakes', to: '/products' },
    { name: 'About', to: '/about' },
    { name: 'Contact', to: '/contact' },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled || isMenuOpen
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
              <Link
                key={item.name}
                to={item.to}
                className="text-cocoa hover:text-rose-gold transition-colors duration-300 font-lato font-medium"
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon" className="hover:bg-peach-light">
              <Search className="w-5 h-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="hover:bg-peach-light relative"
              onClick={handleWishlistClick}
            >
              <Heart className="w-5 h-5" />
              {wishlistItems.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-rose-gold text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {wishlistItems.length}
                </span>
              )}
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="hover:bg-peach-light relative"
              onClick={handleCartClick}
            >
              <ShoppingCart className="w-5 h-5" />
              {cartItems.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-rose-gold text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cartItems.length}
                </span>
              )}
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
                <Link
                  key={item.name}
                  to={item.to}
                  className="text-cocoa hover:text-rose-gold transition-colors duration-300 font-lato font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>

      <CartSidebar
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateCartQuantity}
        onRemoveItem={handleRemoveFromCart}
      />

      <WishlistSidebar
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
        items={wishlistItems}
        onRemoveItem={handleRemoveFromWishlist}
        onAddToCart={handleAddToCart}
      />
    </nav>
  );
};

export default FloatingNav;