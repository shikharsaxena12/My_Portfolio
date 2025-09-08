import React, { useMemo, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import Navbar from './Navbar';
import { HomeBackground } from '../portfolio_animation';

const Projects = () => {
  const { isDark = false } = useTheme() || {};
  const [currentProject, setCurrentProject] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);

  const labels = {
    myProjects: 'My Projects',
    projectsDescription: 'A collection of my recent work and experiments',
    viewProject: 'View Project'
  };

  const projects = useMemo(() => [
    { 
      title: 'E-Commerce Platform', 
      tech: 'React, Node.js, MongoDB', 
      desc: 'Full-stack shopping platform',
      fullDesc: 'A comprehensive e-commerce solution with user authentication, payment integration, inventory management, and admin dashboard.',
      features: ['User Authentication & Authorization', 'Payment Gateway Integration', 'Real-time Inventory Management', 'Admin Dashboard', 'Order Tracking System'],
      techStack: ['React', 'Node.js', 'MongoDB', 'Express', 'JWT', 'Stripe API'],
      image: '/api/placeholder/600/400',
      github: 'https://github.com/username/ecommerce',
      live: 'https://ecommerce-demo.com'
    },
    { 
      title: 'Task Management App', 
      tech: 'Vue.js, Firebase, Vuex', 
      desc: 'Collaborative task tracker',
      fullDesc: 'A collaborative task management application with real-time updates, team collaboration features, and project analytics.',
      features: ['Real-time Collaboration', 'Project Analytics', 'Task Prioritization', 'Team Management', 'Progress Tracking'],
      techStack: ['Vue.js', 'Firebase', 'Vuex', 'Vue Router', 'Chart.js', 'Tailwind CSS'],
      image: '/api/placeholder/600/400',
      github: 'https://github.com/username/taskmanager',
      live: 'https://taskmanager-demo.com'
    },
    { 
      title: 'Portfolio Website', 
      tech: 'React, Tailwind, Framer Motion', 
      desc: 'Personal portfolio site',
      fullDesc: 'A modern, responsive portfolio website with stunning animations, dark/light theme, and optimized performance.',
      features: ['Responsive Design', '3D Animations', 'Dark/Light Theme', 'Performance Optimized', 'SEO Friendly'],
      techStack: ['React', 'Tailwind CSS', 'Framer Motion', 'React Router', 'Lucide Icons', 'Vite'],
      image: '/api/placeholder/600/400',
      github: 'https://github.com/username/portfolio',
      live: 'https://portfolio-demo.com'
    },
    { 
      title: 'Chat Application', 
      tech: 'Socket.io, Express, React', 
      desc: 'Real-time messaging app',
      fullDesc: 'A real-time chat application with private messaging, group chats, file sharing, and emoji support.',
      features: ['Real-time Messaging', 'Group Chats', 'File Sharing', 'Emoji Support', 'Message History'],
      techStack: ['React', 'Socket.io', 'Express', 'Node.js', 'MongoDB', 'Multer'],
      image: '/api/placeholder/600/400',
      github: 'https://github.com/username/chatapp',
      live: 'https://chatapp-demo.com'
    },
    { 
      title: 'Weather Dashboard', 
      tech: 'JavaScript, API, Chart.js', 
      desc: 'Weather forecast app',
      fullDesc: 'A comprehensive weather dashboard with detailed forecasts, interactive charts, and location-based weather data.',
      features: ['7-day Forecast', 'Interactive Charts', 'Location Search', 'Weather Alerts', 'Historical Data'],
      techStack: ['JavaScript', 'Chart.js', 'OpenWeather API', 'HTML5', 'CSS3', 'Local Storage'],
      image: '/api/placeholder/600/400',
      github: 'https://github.com/username/weather',
      live: 'https://weather-demo.com'
    },
    { 
      title: 'Blog Platform', 
      tech: 'Next.js, MongoDB, Prisma', 
      desc: 'Content management system',
      fullDesc: 'A full-featured blog platform with content management, user authentication, commenting system, and SEO optimization.',
      features: ['Content Management', 'User Authentication', 'Comment System', 'SEO Optimization', 'Analytics Dashboard'],
      techStack: ['Next.js', 'MongoDB', 'Prisma', 'NextAuth.js', 'Tailwind CSS', 'Vercel'],
      image: '/api/placeholder/600/400',
      github: 'https://github.com/username/blog',
      live: 'https://blog-demo.com'
    }
  ], []);

  useEffect(() => {
    if (!isHovered) {
      const interval = setInterval(() => {
        setCurrentProject((prev) => (prev + 1) % projects.length);
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [projects.length, isHovered]);

  const openModal = (project) => {
    setSelectedProject(project);
    setModalOpen(true);
  };

  return (
    <div className={`min-h-screen ${isDark ? 'bg-gray-900' : 'bg-gradient-to-br from-slate-50 via-white to-blue-50'}`}>
      <HomeBackground />
      <Navbar />
      
      <div className="relative z-10 container mx-auto px-6 pt-32 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 min-h-[80vh]">
          {/* Left Half - Written Text */}
          <motion.div 
            className="space-y-8"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            {/* Projects Title */}
            <motion.h1 
              className="text-5xl md:text-6xl font-bold mb-6"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                {labels.myProjects}
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
              Creative Solutions & Technical Excellence
            </motion.h2>

            {/* Description */}
            <motion.p 
              className={`text-lg leading-relaxed mb-6 ${
                isDark ? 'text-gray-300' : 'text-gray-600'
              }`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              {labels.projectsDescription}
            </motion.p>

            {/* Additional Content */}
            <motion.div 
              className={`space-y-4 mb-8 text-base leading-relaxed ${
                isDark ? 'text-gray-300' : 'text-gray-600'
              }`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
            >
              <p>
                Each project showcases my ability to transform complex ideas into elegant, 
                user-friendly solutions. From concept to deployment, I focus on creating 
                applications that not only meet technical requirements but also deliver 
                exceptional user experiences.
              </p>
              <p>
                My development approach combines modern technologies with best practices, 
                ensuring scalable, maintainable, and performant applications. I believe 
                in writing clean, well-documented code that stands the test of time.
              </p>
                         </motion.div>

            {/* Stats */}
            <motion.div 
              className="grid grid-cols-3 gap-6 mb-8"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              {[
                { number: "20+", label: "Projects" },
                { number: "5+", label: "Technologies" },
                { number: "100%", label: "Quality" }
              ].map((stat, index) => (
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
          </motion.div>

          {/* Right Half - Stunning Flip Card Animation */}
          <motion.div
            className="flex items-center justify-center"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="relative w-96 h-[550px]" style={{ perspective: '1000px' }}>
              {/* Floating Particles around card */}
              {[...Array(8)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-2 h-2 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full"
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
              
              <motion.div
                key={currentProject}
                className={`group absolute inset-0 rounded-3xl overflow-hidden backdrop-blur-xl border cursor-pointer ${
                  isDark 
                    ? 'bg-gradient-to-br from-slate-900/95 via-slate-800/90 to-slate-900/95 border-slate-700/50' 
                    : 'bg-gradient-to-br from-white/95 via-slate-50/90 to-white/95 border-slate-200/50'
                }`}
                onHoverStart={() => setIsHovered(true)}
                onHoverEnd={() => setIsHovered(false)}
                onClick={() => openModal(projects[currentProject])}
                initial={{ 
                  rotateY: 90, 
                  rotateX: 15,
                  scale: 0.85,
                  opacity: 0,
                  y: 30
                }}
                animate={{ 
                  rotateY: 0, 
                  rotateX: 0,
                  scale: 1,
                  opacity: 1,
                  y: 0
                }}
                exit={{ 
                  rotateY: -90, 
                  rotateX: -15,
                  scale: 0.85,
                  opacity: 0,
                  y: -30
                }}
                transition={{ 
                  duration: 0.8, 
                  ease: [0.16, 1, 0.3, 1],
                  type: "tween"
                }}
                whileHover={{ 
                  scale: 1.05, 
                  y: -10,
                  rotateX: 3,
                  rotateY: 2,
                  boxShadow: isDark
                    ? '0 40px 80px rgba(0, 0, 0, 0.6), 0 0 0 1px rgba(99, 102, 241, 0.4), 0 0 40px rgba(99, 102, 241, 0.3), inset 0 1px 0 rgba(148, 163, 184, 0.2)'
                    : '0 40px 80px rgba(15, 23, 42, 0.15), 0 0 0 1px rgba(99, 102, 241, 0.3), 0 0 30px rgba(99, 102, 241, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.9)',
                  transition: { duration: 0.3, ease: "easeOut" }
                }}
                style={{ 
                  transformStyle: 'preserve-3d',
                  boxShadow: isDark 
                    ? '0 32px 64px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(148, 163, 184, 0.1), inset 0 1px 0 rgba(148, 163, 184, 0.1)'
                    : '0 32px 64px rgba(15, 23, 42, 0.08), 0 0 0 1px rgba(148, 163, 184, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.9)'
                }}
              >
                {/* Premium gradient overlay */}
                <motion.div
                  className="absolute inset-0 opacity-40"
                  animate={{
                    background: [
                      'linear-gradient(135deg, rgba(99, 102, 241, 0.05), rgba(168, 85, 247, 0.05), rgba(236, 72, 153, 0.05))',
                      'linear-gradient(225deg, rgba(168, 85, 247, 0.05), rgba(236, 72, 153, 0.05), rgba(99, 102, 241, 0.05))',
                      'linear-gradient(315deg, rgba(236, 72, 153, 0.05), rgba(99, 102, 241, 0.05), rgba(168, 85, 247, 0.05))',
                      'linear-gradient(45deg, rgba(99, 102, 241, 0.05), rgba(168, 85, 247, 0.05), rgba(236, 72, 153, 0.05))'
                    ]
                  }}
                  transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                />
                
                {/* Elegant border shimmer */}
                <motion.div
                  className="absolute inset-0 rounded-3xl"
                  style={{
                    background: isDark 
                      ? 'linear-gradient(45deg, transparent, rgba(99, 102, 241, 0.15), transparent, rgba(168, 85, 247, 0.15), transparent)'
                      : 'linear-gradient(45deg, transparent, rgba(99, 102, 241, 0.08), transparent, rgba(168, 85, 247, 0.08), transparent)',
                    backgroundSize: '400% 400%'
                  }}
                  animate={{
                    backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
                  }}
                  transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                />
                
                {/* Premium Image Frame */}
                <div className="relative h-72 overflow-hidden rounded-t-3xl">
                  <motion.div 
                    className={`w-full h-full flex items-center justify-center relative ${
                      isDark 
                        ? 'bg-gradient-to-br from-slate-800/95 via-slate-700/90 to-slate-800/95' 
                        : 'bg-gradient-to-br from-slate-50/95 via-white/90 to-slate-100/95'
                    }`}
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                  >
                    {/* Sophisticated background pattern */}
                    <motion.div
                      className="absolute inset-0 opacity-20"
                      style={{
                        backgroundImage: isDark
                          ? 'radial-gradient(circle at 25% 35%, rgba(99, 102, 241, 0.6) 0%, transparent 50%), radial-gradient(circle at 75% 65%, rgba(168, 85, 247, 0.6) 0%, transparent 50%)'
                          : 'radial-gradient(circle at 25% 35%, rgba(99, 102, 241, 0.3) 0%, transparent 50%), radial-gradient(circle at 75% 65%, rgba(168, 85, 247, 0.3) 0%, transparent 50%)'
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
                        background: [
                          'radial-gradient(circle at 15% 15%, rgba(99, 102, 241, 0.08) 0%, transparent 25%)',
                          'radial-gradient(circle at 85% 85%, rgba(168, 85, 247, 0.08) 0%, transparent 25%)',
                          'radial-gradient(circle at 15% 85%, rgba(236, 72, 153, 0.08) 0%, transparent 25%)',
                          'radial-gradient(circle at 85% 15%, rgba(99, 102, 241, 0.08) 0%, transparent 25%)'
                        ]
                      }}
                      transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                    />
                    
                    <motion.div 
                      className={`text-xl font-semibold z-10 ${
                        isDark ? 'text-slate-300' : 'text-slate-600'
                      }`}
                      animate={{ 
                        scale: [1, 1.01, 1],
                        opacity: [0.9, 1, 0.9]
                      }}
                      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    >
                      Project Preview
                    </motion.div>
                  </motion.div>
                  
                  {/* Refined hover overlay */}
                  <motion.div 
                    className={`absolute inset-0 ${
                      isDark 
                        ? 'bg-gradient-to-t from-slate-900/60 via-slate-800/20 to-transparent'
                        : 'bg-gradient-to-t from-slate-900/40 via-slate-600/10 to-transparent'
                    }`}
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                  />
                </div>
                
                {/* Refined Content Layout */}
                <motion.div 
                  className="p-8 relative z-10 flex flex-col h-[278px]"
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2, duration: 0.6, ease: "easeOut" }}
                >
                  <motion.h3 
                    className={`text-2xl font-bold mb-4 ${
                      isDark ? 'text-white' : 'text-slate-800'
                    }`}
                    initial={{ y: 15, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.4, duration: 0.5, ease: "easeOut" }}
                  >
                    {projects[currentProject].title}
                  </motion.h3>
                  
                  <motion.p 
                    className={`text-base mb-4 leading-relaxed flex-grow ${
                      isDark ? 'text-slate-300' : 'text-slate-600'
                    }`}
                    initial={{ y: 15, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.5, duration: 0.5, ease: "easeOut" }}
                  >
                    {projects[currentProject].desc}
                  </motion.p>
                  
                  <motion.div 
                    className={`inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium mb-6 w-fit ${
                      isDark 
                        ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30' 
                        : 'bg-indigo-50 text-indigo-600 border border-indigo-200'
                    }`}
                    initial={{ y: 15, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.6, duration: 0.5, ease: "easeOut" }}
                  >
                    {projects[currentProject].tech}
                  </motion.div>
                  
                  <button 
                    className={`relative overflow-hidden font-semibold px-6 py-3 rounded-xl flex items-center justify-center gap-3 transition-all duration-300 w-full group ${
                      isDark
                        ? 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white shadow-lg shadow-indigo-500/25 hover:shadow-xl hover:shadow-indigo-500/30'
                        : 'bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white shadow-lg shadow-indigo-500/20 hover:shadow-xl hover:shadow-indigo-500/25'
                    }`}
                    onClick={(e) => {
                      e.stopPropagation();
                      openModal(projects[currentProject]);
                    }}
                  >
                    <span className="relative z-10">{labels.viewProject}</span>
                    <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform duration-300" />
                  </button>
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Project Detail Modal */}
      {modalOpen && selectedProject && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-md flex items-center justify-center z-[9999]"
          onClick={() => setModalOpen(false)}
        >
          <motion.div
            className={`max-w-4xl w-full mx-4 max-h-[90vh] rounded-3xl backdrop-blur-sm border overflow-hidden ${
              isDark 
                ? 'bg-slate-900/95 border-slate-700/50' 
                : 'bg-white/95 border-slate-200/60'
            }`}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            onClick={(e) => e.stopPropagation()}
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
            
            <div className="space-y-8">
              {/* Project Header */}
              <div>
                <h2 className={`text-4xl font-bold mb-4 ${
                  isDark ? 'text-white' : 'text-slate-800'
                }`}>
                  {selectedProject.title}
                </h2>
                <div className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium mb-6 ${
                  isDark 
                    ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30' 
                    : 'bg-indigo-50 text-indigo-600 border border-indigo-200'
                }`}>
                  {selectedProject.tech}
                </div>
              </div>

              {/* Project Image */}
              <div className="relative h-64 md:h-80 overflow-hidden rounded-2xl">
                <div 
                  className={`w-full h-full flex items-center justify-center relative ${
                    isDark 
                      ? 'bg-gradient-to-br from-slate-800/95 via-slate-700/90 to-slate-800/95' 
                      : 'bg-gradient-to-br from-slate-50/95 via-white/90 to-slate-100/95'
                  }`}
                >
                  {/* Same background pattern as card */}
                  <div
                    className="absolute inset-0 opacity-20"
                    style={{
                      backgroundImage: isDark
                        ? 'radial-gradient(circle at 25% 35%, rgba(99, 102, 241, 0.6) 0%, transparent 50%), radial-gradient(circle at 75% 65%, rgba(168, 85, 247, 0.6) 0%, transparent 50%)'
                        : 'radial-gradient(circle at 25% 35%, rgba(99, 102, 241, 0.3) 0%, transparent 50%), radial-gradient(circle at 75% 65%, rgba(168, 85, 247, 0.3) 0%, transparent 50%)'
                    }}
                  />
                  <div 
                    className={`text-2xl font-semibold z-10 ${
                      isDark ? 'text-slate-300' : 'text-slate-600'
                    }`}
                  >
                    Project Preview
                  </div>
                </div>
              </div>

              {/* Project Description */}
              <div>
                <h3 className={`text-xl font-semibold mb-3 ${
                  isDark ? 'text-slate-200' : 'text-slate-700'
                }`}>
                  About This Project
                </h3>
                <p className={`text-lg leading-relaxed ${
                  isDark ? 'text-slate-300' : 'text-slate-600'
                }`}>
                  {selectedProject.fullDesc}
                </p>
              </div>

              {/* Technologies Used */}
              <div>
                <h3 className={`text-xl font-semibold mb-4 ${
                  isDark ? 'text-slate-200' : 'text-slate-700'
                }`}>
                  Technologies Used
                </h3>
                <div className="flex flex-wrap gap-2">
                  {selectedProject.techStack.map((tech, index) => (
                    <span 
                      key={index}
                      className={`px-3 py-1.5 rounded-full text-sm font-medium ${
                        isDark 
                          ? 'bg-slate-800/60 text-slate-300 border border-slate-700/50' 
                          : 'bg-slate-100/80 text-slate-700 border border-slate-200/60'
                      }`}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Key Features */}
              <div>
                <h3 className={`text-xl font-semibold mb-4 ${
                  isDark ? 'text-slate-200' : 'text-slate-700'
                }`}>
                  Key Features
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {selectedProject.features.map((feature, index) => (
                    <div 
                      key={index}
                      className={`flex items-center gap-3 p-3 rounded-xl ${
                        isDark ? 'bg-slate-800/50' : 'bg-slate-50/80'
                      }`}
                    >
                      <div className="w-2 h-2 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full" />
                      <span className={`text-sm ${
                        isDark ? 'text-slate-300' : 'text-slate-600'
                      }`}>
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4 pt-4">
                <a
                  href={selectedProject.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex-1 text-center font-semibold px-6 py-3 rounded-xl transition-all duration-300 ${
                    isDark
                      ? 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white shadow-lg shadow-indigo-500/25'
                      : 'bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white shadow-lg shadow-indigo-500/20'
                  }`}
                >
                  View Live Demo
                </a>
                <a
                  href={selectedProject.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex-1 text-center font-semibold px-6 py-3 rounded-xl border transition-all duration-300 ${
                    isDark
                      ? 'border-slate-600 text-slate-300 hover:bg-slate-800/50 hover:border-slate-500'
                      : 'border-slate-300 text-slate-600 hover:bg-slate-50 hover:border-slate-400'
                  }`}
                >
                  View Source Code
                </a>
              </div>
            </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default Projects;