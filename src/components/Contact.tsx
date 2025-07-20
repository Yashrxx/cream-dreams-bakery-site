import { useState } from 'react';
import { Phone, Mail, MapPin, Clock, Send, MessageCircle, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    occasion: '',
    message: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Form submitted:', formData);
  };

  const contactInfo = [
    {
      icon: Phone,
      title: 'Call Us',
      details: '+1 (555) 123-CAKE',
      subtext: 'Mon-Sat 9AM-7PM',
    },
    {
      icon: Mail,
      title: 'Email Us',
      details: 'hello@cakencream.com',
      subtext: 'We reply within 24hrs',
    },
    {
      icon: MapPin,
      title: 'Visit Us',
      details: '123 Sweet Street, Bakery District',
      subtext: 'Downtown Location',
    },
    {
      icon: Clock,
      title: 'Business Hours',
      details: 'Mon-Sat: 9AM-7PM',
      subtext: 'Sunday: 10AM-6PM',
    },
  ];

  return (
    <section id="contact" className="py-20 bg-gradient-to-b from-ivory to-peach-light">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="font-playfair text-4xl md:text-5xl font-bold text-cocoa mb-4">
            Let's Create Something Sweet Together
          </h2>
          <p className="text-xl text-cocoa-light max-w-2xl mx-auto font-lato">
            Ready to order your perfect cake? Get in touch and let's make your celebration unforgettable
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <Card className="bg-white/90 backdrop-blur-sm border-0 rounded-3xl shadow-2xl">
            <CardContent className="p-8">
              <div className="space-y-6">
                <div className="text-center mb-8">
                  <div className="w-16 h-16 bg-rose-gold/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <MessageCircle className="w-8 h-8 text-rose-gold" />
                  </div>
                  <h3 className="font-playfair text-2xl font-semibold text-cocoa mb-2">
                    Custom Order Form
                  </h3>
                  <p className="text-cocoa-light font-lato">
                    Tell us about your dream cake
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-cocoa font-lato font-medium">Full Name</label>
                      <Input
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="Your full name"
                        className="border-rose-gold/30 focus:border-rose-gold"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-cocoa font-lato font-medium">Email</label>
                      <Input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="your@email.com"
                        className="border-rose-gold/30 focus:border-rose-gold"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-cocoa font-lato font-medium">Phone Number</label>
                      <Input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="(555) 123-4567"
                        className="border-rose-gold/30 focus:border-rose-gold"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-cocoa font-lato font-medium">Occasion</label>
                      <select
                        name="occasion"
                        value={formData.occasion}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-rose-gold/30 rounded-lg focus:border-rose-gold focus:outline-none font-lato"
                        required
                      >
                        <option value="">Select occasion</option>
                        <option value="birthday">Birthday</option>
                        <option value="wedding">Wedding</option>
                        <option value="anniversary">Anniversary</option>
                        <option value="graduation">Graduation</option>
                        <option value="corporate">Corporate Event</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-cocoa font-lato font-medium">Tell us about your vision</label>
                    <Textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="Describe your dream cake - flavors, design, size, colors, special requirements..."
                      rows={6}
                      className="border-rose-gold/30 focus:border-rose-gold resize-none"
                      required
                    />
                  </div>

                  <Button type="submit" className="w-full btn-primary font-lato font-semibold py-3 group">
                    <Send className="w-5 h-5 mr-2 group-hover:translate-x-1 transition-transform" />
                    Send Custom Order Request
                  </Button>
                </form>
              </div>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <div className="space-y-8">
            <div className="grid grid-cols-1 gap-6">
              {contactInfo.map((info, index) => (
                <Card key={index} className="bg-white/90 backdrop-blur-sm border-0 rounded-2xl card-hover">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-rose-gold/20 rounded-xl flex items-center justify-center flex-shrink-0">
                        <info.icon className="w-6 h-6 text-rose-gold" />
                      </div>
                      <div>
                        <h4 className="font-playfair text-lg font-semibold text-cocoa mb-1">
                          {info.title}
                        </h4>
                        <p className="text-cocoa-light font-lato font-medium">
                          {info.details}
                        </p>
                        <p className="text-sm text-cocoa-light font-lato">
                          {info.subtext}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Quick Actions */}
            <Card className="bg-white/90 backdrop-blur-sm border-0 rounded-2xl">
              <CardContent className="p-6">
                <div className="text-center space-y-4">
                  <div className="w-16 h-16 bg-rose-gold/20 rounded-full flex items-center justify-center mx-auto">
                    <Calendar className="w-8 h-8 text-rose-gold" />
                  </div>
                  <h4 className="font-playfair text-xl font-semibold text-cocoa">
                    Need it urgently?
                  </h4>
                  <p className="text-cocoa-light font-lato">
                    We offer rush orders with 24-48 hour notice for an additional fee
                  </p>
                  <Button className="btn-secondary font-lato font-medium">
                    Call for Rush Orders
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Special Notice */}
            <div className="bg-gradient-to-r from-rose-gold/20 to-peach/30 rounded-2xl p-6 text-center">
              <h4 className="font-playfair text-lg font-semibold text-cocoa mb-2">
                🎂 Free Consultation
              </h4>
              <p className="text-cocoa-light font-lato text-sm">
                Book a free 30-minute consultation to discuss your custom cake design and get a personalized quote
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;