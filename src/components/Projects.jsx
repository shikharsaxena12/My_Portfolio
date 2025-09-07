import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import Navbar from './Navbar';
import HomeBackground from './HomeBackground';

const Projects = () => {
  const { isDark = false } = useTheme() || {};

  const projects = useMemo(() => [
    { title: 'E-Commerce Platform', tech: 'React, Node.js', desc: 'Full-stack shopping platform' },
    { title: 'Task Management App', tech: 'Vue.js, Firebase', desc: 'Collaborative task tracker' },
    { title: 'Portfolio Website', tech: 'React, Tailwind', desc: 'Personal portfolio site' },
    { title: 'Chat Application', tech: 'Socket.io, Express', desc: 'Real-time messaging app' },
    { title: 'Weather Dashboard', tech: 'JavaScript, API', desc: 'Weather forecast app' },
    { title: 'Blog Platform', tech: 'Next.js, MongoDB', desc: 'Content management system' }
  ], []);

  return (
    <div className={`min-h-screen ${isDark ? 'bg-gray-900' : 'bg-gradient-to-br from-slate-50 via-white to-blue-50'}`}>
      <HomeBackground />
      <Navbar />
      
      <div className="relative z-10 container mx-auto px-6 pt-32 pb-20">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              My Projects
            </span>
          </h1>
          <p className={`text-lg ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
            A collection of my recent work and experiments
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              className={`group relative rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 ${
                isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'
              }`}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.05, y: -10 }}
            >
              {/* Image Frame */}
              <div className="relative h-48 overflow-hidden">
                <div className={`w-full h-full flex items-center justify-center ${
                  isDark ? 'bg-gray-700' : 'bg-gray-100'
                }`}>
                  <div className={`text-sm ${
                    isDark ? 'text-gray-400' : 'text-gray-500'
                  }`}>
                    Project Image
                  </div>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              
              {/* Content */}
              <div className="p-6">
                <h3 className={`text-xl font-semibold mb-2 ${
                  isDark ? 'text-white' : 'text-gray-800'
                }`}>
                  {project.title}
                </h3>
                <p className={`text-sm mb-2 ${
                  isDark ? 'text-gray-400' : 'text-gray-500'
                }`}>
                  {project.desc}
                </p>
                <p className={`text-sm mb-4 font-medium ${
                  isDark ? 'text-blue-400' : 'text-blue-600'
                }`}>
                  {project.tech}
                </p>
                <button className="text-blue-500 hover:text-blue-600 font-medium text-sm flex items-center gap-1 group-hover:gap-2 transition-all">
                  View Project
                  <ArrowRight size={14} />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Projects;