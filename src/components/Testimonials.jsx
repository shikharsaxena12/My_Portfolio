import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Quote, ChevronLeft, ChevronRight, Users, Award, MessageCircle } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import Navbar from './Navbar';
import { HomeBackground } from '../portfolio_animation';

const Testimonials = () => {
  const { isDark = false } = useTheme() || {};
  const [currentIndex, setCurrentIndex] = useState(0);

  const testimonials = useMemo(() => [
    {
      name: 'Sarah Johnson',
      role: 'Product Manager',
      company: 'TechCorp Inc.',
      rating: 5,
      text: 'Shikhar delivered exceptional work on our web application. His attention to detail and technical expertise made our project a huge success. The final product exceeded all our expectations.',
      image: '/api/placeholder/100/100'
    },
    {
      name: 'Michael Chen',
      role: 'CTO',
      company: 'StartupXYZ',
      rating: 5,
      text: 'Working with Shikhar was a game-changer for our startup. He built a scalable platform that exceeded our expectations and delivered everything on time.',
      image: '/api/placeholder/100/100'
    },
    {
      name: 'Emily Rodriguez',
      role: 'Design Director',
      company: 'Creative Agency',
      rating: 5,
      text: 'Shikhar perfectly translated our designs into a beautiful, responsive website. His code quality is outstanding and the performance is incredible.',
      image: '/api/placeholder/100/100'
    },
    {
      name: 'David Thompson',
      role: 'Founder',
      company: 'E-commerce Solutions',
      rating: 5,
      text: 'The e-commerce platform Shikhar built for us increased our sales by 300%. His expertise in modern web technologies is truly impressive.',
      image: '/api/placeholder/100/100'
    }
  ], []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [testimonials.length]);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <div className={`min-h-screen relative overflow-hidden transition-all duration-1000 ${
      isDark 
        ? 'bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600' 
        : 'bg-gradient-to-br from-amber-100 via-orange-200 to-rose-300'
    }`}>
      <HomeBackground />
      <Navbar />
      
      <div className="relative z-10 container mx-auto px-6 pt-32 pb-20">
        {/* Header */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h1 
            className="font-playfair text-5xl md:text-6xl font-bold mb-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <span className={`bg-clip-text text-transparent transition-all duration-700 ${
              isDark 
                ? 'bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400' 
                : 'bg-gradient-to-r from-amber-600 via-orange-600 to-rose-600'
            }`}>
              Client Testimonials
            </span>
          </motion.h1>
          
          <motion.p 
            className={`font-opensans text-xl leading-relaxed max-w-2xl mx-auto transition-colors duration-700 ${
              isDark ? 'text-blue-200' : 'text-amber-700'
            }`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            What clients say about working with me
          </motion.p>
        </motion.div>

        {/* Main Testimonial Display */}
        <div className="max-w-5xl mx-auto mb-16">
          <div className="relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                className={`relative p-8 md:p-12 rounded-3xl backdrop-blur-xl border shadow-2xl transition-all duration-700 ${
                  isDark 
                    ? 'bg-gradient-to-br from-blue-900/30 via-purple-900/30 to-pink-900/30 border-blue-400/20' 
                    : 'bg-gradient-to-br from-amber-100/60 via-orange-100/60 to-rose-100/60 border-amber-300/30'
                }`}
                initial={{ opacity: 0, x: 100, rotateY: 15 }}
                animate={{ opacity: 1, x: 0, rotateY: 0 }}
                exit={{ opacity: 0, x: -100, rotateY: -15 }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
              >
                {/* Animated Background Pattern */}
                <motion.div
                  className="absolute inset-0 opacity-10"
                  animate={{
                    background: isDark ? [
                      'radial-gradient(circle at 20% 50%, rgba(59, 130, 246, 0.3) 0%, transparent 50%)',
                      'radial-gradient(circle at 80% 50%, rgba(147, 51, 234, 0.3) 0%, transparent 50%)',
                      'radial-gradient(circle at 50% 80%, rgba(236, 72, 153, 0.3) 0%, transparent 50%)',
                      'radial-gradient(circle at 20% 50%, rgba(59, 130, 246, 0.3) 0%, transparent 50%)'
                    ] : [
                      'radial-gradient(circle at 20% 50%, rgba(245, 158, 11, 0.4) 0%, transparent 50%)',
                      'radial-gradient(circle at 80% 50%, rgba(249, 115, 22, 0.4) 0%, transparent 50%)',
                      'radial-gradient(circle at 50% 80%, rgba(244, 63, 94, 0.4) 0%, transparent 50%)',
                      'radial-gradient(circle at 20% 50%, rgba(245, 158, 11, 0.4) 0%, transparent 50%)'
                    ]
                  }}
                  transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                />

                {/* Quote Icon */}
                <motion.div 
                  className={`absolute top-8 left-8 transition-colors duration-700 ${
                    isDark ? 'text-blue-400/40' : 'text-amber-600/40'
                  }`}
                  animate={{ rotate: [0, 5, -5, 0] }}
                  transition={{ duration: 4, repeat: Infinity }}
                >
                  <Quote size={60} />
                </motion.div>

                {/* Content */}
                <div className="relative z-10 text-center pt-8">
                  {/* Rating */}
                  <div className="flex justify-center gap-2 mb-8">
                    {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, scale: 0, rotate: -180 }}
                        animate={{ opacity: 1, scale: 1, rotate: 0 }}
                        transition={{ delay: i * 0.1, duration: 0.5 }}
                      >
                        <Star className={`w-6 h-6 fill-current transition-colors duration-700 ${
                          isDark ? 'text-yellow-400' : 'text-yellow-500'
                        }`} />
                      </motion.div>
                    ))}
                  </div>

                  {/* Testimonial Text */}
                  <motion.p 
                    className={`font-opensans text-xl md:text-2xl leading-relaxed mb-10 max-w-4xl mx-auto transition-colors duration-700 ${
                      isDark ? 'text-blue-100' : 'text-amber-800'
                    }`}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.6 }}
                  >
                    "{testimonials[currentIndex].text}"
                  </motion.p>

                  {/* Client Info */}
                  <motion.div 
                    className="flex flex-col md:flex-row items-center justify-center gap-6"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 0.6 }}
                  >
                    <motion.div 
                      className={`w-20 h-20 rounded-full flex items-center justify-center text-2xl font-bold transition-all duration-700 ${
                        isDark 
                          ? 'bg-gradient-to-br from-blue-600/60 to-purple-600/60 text-blue-100' 
                          : 'bg-gradient-to-br from-amber-200/80 to-orange-200/80 text-amber-800'
                      }`}
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ type: "spring", damping: 15, stiffness: 300 }}
                    >
                      {testimonials[currentIndex].name.split(' ').map(n => n[0]).join('')}
                    </motion.div>
                    <div className="text-center md:text-left">
                      <h4 className={`font-montserrat text-2xl font-bold mb-2 transition-colors duration-700 ${
                        isDark ? 'text-blue-100' : 'text-amber-800'
                      }`}>
                        {testimonials[currentIndex].name}
                      </h4>
                      <p className={`text-lg font-medium transition-colors duration-700 ${
                        isDark ? 'text-blue-300' : 'text-amber-600'
                      }`}>
                        {testimonials[currentIndex].role}
                      </p>
                      <p className={`text-base transition-colors duration-700 ${
                        isDark ? 'text-purple-300' : 'text-orange-600'
                      }`}>
                        {testimonials[currentIndex].company}
                      </p>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Navigation Buttons */}
            <button
              onClick={prevTestimonial}
              className={`absolute left-4 top-1/2 -translate-y-1/2 p-4 rounded-full backdrop-blur-xl border transition-all duration-300 ${
                isDark 
                  ? 'bg-slate-800/60 border-slate-600/50 text-blue-300 hover:bg-slate-700/60 hover:scale-110' 
                  : 'bg-amber-100/60 border-amber-300/50 text-amber-700 hover:bg-amber-200/60 hover:scale-110'
              }`}
            >
              <ChevronLeft size={28} />
            </button>
            
            <button
              onClick={nextTestimonial}
              className={`absolute right-4 top-1/2 -translate-y-1/2 p-4 rounded-full backdrop-blur-xl border transition-all duration-300 ${
                isDark 
                  ? 'bg-slate-800/60 border-slate-600/50 text-blue-300 hover:bg-slate-700/60 hover:scale-110' 
                  : 'bg-amber-100/60 border-amber-300/50 text-amber-700 hover:bg-amber-200/60 hover:scale-110'
              }`}
            >
              <ChevronRight size={28} />
            </button>
          </div>

          {/* Indicators */}
          <div className="flex justify-center gap-3 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`transition-all duration-300 ${
                  index === currentIndex
                    ? isDark 
                      ? 'w-12 h-4 bg-blue-400 rounded-full' 
                      : 'w-12 h-4 bg-amber-600 rounded-full'
                    : isDark 
                      ? 'w-4 h-4 bg-slate-600 rounded-full hover:bg-slate-500' 
                      : 'w-4 h-4 bg-amber-300 rounded-full hover:bg-amber-400'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Stats Section */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          {[
            { icon: Users, number: '50+', label: 'Happy Clients', desc: 'Satisfied customers worldwide' },
            { icon: Award, number: '100%', label: 'Success Rate', desc: 'Projects delivered on time' },
            { icon: MessageCircle, number: '5.0', label: 'Average Rating', desc: 'Based on client feedback' }
          ].map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={index}
                className={`text-center p-8 rounded-3xl backdrop-blur-xl border shadow-lg transition-all duration-700 ${
                  isDark 
                    ? 'bg-gradient-to-br from-blue-600/20 via-purple-600/20 to-pink-600/20 border-blue-400/20' 
                    : 'bg-gradient-to-br from-amber-200/40 via-orange-200/40 to-rose-200/40 border-amber-300/30'
                }`}
                whileHover={{ scale: 1.05, y: -10 }}
                transition={{ type: "spring", damping: 15, stiffness: 300 }}
              >
                <motion.div
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 4, repeat: Infinity }}
                >
                  <Icon className={`w-12 h-12 mx-auto mb-4 transition-colors duration-700 ${
                    isDark ? 'text-blue-400' : 'text-amber-600'
                  }`} />
                </motion.div>
                <div className={`text-4xl font-bold mb-2 transition-colors duration-700 ${
                  isDark ? 'text-blue-100' : 'text-amber-800'
                }`}>
                  {stat.number}
                </div>
                <div className={`text-lg font-semibold mb-2 transition-colors duration-700 ${
                  isDark ? 'text-blue-200' : 'text-amber-700'
                }`}>
                  {stat.label}
                </div>
                <div className={`text-sm transition-colors duration-700 ${
                  isDark ? 'text-blue-300' : 'text-amber-600'
                }`}>
                  {stat.desc}
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </div>
  );
};

export default Testimonials;