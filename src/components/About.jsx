import React, { useEffect, useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import HomeBackground from './HomeBackground';

const About = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [activeCard, setActiveCard] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  const { isDark = false } = useTheme() || {};
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveCard((prev) => (prev + 1) % 3);
    }, 3000);
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
      color: "text-blue-400"
    },
    {
      title: "Frontend Developer", 
      company: "StartupXYZ",
      period: "2021-2022",
      color: "text-blue-400"
    }
  ];

  const education = [
    {
      title: "Computer Science",
      company: "University of Tech",
      period: "2018-2022",
      color: "text-green-400"
    },
    {
      title: "Web Development Bootcamp",
      company: "CodeAcademy",
      period: "2021",
      color: "text-green-400"
    }
  ];

  const achievements = [
    {
      title: "Best Developer Award",
      company: "Tech Corp",
      period: "2023",
      color: "text-yellow-400"
    },
    {
      title: "Open Source Contributor",
      company: "GitHub",
      period: "2022-Present",
      color: "text-yellow-400"
    }
  ];

  return (
    <div className={`min-h-screen relative overflow-hidden scroll-smooth transition-colors duration-500 ${
      isDark 
        ? 'bg-gray-900' 
        : 'bg-gradient-to-br from-slate-50 via-white to-blue-50'
    }`}>
      {/* Floating Particles */}
      {useMemo(() => 
        [...Array(15)].map((_, i) => {
          const randomDuration = 3 + Math.random() * 2;
          const randomX = Math.random() * 100;
          const randomY = Math.random() * 100;
          return (
            <FloatingParticle
              key={i}
              delay={i * 0.5}
              duration={randomDuration}
              x={randomX}
              y={randomY}
            />
          );
        }), []
      )}
      
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
              className="text-5xl md:text-6xl font-bold mb-6"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                About Me
              </span>
            </motion.h1>

            {/* Subtitle */}
            <motion.h2 
              className={`text-2xl md:text-3xl font-light mb-6 ${
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
              className={`text-lg leading-relaxed mb-8 ${
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
                  className={`text-center p-6 rounded-2xl backdrop-blur-sm border shadow-lg ${
                    isDark 
                      ? 'bg-gray-800/50 border-gray-700' 
                      : 'bg-white/60 border-white/60'
                  }`}
                  whileHover={{ scale: 1.05, y: -5 }}
                  transition={{ type: "spring", damping: 15, stiffness: 300 }}
                >
                  <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
                    {stat.number}
                  </div>
                  <div className={`text-sm font-medium ${
                    isDark ? 'text-gray-300' : 'text-gray-600'
                  }`}>
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* Back to Home Button */}
            <motion.button
              onClick={() => navigate('/')}
              className="group relative bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 rounded-full font-medium transition-all duration-500 overflow-hidden shadow-lg hover:shadow-2xl"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.0 }}
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent"
                initial={{ x: '-100%' }}
                whileHover={{ x: '100%' }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
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
            {/* Dots Navigation */}
            <div className="flex justify-center mb-8">
              <div className="flex space-x-3">
                {[0, 1, 2].map((index) => (
                  <div
                    key={index}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      activeCard === index 
                        ? 'bg-blue-500' 
                        : isDark ? 'bg-gray-600' : 'bg-gray-300'
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Card Container */}
            <div className="relative">
              {activeCard === 0 && (
                <div
                  className={`p-8 rounded-3xl backdrop-blur-sm border cursor-pointer ${
                    isDark 
                      ? 'bg-gray-800/30 border-gray-700/50' 
                      : 'bg-white/20 border-white/30'
                  }`}
                  onClick={() => openModal(0)}
                >
                  <h2 className={`text-2xl font-bold mb-6 ${
                    isDark ? 'text-white' : 'text-gray-800'
                  }`}>
                    Experience
                  </h2>
                  <div className="space-y-4">
                    {experiences.map((exp, index) => (
                      <div key={index} className={`p-4 rounded-xl ${
                        isDark ? 'bg-gray-700/30' : 'bg-white/30'
                      }`}>
                        <h3 className={`font-bold mb-1 ${
                          isDark ? 'text-white' : 'text-gray-800'
                        }`}>
                          {exp.title}
                        </h3>
                        <p className={`text-sm ${exp.color}`}>
                          {exp.company}
                        </p>
                        <p className={`text-xs ${
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
                  className={`p-8 rounded-3xl backdrop-blur-sm border cursor-pointer ${
                    isDark 
                      ? 'bg-gray-800/30 border-gray-700/50' 
                      : 'bg-white/20 border-white/30'
                  }`}
                  onClick={() => openModal(1)}
                >
                  <h2 className={`text-2xl font-bold mb-6 ${
                    isDark ? 'text-white' : 'text-gray-800'
                  }`}>
                    Education
                  </h2>
                  <div className="space-y-4">
                    {education.map((edu, index) => (
                      <div key={index} className={`p-4 rounded-xl ${
                        isDark ? 'bg-gray-700/30' : 'bg-white/30'
                      }`}>
                        <h3 className={`font-bold mb-1 ${
                          isDark ? 'text-white' : 'text-gray-800'
                        }`}>
                          {edu.title}
                        </h3>
                        <p className={`text-sm ${edu.color}`}>
                          {edu.company}
                        </p>
                        <p className={`text-xs ${
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
                  className={`p-8 rounded-3xl backdrop-blur-sm border cursor-pointer ${
                    isDark 
                      ? 'bg-gray-800/30 border-gray-700/50' 
                      : 'bg-white/20 border-white/30'
                  }`}
                  onClick={() => openModal(2)}
                >
                  <h2 className={`text-2xl font-bold mb-6 ${
                    isDark ? 'text-white' : 'text-gray-800'
                  }`}>
                    Achievements
                  </h2>
                  <div className="space-y-4">
                    {achievements.map((ach, index) => (
                      <div key={index} className={`p-4 rounded-xl ${
                        isDark ? 'bg-gray-700/30' : 'bg-white/30'
                      }`}>
                        <h3 className={`font-bold mb-1 ${
                          isDark ? 'text-white' : 'text-gray-800'
                        }`}>
                          {ach.title}
                        </h3>
                        <p className={`text-sm ${ach.color}`}>
                          {ach.company}
                        </p>
                        <p className={`text-xs ${
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
            className={`max-w-2xl w-full mx-4 p-8 rounded-3xl backdrop-blur-sm border ${
              isDark 
                ? 'bg-gray-800/90 border-gray-700/50' 
                : 'bg-white/90 border-white/60'
            }`}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            onClick={(e) => e.stopPropagation()}
          >
              <button 
                onClick={() => setModalOpen(false)}
                className={`float-right text-2xl ${
                  isDark ? 'text-gray-300' : 'text-gray-600'
                }`}
              >
                ×
              </button>
              
              {modalContent === 0 && (
                <div>
                  <h2 className={`text-3xl font-bold mb-6 ${
                    isDark ? 'text-white' : 'text-gray-800'
                  }`}>
                    Experience Details
                  </h2>
                  {experiences.map((exp, index) => (
                    <div key={index} className={`mb-6 p-6 rounded-xl ${
                      isDark ? 'bg-gray-700/30' : 'bg-white/30'
                    }`}>
                      <h3 className={`text-xl font-bold mb-2 ${
                        isDark ? 'text-white' : 'text-gray-800'
                      }`}>
                        {exp.title}
                      </h3>
                      <p className={`text-lg ${exp.color} mb-2`}>
                        {exp.company}
                      </p>
                      <p className={`text-sm mb-4 ${
                        isDark ? 'text-gray-400' : 'text-gray-500'
                      }`}>
                        {exp.period}
                      </p>
                      <ul className={`list-disc list-inside space-y-1 text-sm ${
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
                  <h2 className={`text-3xl font-bold mb-6 ${
                    isDark ? 'text-white' : 'text-gray-800'
                  }`}>
                    Education Details
                  </h2>
                  {education.map((edu, index) => (
                    <div key={index} className={`mb-6 p-6 rounded-xl ${
                      isDark ? 'bg-gray-700/30' : 'bg-white/30'
                    }`}>
                      <h3 className={`text-xl font-bold mb-2 ${
                        isDark ? 'text-white' : 'text-gray-800'
                      }`}>
                        {edu.title}
                      </h3>
                      <p className={`text-lg ${edu.color} mb-2`}>
                        {edu.company}
                      </p>
                      <p className={`text-sm mb-4 ${
                        isDark ? 'text-gray-400' : 'text-gray-500'
                      }`}>
                        {edu.period}
                      </p>
                      <ul className={`list-disc list-inside space-y-1 text-sm ${
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
                  <h2 className={`text-3xl font-bold mb-6 ${
                    isDark ? 'text-white' : 'text-gray-800'
                  }`}>
                    Achievement Details
                  </h2>
                  {achievements.map((ach, index) => (
                    <div key={index} className={`mb-6 p-6 rounded-xl ${
                      isDark ? 'bg-gray-700/30' : 'bg-white/30'
                    }`}>
                      <h3 className={`text-xl font-bold mb-2 ${
                        isDark ? 'text-white' : 'text-gray-800'
                      }`}>
                        {ach.title}
                      </h3>
                      <p className={`text-lg ${ach.color} mb-2`}>
                        {ach.company}
                      </p>
                      <p className={`text-sm mb-4 ${
                        isDark ? 'text-gray-400' : 'text-gray-500'
                      }`}>
                        {ach.period}
                      </p>
                      <ul className={`list-disc list-inside space-y-1 text-sm ${
                        isDark ? 'text-gray-300' : 'text-gray-600'
                      }`}>
                        <li>Recognized for outstanding performance</li>
                        <li>500+ GitHub contributions</li>
                        <li>Contributed to 10+ open source projects</li>
                        <li>Speaker at tech conferences</li>
                      </ul>
                    </div>
                  ))}
                </div>
              )}
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default About;