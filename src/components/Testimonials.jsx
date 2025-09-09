import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Quote, ChevronLeft, ChevronRight } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import Navbar from './Navbar';
import { HomeBackground } from '../portfolio_animation';

const FloatingParticle = React.memo(({ delay, duration, x, y }) => (
  <motion.div
    className="absolute w-2 h-2 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full opacity-20"
    style={{ left: `${x}%`, top: `${y}%` }}
    animate={{
      y: [0, -100, 0],
      opacity: [0, 1, 0],
      scale: [0, 1, 0]
    }}
    transition={{
      duration,
      delay,
      repeat: Infinity,
      ease: "easeInOut"
    }}
  />
));

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const { isDark = false } = useTheme() || {};

  const testimonials = [
    {
      id: 1,
      name: "Sarah Johnson",
      role: "Product Manager",
      company: "TechCorp Inc.",
      image: "/api/placeholder/80/80",
      rating: 5,
      text: "Shikhar delivered exceptional work on our web application. His attention to detail and technical expertise exceeded our expectations. The project was completed on time and within budget."
    },
    {
      id: 2,
      name: "Michael Chen",
      role: "CTO",
      company: "StartupXYZ",
      image: "/api/placeholder/80/80",
      rating: 5,
      text: "Working with Shikhar was a game-changer for our startup. His full-stack development skills and innovative solutions helped us launch our MVP successfully."
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      role: "Design Director",
      company: "Creative Agency",
      image: "/api/placeholder/80/80",
      rating: 5,
      text: "Shikhar's ability to translate complex designs into pixel-perfect, responsive websites is remarkable. His code quality and performance optimizations are top-notch."
    },
    {
      id: 4,
      name: "David Thompson",
      role: "Founder",
      company: "E-commerce Solutions",
      image: "/api/placeholder/80/80",
      rating: 5,
      text: "The e-commerce platform Shikhar built for us increased our conversion rate by 40%. His expertise in both frontend and backend development is impressive."
    },
    {
      id: 5,
      name: "Lisa Wang",
      role: "Marketing Manager",
      company: "Digital Marketing Pro",
      image: "/api/placeholder/80/80",
      rating: 5,
      text: "Shikhar created a stunning portfolio website that perfectly represents our brand. The animations and user experience are absolutely phenomenal."
    }
  ];

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);



  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        size={16}
        className={`${i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
      />
    ));
  };

  return (
    <div className={`min-h-screen relative overflow-hidden scroll-smooth transition-all duration-1000 ${isDark ? 'bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600' : 'bg-gradient-to-br from-amber-100 via-orange-200 to-rose-300'}`}>
      {/* Floating Particles */}
      {useMemo(() => {
        const particles = [];
        for (let i = 0; i < 15; i++) {
          particles.push({
            id: i,
            delay: i * 0.5,
            duration: 3 + (i * 0.1) % 2,
            x: (i * 7) % 100,
            y: (i * 11) % 100
          });
        }
        return particles.map(particle => (
          <FloatingParticle
            key={particle.id}
            delay={particle.delay}
            duration={particle.duration}
            x={particle.x}
            y={particle.y}
          />
        ));
      }, [])}
      
      {/* Interactive Cursor Glow */}
      <motion.div
        className={`fixed w-96 h-96 rounded-full blur-3xl pointer-events-none z-0 ${
          isDark 
            ? 'bg-gradient-to-r from-blue-500/10 to-purple-500/10' 
            : 'bg-gradient-to-r from-blue-400/10 to-purple-400/10'
        }`}
        animate={{
          x: mousePosition.x - 192,
          y: mousePosition.y - 192,
        }}
        transition={{ type: "spring", damping: 40, stiffness: 300, mass: 0.5 }}
      />
      
      <HomeBackground />
      <Navbar />
      
      <div className="relative z-10 container mx-auto px-6 pt-32 pb-20">
        {/* Header */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <motion.h1 
            className="font-playfair text-5xl md:text-6xl font-bold mb-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <span className={`bg-clip-text text-transparent transition-all duration-700 ${
              isDark ? 'bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600' : 'bg-gradient-to-r from-amber-600 via-orange-600 to-rose-600'
            }`}>
              Testimonials
            </span>
          </motion.h1>
          
          <motion.p 
            className={`font-opensans text-lg leading-relaxed max-w-2xl mx-auto ${
              isDark ? 'text-gray-300' : 'text-gray-600'
            }`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            What clients say about working with me
          </motion.p>
        </motion.div>

        {/* Main Testimonial Card */}
        <motion.div 
          className="max-w-4xl mx-auto mb-12"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <div className="relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                className="relative p-8 md:p-12 rounded-3xl backdrop-blur-xl border bg-gradient-to-br from-blue-600/20 via-purple-600/20 to-pink-600/20 border-white/20 overflow-hidden"
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.5 }}
              >
                <motion.div
                  className="absolute inset-0 opacity-60"
                  animate={{
                    background: [
                      'linear-gradient(135deg, rgba(99, 102, 241, 0.3), rgba(168, 85, 247, 0.3), rgba(236, 72, 153, 0.3))',
                      'linear-gradient(225deg, rgba(168, 85, 247, 0.3), rgba(236, 72, 153, 0.3), rgba(99, 102, 241, 0.3))',
                      'linear-gradient(315deg, rgba(236, 72, 153, 0.3), rgba(99, 102, 241, 0.3), rgba(168, 85, 247, 0.3))',
                      'linear-gradient(45deg, rgba(99, 102, 241, 0.3), rgba(168, 85, 247, 0.3), rgba(236, 72, 153, 0.3))'
                    ]
                  }}
                  transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                />
                
                {/* Quote Icon */}
                <div className="relative z-10 flex justify-center mb-6">
                  <Quote size={48} className="text-blue-400 opacity-50" />
                </div>
                
                {/* Testimonial Text */}
                <blockquote className={`relative z-10 text-lg md:text-xl font-medium text-center mb-8 leading-relaxed px-4 ${
                  isDark ? 'text-white' : 'text-gray-800'
                }`}>
                  "{testimonials[currentIndex].text}"
                </blockquote>
                
                {/* Client Info */}
                <div className="relative z-10 flex flex-col items-center justify-center gap-4">
                  <div className="flex flex-col md:flex-row items-center gap-4">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-400 to-purple-400 flex items-center justify-center text-white font-bold text-xl">
                      {testimonials[currentIndex].name.charAt(0)}
                    </div>
                    <div className="text-center">
                      <h3 className={`font-bold text-lg ${
                        isDark ? 'text-white' : 'text-gray-800'
                      }`}>
                        {testimonials[currentIndex].name}
                      </h3>
                      <p className={`text-sm ${
                        isDark ? 'text-gray-300' : 'text-gray-600'
                      }`}>
                        {testimonials[currentIndex].role}
                      </p>
                      <p className="text-sm text-blue-400">
                        {testimonials[currentIndex].company}
                      </p>
                    </div>
                  </div>
                  
                  {/* Rating */}
                  <div className="flex items-center gap-1">
                    {renderStars(testimonials[currentIndex].rating)}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
            
            {/* Navigation Buttons */}
            <button
              onClick={prevTestimonial}
              className={`absolute left-2 md:left-4 top-1/2 transform -translate-y-1/2 p-2 md:p-3 rounded-full backdrop-blur-xl border transition-all duration-300 z-20 ${
                isDark 
                  ? 'bg-gray-800/80 border-gray-700/50 text-white hover:bg-gray-700/80' 
                  : 'bg-white/80 border-white/50 text-gray-800 hover:bg-white/90'
              }`}
            >
              <ChevronLeft size={20} />
            </button>
            
            <button
              onClick={nextTestimonial}
              className={`absolute right-2 md:right-4 top-1/2 transform -translate-y-1/2 p-2 md:p-3 rounded-full backdrop-blur-xl border transition-all duration-300 z-20 ${
                isDark 
                  ? 'bg-gray-800/80 border-gray-700/50 text-white hover:bg-gray-700/80' 
                  : 'bg-white/80 border-white/50 text-gray-800 hover:bg-white/90'
              }`}
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </motion.div>

        {/* Testimonial Indicators */}
        <motion.div 
          className="flex justify-center gap-3 mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                currentIndex === index 
                  ? 'bg-blue-500 scale-125' 
                  : isDark ? 'bg-gray-600 hover:bg-gray-500' : 'bg-gray-300 hover:bg-gray-400'
              }`}
            />
          ))}
        </motion.div>

        {/* All Testimonials Grid */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.0 }}
        >
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              className={`p-6 rounded-2xl backdrop-blur-xl border cursor-pointer transition-all duration-300 ${
                isDark 
                  ? 'bg-gray-800/30 border-gray-700/50 hover:bg-gray-700/30' 
                  : 'bg-white/30 border-white/50 hover:bg-white/50'
              } ${currentIndex === index ? 'ring-2 ring-blue-400' : ''}`}
              whileHover={{ scale: 1.02, y: -5 }}
              onClick={() => setCurrentIndex(index)}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1.2 + index * 0.1 }}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-400 to-purple-400 flex items-center justify-center text-white font-bold">
                  {testimonial.name.charAt(0)}
                </div>
                <div>
                  <h3 className={`font-bold ${
                    isDark ? 'text-white' : 'text-gray-800'
                  }`}>
                    {testimonial.name}
                  </h3>
                  <p className={`text-sm ${
                    isDark ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    {testimonial.role}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center gap-1 mb-3">
                {renderStars(testimonial.rating)}
              </div>
              
              <p className={`text-sm leading-relaxed ${
                isDark ? 'text-gray-300' : 'text-gray-600'
              }`}>
                {testimonial.text.length > 120 
                  ? `${testimonial.text.substring(0, 120)}...` 
                  : testimonial.text
                }
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default Testimonials;