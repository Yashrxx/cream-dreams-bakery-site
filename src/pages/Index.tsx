import FloatingNav from '@/components/FloatingNav';
import Hero from '@/components/Hero';
import FeaturedCakes from '@/components/FeaturedCakes';
import Testimonials from '@/components/Testimonials';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen">
      <FloatingNav />
      <Hero />
      <FeaturedCakes />
      <div id="testimonials">
        <Testimonials />
      </div>
      <Footer />
    </div>
  );
};

export default Index;
