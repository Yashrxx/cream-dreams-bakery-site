import { Users, Award, Heart, Clock, Cake, Star, ChefHat } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import bakeryInterior from '@/assets/bakery-interior.jpg';

const About = () => {
  const values = [
    {
      icon: Heart,
      title: 'Made with Love',
      description: 'Every cake is crafted with passion and attention to detail, using time-honored recipes passed down through generations.',
    },
    {
      icon: Award,
      title: 'Premium Quality',
      description: 'We source only the finest ingredients - Belgian chocolate, Madagascar vanilla, and farm-fresh dairy for exceptional taste.',
    },
    {
      icon: Users,
      title: 'Family Tradition',
      description: 'Our family-owned bakery has been creating sweet memories for over two decades, serving our community with pride.',
    },
    {
      icon: Clock,
      title: 'Fresh Daily',
      description: 'All our cakes and pastries are baked fresh daily in small batches to ensure maximum freshness and flavor.',
    },
  ];

  const team = [
    {
      name: 'Sarah Mitchell',
      role: 'Head Baker & Founder',
      image: 'https://images.unsplash.com/photo-1494790108755-2616b612b1d4?w=300&h=300&fit=crop&crop=face',
      description: 'With 15+ years of experience, Sarah brings European baking techniques to create our signature cakes.',
    },
    {
      name: 'Marcus Rodriguez',
      role: 'Pastry Chef',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face',
      description: 'Marcus specializes in wedding cakes and custom designs, turning your dreams into edible masterpieces.',
    },
    {
      name: 'Emily Chen',
      role: 'Decorator & Designer',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop&crop=face',
      description: 'Emily\'s artistic touch brings beauty to every creation, from delicate sugar flowers to intricate piping.',
    },
  ];

  const achievements = [
    { number: '20+', label: 'Years of Excellence' },
    { number: '5000+', label: 'Happy Customers' },
    { number: '100+', label: 'Unique Recipes' },
    { number: '4.9', label: 'Average Rating' },
  ];

  return (
    <section id="about" className="py-20">
      {/* Hero Section */}
      <div className="bg-gradient-to-b from-peach-light to-ivory py-20">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="font-playfair text-4xl md:text-5xl font-bold text-cocoa mb-6">
                Our Sweet Story
              </h1>
              <p className="text-lg text-cocoa-light font-lato leading-relaxed mb-8">
                Welcome to Cake N Cream, where every slice tells a story of passion, tradition, and uncompromising quality. 
                Since 2004, we've been the heart of sweet celebrations in our community, creating not just cakes, but cherished memories 
                that last a lifetime.
              </p>
              <p className="text-lg text-cocoa-light font-lato leading-relaxed">
                From intimate birthday celebrations to grand wedding festivities, we believe that every moment deserves to be 
                sweetened with something truly special. Our commitment to excellence and personal touch makes each creation unique.
              </p>
            </div>
            <div className="relative">
              <img
                src={bakeryInterior}
                alt="Our Beautiful Bakery"
                className="w-full h-96 object-cover rounded-3xl shadow-2xl"
              />
              <div className="absolute -bottom-6 -left-6 bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-rose-gold/20 rounded-full flex items-center justify-center">
                    <Cake className="w-6 h-6 text-rose-gold" />
                  </div>
                  <div>
                    <div className="font-playfair text-lg font-semibold text-cocoa">Est. 2004</div>
                    <div className="text-cocoa-light font-lato text-sm">20 Years of Sweet Success</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Our Values */}
      <div className="py-20 bg-ivory">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="font-playfair text-4xl md:text-5xl font-bold text-cocoa mb-4">
              What Makes Us Special
            </h2>
            <p className="text-xl text-cocoa-light max-w-2xl mx-auto font-lato">
              Our commitment to excellence is reflected in everything we do
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <Card key={index} className="bg-white/80 backdrop-blur-sm border-0 rounded-2xl card-hover text-center">
                <CardContent className="p-8">
                  <div className="w-16 h-16 bg-rose-gold/20 rounded-full flex items-center justify-center mx-auto mb-6">
                    <value.icon className="w-8 h-8 text-rose-gold" />
                  </div>
                  <h3 className="font-playfair text-xl font-semibold text-cocoa mb-4">
                    {value.title}
                  </h3>
                  <p className="text-cocoa-light font-lato leading-relaxed">
                    {value.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Our Team */}
      <div className="py-20 bg-gradient-to-b from-ivory to-peach-light">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="font-playfair text-4xl md:text-5xl font-bold text-cocoa mb-4">
              Meet Our Sweet Team
            </h2>
            <p className="text-xl text-cocoa-light max-w-2xl mx-auto font-lato">
              The talented artisans behind every delicious creation
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <Card key={index} className="bg-white/90 backdrop-blur-sm border-0 rounded-3xl card-hover overflow-hidden">
                <div className="relative">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-64 object-cover"
                  />
                  <div className="absolute top-4 right-4 w-12 h-12 bg-white/90 rounded-full flex items-center justify-center">
                    <ChefHat className="w-6 h-6 text-rose-gold" />
                  </div>
                </div>
                <CardContent className="p-6 text-center">
                  <h3 className="font-playfair text-xl font-semibold text-cocoa mb-2">
                    {member.name}
                  </h3>
                  <div className="text-rose-gold font-lato font-medium mb-4">
                    {member.role}
                  </div>
                  <p className="text-cocoa-light font-lato leading-relaxed">
                    {member.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Achievements */}
      <div className="py-20 bg-cocoa text-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="font-playfair text-4xl md:text-5xl font-bold mb-4">
              Our Sweet Achievements
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto font-lato">
              Numbers that reflect our commitment to excellence and customer satisfaction
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {achievements.map((achievement, index) => (
              <div key={index} className="text-center">
                <div className="w-20 h-20 bg-rose-gold/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Star className="w-10 h-10 text-rose-gold" />
                </div>
                <div className="font-playfair text-4xl md:text-5xl font-bold text-rose-gold mb-2">
                  {achievement.number}
                </div>
                <div className="text-gray-300 font-lato">
                  {achievement.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="py-20 bg-gradient-to-r from-peach-light via-rose-gold/20 to-ivory">
        <div className="container mx-auto px-6 text-center">
          <h2 className="font-playfair text-4xl md:text-5xl font-bold text-cocoa mb-6">
            Ready to Create Sweet Memories?
          </h2>
          <p className="text-xl text-cocoa-light max-w-2xl mx-auto font-lato mb-8">
            Let us be part of your special moments. From custom cakes to everyday treats, 
            we're here to make your celebrations unforgettable.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/contact"
              className="btn-primary px-8 py-4 rounded-lg font-lato font-semibold text-lg inline-flex items-center justify-center hover-scale"
            >
              Order Your Custom Cake
            </a>
            <a
              href="/products"
              className="btn-secondary px-8 py-4 rounded-lg font-lato font-semibold text-lg inline-flex items-center justify-center hover-scale"
            >
              Browse Our Collection
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;