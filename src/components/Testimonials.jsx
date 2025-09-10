import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Send, User } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import Navbar from './Navbar';
import { HomeBackground } from '../portfolio_animation';

const Testimonials = () => {
  const { isDark = false } = useTheme() || {};
  const [testimonials, setTestimonials] = useState([
    {
      id: 1,
      name: 'Sarah Johnson',
      role: 'Product Manager',
      company: 'TechCorp',
      rating: 5,
      text: 'Exceptional work! Shikhar delivered beyond expectations.',
      date: new Date().toLocaleDateString()
    },
    {
      id: 2,
      name: 'Mike Chen',
      role: 'CTO',
      company: 'StartupXYZ',
      rating: 5,
      text: 'Outstanding developer with great communication skills.',
      date: new Date().toLocaleDateString()
    },
    {
      id: 3,
      name: 'Emily Davis',
      role: 'Designer',
      company: 'Creative Co',
      rating: 5,
      text: 'Perfect implementation of our design vision.',
      date: new Date().toLocaleDateString()
    }
  ]);
  
  const [currentIndex, setCurrentIndex] = useState(0);
  const [formData, setFormData] = useState({
    name: '',
    role: '',
    company: '',
    rating: 5,
    text: ''
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [testimonials.length]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.name && formData.text) {
      const newTestimonial = {
        id: Date.now(),
        ...formData,
        date: new Date().toLocaleDateString()
      };
      setTestimonials(prev => [...prev, newTestimonial]);
      setFormData({ name: '', role: '', company: '', rating: 5, text: '' });
    }
  };

  return (
    <div className={`h-screen overflow-hidden transition-all duration-1000 ${
      isDark ? 'bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600' : 'bg-gradient-to-br from-amber-100 via-orange-200 to-rose-300'
    }`}>
      <HomeBackground />
      <Navbar />
      
      <div className="relative z-10 h-full flex">
        {/* Left Half - Static Testimonial Card */}
        <div className="w-1/2 flex items-center justify-center p-8">
          <div className="w-full max-w-md">
            <div className={`p-8 rounded-2xl backdrop-blur-xl border shadow-2xl transition-all duration-700 ${
              isDark 
                ? 'bg-gradient-to-br from-blue-900/40 via-purple-900/40 to-pink-900/40 border-blue-400/30' 
                : 'bg-gradient-to-br from-amber-100/80 via-orange-100/80 to-rose-100/80 border-amber-300/50'
            }`}>
              {/* Rating */}
              <AnimatePresence mode="wait">
                <motion.div 
                  key={`rating-${testimonials[currentIndex]?.id}`}
                  className="flex gap-1 mb-4"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.15 }}
                >
                  {[...Array(testimonials[currentIndex]?.rating || 5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-current text-yellow-400" />
                  ))}
                </motion.div>
              </AnimatePresence>

              {/* Text */}
              <AnimatePresence mode="wait">
                <motion.p 
                  key={`text-${testimonials[currentIndex]?.id}`}
                  className={`text-lg mb-6 leading-relaxed transition-colors duration-700 ${
                    isDark ? 'text-blue-100' : 'text-amber-900'
                  }`}
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 30 }}
                  transition={{ duration: 0.2 }}
                >
                  "{testimonials[currentIndex]?.text}"
                </motion.p>
              </AnimatePresence>

              {/* Author */}
              <AnimatePresence mode="wait">
                <motion.div 
                  key={`author-${testimonials[currentIndex]?.id}`}
                  className="flex items-center gap-4"
                  initial={{ opacity: 0, x: -25 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 25 }}
                  transition={{ duration: 0.15, delay: 0.05 }}
                >
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold transition-all duration-700 ${
                    isDark 
                      ? 'bg-gradient-to-br from-blue-500/60 to-purple-500/60 text-blue-100' 
                      : 'bg-gradient-to-br from-amber-300/80 to-orange-300/80 text-amber-900'
                  }`}>
                    {testimonials[currentIndex]?.name?.charAt(0)}
                  </div>
                  <div>
                    <h4 className={`font-bold transition-colors duration-700 ${
                      isDark ? 'text-blue-100' : 'text-amber-900'
                    }`}>
                      {testimonials[currentIndex]?.name}
                    </h4>
                    <p className={`text-sm transition-colors duration-700 ${
                      isDark ? 'text-blue-300' : 'text-amber-700'
                    }`}>
                      {testimonials[currentIndex]?.role} at {testimonials[currentIndex]?.company}
                    </p>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>


          </div>
        </div>

        {/* Right Half - Content & Form */}
        <div className="w-1/2 flex flex-col justify-center p-8">
          <div className="max-w-lg">
            {/* Header */}
            <motion.h1 
              className="font-playfair text-4xl md:text-5xl font-bold mb-6 pt-16"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <span className={`bg-clip-text text-transparent transition-all duration-700 ${
                isDark 
                  ? 'bg-gradient-to-r from-blue-300 via-purple-300 to-pink-300' 
                  : 'bg-gradient-to-r from-amber-700 via-orange-700 to-rose-700'
              }`}>
                Testimonials
              </span>
            </motion.h1>

            <motion.p 
              className={`font-opensans text-lg mb-8 leading-relaxed transition-colors duration-700 ${
                isDark ? 'text-blue-100' : 'text-amber-800'
              }`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
               Valuable feedback from professionals I’ve collaborated with. Would you like to share your thoughts? Your experience matters.
            </motion.p>

            {/* Add Testimonial Form */}
            <motion.form 
              onSubmit={handleSubmit}
              className={`font-poppins group relative w-full rounded-3xl overflow-hidden backdrop-blur-xl border p-8 transition-all duration-700 ${
                isDark 
                  ? 'bg-gradient-to-br from-blue-600/20 via-purple-600/20 to-pink-600/20 border-white/20' 
                  : 'bg-gradient-to-br from-amber-100/40 via-orange-100/40 to-rose-100/40 border-amber-200/60'
              }`}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              {/* Animated glassmorphism overlay */}
              <motion.div
                className="absolute inset-0 opacity-60"
                animate={{
                  background: isDark ? [
                    'linear-gradient(135deg, rgba(99, 102, 241, 0.3), rgba(168, 85, 247, 0.3), rgba(236, 72, 153, 0.3))',
                    'linear-gradient(225deg, rgba(168, 85, 247, 0.3), rgba(236, 72, 153, 0.3), rgba(99, 102, 241, 0.3))',
                    'linear-gradient(315deg, rgba(236, 72, 153, 0.3), rgba(99, 102, 241, 0.3), rgba(168, 85, 247, 0.3))',
                    'linear-gradient(45deg, rgba(99, 102, 241, 0.3), rgba(168, 85, 247, 0.3), rgba(236, 72, 153, 0.3))'
                  ] : [
                    'linear-gradient(135deg, rgba(251, 191, 36, 0.4), rgba(249, 115, 22, 0.4), rgba(244, 63, 94, 0.4))',
                    'linear-gradient(225deg, rgba(249, 115, 22, 0.4), rgba(244, 63, 94, 0.4), rgba(251, 191, 36, 0.4))',
                    'linear-gradient(315deg, rgba(244, 63, 94, 0.4), rgba(251, 191, 36, 0.4), rgba(249, 115, 22, 0.4))',
                    'linear-gradient(45deg, rgba(251, 191, 36, 0.4), rgba(249, 115, 22, 0.4), rgba(244, 63, 94, 0.4))'
                  ]
                }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              />

              <div className="mb-6 relative z-10 flex justify-between items-start">
                <div>
                  <h3 className={`font-roboto text-xl font-bold mb-2 transition-all duration-700 ${isDark ? 'text-white' : 'text-gray-800'}`}>
                    Share Your Experience
                  </h3>
                  <p className={`font-opensans text-xs transition-all duration-700 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                    Tell us about your experience
                  </p>
                </div>
                
                <motion.button
                  type="submit"
                  className={`relative overflow-hidden font-semibold px-4 py-2 rounded-full flex items-center justify-center gap-2 group backdrop-blur-xl border shadow-lg relative z-10 transition-all duration-500 text-sm pointer-events-auto ${isDark ? 'text-white border-white/30' : 'text-gray-800 border-gray-800/30'}`}
                  style={{
                    background: isDark 
                      ? 'linear-gradient(135deg, rgba(99, 102, 241, 0.8), rgba(168, 85, 247, 0.8), rgba(236, 72, 153, 0.8))' 
                      : 'linear-gradient(135deg, rgba(251, 191, 36, 0.8), rgba(249, 115, 22, 0.8), rgba(244, 63, 94, 0.8))'
                  }}
                  whileHover={{ 
                    scale: 1.02, 
                    y: -2,
                    boxShadow: isDark 
                      ? '0 10px 20px rgba(99, 102, 241, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.2)'
                      : '0 10px 20px rgba(251, 191, 36, 0.3), 0 0 0 1px rgba(0, 0, 0, 0.2)'
                  }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ 
                    type: "spring",
                    stiffness: 300,
                    damping: 20
                  }}
                >
                  <motion.div
                    className="absolute inset-0"
                    animate={{
                      background: isDark ? [
                        'linear-gradient(135deg, rgba(99, 102, 241, 0.9), rgba(168, 85, 247, 0.9), rgba(236, 72, 153, 0.9))',
                        'linear-gradient(225deg, rgba(168, 85, 247, 0.9), rgba(236, 72, 153, 0.9), rgba(99, 102, 241, 0.9))',
                        'linear-gradient(315deg, rgba(236, 72, 153, 0.9), rgba(99, 102, 241, 0.9), rgba(168, 85, 247, 0.9))',
                        'linear-gradient(45deg, rgba(99, 102, 241, 0.9), rgba(168, 85, 247, 0.9), rgba(236, 72, 153, 0.9))'
                      ] : [
                        'linear-gradient(135deg, rgba(251, 191, 36, 0.9), rgba(249, 115, 22, 0.9), rgba(244, 63, 94, 0.9))',
                        'linear-gradient(225deg, rgba(249, 115, 22, 0.9), rgba(244, 63, 94, 0.9), rgba(251, 191, 36, 0.9))',
                        'linear-gradient(315deg, rgba(244, 63, 94, 0.9), rgba(251, 191, 36, 0.9), rgba(249, 115, 22, 0.9))',
                        'linear-gradient(45deg, rgba(251, 191, 36, 0.9), rgba(249, 115, 22, 0.9), rgba(244, 63, 94, 0.9))'
                      ]
                    }}
                    transition={{ duration: 8, repeat: Infinity, ease: "linear", repeatType: "loop" }}
                  />
                  
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                    initial={{ x: '-100%' }}
                    whileHover={{ x: '100%' }}
                    transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
                  />

                  <span className="font-opensans relative z-10">Submit</span>
                  <Send size={14} className="group-hover:translate-x-1 transition-transform duration-300" />
                </motion.button>
              </div>

              <div className="grid grid-cols-2 gap-3 mb-3 relative z-10">
                <motion.input
                  type="text"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className={`font-opensans w-full p-3 rounded-lg border transition-all duration-700 backdrop-blur-sm text-sm ${
                    isDark 
                      ? 'bg-slate-800/50 border-slate-600 text-white placeholder-gray-400' 
                      : 'bg-white/70 border-amber-200 text-gray-800 placeholder-gray-500'
                  } focus:outline-none ${
                    isDark ? 'focus:border-blue-500' : 'focus:border-amber-500'
                  }`}
                  whileFocus={{ scale: 1.02 }}
                  required
                />
                <motion.input
                  type="text"
                  placeholder="Your Role"
                  value={formData.role}
                  onChange={(e) => setFormData({...formData, role: e.target.value})}
                  className={`font-opensans w-full p-3 rounded-lg border transition-all duration-700 backdrop-blur-sm text-sm ${
                    isDark 
                      ? 'bg-slate-800/50 border-slate-600 text-white placeholder-gray-400' 
                      : 'bg-white/70 border-amber-200 text-gray-800 placeholder-gray-500'
                  } focus:outline-none ${
                    isDark ? 'focus:border-blue-500' : 'focus:border-amber-500'
                  }`}
                  whileFocus={{ scale: 1.02 }}
                />
              </div>

              <motion.input
                type="text"
                placeholder="Company"
                value={formData.company}
                onChange={(e) => setFormData({...formData, company: e.target.value})}
                className={`font-opensans w-full p-3 rounded-lg border transition-all duration-700 backdrop-blur-sm mb-3 text-sm relative z-10 ${
                  isDark 
                    ? 'bg-slate-800/50 border-slate-600 text-white placeholder-gray-400' 
                    : 'bg-white/70 border-amber-200 text-gray-800 placeholder-gray-500'
                } focus:outline-none ${
                  isDark ? 'focus:border-blue-500' : 'focus:border-amber-500'
                }`}
                whileFocus={{ scale: 1.02 }}
              />

              <div className="flex items-center gap-2 mb-3 relative z-10">
                <span className={`text-sm transition-colors duration-700 ${
                  isDark ? 'text-gray-300' : 'text-gray-600'
                }`}>Rating:</span>
                {[1,2,3,4,5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setFormData({...formData, rating: star})}
                    className={`${star <= formData.rating ? 'text-yellow-400' : isDark ? 'text-slate-600' : 'text-gray-400'}`}
                  >
                    <Star className="w-5 h-5 fill-current" />
                  </button>
                ))}
              </div>

              <motion.textarea
                rows={3}
                placeholder="Share your experience..."
                value={formData.text}
                onChange={(e) => setFormData({...formData, text: e.target.value})}
                className={`font-opensans w-full p-3 rounded-lg border transition-all duration-700 resize-none backdrop-blur-sm mb-4 text-sm relative z-10 ${
                  isDark 
                    ? 'bg-slate-800/50 border-slate-600 text-white placeholder-gray-400' 
                    : 'bg-white/70 border-amber-200 text-gray-800 placeholder-gray-500'
                } focus:outline-none ${
                  isDark ? 'focus:border-blue-500' : 'focus:border-amber-500'
                }`}
                whileFocus={{ scale: 1.02 }}
                required
              />


            </motion.form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Testimonials;