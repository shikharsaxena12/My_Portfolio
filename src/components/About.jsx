import React, { useEffect, useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import { HomeBackground } from '../portfolio_animation';

const About = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [activeCard, setActiveCard] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  const { isDark = false } = useTheme() || {};
  const navigate = useNavigate();

  const labels = {
    experienceDetails: 'Experience Details',
    educationDetails: 'Education Details',
    achievementDetails: 'Achievement Details',
    recognizedPerformance: 'Recognized for outstanding performance',
    githubContributions: '500+ GitHub contributions',
    openSourceProjects: 'Contributed to 10+ open source projects',
    techSpeaker: 'Speaker at tech conferences'
  };

  useEffect(() => {
    const CARD_COUNT = 3;
    const INTERVAL_DELAY = 3000;
    
    const interval = setInterval(() => {
      setActiveCard((prev) => {
        const nextCard = (prev + 1) % CARD_COUNT;
        return Number.isInteger(nextCard) && nextCard >= 0 && nextCard < CARD_COUNT ? nextCard : 0;
      });
    }, INTERVAL_DELAY);
    
    return () => clearInterval(interval);
  }, []);

  const openModal = (type) => {
    setModalContent(type);
    setModalOpen(true);
  };

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const stats = [
    { number: "50+", label: "Projects" },
    { number: "3+", label: "Years Exp" },
    { number: "100%", label: "Dedication" }
  ];

  const experiences = [
    {
      title: "Full Stack Developer",
      company: "Tech Corp",
      period: "2022-Present",
      color: isDark ? "text-blue-400" : "text-amber-600"
    },
    {
      title: "Frontend Developer", 
      company: "StartupXYZ",
      period: "2021-2022",
      color: isDark ? "text-blue-400" : "text-amber-600"
    }
  ];

  const education = [
    {
      title: "Computer Science",
      company: "University of Tech",
      period: "2018-2022",
      color: isDark ? "text-green-400" : "text-orange-600"
    },
    {
      title: "Web Development Bootcamp",
      company: "CodeAcademy",
      period: "2021",
      color: isDark ? "text-green-400" : "text-orange-600"
    }
  ];

  const achievements = [
    {
      title: "Best Developer Award",
      company: "Tech Corp",
      period: "2023",
      color: isDark ? "text-yellow-400" : "text-rose-600"
    },
    {
      title: "Open Source Contributor",
      company: "GitHub",
      period: "2022-Present",
      color: isDark ? "text-yellow-400" : "text-rose-600"
    }
  ];

  const FloatingParticle = React.memo(({ delay, duration, x, y }) => (
    <motion.div
      className={`absolute w-2 h-2 rounded-full opacity-20 transition-all duration-700 ${
        isDark ? 'bg-gradient-to-r from-blue-400 to-purple-400' : 'bg-gradient-to-r from-amber-400 to-orange-400'
      }`}
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
      }, [isDark])}
      
      {/* Interactive Cursor Glow */}
      <motion.div
        className={`fixed w-96 h-96 rounded-full blur-3xl pointer-events-none z-0 transition-all duration-700 ${
          isDark 
            ? 'bg-gradient-to-r from-blue-500/10 to-purple-500/10' 
            : 'bg-gradient-to-r from-amber-400/15 to-orange-400/15'
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
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Left Side - About Content */}
          <motion.div 
            className="space-y-8"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            {/* About Me Title */}
            <motion.h1 
              className="font-playfair text-5xl md:text-6xl font-bold mb-6"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <span className={`bg-clip-text text-transparent transition-all duration-700 ${
                isDark ? 'bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600' : 'bg-gradient-to-r from-amber-600 via-orange-600 to-rose-600'
              }`}>
                About Me
              </span>
            </motion.h1>

            {/* Subtitle */}
            <motion.h2 
              className={`font-montserrat text-2xl md:text-3xl font-light mb-6 transition-all duration-700 ${
                isDark ? 'text-gray-200' : 'text-gray-700'
              }`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Full Stack Developer & AI Engineer
            </motion.h2>

            {/* Description */}
            <motion.p 
              className={`font-opensans text-lg leading-relaxed mb-8 transition-all duration-700 ${
                isDark ? 'text-gray-300' : 'text-gray-600'
              }`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              I create innovative digital solutions that bridge cutting-edge technology 
              with exceptional user experiences.
            </motion.p>

            {/* Stats */}
            <motion.div 
              className="grid grid-cols-3 gap-6 mb-8"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  className={`font-inter text-center p-6 rounded-2xl backdrop-blur-xl border shadow-lg relative overflow-hidden transition-all duration-700 ${
                    isDark 
                      ? 'bg-gradient-to-br from-blue-600/20 via-purple-600/20 to-pink-600/20 border-white/20' 
                      : 'bg-gradient-to-br from-amber-100/40 via-orange-100/40 to-rose-100/40 border-amber-200/60'
                  }`}
                  whileHover={{ scale: 1.05, y: -5 }}
                  transition={{ type: "spring", damping: 15, stiffness: 300 }}
                >
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
                  <div className={`text-3xl md:text-4xl font-bold mb-2 relative z-10 transition-all duration-700 ${
                    isDark ? 'text-white' : 'text-gray-800'
                  }`}>
                    {stat.number}
                  </div>
                  <div className={`text-sm font-medium relative z-10 transition-all duration-700 ${
                    isDark ? 'text-gray-200' : 'text-gray-700'
                  }`}>
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* Back to Home Button */}
            <motion.button
              onClick={() => navigate('/')}
              className={`relative overflow-hidden font-semibold px-8 py-4 rounded-full flex items-center justify-center gap-2 group backdrop-blur-xl border shadow-2xl transition-all duration-500 ${
                isDark ? 'text-white border-white/30' : 'text-gray-800 border-gray-800/30'
              }`}
              style={{
                background: isDark 
                  ? 'linear-gradient(135deg, rgba(99, 102, 241, 0.8), rgba(168, 85, 247, 0.8), rgba(236, 72, 153, 0.8))' 
                  : 'linear-gradient(135deg, rgba(251, 191, 36, 0.8), rgba(249, 115, 22, 0.8), rgba(244, 63, 94, 0.8))'
              }}
              whileHover={{ 
                scale: 1.02, 
                y: -2,
                boxShadow: isDark 
                  ? '0 15px 30px rgba(99, 102, 241, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.2)'
                  : '0 15px 30px rgba(251, 191, 36, 0.3), 0 0 0 1px rgba(0, 0, 0, 0.2)'
              }}
              whileTap={{ scale: 0.98 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ 
                delay: 1.0,
                type: "spring",
                stiffness: 300,
                damping: 20
              }}
            >
              {/* Button gradient animation */}
              <motion.div
                className="absolute inset-0"
                animate={{
                  background: isDark ? [
                    'linear-gradient(135deg, rgba(99, 102, 241, 0.9), rgba(168, 85, 247, 0.9), rgba(236, 72, 153, 0.9))',
                    'linear-gradient(225deg, rgba(168, 85, 247, 0.9), rgba(236, 72, 153, 0.9), rgba(99, 102, 241, 0.9))',
                    'linear-gradient(315deg, rgba(236, 72, 153, 0.9), rgba(99, 102, 241, 0.9), rgba(168, 85, 247, 0.9))'
                  ] : [
                    'linear-gradient(135deg, rgba(251, 191, 36, 0.9), rgba(249, 115, 22, 0.9), rgba(244, 63, 94, 0.9))',
                    'linear-gradient(225deg, rgba(249, 115, 22, 0.9), rgba(244, 63, 94, 0.9), rgba(251, 191, 36, 0.9))',
                    'linear-gradient(315deg, rgba(244, 63, 94, 0.9), rgba(251, 191, 36, 0.9), rgba(249, 115, 22, 0.9))'
                  ]
                }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              />
              
              {/* Shimmer effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                initial={{ x: '-100%' }}
                whileHover={{ x: '100%' }}
                transition={{ duration: 0.6, ease: "easeOut" }}
              />
              
              <span className="relative z-10 flex items-center gap-2">
                <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform duration-300" />
                Back to Home
              </span>
            </motion.button>
          </motion.div>

          {/* Right Side - Big Card Container */}
          <motion.div 
            className="space-y-8"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            {/* Card Container */}
            <div className="relative">
              {activeCard === 0 && (
                <div
                  className={`font-poppins relative p-8 rounded-3xl backdrop-blur-xl border cursor-pointer overflow-hidden transition-all duration-700 ${
                    isDark 
                      ? 'bg-gradient-to-br from-blue-600/20 via-purple-600/20 to-pink-600/20 border-white/20' 
                      : 'bg-gradient-to-br from-amber-100/40 via-orange-100/40 to-rose-100/40 border-amber-200/60'
                  }`}
                  onClick={() => openModal(0)}
                >
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
                  <h2 className={`font-raleway text-2xl font-bold mb-6 relative z-10 transition-all duration-700 ${
                    isDark ? 'text-white' : 'text-gray-800'
                  }`}>
                    Experience
                  </h2>
                  <div className="space-y-4 relative z-10">
                    {experiences.map((exp, index) => (
                      <div key={index} className={`p-4 rounded-xl transition-all duration-700 ${
                        isDark ? 'bg-gray-700/30' : 'bg-white/40'
                      }`}>
                        <h3 className={`font-poppins font-bold mb-1 transition-all duration-700 ${
                          isDark ? 'text-white' : 'text-gray-800'
                        }`}>
                          {exp.title}
                        </h3>
                        <p className={`text-sm ${exp.color}`}>
                          {exp.company}
                        </p>
                        <p className={`text-xs transition-all duration-700 ${
                          isDark ? 'text-gray-400' : 'text-gray-500'
                        }`}>
                          {exp.period}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeCard === 1 && (
                <div
                  className={`font-inter relative p-8 rounded-3xl backdrop-blur-xl border cursor-pointer overflow-hidden transition-all duration-700 ${
                    isDark 
                      ? 'bg-gradient-to-br from-blue-600/20 via-purple-600/20 to-pink-600/20 border-white/20' 
                      : 'bg-gradient-to-br from-amber-100/40 via-orange-100/40 to-rose-100/40 border-amber-200/60'
                  }`}
                  onClick={() => openModal(1)}
                >
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
                  <h2 className={`text-2xl font-bold mb-6 relative z-10 transition-all duration-700 ${
                    isDark ? 'text-white' : 'text-gray-800'
                  }`}>
                    Education
                  </h2>
                  <div className="space-y-4 relative z-10">
                    {education.map((edu, index) => (
                      <div key={index} className={`p-4 rounded-xl transition-all duration-700 ${
                        isDark ? 'bg-gray-700/30' : 'bg-white/40'
                      }`}>
                        <h3 className={`font-bold mb-1 transition-all duration-700 ${
                          isDark ? 'text-white' : 'text-gray-800'
                        }`}>
                          {edu.title}
                        </h3>
                        <p className={`text-sm ${edu.color}`}>
                          {edu.company}
                        </p>
                        <p className={`text-xs transition-all duration-700 ${
                          isDark ? 'text-gray-400' : 'text-gray-500'
                        }`}>
                          {edu.period}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeCard === 2 && (
                <div
                  className={`font-poppins relative p-8 rounded-3xl backdrop-blur-xl border cursor-pointer overflow-hidden transition-all duration-700 ${
                    isDark 
                      ? 'bg-gradient-to-br from-blue-600/20 via-purple-600/20 to-pink-600/20 border-white/20' 
                      : 'bg-gradient-to-br from-amber-100/40 via-orange-100/40 to-rose-100/40 border-amber-200/60'
                  }`}
                  onClick={() => openModal(2)}
                >
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
                  <h2 className={`text-2xl font-bold mb-6 relative z-10 transition-all duration-700 ${
                    isDark ? 'text-white' : 'text-gray-800'
                  }`}>
                    Achievements
                  </h2>
                  <div className="space-y-4 relative z-10">
                    {achievements.map((ach, index) => (
                      <div key={index} className={`p-4 rounded-xl transition-all duration-700 ${
                        isDark ? 'bg-gray-700/30' : 'bg-white/40'
                      }`}>
                        <h3 className={`font-bold mb-1 transition-all duration-700 ${
                          isDark ? 'text-white' : 'text-gray-800'
                        }`}>
                          {ach.title}
                        </h3>
                        <p className={`text-sm ${ach.color}`}>
                          {ach.company}
                        </p>
                        <p className={`text-xs transition-all duration-700 ${
                          isDark ? 'text-gray-400' : 'text-gray-500'
                        }`}>
                          {ach.period}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </div>

      </div>

      {/* Modal - Outside main container */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-md flex items-center justify-center z-[9999]">
          <motion.div
            className={`max-w-3xl w-full mx-4 max-h-[90vh] rounded-3xl backdrop-blur-sm border overflow-hidden transition-all duration-700 ${
              isDark 
                ? 'bg-slate-900/95 border-slate-700/50' 
                : 'bg-white/95 border-slate-200/60'
            }`}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <div className="overflow-y-auto max-h-[90vh] p-8 scrollbar-thin scrollbar-thumb-slate-400 scrollbar-track-transparent">
              <button 
                onClick={() => setModalOpen(false)}
                className={`float-right text-3xl font-light hover:rotate-90 transition-transform duration-300 ${
                  isDark ? 'text-slate-300 hover:text-white' : 'text-slate-600 hover:text-slate-800'
                }`}
              >
                ×
              </button>
              
              {modalContent === 0 && (
                <div>
                  <h2 className={`text-3xl font-bold mb-6 transition-all duration-700 ${
                    isDark ? 'text-white' : 'text-gray-800'
                  }`}>
                    {labels.experienceDetails}
                  </h2>
                  {experiences.map((exp, index) => (
                    <div key={index} className={`mb-6 p-6 rounded-xl transition-all duration-700 ${
                      isDark ? 'bg-gray-700/30' : 'bg-white/40'
                    }`}>
                      <h3 className={`text-xl font-bold mb-2 transition-all duration-700 ${
                        isDark ? 'text-white' : 'text-gray-800'
                      }`}>
                        {exp.title}
                      </h3>
                      <p className={`text-lg ${exp.color} mb-2`}>
                        {exp.company}
                      </p>
                      <p className={`text-sm mb-4 transition-all duration-700 ${
                        isDark ? 'text-gray-400' : 'text-gray-500'
                      }`}>
                        {exp.period}
                      </p>
                      <ul className={`list-disc list-inside space-y-1 text-sm transition-all duration-700 ${
                        isDark ? 'text-gray-300' : 'text-gray-600'
                      }`}>
                        <li>Led development of 5+ major projects</li>
                        <li>Mentored junior developers</li>
                        <li>Implemented CI/CD pipelines</li>
                        <li>Improved application performance by 40%</li>
                      </ul>
                    </div>
                  ))}
                </div>
              )}
              
              {modalContent === 1 && (
                <div>
                  <h2 className={`text-3xl font-bold mb-6 transition-all duration-700 ${
                    isDark ? 'text-white' : 'text-gray-800'
                  }`}>
                    {labels.educationDetails}
                  </h2>
                  {education.map((edu, index) => (
                    <div key={index} className={`mb-6 p-6 rounded-xl transition-all duration-700 ${
                      isDark ? 'bg-gray-700/30' : 'bg-white/40'
                    }`}>
                      <h3 className={`text-xl font-bold mb-2 transition-all duration-700 ${
                        isDark ? 'text-white' : 'text-gray-800'
                      }`}>
                        {edu.title}
                      </h3>
                      <p className={`text-lg ${edu.color} mb-2`}>
                        {edu.company}
                      </p>
                      <p className={`text-sm mb-4 transition-all duration-700 ${
                        isDark ? 'text-gray-400' : 'text-gray-500'
                      }`}>
                        {edu.period}
                      </p>
                      <ul className={`list-disc list-inside space-y-1 text-sm transition-all duration-700 ${
                        isDark ? 'text-gray-300' : 'text-gray-600'
                      }`}>
                        <li>GPA: 3.8/4.0</li>
                        <li>Data Structures & Algorithms</li>
                        <li>Software Engineering</li>
                        <li>Database Management Systems</li>
                      </ul>
                    </div>
                  ))}
                </div>
              )}
              
              {modalContent === 2 && (
                <div>
                  <h2 className={`text-3xl font-bold mb-6 transition-all duration-700 ${
                    isDark ? 'text-white' : 'text-gray-800'
                  }`}>
                    {labels.achievementDetails}
                  </h2>
                  {achievements.map((ach, index) => (
                    <div key={index} className={`mb-6 p-6 rounded-xl transition-all duration-700 ${
                      isDark ? 'bg-gray-700/30' : 'bg-white/40'
                    }`}>
                      <h3 className={`text-xl font-bold mb-2 transition-all duration-700 ${
                        isDark ? 'text-white' : 'text-gray-800'
                      }`}>
                        {ach.title}
                      </h3>
                      <p className={`text-lg ${ach.color} mb-2`}>
                        {ach.company}
                      </p>
                      <p className={`text-sm mb-4 transition-all duration-700 ${
                        isDark ? 'text-gray-400' : 'text-gray-500'
                      }`}>
                        {ach.period}
                      </p>
                      <ul className={`list-disc list-inside space-y-1 text-sm transition-all duration-700 ${
                        isDark ? 'text-gray-300' : 'text-gray-600'
                      }`}>
                        <li>{labels.recognizedPerformance}</li>
                        <li>{labels.githubContributions}</li>
                        <li>{labels.openSourceProjects}</li>
                        <li>{labels.techSpeaker}</li>
                      </ul>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default About;