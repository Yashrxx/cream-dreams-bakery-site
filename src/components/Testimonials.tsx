import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Star, Quote } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const testimonials = [
    {
      id: 1,
      name: "Sarah Johnson",
      role: "Bride",
      rating: 5,
      text: "Cake N Cream made our wedding day absolutely magical! The three-tier rose gold cake was not only stunning but tasted incredible. Every guest couldn't stop talking about it.",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b1d4?w=100&h=100&fit=crop&crop=face",
    },
    {
      id: 2,
      name: "Michael Chen",
      role: "Birthday Customer",
      rating: 5,
      text: "Ordered a custom chocolate cake for my daughter's 10th birthday. The attention to detail was amazing, and she absolutely loved it! Will definitely be ordering again.",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      role: "Event Planner",
      rating: 5,
      text: "I've worked with many bakeries, but Cake N Cream stands out. Their professionalism, creativity, and taste are unmatched. My clients are always thrilled!",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
    },
    {
      id: 4,
      name: "David Williams",
      role: "Anniversary Customer",
      rating: 5,
      text: "The vanilla cupcake set for our anniversary was perfect. Beautiful presentation and the most delicious cupcakes we've ever had. Highly recommend!",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face",
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => 
        prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);

    return () => clearInterval(timer);
  }, [testimonials.length]);

  const nextTestimonial = () => {
    setCurrentIndex(currentIndex === testimonials.length - 1 ? 0 : currentIndex + 1);
  };

  const prevTestimonial = () => {
    setCurrentIndex(currentIndex === 0 ? testimonials.length - 1 : currentIndex - 1);
  };

  return (
    <section id="testimonials" className="py-20 bg-gradient-to-b from-peach-light to-ivory">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="font-playfair text-4xl md:text-5xl font-bold text-cocoa mb-4">
            Sweet Words from Our Customers
          </h2>
          <p className="text-xl text-cocoa-light max-w-2xl mx-auto font-lato">
            Don't just take our word for it - hear what our happy customers have to say
          </p>
        </div>

        {/* Testimonial Carousel */}
        <div className="relative max-w-4xl mx-auto">
          <Card className="bg-white/90 backdrop-blur-sm border-0 rounded-3xl shadow-2xl overflow-hidden">
            <CardContent className="p-8 md:p-12">
              <div className="text-center space-y-8">
                {/* Quote Icon */}
                <div className="mx-auto w-16 h-16 bg-rose-gold/20 rounded-full flex items-center justify-center">
                  <Quote className="w-8 h-8 text-rose-gold" />
                </div>

                {/* Rating Stars */}
                <div className="flex justify-center space-x-1">
                  {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                    <Star key={i} className="w-6 h-6 text-yellow-400 fill-current" />
                  ))}
                </div>

                {/* Testimonial Text */}
                <blockquote className="text-xl md:text-2xl text-cocoa-light font-lato leading-relaxed max-w-3xl mx-auto">
                  "{testimonials[currentIndex].text}"
                </blockquote>

                {/* Customer Info */}
                <div className="flex items-center justify-center space-x-4">
                  <img
                    src={testimonials[currentIndex].image}
                    alt={testimonials[currentIndex].name}
                    className="w-16 h-16 rounded-full object-cover shadow-lg"
                  />
                  <div className="text-left">
                    <div className="font-playfair text-xl font-semibold text-cocoa">
                      {testimonials[currentIndex].name}
                    </div>
                    <div className="text-cocoa-light font-lato">
                      {testimonials[currentIndex].role}
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Navigation Buttons */}
          <div className="flex justify-center space-x-4 mt-8">
            <Button
              variant="outline"
              size="icon"
              onClick={prevTestimonial}
              className="w-12 h-12 rounded-full border-rose-gold text-rose-gold hover:bg-rose-gold hover:text-white"
            >
              <ChevronLeft className="w-6 h-6" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={nextTestimonial}
              className="w-12 h-12 rounded-full border-rose-gold text-rose-gold hover:bg-rose-gold hover:text-white"
            >
              <ChevronRight className="w-6 h-6" />
            </Button>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center space-x-2 mt-6">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex ? 'bg-rose-gold' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-20">
          <div className="text-center">
            <div className="font-playfair text-3xl md:text-4xl font-bold text-rose-gold mb-2">
              500+
            </div>
            <div className="text-cocoa-light font-lato">Happy Customers</div>
          </div>
          <div className="text-center">
            <div className="font-playfair text-3xl md:text-4xl font-bold text-rose-gold mb-2">
              4.9⭐
            </div>
            <div className="text-cocoa-light font-lato">Average Rating</div>
          </div>
          <div className="text-center">
            <div className="font-playfair text-3xl md:text-4xl font-bold text-rose-gold mb-2">
              1000+
            </div>
            <div className="text-cocoa-light font-lato">Cakes Delivered</div>
          </div>
          <div className="text-center">
            <div className="font-playfair text-3xl md:text-4xl font-bold text-rose-gold mb-2">
              24h
            </div>
            <div className="text-cocoa-light font-lato">Fresh Guarantee</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;