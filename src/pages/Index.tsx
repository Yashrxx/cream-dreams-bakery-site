import FloatingNav from '@/components/FloatingNav';
import Hero from '@/components/Hero';
import ProductGrid from '@/components/ProductGrid';
import Testimonials from '@/components/Testimonials';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen">
      <FloatingNav />
      <Hero />
      <ProductGrid />
      <Testimonials />
      <Contact />
      <Footer />
    </div>
  );
};

export default Index;
