import React, { useState, useEffect } from 'react';
import { Play, X, Image, Video, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../contexts/ThemeContext';
import Navbar from './Navbar';
import { HomeBackground } from '../portfolio_animation';

const Gallery = () => {
  const { isDark = false } = useTheme() || {};
  const [selectedMedia, setSelectedMedia] = useState(null);
  const [currentCard, setCurrentCard] = useState(0);

  const labels = {
    myGallery: 'My Gallery',
    galleryDescription: 'A collection of my work, projects, and creative moments'
  };

  const mediaItems = [
    { id: 1, type: 'image', src: '/api/placeholder/400/300', title: 'React Portfolio Dashboard', category: 'Web Development' },
    { id: 2, type: 'video', src: '/api/placeholder/400/300', title: '3D Animation Demo', category: 'Animation' },
    { id: 3, type: 'image', src: '/api/placeholder/400/300', title: 'Mobile App UI', category: 'UI/UX Design' },
    { id: 4, type: 'image', src: '/api/placeholder/400/300', title: 'E-commerce Platform', category: 'Web Development' },
    { id: 5, type: 'video', src: '/api/placeholder/400/300', title: 'Framer Motion Tutorial', category: 'Tutorial' },
    { id: 6, type: 'image', src: '/api/placeholder/400/300', title: 'Brand Identity Design', category: 'Branding' },
    { id: 7, type: 'video', src: '/api/placeholder/400/300', title: 'Code Review Session', category: 'Development' },
    { id: 8, type: 'image', src: '/api/placeholder/400/300', title: 'Dashboard Analytics', category: 'Data Visualization' }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentCard((prev) => (prev + 1) % mediaItems.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [mediaItems.length]);

  const MediaCard = ({ item, index }) => (
    <motion.div
      key={item.id}
      className={`font-poppins group relative w-full h-full rounded-3xl overflow-hidden backdrop-blur-xl border cursor-pointer transition-all duration-700 ${
        isDark 
          ? 'bg-gradient-to-br from-blue-900/30 via-purple-900/30 to-pink-900/30 border-blue-400/20' 
          : 'bg-gradient-to-br from-amber-100/60 via-orange-100/60 to-rose-100/60 border-amber-300/30'
      }`}
      onClick={() => setSelectedMedia(item)}
      initial={{ 
        rotateY: 360,
        rotateX: 90,
        rotateZ: 180,
        scale: 0.2,
        opacity: 0,
        y: 100,
        x: 80
      }}
      animate={{ 
        rotateY: 0,
        rotateX: 0,
        rotateZ: 0,
        scale: 1,
        opacity: 1,
        y: 0,
        x: 0
      }}
      exit={{ 
        rotateY: -360,
        rotateX: -90,
        rotateZ: -180,
        scale: 0.2,
        opacity: 0,
        y: -100,
        x: -80
      }}
      transition={{ 
        duration: 1.0,
        ease: [0.4, 0, 0.2, 1],
        type: "tween"
      }}
      style={{ 
        transformStyle: 'preserve-3d',
        boxShadow: isDark 
          ? '0 32px 64px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(148, 163, 184, 0.1), inset 0 1px 0 rgba(148, 163, 184, 0.1)'
          : '0 32px 64px rgba(245, 158, 11, 0.08), 0 0 0 1px rgba(245, 158, 11, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.9)'
      }}
    >
      {/* Animated glassmorphism overlay */}
      <motion.div
        className="absolute inset-0 opacity-60"
        animate={{
          background: isDark ? [
            'linear-gradient(135deg, rgba(59, 130, 246, 0.3), rgba(147, 51, 234, 0.3), rgba(236, 72, 153, 0.3))',
            'linear-gradient(225deg, rgba(147, 51, 234, 0.3), rgba(236, 72, 153, 0.3), rgba(59, 130, 246, 0.3))',
            'linear-gradient(315deg, rgba(236, 72, 153, 0.3), rgba(59, 130, 246, 0.3), rgba(147, 51, 234, 0.3))',
            'linear-gradient(45deg, rgba(59, 130, 246, 0.3), rgba(147, 51, 234, 0.3), rgba(236, 72, 153, 0.3))'
          ] : [
            'linear-gradient(135deg, rgba(245, 158, 11, 0.4), rgba(249, 115, 22, 0.4), rgba(244, 63, 94, 0.4))',
            'linear-gradient(225deg, rgba(249, 115, 22, 0.4), rgba(244, 63, 94, 0.4), rgba(245, 158, 11, 0.4))',
            'linear-gradient(315deg, rgba(244, 63, 94, 0.4), rgba(245, 158, 11, 0.4), rgba(249, 115, 22, 0.4))',
            'linear-gradient(45deg, rgba(245, 158, 11, 0.4), rgba(249, 115, 22, 0.4), rgba(244, 63, 94, 0.4))'
          ]
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "linear", repeatType: "loop" }}
      />
      
      {/* Floating Particles around card */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          className={`absolute w-2 h-2 rounded-full transition-all duration-700 ${
            isDark 
              ? 'bg-gradient-to-r from-blue-400 to-purple-400' 
              : 'bg-gradient-to-r from-amber-400 to-orange-400'
          }`}
          style={{
            left: `${20 + (i * 10)}%`,
            top: `${10 + (i * 12)}%`,
          }}
          animate={{
            y: [0, -20, 0],
            opacity: [0.3, 1, 0.3],
            scale: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 2 + (i * 0.2),
            repeat: Infinity,
            delay: i * 0.3,
          }}
        />
      ))}
      
      {/* Elegant border shimmer */}
      <motion.div
        className="absolute inset-0 rounded-3xl"
        style={{
          background: isDark 
            ? 'linear-gradient(45deg, transparent, rgba(59, 130, 246, 0.15), transparent, rgba(147, 51, 234, 0.15), transparent)'
            : 'linear-gradient(45deg, transparent, rgba(245, 158, 11, 0.15), transparent, rgba(249, 115, 22, 0.15), transparent)',
          backgroundSize: '400% 400%'
        }}
        animate={{
          backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />
      
      {/* Media Container */}
      <div className="relative h-72 overflow-hidden rounded-t-3xl">
        <motion.div 
          className={`w-full h-full flex items-center justify-center relative transition-all duration-700 ${
            isDark 
              ? 'bg-gradient-to-br from-slate-800/95 via-slate-700/90 to-slate-800/95' 
              : 'bg-gradient-to-br from-amber-50/95 via-orange-50/90 to-rose-50/95'
          }`}
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          {/* Sophisticated background pattern */}
          <motion.div
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage: isDark
                ? 'radial-gradient(circle at 25% 35%, rgba(59, 130, 246, 0.6) 0%, transparent 50%), radial-gradient(circle at 75% 65%, rgba(147, 51, 234, 0.6) 0%, transparent 50%)'
                : 'radial-gradient(circle at 25% 35%, rgba(245, 158, 11, 0.6) 0%, transparent 50%), radial-gradient(circle at 75% 65%, rgba(249, 115, 22, 0.6) 0%, transparent 50%)'
            }}
            animate={{ 
              rotate: [0, 360],
              scale: [1, 1.05, 1]
            }}
            transition={{ 
              rotate: { duration: 30, repeat: Infinity, ease: "linear" },
              scale: { duration: 6, repeat: Infinity, ease: "easeInOut" }
            }}
          />
          
          {/* Elegant floating orbs */}
          <motion.div
            className="absolute inset-0"
            animate={{
              background: isDark ? [
                'radial-gradient(circle at 15% 15%, rgba(59, 130, 246, 0.08) 0%, transparent 25%)',
                'radial-gradient(circle at 85% 85%, rgba(147, 51, 234, 0.08) 0%, transparent 25%)',
                'radial-gradient(circle at 15% 85%, rgba(236, 72, 153, 0.08) 0%, transparent 25%)',
                'radial-gradient(circle at 85% 15%, rgba(59, 130, 246, 0.08) 0%, transparent 25%)'
              ] : [
                'radial-gradient(circle at 15% 15%, rgba(245, 158, 11, 0.15) 0%, transparent 25%)',
                'radial-gradient(circle at 85% 85%, rgba(249, 115, 22, 0.15) 0%, transparent 25%)',
                'radial-gradient(circle at 15% 85%, rgba(244, 63, 94, 0.15) 0%, transparent 25%)',
                'radial-gradient(circle at 85% 15%, rgba(245, 158, 11, 0.15) 0%, transparent 25%)'
              ]
            }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          />
          
          <motion.div 
            className={`text-xl font-semibold z-10 transition-colors duration-700 ${
              isDark ? 'text-slate-300' : 'text-amber-700'
            }`}
            animate={{ 
              scale: [1, 1.01, 1],
              opacity: [0.9, 1, 0.9]
            }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          >
            Media Preview
          </motion.div>
        </motion.div>
        
        {/* Play Button for Videos */}
        {item.type === 'video' && (
          <motion.div 
            className="absolute inset-0 flex items-center justify-center"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className={`w-20 h-20 rounded-full flex items-center justify-center shadow-2xl backdrop-blur-sm border transition-all duration-700 ${
              isDark 
                ? 'bg-gradient-to-r from-blue-500 to-purple-500 border-blue-400/20 group-hover:shadow-blue-500/50' 
                : 'bg-gradient-to-r from-amber-500 to-orange-500 border-amber-300/20 group-hover:shadow-amber-500/50'
            }`}>
              <Play size={28} className="text-white ml-1" fill="white" />
            </div>
          </motion.div>
        )}
        
        {/* Type Badge */}
        <div className="absolute top-4 right-4">
          <motion.div 
            className={`p-3 rounded-2xl backdrop-blur-xl border shadow-lg transition-all duration-700 ${
              isDark 
                ? 'bg-black/30 border-white/10' 
                : 'bg-white/50 border-amber-200/30'
            }`}
            whileHover={{ scale: 1.1, rotate: 5 }}
          >
            {item.type === 'video' ? (
              <Video size={18} className={isDark ? 'text-blue-400' : 'text-amber-600'} />
            ) : (
              <Image size={18} className={isDark ? 'text-emerald-400' : 'text-orange-600'} />
            )}
          </motion.div>
        </div>
      </div>
      
      {/* Content Section */}
      <motion.div 
        className="p-8 relative z-10 flex flex-col h-[278px]"
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.6, ease: "easeOut" }}
      >
        <motion.h3 
          className={`font-roboto text-2xl font-bold mb-4 transition-colors duration-700 ${
            isDark ? 'text-blue-100' : 'text-amber-800'
          }`}
          initial={{ y: 15, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5, ease: "easeOut" }}
        >
          {item.title}
        </motion.h3>
        
        <motion.div 
          className={`inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium mb-6 w-fit transition-all duration-700 ${
            isDark 
              ? 'bg-blue-500/20 text-blue-300 border border-blue-500/30' 
              : 'bg-amber-100 text-amber-700 border border-amber-300'
          }`}
          initial={{ y: 15, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5, ease: "easeOut" }}
        >
          {item.category}
        </motion.div>
        
        <motion.button 
          className={`relative overflow-hidden font-semibold px-6 py-3 rounded-full flex items-center justify-center gap-3 w-full group backdrop-blur-xl border shadow-2xl transition-all duration-700 ${
            isDark 
              ? 'text-white border-blue-400/30' 
              : 'text-white border-amber-300/30'
          }`}
          style={{
            background: isDark 
              ? 'linear-gradient(135deg, rgba(59, 130, 246, 0.8), rgba(147, 51, 234, 0.8), rgba(236, 72, 153, 0.8))'
              : 'linear-gradient(135deg, rgba(245, 158, 11, 0.9), rgba(249, 115, 22, 0.9), rgba(244, 63, 94, 0.9))'
          }}
          whileHover={{ 
            scale: 1.02, 
            y: -2,
            boxShadow: isDark 
              ? '0 15px 30px rgba(59, 130, 246, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.2)'
              : '0 15px 30px rgba(245, 158, 11, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.2)'
          }}
          whileTap={{ scale: 0.98 }}
          transition={{ 
            type: "spring",
            stiffness: 300,
            damping: 20
          }}
          onClick={(e) => {
            e.stopPropagation();
            setSelectedMedia(item);
          }}
        >
          <motion.div
            className="absolute inset-0"
            animate={{
              background: isDark ? [
                'linear-gradient(135deg, rgba(59, 130, 246, 0.9), rgba(147, 51, 234, 0.9), rgba(236, 72, 153, 0.9))',
                'linear-gradient(225deg, rgba(147, 51, 234, 0.9), rgba(236, 72, 153, 0.9), rgba(59, 130, 246, 0.9))',
                'linear-gradient(315deg, rgba(236, 72, 153, 0.9), rgba(59, 130, 246, 0.9), rgba(147, 51, 234, 0.9))',
                'linear-gradient(45deg, rgba(59, 130, 246, 0.9), rgba(147, 51, 234, 0.9), rgba(236, 72, 153, 0.9))'
              ] : [
                'linear-gradient(135deg, rgba(245, 158, 11, 1), rgba(249, 115, 22, 1), rgba(244, 63, 94, 1))',
                'linear-gradient(225deg, rgba(249, 115, 22, 1), rgba(244, 63, 94, 1), rgba(245, 158, 11, 1))',
                'linear-gradient(315deg, rgba(244, 63, 94, 1), rgba(245, 158, 11, 1), rgba(249, 115, 22, 1))',
                'linear-gradient(45deg, rgba(245, 158, 11, 1), rgba(249, 115, 22, 1), rgba(244, 63, 94, 1))'
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
          
          <span className="relative z-10">View Project</span>
          <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform duration-300 relative z-10" />
        </motion.button>
      </motion.div>
    </motion.div>
  );

  return (
    <div className={`min-h-screen overflow-hidden transition-all duration-1000 ${
      isDark 
        ? 'bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600' 
        : 'bg-gradient-to-br from-amber-100 via-orange-200 to-rose-300'
    }`}>
      <HomeBackground />
      <Navbar />
      
      <div className="relative z-10 container mx-auto px-6 pt-32 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 min-h-screen">
          
          {/* Left Side - Main Text */}
          <div className="space-y-8">
            <div className="sticky top-32">
              <h1 className="font-playfair text-4xl md:text-5xl font-bold mb-6">
                <span className={`bg-clip-text text-transparent transition-all duration-700 ${
                  isDark 
                    ? 'bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400' 
                    : 'bg-gradient-to-r from-amber-600 via-orange-600 to-rose-600'
                }`}>
                  {labels.myGallery}
                </span>
              </h1>
              
              <h2 className={`font-montserrat text-xl md:text-2xl font-light mb-8 transition-colors duration-700 ${
                isDark ? 'text-blue-100' : 'text-amber-800'
              }`}>
                Visual Portfolio & Creative Showcase
              </h2>
              
              <div className={`font-opensans text-lg leading-relaxed space-y-6 transition-colors duration-700 ${
                isDark ? 'text-blue-200' : 'text-amber-700'
              }`}>
                <p>
                  {labels.galleryDescription}
                </p>
                
                <p>
                  Welcome to my creative gallery where innovation meets artistry. Each piece represents a journey of exploration, 
                  pushing the boundaries of web development and design.
                </p>
                
                <p>
                  From interactive web applications to stunning visual designs, this collection showcases the evolution of my 
                  technical skills and creative vision. Every project tells a story of problem-solving, user experience, and 
                  attention to detail.
                </p>
              </div>
            </div>
          </div>

          {/* Right Side - Single Card */}
          <motion.div
            className="flex items-start justify-center pt-0"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="relative w-96 h-[550px]" style={{ perspective: '2000px', transformStyle: 'preserve-3d' }}>
              <AnimatePresence mode="wait">
                <MediaCard key={mediaItems[currentCard].id} item={mediaItems[currentCard]} index={currentCard} />
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
        
        {/* Modal */}
        {selectedMedia && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-50 p-4">
            <div
              className={`font-montserrat relative max-w-4xl w-full rounded-2xl overflow-hidden backdrop-blur-xl border transition-all duration-700 ${
                isDark 
                  ? 'bg-gradient-to-br from-blue-900/40 via-purple-900/40 to-pink-900/40 border-blue-400/30' 
                  : 'bg-gradient-to-br from-amber-100/80 via-orange-100/80 to-rose-100/80 border-amber-300/50'
              }`}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Animated glassmorphism overlay */}
              <motion.div
                className="absolute inset-0 opacity-60 z-0"
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
              <button
                onClick={() => setSelectedMedia(null)}
                className={`absolute top-4 right-4 z-20 p-2 rounded-full backdrop-blur-xl border transition-all duration-700 ${
                  isDark 
                    ? 'bg-black/50 text-white hover:bg-black/70 border-white/20' 
                    : 'bg-white/50 text-amber-800 hover:bg-white/70 border-amber-300/30'
                }`}
              >
                <X size={20} />
              </button>
              
              <div className={`relative aspect-video flex items-center justify-center transition-all duration-700 z-10 ${
                isDark ? 'bg-gray-900/50' : 'bg-amber-100/50'
              }`}>
                <span className={`text-lg transition-colors duration-700 ${
                  isDark ? 'text-white' : 'text-amber-800'
                }`}>
                  {selectedMedia.type === 'video' ? 'Video Player' : 'Full Size Image'}
                </span>
              </div>
              
              <div className="relative p-6 z-10">
                <h2 className={`font-playfair text-2xl font-bold mb-2 transition-colors duration-700 ${
                  isDark ? 'text-white' : 'text-amber-800'
                }`}>
                  {selectedMedia.title}
                </h2>
                <p className={`font-opensans transition-colors duration-700 ${
                  isDark ? 'text-gray-300' : 'text-amber-700'
                }`}>
                  {selectedMedia.category} • {selectedMedia.type === 'video' ? 'Video content' : 'Image content'}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Gallery;