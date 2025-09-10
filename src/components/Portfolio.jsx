import React, { useEffect, useState, useMemo } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { ArrowRight, Sparkles, Moon, Sun } from 'lucide-react';
import { FaGithub, FaLinkedin, FaTwitter, FaInstagram, FaYoutube, FaDiscord } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext';
import Navbar from './Navbar';
import { HomeBackground } from '../portfolio_animation';

const Portfolio = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const { isDark = false, toggleTheme = () => {} } = useTheme() || {};
  const controls = useAnimation();

  const labels = {
    viewMyWork: 'View My Resume',
    getInTouch: 'Get In Touch'
  };

  const socialLinks = useMemo(() => [
    { 
      icon: FaGithub, 
      href: '#', 
      color: isDark ? '#f0f6fc' : '#24292f',
      hoverColor: isDark ? '#c9d1d9' : '#0969da'
    },
    { 
      icon: FaLinkedin, 
      href: '#', 
      color: '#0A66C2',
      hoverColor: '#004182'
    },
    { 
      icon: FaTwitter, 
      href: '#', 
      color: '#1D9BF0',
      hoverColor: '#1A8CD8'
    },
    { 
      icon: FaInstagram, 
      href: '#', 
      color: '#E1306C',
      hoverColor: '#C13584'
    },
    { 
      icon: MdEmail, 
      href: '#', 
      color: '#EA4335',
      hoverColor: '#D33B2C'
    }
  ], [isDark]);



  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

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

  const particleConfig = useMemo(() => 
    [...Array(15)].map((_, i) => ({
      delay: i * 0.5,
      duration: 3 + Math.random() * 2,
      x: Math.random() * 100,
      y: Math.random() * 100
    })), []
  );

  return (
    <div className={`min-h-screen relative overflow-hidden scroll-smooth transition-all duration-1000 ${isDark ? 'bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600' : 'bg-gradient-to-br from-amber-100 via-orange-200 to-rose-300'}`}>
      {/* Floating Particles */}
      {particleConfig.map((particle, i) => (
        <motion.div
          key={i}
          className={`absolute w-2 h-2 rounded-full transition-all duration-700 ${
            isDark ? 'bg-gradient-to-r from-blue-400 to-purple-400' : 'bg-gradient-to-r from-amber-400 to-orange-400'
          } opacity-20`}
          style={{ left: `${particle.x}%`, top: `${particle.y}%` }}
          animate={{
            y: [0, -100, 0],
            opacity: [0, 1, 0],
            scale: [0, 1, 0]
          }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      ))}
      
      {/* Interactive 3D Cursor Glow */}
      <motion.div
        className="fixed w-96 h-96 pointer-events-none z-0"
        style={{ perspective: '1000px' }}
        animate={{
          x: mousePosition.x - 192,
          y: mousePosition.y - 192,
        }}
        transition={{ type: "spring", damping: 40, stiffness: 300, mass: 0.5 }}
      >
        <motion.div
          className={`w-full h-full rounded-full blur-3xl transition-all duration-700 ${
            isDark 
              ? 'bg-gradient-to-r from-blue-500/10 to-purple-500/10' 
              : 'bg-gradient-to-r from-amber-400/15 to-orange-400/15'
          }`}
          animate={{
            rotateX: [0, 15, -15, 0],
            rotateY: [0, -15, 15, 0],
            scale: [1, 1.1, 0.9, 1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          style={{ transformStyle: 'preserve-3d' }}
        />
      </motion.div>
      
      <HomeBackground />
      <Navbar />
      
      <div className="relative z-10 container mx-auto px-6 pt-32 pb-20">
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
              
              <div className={`text-lg font-medium z-10 transition-all duration-700 ${
                isDark ? 'text-gray-300' : 'text-gray-600'
              }`}>Your Photo Here</div>
            </div>
          </motion.div>

          {/* Right Side - Content */}
          <motion.div 
            className="text-left lg:pl-8"
            initial={{ opacity: 0, x: 50, y: 20 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          >
            <motion.h1 
              className="font-playfair text-4xl md:text-6xl font-bold mb-6 relative"
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
            >
              <span className={`transition-all duration-700 ${isDark ? 'text-white' : 'text-gray-800'}`}>Hi, I'm </span>
              <motion.span 
                className={`relative inline-block transition-all duration-700 ${
                  isDark 
                    ? 'text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.8)]' 
                    : 'text-gray-900 drop-shadow-[0_0_20px_rgba(0,0,0,0.8)]'
                }`}
                animate={{ 
                  textShadow: isDark 
                    ? [
                        '0 0 20px rgba(255,255,255,0.8), 0 0 40px rgba(59,130,246,0.6)',
                        '0 0 20px rgba(255,255,255,0.8), 0 0 40px rgba(147,51,234,0.6)',
                        '0 0 20px rgba(255,255,255,0.8), 0 0 40px rgba(236,72,153,0.6)',
                        '0 0 20px rgba(255,255,255,0.8), 0 0 40px rgba(59,130,246,0.6)'
                      ]
                    : [
                        '0 0 20px rgba(0,0,0,0.8), 0 0 40px rgba(245,158,11,0.8)',
                        '0 0 20px rgba(0,0,0,0.8), 0 0 40px rgba(249,115,22,0.8)',
                        '0 0 20px rgba(0,0,0,0.8), 0 0 40px rgba(244,63,94,0.8)',
                        '0 0 20px rgba(0,0,0,0.8), 0 0 40px rgba(245,158,11,0.8)'
                      ]
                }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
              >
                Shikhar
                {/* Glowing underline */}
                <motion.div
                  className={`absolute -bottom-2 left-0 h-1 rounded-full shadow-lg transition-all duration-700 ${
                    isDark ? 'bg-gradient-to-r from-blue-600 to-purple-600' : 'bg-gradient-to-r from-amber-600 to-orange-600'
                  }`}
                  initial={{ width: 0, opacity: 0 }}
                  animate={{ width: '100%', opacity: 1 }}
                  transition={{ duration: 1.2, delay: 1, ease: "easeOut" }}
                />
              </motion.span>
            </motion.h1>
            
            <motion.div
              className="relative mb-6"
              initial={{ opacity: 0, y: 20, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: 0.6, duration: 0.6, ease: "easeOut" }}
            >
              <motion.p className={`font-source text-xl md:text-2xl font-light relative z-10 transition-all duration-700 ${
                isDark ? 'text-gray-200' : 'text-gray-700'
              }`}>
                Full Stack Developer & UI/UX Designer
              </motion.p>

            </motion.div>
            
            <motion.p 
              className={`font-roboto text-lg mb-8 leading-relaxed transition-all duration-700 ${
                isDark ? 'text-gray-300' : 'text-gray-600'
              }`}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.6, ease: "easeOut" }}
            >
              I create beautiful, functional digital experiences with clean code and thoughtful design.
            </motion.p>

            <motion.div 
              className="flex flex-col sm:flex-row gap-4 mb-8"
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: 1.0, duration: 0.6, ease: "easeOut" }}
            >
              <motion.button 
                className={`relative overflow-hidden font-semibold px-8 py-4 rounded-full flex items-center justify-center gap-2 group backdrop-blur-xl border shadow-2xl transition-all duration-500 ${isDark ? 'text-white border-white/30' : 'text-gray-800 border-gray-800/30'}`}
                style={{
                  background: isDark ? 'linear-gradient(135deg, rgba(99, 102, 241, 0.8), rgba(168, 85, 247, 0.8), rgba(236, 72, 153, 0.8))' : 'linear-gradient(135deg, rgba(251, 191, 36, 0.8), rgba(249, 115, 22, 0.8), rgba(244, 63, 94, 0.8))'
                }}
                whileHover={{ 
                  scale: 1.02, 
                  y: -2,
                  boxShadow: '0 15px 30px rgba(99, 102, 241, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.2)'
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
                
                <span className={`relative z-10 flex items-center gap-2`}>
                  {labels.viewMyWork}
                  <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-300" />
                </span>
              </motion.button>
              
              <Link to="/contact">
                <motion.button 
                  className={`relative overflow-hidden font-semibold px-8 py-4 rounded-full flex items-center justify-center gap-2 group backdrop-blur-xl border shadow-2xl transition-all duration-500 ${isDark ? 'text-white border-white/30' : 'text-gray-800 border-gray-800/30'}`}
                  style={{
                    background: isDark ? 'linear-gradient(135deg, rgba(99, 102, 241, 0.8), rgba(168, 85, 247, 0.8), rgba(236, 72, 153, 0.8))' : 'linear-gradient(135deg, rgba(251, 191, 36, 0.8), rgba(249, 115, 22, 0.8), rgba(244, 63, 94, 0.8))'
                  }}
                  whileHover={{ 
                    scale: 1.02, 
                    y: -2,
                    boxShadow: '0 15px 30px rgba(99, 102, 241, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.2)'
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
                  
                  <span className={`relative z-10`}>{labels.getInTouch}</span>
                </motion.button>
              </Link>
            </motion.div>

            {/* Enhanced Social Links */}
            <motion.div
              className="flex flex-wrap gap-4"
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: 1.2, duration: 0.6, ease: "easeOut" }}
            >
              {socialLinks.map((social, index) => {
                const Icon = social.icon;
                return (
                  <motion.a
                    key={index}
                    href={social.href}
                    className="group transition-all duration-300"
                    whileHover={{ 
                      scale: 1.15, 
                      y: -4,
                      boxShadow: "0 15px 35px rgba(0, 0, 0, 0.2)"
                    }}
                    whileTap={{ scale: 0.9 }}
                    initial={{ opacity: 0, y: 20, scale: 0.8 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ delay: 1.4 + index * 0.1, type: "spring", damping: 15, stiffness: 300 }}
                  >
                    <Icon 
                      size={32} 
                      className="relative z-10 transition-all duration-300 group-hover:scale-110" 
                      style={{ color: social.color }}
                    />
                  </motion.a>
                );
              })}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Portfolio;