import FloatingNav from '@/components/FloatingNav';
import ProductGrid from '@/components/ProductGrid';
import Footer from '@/components/Footer';

const ProductsPage = () => {
  return (
    <div className="min-h-screen">
      <FloatingNav />
      <div className="pt-20">
        <ProductGrid />
      </div>
      <Footer />
    </div>
  );
};

export default ProductsPage;