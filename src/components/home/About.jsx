import React, { useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { useInView as useIntersectionObserver } from 'react-intersection-observer';
import ContactCTA from '../common/ContactCTA';

const About = () => {
  const [animateStats, setAnimateStats] = useState(false);
  const [activeFeature, setActiveFeature] = useState(0);
  const [scrollY, setScrollY] = useState(0);

  const [ref, inView] = useIntersectionObserver({
    triggerOnce: true,
    threshold: 0.1
  });

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
      
      const statsSection = document.getElementById('stats-section');
      if (statsSection) {
        const rect = statsSection.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
          setAnimateStats(true);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % 4);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const features = [
    {
      icon: '/icons/star-grey.svg',
      title: 'Premium Quality',
      description: 'Handcrafted with love using the finest organic ingredients'
    },
    {
      icon: '/icons/clock.svg',
      title: 'Fresh Daily',
      description: 'Baked fresh every morning for maximum flavor and quality'
    },
    {
      icon: '/icons/transport.svg',
      title: 'Eco Delivery',
      description: 'Carbon-neutral delivery using electric vehicles'
    },
    {
      icon: '/icons/location.svg',
      title: 'Local Sourcing',
      description: 'Supporting local farmers and sustainable agriculture'
    }
  ];

  const teamMembers = [
    {
      name: 'Sarah Johnson',
      role: 'Head Baker',
      image: '/images/plate-1.png',
      bio: '15+ years of artisanal baking experience'
    },
    {
      name: 'Mike Chen',
      role: 'Pastry Chef',
      image: '/images/plate-2.png',
      bio: 'Specialist in French pastries and desserts'
    },
    {
      name: 'Emma Davis',
      role: 'Sustainability Manager',
      image: '/images/plate-3.png',
      bio: 'Leading our eco-friendly initiatives'
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  return (
    <>
      {/* Animated Background Decorations */}
      <motion.div 
        className="relative overflow-hidden"
        variants={containerVariants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
      >
        <div className="absolute inset-0 pointer-events-none">
          <motion.div 
            className="absolute top-20 left-10 w-20 h-20 bg-orange-200 rounded-full opacity-20 animate-bounce" 
            style={{ transform: `translateY(${scrollY * 0.1}px)` }}
            variants={itemVariants}
          ></motion.div>
          <motion.div 
            className="absolute top-40 right-20 w-16 h-16 bg-green-200 rounded-full opacity-20 animate-pulse" 
            style={{ transform: `translateY(${scrollY * -0.15}px)` }}
            variants={itemVariants}
          ></motion.div>
          <motion.div 
            className="absolute bottom-20 left-20 w-24 h-24 bg-yellow-200 rounded-full opacity-20 animate-bounce" 
            style={{ transform: `translateY(${scrollY * 0.2}px)` }}
            variants={itemVariants}
          ></motion.div>
          <motion.div 
            className="absolute bottom-40 right-10 w-12 h-12 bg-pink-200 rounded-full opacity-20 animate-pulse" 
            style={{ transform: `translateY(${scrollY * -0.1}px)` }}
            variants={itemVariants}
          ></motion.div>
        </div>
      </motion.div>

      <section className="py-16 bg-white">
        <motion.div 
          ref={ref}
          className="container mx-auto px-4"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          <motion.h1 
            className="text-4xl md:text-5xl font-bold text-center text-gray-800 mb-12"
            variants={itemVariants}
          >
            About Bela
          </motion.h1>
          
          {/* Main About Section */}
          <motion.div 
            className="flex flex-col lg:flex-row items-center gap-12 mb-16"
            variants={itemVariants}
          >
            <motion.div 
              className="flex-1 relative"
              variants={itemVariants}
            >
              <img 
                src="/images/yogurt.png" 
                alt="Eco-friendly cake" 
                className="w-full max-w-md mx-auto animate-bounce"
                style={{ transform: `translateY(${scrollY * 0.05}px)` }}
              />
              {/* Decorative elements */}
              <div className="absolute -top-4 -left-4 w-8 h-8 bg-orange-300 rounded-full opacity-50"></div>
              <div className="absolute -bottom-4 -right-4 w-6 h-6 bg-green-300 rounded-full opacity-50"></div>
              <div className="absolute top-1/2 -right-2 w-1 h-12 bg-yellow-400 opacity-60"></div>
            </motion.div>
            <motion.div 
              className="flex-1"
              variants={itemVariants}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">Baking a Better Tomorrow</h2>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                At Bela, we believe every cake can make a difference. Our passion for baking is matched only by our commitment to the planet. We use organic, locally sourced ingredients, bake with zero-waste methods, and serve every treat in biodegradable packaging. Whether you're celebrating a special moment or just treating yourself, you can feel good knowing your choice supports a greener, more delicious world.
              </p>
              
              {/* Enhanced Features List */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                <div className="flex items-center space-x-3">
                  <img src="/icons/star-grey.svg" alt="Eco-friendly" className="w-6 h-6" />
                  <span className="text-gray-700">100% eco-friendly packaging</span>
                </div>
                <div className="flex items-center space-x-3">
                  <img src="/icons/clock.svg" alt="Zero-waste" className="w-6 h-6" />
                  <span className="text-gray-700">Zero-waste, green energy baking</span>
                </div>
                <div className="flex items-center space-x-3">
                  <img src="/icons/bag.svg" alt="Handcrafted" className="w-6 h-6" />
                  <span className="text-gray-700">Handcrafted cakes & pastries</span>
                </div>
                <div className="flex items-center space-x-3">
                  <img src="/icons/transport.svg" alt="Delivery" className="w-6 h-6" />
                  <span className="text-gray-700">Low-emission local delivery</span>
                </div>
              </div>
              
              <button className="bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 animate-pulse">Learn More About Our Mission</button>
            </motion.div>
          </motion.div>

          {/* Interactive Features Carousel */}
          <motion.div 
            className="mb-16"
            variants={itemVariants}
          >
            <h3 className="text-3xl font-bold text-center text-gray-800 mb-8">Why Choose Bela?</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {features.map((feature, index) => (
                <motion.div 
                  key={index}
                  className={`p-6 rounded-lg border-2 cursor-pointer transition-all duration-300 ${
                    index === activeFeature 
                      ? 'border-orange-500 bg-orange-50 shadow-lg' 
                      : 'border-gray-200 bg-white hover:border-orange-300 hover:bg-orange-50'
                  }`}
                  onClick={() => setActiveFeature(index)}
                  variants={itemVariants}
                >
                  <div className="text-center mb-4">
                    <img src={feature.icon} alt={feature.title} className="w-12 h-12 mx-auto mb-3" />
                  </div>
                  <h4 className="text-lg font-semibold text-gray-800 mb-2 text-center">{feature.title}</h4>
                  <p className="text-gray-600 text-center">{feature.description}</p>
                </motion.div>
              ))}
            </div>
            <div className="flex justify-center space-x-2 mt-6">
              {features.map((_, index) => (
                <span 
                  key={index}
                  className={`w-3 h-3 rounded-full cursor-pointer transition-colors ${
                    index === activeFeature ? 'bg-orange-500' : 'bg-gray-300'
                  }`}
                  onClick={() => setActiveFeature(index)}
                />
              ))}
            </div>
          </motion.div>

          {/* Statistics Section */}
          <motion.div 
            id="stats-section" 
            className="bg-gradient-to-r from-orange-50 to-green-50 rounded-2xl p-8 mb-16"
            variants={itemVariants}
          >
            <h3 className="text-3xl font-bold text-center text-gray-800 mb-8">Our Impact in Numbers</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="text-4xl font-bold text-orange-600 mb-2">
                  <span className={animateStats ? 'animate-pulse' : ''}>5000</span>+
                </div>
                <div className="text-gray-700 mb-2">Happy Customers</div>
                <img src="/icons/user-icon.svg" alt="Customers" className="w-8 h-8 mx-auto" />
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-green-600 mb-2">
                  <span className={animateStats ? 'animate-pulse' : ''}>100</span>%
                </div>
                <div className="text-gray-700 mb-2">Organic Ingredients</div>
                <img src="/icons/star-grey.svg" alt="Organic" className="w-8 h-8 mx-auto" />
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-blue-600 mb-2">
                  <span className={animateStats ? 'animate-pulse' : ''}>50</span>kg
                </div>
                <div className="text-gray-700 mb-2">CO2 Saved Monthly</div>
                <img src="/icons/transport.svg" alt="Eco" className="w-8 h-8 mx-auto" />
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-purple-600 mb-2">
                  <span className={animateStats ? 'animate-pulse' : ''}>24</span>hr
                </div>
                <div className="text-gray-700 mb-2">Fresh Guarantee</div>
                <img src="/icons/clock.svg" alt="Fresh" className="w-8 h-8 mx-auto" />
              </div>
            </div>
          </motion.div>

          {/* Team Section */}
          <motion.div 
            className="mb-16"
            variants={itemVariants}
          >
            <h3 className="text-3xl font-bold text-center text-gray-800 mb-8">Meet Our Team</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {teamMembers.map((member, index) => (
                <motion.div 
                  key={index}
                  className="text-center p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
                  variants={itemVariants}
                >
                  <img 
                    src={member.image} 
                    alt={member.name} 
                    className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
                  />
                  <h4 className="text-xl font-semibold text-gray-800 mb-2">{member.name}</h4>
                  <p className="text-orange-600 font-medium mb-2">{member.role}</p>
                  <p className="text-gray-600">{member.bio}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Values Section */}
          <motion.div 
            className="bg-gradient-to-br from-green-50 to-orange-50 rounded-2xl p-8"
            variants={itemVariants}
          >
            <h3 className="text-3xl font-bold text-center text-gray-800 mb-8">Our Core Values</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="bg-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <img src="/icons/location.svg" alt="Sustainability" className="w-8 h-8" />
                </div>
                <h4 className="text-xl font-semibold text-gray-800 mb-3">Sustainability</h4>
                <p className="text-gray-600">Committed to reducing our environmental footprint through eco-friendly practices.</p>
              </div>
              <div className="text-center">
                <div className="bg-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <img src="/icons/star-grey.svg" alt="Quality" className="w-8 h-8" />
                </div>
                <h4 className="text-xl font-semibold text-gray-800 mb-3">Quality</h4>
                <p className="text-gray-600">Using only the finest ingredients to create exceptional taste experiences.</p>
              </div>
              <div className="text-center">
                <div className="bg-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <img src="/icons/user-icon.svg" alt="Community" className="w-8 h-8" />
                </div>
                <h4 className="text-xl font-semibold text-gray-800 mb-3">Community</h4>
                <p className="text-gray-600">Supporting local farmers and building strong relationships with our community.</p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </section>
      <ContactCTA />
    </>
  );
};

export default About;