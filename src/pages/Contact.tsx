import FloatingNav from '@/components/FloatingNav';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';

const ContactPage = () => {
  return (
    <div className="min-h-screen">
      <FloatingNav />
      <div className="pt-20">
        <Contact />
      </div>
      <Footer />
    </div>
  );
};

export default ContactPage;