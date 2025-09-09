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
    <div className={`min-h-screen relative overflow-hidden scroll-smooth transition-colors duration-500 ${
      isDark 
        ? 'bg-gray-900' 
        : 'bg-gradient-to-br from-slate-50 via-white to-blue-50'
    }`}>
      {/* Floating Particles */}
      {particleConfig.map((particle, i) => (
        <FloatingParticle
          key={i}
          delay={particle.delay}
          duration={particle.duration}
          x={particle.x}
          y={particle.y}
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
          className={`w-full h-full rounded-full blur-3xl ${
            isDark 
              ? 'bg-gradient-to-r from-blue-500/10 to-purple-500/10' 
              : 'bg-gradient-to-r from-blue-400/10 to-purple-400/10'
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
            <div className={`w-96 h-[28rem] rounded-3xl shadow-2xl backdrop-blur-sm flex items-center justify-center overflow-hidden hover:shadow-3xl transition-all duration-500 ${
              isDark 
                ? 'bg-gray-800 border border-gray-700' 
                : 'bg-gradient-to-br from-blue-50 via-white to-purple-50 border border-white/60'
            }`}>
              {/* Gradient Orbs */}
              <div className={`absolute top-0 left-0 w-32 h-32 rounded-full blur-xl ${
                isDark 
                  ? 'bg-gradient-to-br from-blue-500/20 to-transparent' 
                  : 'bg-gradient-to-br from-blue-400/20 to-transparent'
              }`} />
              <div className={`absolute bottom-0 right-0 w-40 h-40 rounded-full blur-xl ${
                isDark 
                  ? 'bg-gradient-to-tl from-purple-500/20 to-transparent' 
                  : 'bg-gradient-to-tl from-purple-400/20 to-transparent'
              }`} />
              
              <div className={`text-lg font-medium z-10 ${
                isDark ? 'text-gray-300' : 'text-gray-400'
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
              <span className={isDark ? 'text-white' : 'text-gray-800'}>Hi, I'm </span>
              <motion.span 
                className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent relative inline-block"
                animate={{ 
                  backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
                }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                style={{ backgroundSize: '200% 200%' }}
              >
                Shikhar
                {/* Glowing underline */}
                <motion.div
                  className="absolute -bottom-2 left-0 h-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full shadow-lg"
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
              <motion.p className={`font-source text-xl md:text-2xl font-light relative z-10 ${
                isDark ? 'text-gray-200' : 'text-gray-600'
              }`}>
                Full Stack Developer & UI/UX Designer
              </motion.p>

            </motion.div>
            
            <motion.p 
              className={`font-roboto text-lg mb-8 leading-relaxed ${
                isDark ? 'text-gray-300' : 'text-gray-500'
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
                className="group relative bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 rounded-full font-medium transition-all duration-500 overflow-hidden shadow-lg hover:shadow-2xl"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", damping: 15, stiffness: 300 }}
              >
                {/* Shimmer effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent"
                  initial={{ x: '-100%' }}
                  whileHover={{ x: '100%' }}
                  transition={{ duration: 0.8, ease: "easeInOut" }}
                />
                <span className="relative z-10 flex items-center gap-2">
                  {labels.viewMyWork}
                  <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-300" />
                </span>
              </motion.button>
              
              <Link to="/contact">
                <motion.button 
                  className={`group relative border-2 px-8 py-4 rounded-full font-medium transition-all duration-500 backdrop-blur-sm shadow-lg hover:shadow-2xl ${
                    isDark 
                      ? 'border-gray-600 hover:border-blue-400 text-gray-200 hover:text-blue-400 bg-gray-800 hover:bg-gray-700' 
                      : 'border-gray-300 hover:border-blue-500 text-gray-700 hover:text-blue-600 bg-white/60 hover:bg-white/90'
                  }`}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", damping: 15, stiffness: 300 }}
                >
                  <span className="relative z-10">{labels.getInTouch}</span>
                {/* Hover background */}
                <motion.div
                  className={`absolute inset-0 rounded-full ${
                    isDark 
                      ? 'bg-gradient-to-r from-gray-700/50 to-gray-600/50' 
                      : 'bg-gradient-to-r from-blue-50 to-purple-50'
                  }`}
                  initial={{ scale: 0, opacity: 0 }}
                  whileHover={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                />
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