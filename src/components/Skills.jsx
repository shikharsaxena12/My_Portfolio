import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../contexts/ThemeContext';
import Navbar from './Navbar';
import HomeBackground from './HomeBackground';

const Skills = () => {
  const { isDark = false } = useTheme() || {};
  const [activeTab, setActiveTab] = useState('tech');

  const techSkills = useMemo(() => [
    { name: 'React', level: 90 },
    { name: 'JavaScript', level: 85 },
    { name: 'Node.js', level: 80 },
    { name: 'Python', level: 75 },
    { name: 'MongoDB', level: 70 },
    { name: 'TypeScript', level: 85 }
  ], []);

  const softSkills = useMemo(() => [
    { name: 'Leadership', level: 88 },
    { name: 'Communication', level: 85 },
    { name: 'Problem Solving', level: 92 },
    { name: 'Team Work', level: 90 },
    { name: 'Creativity', level: 87 },
    { name: 'Adaptability', level: 83 }
  ], []);

  return (
    <div className={`min-h-screen ${isDark ? 'bg-gray-900' : 'bg-gradient-to-br from-slate-50 via-white to-blue-50'}`}>
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
            <div className={`p-8 rounded-3xl ${isDark ? 'bg-gray-800/50' : 'bg-white/50'} backdrop-blur-sm border ${isDark ? 'border-gray-700' : 'border-white/60'}`}>
              
              {/* Tabs */}
              <div className="flex mb-6">
                <button
                  onClick={() => setActiveTab('tech')}
                  className={`px-4 py-2 rounded-l-lg transition-all ${
                    activeTab === 'tech'
                      ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white'
                      : isDark ? 'bg-gray-700 text-gray-300' : 'bg-gray-200 text-gray-600'
                  }`}
                >
                  Tech Skills
                </button>
                <button
                  onClick={() => setActiveTab('soft')}
                  className={`px-4 py-2 rounded-r-lg transition-all ${
                    activeTab === 'soft'
                      ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white'
                      : isDark ? 'bg-gray-700 text-gray-300' : 'bg-gray-200 text-gray-600'
                  }`}
                >
                  Soft Skills
                </button>
              </div>
              
              <div className="space-y-6">
                {(activeTab === 'tech' ? techSkills : softSkills).map((skill, index) => (
                  <div key={skill.name} className="space-y-2">
                    <div className="flex justify-between">
                      <span className={`font-medium ${isDark ? 'text-white' : 'text-gray-800'}`}>
                        {skill.name}
                      </span>
                      <span className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                        {skill.level}%
                      </span>
                    </div>
                    <div className={`w-full h-2 rounded-full ${isDark ? 'bg-gray-700' : 'bg-gray-200'}`}>
                      <motion.div
                        className="h-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-500"
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
            <h1 className="text-5xl font-bold">
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                My Skills
              </span>
            </h1>
            
            <p className={`text-lg leading-relaxed ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
              I specialize in modern web development technologies and frameworks. 
              My expertise spans across frontend and backend development, with a 
              strong focus on creating scalable and efficient applications.
            </p>
            
            <p className={`text-lg leading-relaxed ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
              With years of experience in JavaScript ecosystem, I build responsive 
              user interfaces and robust server-side applications. I'm passionate 
              about clean code, best practices, and continuous learning.
            </p>
            
            <div className="space-y-4">
              <h3 className={`text-xl font-semibold ${isDark ? 'text-white' : 'text-gray-800'}`}>
                What I Do
              </h3>
              <ul className={`space-y-2 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                <li>• Full Stack Web Development</li>
                <li>• React & Modern JavaScript</li>
                <li>• API Design & Development</li>
                <li>• Database Design & Management</li>
                <li>• UI/UX Implementation</li>
              </ul>
            </div>
          </motion.div>
          
        </div>
      </div>
    </div>
  );
};

export default Skills;