import { useState, useEffect } from 'react';
import { ShoppingCart, Menu, X, Heart, Search, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import CartSidebar from './CartSidebar';
import WishlistSidebar from './WishlistSidebar';
import { useToast } from '@/hooks/use-toast';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

interface FloatingNavProps {
  cartItems?: CartItem[];
  onUpdateCartQuantity?: (id: string, quantity: number) => void;
  onRemoveFromCart?: (id: string) => void;
}

const FloatingNav = ({ 
  cartItems: externalCartItems, 
  onUpdateCartQuantity: externalOnUpdateCartQuantity, 
  onRemoveFromCart: externalOnRemoveFromCart 
}: FloatingNavProps) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const { toast } = useToast();

  // Sample data - replace with actual state management
  const [internalCartItems, setInternalCartItems] = useState<CartItem[]>([
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

  const cartItems = externalCartItems || internalCartItems;

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
    if (externalOnUpdateCartQuantity) {
      externalOnUpdateCartQuantity(id, quantity);
    } else {
      if (quantity === 0) {
        setInternalCartItems(cartItems.filter(item => item.id !== id));
      } else {
        setInternalCartItems(cartItems.map(item =>
          item.id === id ? { ...item, quantity } : item
        ));
      }
    }
  };

  const handleRemoveFromCart = (id: string) => {
    if (externalOnRemoveFromCart) {
      externalOnRemoveFromCart(id);
    } else {
      setInternalCartItems(cartItems.filter(item => item.id !== id));
    }
  };

  const handleRemoveFromWishlist = (id: string) => {
    setWishlistItems(wishlistItems.filter(item => item.id !== id));
  };

  const handleAddToCart = (wishlistItem: any) => {
    const existingItem = cartItems.find(item => item.id === wishlistItem.id);
    if (existingItem) {
      handleUpdateCartQuantity(wishlistItem.id, existingItem.quantity + 1);
    } else {
      if (externalCartItems) {
        // If external cart is provided, we can't directly modify it
        toast({
          title: "Added to Cart",
          description: `${wishlistItem.name} has been added to your cart.`,
        });
      } else {
        setInternalCartItems([...cartItems, {
          ...wishlistItem,
          quantity: 1
        }]);
      }
    }
  };

  const navItems = [
    { name: 'Home', to: '/' },
    { name: 'About', to: '/about' },
    { name: 'Contact', to: '/contact' },
  ];

  const menuCategories = {
    cakes: {
      title: 'Cakes',
      items: [
        { name: 'Flavours / Sizing / Pricing', description: 'Starting from $25 - Full quote available on request', to: '/products?category=flavours' },
        { name: 'Custom Cakes', description: 'Bespoke designs starting from $50', to: '/products?category=custom' },
        { name: 'Tea Cakes', description: 'Perfect for afternoon tea starting from $15', to: '/products?category=tea-cakes' },
        { name: 'Wedding Cakes', description: 'Elegant celebration cakes starting from $200', to: '/products?category=wedding' },
      ]
    },
    weddings: {
      title: 'Weddings',
      items: [
        { name: 'Two-Tier Cakes', description: 'Sizes: 6"& 4", 7"& 5", 8"& 6" - Starting from $150', to: '/products?category=two-tier' },
        { name: 'Three-Tier Cakes', description: 'Sizes: 8",6",4" and 9",7",5" - Starting from $250', to: '/products?category=three-tier' },
        { name: 'Wedding Favors', description: 'Personalized treats starting from $3 each', to: '/products?category=wedding-favors' },
      ]
    },
    cupcakes: {
      title: 'Cupcakes',
      items: [
        { name: 'Pack of 6, 8, or 12', description: 'Minimum order of 6 - Starting from $24', to: '/products?category=cupcake-packs' },
        { name: 'Mini Cupcakes', description: 'Minimum order of 12 - Starting from $30', to: '/products?category=mini-cupcakes' },
      ]
    },
    desserts: {
      title: 'Desserts / Sweet Treats',
      items: [
        { name: 'Brownies', description: 'Rich chocolate brownies starting from $3 each', to: '/products?category=brownies' },
        { name: 'Macarons', description: 'French macarons starting from $2.50 each', to: '/products?category=macarons' },
        { name: 'Eclairs', description: 'Cream-filled eclairs starting from $4 each', to: '/products?category=eclairs' },
        { name: 'Cake Jars', description: 'Individual layered desserts starting from $8', to: '/products?category=cake-jars' },
      ]
    }
  };

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
            <NavigationMenu>
              <NavigationMenuList className="flex items-center space-x-6">
                {navItems.map((item) => (
                  <NavigationMenuItem key={item.name}>
                    <Link
                      to={item.to}
                      className="text-cocoa hover:text-rose-gold transition-colors duration-300 font-lato font-medium"
                    >
                      {item.name}
                    </Link>
                  </NavigationMenuItem>
                ))}
                
                {/* Dropdown Menu Items */}
                {Object.entries(menuCategories).map(([key, category]) => (
                  <NavigationMenuItem key={key}>
                    <NavigationMenuTrigger className="text-cocoa hover:text-rose-gold transition-colors duration-300 font-lato font-medium bg-transparent">
                      {category.title}
                    </NavigationMenuTrigger>
                    <NavigationMenuContent className="bg-background/95 backdrop-blur-md border border-border shadow-lg">
                      <div className="w-96 p-6">
                        <h3 className="font-playfair font-semibold text-lg text-cocoa mb-4">{category.title}</h3>
                        <div className="space-y-3">
                          {category.items.map((item) => (
                            <NavigationMenuLink key={item.name} asChild>
                              <Link
                                to={item.to}
                                className="block p-3 rounded-lg hover:bg-peach-light/50 transition-colors duration-200 group"
                              >
                                <div className="font-lato font-medium text-cocoa group-hover:text-rose-gold mb-1">
                                  {item.name}
                                </div>
                                <div className="text-sm text-muted-foreground">
                                  {item.description}
                                </div>
                              </Link>
                            </NavigationMenuLink>
                          ))}
                        </div>
                        <div className="mt-4 pt-4 border-t border-border">
                          <p className="text-xs text-muted-foreground">
                            📞 Full quotes available via call, text, or email
                          </p>
                        </div>
                      </div>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList>
            </NavigationMenu>
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
              
              {/* Mobile Category Menus */}
              {Object.entries(menuCategories).map(([key, category]) => (
                <div key={key} className="space-y-2">
                  <div className="font-lato font-semibold text-cocoa text-lg">
                    {category.title}
                  </div>
                  {category.items.map((item) => (
                    <Link
                      key={item.name}
                      to={item.to}
                      className="block pl-4 py-2 text-sm text-muted-foreground hover:text-rose-gold transition-colors duration-300"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <div className="font-medium">{item.name}</div>
                      <div className="text-xs">{item.description}</div>
                    </Link>
                  ))}
                </div>
              ))}
              
              <div className="pt-4 border-t border-border">
                <p className="text-xs text-muted-foreground">
                  📞 Full quotes available via call, text, or email
                </p>
              </div>
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