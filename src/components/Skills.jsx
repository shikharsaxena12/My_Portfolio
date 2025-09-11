import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../contexts/ThemeContext';
import { useContent } from '../contexts/ContentContext';
import Navbar from './Navbar';
import { HomeBackground } from '../portfolio_animation';

const Skills = () => {
  const { isDark = false } = useTheme() || {};
  const { content } = useContent();
  const [activeTab, setActiveTab] = useState('tech');

  const labels = {
    mySkills: 'My Skills',
    whatIDo: 'What I Do'
  };

  const techSkills = useMemo(() => content?.skills?.technical || [], [content?.skills?.technical]);
  const softSkills = useMemo(() => content?.skills?.soft || [], [content?.skills?.soft]);

  return (
    <div className={`h-screen overflow-hidden transition-all duration-1000 ${isDark ? 'bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600' : 'bg-gradient-to-br from-amber-100 via-orange-200 to-rose-300'}`}>
      <HomeBackground />
      <Navbar />
      
      <div className="relative z-10 container mx-auto px-6 pt-32 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Left Side - Skills */}
          <motion.div 
            className="relative"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <div className={`font-inter p-8 rounded-3xl backdrop-blur-xl border relative overflow-hidden transition-all duration-700 ${isDark ? 'bg-gradient-to-br from-blue-600/20 via-purple-600/20 to-pink-600/20 border-white/20' : 'bg-gradient-to-br from-amber-100/40 via-orange-100/40 to-rose-100/40 border-amber-200/60'}`}>
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
                transition={{ duration: 8, repeat: Infinity, ease: "linear", repeatType: "loop" }}
              />
              
              {/* Tabs */}
              <div className="flex mb-6 relative z-10">
                <motion.button
                  onClick={() => setActiveTab('tech')}
                  className={`relative overflow-hidden font-semibold px-4 py-2 rounded-l-lg transition-all duration-500 ${
                    activeTab === 'tech'
                      ? 'backdrop-blur-xl border shadow-2xl'
                      : isDark ? 'bg-gray-700 text-gray-300' : 'bg-gray-200 text-gray-600'
                  } ${isDark ? 'border-white/30' : 'border-gray-800/30'}`}
                  style={activeTab === 'tech' ? {
                    background: isDark ? 'linear-gradient(135deg, rgba(99, 102, 241, 0.8), rgba(168, 85, 247, 0.8), rgba(236, 72, 153, 0.8))' : 'linear-gradient(135deg, rgba(251, 191, 36, 0.8), rgba(249, 115, 22, 0.8), rgba(244, 63, 94, 0.8))'
                  } : {}}
                  whileHover={activeTab === 'tech' ? { 
                    scale: 1.02, 
                    y: -2,
                    boxShadow: isDark ? '0 15px 30px rgba(99, 102, 241, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.2)' : '0 15px 30px rgba(251, 191, 36, 0.3), 0 0 0 1px rgba(0, 0, 0, 0.2)'
                  } : { scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ 
                    type: "spring",
                    stiffness: 300,
                    damping: 20
                  }}
                >
                  {activeTab === 'tech' && (
                    <>
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
                    </>
                  )}
                  <span className={`relative z-10 ${
                    isDark ? 'text-white' : 'text-black'
                  }`}>Tech Skills</span>
                </motion.button>
                <motion.button
                  onClick={() => setActiveTab('soft')}
                  className={`relative overflow-hidden font-semibold px-4 py-2 rounded-r-lg transition-all duration-500 ${
                    activeTab === 'soft'
                      ? 'backdrop-blur-xl border shadow-2xl'
                      : isDark ? 'bg-gray-700 text-gray-300' : 'bg-gray-200 text-gray-600'
                  } ${isDark ? 'border-white/30' : 'border-gray-800/30'}`}
                  style={activeTab === 'soft' ? {
                    background: isDark ? 'linear-gradient(135deg, rgba(99, 102, 241, 0.8), rgba(168, 85, 247, 0.8), rgba(236, 72, 153, 0.8))' : 'linear-gradient(135deg, rgba(251, 191, 36, 0.8), rgba(249, 115, 22, 0.8), rgba(244, 63, 94, 0.8))'
                  } : {}}
                  whileHover={activeTab === 'soft' ? { 
                    scale: 1.02, 
                    y: -2,
                    boxShadow: isDark ? '0 15px 30px rgba(99, 102, 241, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.2)' : '0 15px 30px rgba(251, 191, 36, 0.3), 0 0 0 1px rgba(0, 0, 0, 0.2)'
                  } : { scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ 
                    type: "spring",
                    stiffness: 300,
                    damping: 20
                  }}
                >
                  {activeTab === 'soft' && (
                    <>
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
                    </>
                  )}
                  <span className={`relative z-10 ${
                    isDark ? 'text-white' : 'text-black'
                  }`}>Soft Skills</span>
                </motion.button>
              </div>
              
              <div className="space-y-6 relative z-10">
                {(activeTab === 'tech' ? techSkills : softSkills).map((skill, index) => (
                  <div key={skill.name} className="space-y-2">
                    <div className="flex justify-between">
                      <span className={`font-poppins font-medium transition-all duration-700 ${
                        isDark ? 'text-white' : 'text-black'
                      }`}>
                        {skill.name}
                      </span>
                      <span className={`text-sm transition-all duration-700 ${
                        isDark ? 'text-gray-200' : 'text-black'
                      }`}>
                        {skill.level}%
                      </span>
                    </div>
                    <div className={`w-full h-2 rounded-full transition-all duration-700 ${isDark ? 'bg-gray-700' : 'bg-gray-200'}`}>
                      <motion.div
                        className={`h-2 rounded-full transition-all duration-700 ${
                          isDark ? 'bg-gradient-to-r from-blue-500 to-purple-500' : 'bg-gradient-to-r from-amber-500 to-orange-500'
                        }`}
                        initial={{ width: 0 }}
                        animate={{ width: `${skill.level}%` }}
                        transition={{ duration: 1, delay: index * 0.1 }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right Side - Text Content */}
          <motion.div 
            className="space-y-6"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <h1 className="font-playfair text-5xl md:text-6xl font-bold mb-6">
              <span className={`bg-clip-text text-transparent transition-all duration-700 ${
                isDark ? 'bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600' : 'bg-gradient-to-r from-amber-600 via-orange-600 to-rose-600'
              }`}>
                {labels.mySkills}
              </span>
            </h1>
            
            <h2 className={`font-montserrat text-2xl md:text-3xl font-light mb-6 transition-all duration-700 ${
              isDark ? 'text-gray-200' : 'text-black'
            }`}>
              Technical Expertise & Professional Skills
            </h2>
            
            <p className={`font-opensans text-lg leading-relaxed mb-8 transition-all duration-700 ${
              isDark ? 'text-gray-300' : 'text-black'
            }`}>
              I specialize in modern web development technologies and frameworks. 
              My expertise spans across frontend and backend development, with a 
              strong focus on creating scalable and efficient applications.
            </p>
            
            <p className={`text-lg leading-relaxed transition-all duration-700 ${isDark ? 'text-gray-300' : 'text-black'}`}>
              With years of experience in JavaScript ecosystem, I build responsive 
              user interfaces and robust server-side applications. I'm passionate 
              about clean code, best practices, and continuous learning.
            </p>
            
            <div className="space-y-4">
              <h3 className={`text-xl font-semibold transition-all duration-700 ${isDark ? 'text-white' : 'text-black'}`}>
                {labels.whatIDo}
              </h3>
              <ul className={`space-y-2 transition-all duration-700 ${isDark ? 'text-gray-300' : 'text-black'}`}>
                <li>• Full Stack Web Development</li>
                <li>• React & Modern JavaScript</li>
                <li>• API Design & Development</li>
                <li>• Database Design & Management</li>
              </ul>
            </div>
          </motion.div>
          
        </div>
      </div>
    </div>
  );
};

export default Skills;