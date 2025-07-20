import { Facebook, Instagram, Twitter, Mail, Phone, MapPin, Heart } from 'lucide-react';

const Footer = () => {
  const socialLinks = [
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: Instagram, href: '#', label: 'Instagram' },
    { icon: Twitter, href: '#', label: 'Twitter' },
  ];

  const quickLinks = [
    { name: 'Home', href: '#home' },
    { name: 'Our Cakes', href: '#products' },
    { name: 'About Us', href: '#about' },
    { name: 'Contact', href: '#contact' },
  ];

  const cakeCategories = [
    { name: 'Birthday Cakes', href: '#products' },
    { name: 'Wedding Cakes', href: '#products' },
    { name: 'Cupcakes', href: '#products' },
    { name: 'Custom Orders', href: '#contact' },
  ];

  return (
    <footer className="bg-cocoa text-white">
      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="space-y-6">
            <div className="font-playfair text-3xl font-bold gradient-text">
              Cake N Cream
            </div>
            <p className="text-gray-300 font-lato leading-relaxed">
              Crafting sweet memories since 2020. We believe every celebration deserves a perfect cake made with love and the finest ingredients.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-rose-gold transition-colors duration-300"
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-playfair text-xl font-semibold mb-6">Quick Links</h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-gray-300 hover:text-rose-gold transition-colors duration-300 font-lato"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Our Specialties */}
          <div>
            <h3 className="font-playfair text-xl font-semibold mb-6">Our Specialties</h3>
            <ul className="space-y-3">
              {cakeCategories.map((category) => (
                <li key={category.name}>
                  <a
                    href={category.href}
                    className="text-gray-300 hover:text-rose-gold transition-colors duration-300 font-lato"
                  >
                    {category.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-playfair text-xl font-semibold mb-6">Get in Touch</h3>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <Phone className="w-5 h-5 text-rose-gold mt-1 flex-shrink-0" />
                <div className="font-lato">
                  <div className="text-gray-300">+1 (555) 123-CAKE</div>
                  <div className="text-sm text-gray-400">Mon-Sat 9AM-7PM</div>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <Mail className="w-5 h-5 text-rose-gold mt-1 flex-shrink-0" />
                <div className="font-lato">
                  <div className="text-gray-300">hello@cakencream.com</div>
                  <div className="text-sm text-gray-400">24hr response time</div>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-rose-gold mt-1 flex-shrink-0" />
                <div className="font-lato">
                  <div className="text-gray-300">123 Sweet Street</div>
                  <div className="text-sm text-gray-400">Bakery District, Downtown</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Newsletter Signup */}
        <div className="border-t border-gray-700 mt-12 pt-8">
          <div className="text-center max-w-2xl mx-auto space-y-4">
            <h3 className="font-playfair text-2xl font-semibold">Stay Sweet with Our Newsletter</h3>
            <p className="text-gray-300 font-lato">
              Get exclusive cake recipes, special offers, and be the first to know about our new creations
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-lg bg-white/10 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:border-rose-gold font-lato"
              />
              <button className="px-6 py-3 bg-rose-gold text-white rounded-lg hover:bg-rose-gold-light transition-colors font-lato font-medium">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700 mt-12 pt-8 flex flex-col md:flex-row items-center justify-between">
          <div className="text-gray-400 font-lato text-sm">
            © 2024 Cake N Cream. All rights reserved.
          </div>
          <div className="flex items-center space-x-1 text-gray-400 font-lato text-sm mt-4 md:mt-0">
            <span>Made with</span>
            <Heart className="w-4 h-4 text-rose-gold fill-current" />
            <span>for sweet celebrations</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;