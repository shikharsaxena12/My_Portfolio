import React, { useEffect, useState, useMemo, useCallback } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { FaGithub, FaLinkedin, FaTwitter, FaInstagram } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext';
import { useContent } from '../contexts/ContentContext';
import Navbar from './Navbar';
import { HomeBackground } from '../portfolio_animation';
import { throttle } from '../utils/performance';

const Portfolio = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const { isDark = false } = useTheme() || {};
  const { content } = useContent();

  const labels = {
    viewMyWork: 'View My Resume',
    getInTouch: 'Get In Touch'
  };

  const socialLinks = useMemo(() => [
    { icon: FaGithub, href: '#', color: isDark ? '#f0f6fc' : '#24292f' },
    { icon: FaLinkedin, href: '#', color: '#0A66C2' },
    { icon: FaTwitter, href: '#', color: '#1D9BF0' },
    { icon: FaInstagram, href: '#', color: '#E1306C' },
    { icon: MdEmail, href: '#', color: '#EA4335' }
  ], [isDark]);



  const throttledMouseMove = useCallback(
    throttle((e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    }, 50),
    []
  );

  useEffect(() => {
    window.addEventListener('mousemove', throttledMouseMove);
    return () => window.removeEventListener('mousemove', throttledMouseMove);
  }, [throttledMouseMove]);

  const particleConfig = useMemo(() => 
    [...Array(6)].map((_, i) => ({
      delay: i * 1,
      duration: 4 + i,
      x: 20 + (i * 15),
      y: 20 + (i * 10)
    })), []
  );

  return (
    <div className={`min-h-screen relative overflow-hidden scroll-smooth ${isDark ? 'bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600' : 'bg-gradient-to-br from-amber-100 via-orange-200 to-rose-300'}`}>
      {/* Minimal Floating Particles */}
      {particleConfig.map((particle, i) => (
        <motion.div
          key={i}
          className={`absolute w-2 h-2 rounded-full ${
            isDark ? 'bg-blue-400/30' : 'bg-amber-400/40'
          }`}
          style={{ 
            left: `${particle.x}%`, 
            top: `${particle.y}%`,
            willChange: 'transform'
          }}
          animate={{
            y: [0, -50, 0],
            opacity: [0.3, 0.8, 0.3]
          }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      ))}
      
      {/* Simplified Cursor Glow */}
      <motion.div
        className="fixed w-64 h-64 pointer-events-none z-0"
        animate={{
          x: mousePosition.x - 128,
          y: mousePosition.y - 128,
        }}
        transition={{ type: "tween", duration: 0.3 }}
      >
        <div
          className={`w-full h-full rounded-full blur-2xl ${
            isDark 
              ? 'bg-gradient-to-r from-blue-500/8 to-purple-500/8' 
              : 'bg-gradient-to-r from-amber-400/12 to-orange-400/12'
          }`}
        />
      </motion.div>
      
      <HomeBackground />
      <Navbar />
      
      <div className="relative z-10 container mx-auto px-6 pt-32 pb-20">
        {!content.home?.image && !content.home?.name && !content.home?.title && !content.home?.description ? (
          <div className={`text-center py-32 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            <h1 className={`text-6xl font-bold mb-6 ${isDark ? 'text-white' : 'text-black'}`}>
              Home Page is Coming Soon
            </h1>
            <p className="text-2xl">
              We're working hard to bring you an amazing portfolio experience!
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-[70vh]">
            {/* Left Side - Enhanced Image Frame */}
            <motion.div 
              className="flex justify-center lg:justify-start"
              initial={{ opacity: 0, x: -50, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <div className={`w-96 h-[28rem] rounded-3xl shadow-2xl backdrop-blur-sm flex items-center justify-center overflow-hidden hover:shadow-3xl transition-all duration-700 ${
                isDark 
                  ? 'bg-gray-800 border border-gray-700' 
                  : 'bg-gradient-to-br from-amber-50 via-orange-50 to-rose-50 border border-orange-200/60'
              }`}>
                {/* Gradient Orbs */}
                <div className={`absolute top-0 left-0 w-32 h-32 rounded-full blur-xl transition-all duration-700 ${
                  isDark 
                    ? 'bg-gradient-to-br from-blue-500/20 to-transparent' 
                    : 'bg-gradient-to-br from-amber-400/30 to-transparent'
                }`} />
                <div className={`absolute bottom-0 right-0 w-40 h-40 rounded-full blur-xl transition-all duration-700 ${
                  isDark 
                    ? 'bg-gradient-to-tl from-purple-500/20 to-transparent' 
                    : 'bg-gradient-to-tl from-orange-400/30 to-transparent'
                }`} />
                
                {content.home?.image ? (
                  <img 
                    src={content.home.image} 
                    alt="Profile" 
                    className="w-full h-full object-cover" 
                    style={{
                      transform: `scale(${(content.home?.imageSettings?.scale || 100) / 100}) rotate(${content.home?.imageSettings?.rotation || 0}deg)`,
                      filter: `brightness(${content.home?.imageSettings?.brightness || 100}%) contrast(${content.home?.imageSettings?.contrast || 100}%) saturate(${content.home?.imageSettings?.saturation || 100}%)`,
                      objectPosition: `${content.home?.imageSettings?.positionX || 50}% ${content.home?.imageSettings?.positionY || 50}%`
                    }}
                  />
                ) : (
                  <div className={`text-center py-16 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                    <h3 className={`text-2xl font-bold mb-4 ${isDark ? 'text-white' : 'text-black'}`}>
                      Sorry, No Content Available
                    </h3>
                    <p className="text-lg">
                      Profile image will appear here when loaded.
                    </p>
                  </div>
                )}
              </div>
            </motion.div>

            {/* Right Side - Content */}
            <motion.div 
              className="text-left lg:pl-8"
              initial={{ opacity: 0, x: 50, y: 20 }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            >
              <div className={`text-center py-16 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                <h3 className={`text-2xl font-bold mb-4 ${isDark ? 'text-white' : 'text-black'}`}>
                  Sorry, No Content Available
                </h3>
                <p className="text-lg">
                  Profile content will appear here when loaded.
                </p>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Portfolio;