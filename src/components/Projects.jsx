import React, { useMemo, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
    <div className={`h-screen overflow-hidden transition-all duration-1000 ${isDark ? 'bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600' : 'bg-gradient-to-br from-amber-100 via-orange-200 to-rose-300'}`} style={{scrollbarWidth: 'none', msOverflowStyle: 'none'}}>
      <HomeBackground />
      <Navbar />
      
      <div className="relative z-10 container mx-auto px-6 pt-32 pb-20 h-full flex items-center">
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
              className="font-playfair text-5xl md:text-6xl font-bold mb-6"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <span className={`bg-clip-text text-transparent transition-all duration-700 ${
                isDark 
                  ? 'bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400' 
                  : 'bg-gradient-to-r from-amber-600 via-orange-600 to-rose-600'
              }`}>
                {labels.myProjects}
              </span>
            </motion.h1>

            {/* Subtitle */}
            <motion.h2 
              className={`font-montserrat text-2xl md:text-3xl font-light mb-6 transition-colors duration-700 ${
                isDark ? 'text-blue-100' : 'text-amber-800'
              }`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Creative Solutions & Technical Excellence
            </motion.h2>

            {/* Description */}
            <motion.p 
              className={`font-opensans text-lg leading-relaxed mb-6 transition-colors duration-700 ${
                isDark ? 'text-blue-200' : 'text-amber-700'
              }`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              {labels.projectsDescription}
            </motion.p>

            {/* Additional Content */}
            <motion.div 
              className={`font-opensans space-y-4 mb-8 text-base leading-relaxed transition-colors duration-700 ${
                isDark ? 'text-blue-200' : 'text-amber-700'
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
                  className={`text-center p-6 rounded-2xl backdrop-blur-xl border shadow-lg relative overflow-hidden transition-all duration-700 ${
                    isDark 
                      ? 'bg-gradient-to-br from-blue-600/20 via-purple-600/20 to-pink-600/20 border-blue-400/20' 
                      : 'bg-gradient-to-br from-amber-200/40 via-orange-200/40 to-rose-200/40 border-amber-300/30'
                  }`}
                  whileHover={{ scale: 1.05, y: -5 }}
                  transition={{ type: "spring", damping: 15, stiffness: 300 }}
                >
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
                  <div className={`text-3xl md:text-4xl font-bold mb-2 relative z-10 transition-colors duration-700 ${
                    isDark ? 'text-blue-100' : 'text-amber-800'
                  }`}>
                    {stat.number}
                  </div>
                  <div className={`text-sm font-medium relative z-10 transition-colors duration-700 ${
                    isDark ? 'text-blue-200' : 'text-amber-700'
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
              
              <AnimatePresence mode="wait">
                <motion.div
                  key={projects[currentProject].title}
                className={`font-poppins group absolute inset-0 rounded-3xl overflow-hidden backdrop-blur-xl border cursor-pointer relative transition-all duration-700 ${
                  isDark 
                    ? 'bg-gradient-to-br from-blue-900/30 via-purple-900/30 to-pink-900/30 border-blue-400/20' 
                    : 'bg-gradient-to-br from-amber-100/60 via-orange-100/60 to-rose-100/60 border-amber-300/30'
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
                    ? '0 40px 80px rgba(0, 0, 0, 0.6), 0 0 0 1px rgba(59, 130, 246, 0.4), 0 0 40px rgba(59, 130, 246, 0.3), inset 0 1px 0 rgba(148, 163, 184, 0.2)'
                    : '0 40px 80px rgba(245, 158, 11, 0.15), 0 0 0 1px rgba(245, 158, 11, 0.3), 0 0 30px rgba(245, 158, 11, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.9)',
                  transition: { duration: 0.3, ease: "easeOut" }
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
                
                {/* Premium Image Frame */}
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
                      Project Preview
                    </motion.div>
                  </motion.div>
                  
                  {/* Refined hover overlay */}
                  <motion.div 
                    className={`absolute inset-0 transition-all duration-700 ${
                      isDark 
                        ? 'bg-gradient-to-t from-slate-900/60 via-slate-800/20 to-transparent'
                        : 'bg-gradient-to-t from-amber-900/40 via-amber-600/10 to-transparent'
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
                    className={`font-roboto text-2xl font-bold mb-4 transition-colors duration-700 ${
                      isDark ? 'text-blue-100' : 'text-amber-800'
                    }`}
                    initial={{ y: 15, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.4, duration: 0.5, ease: "easeOut" }}
                  >
                    {projects[currentProject].title}
                  </motion.h3>
                  
                  <motion.p 
                    className={`text-base mb-4 leading-relaxed flex-grow transition-colors duration-700 ${
                      isDark ? 'text-blue-200' : 'text-amber-700'
                    }`}
                    initial={{ y: 15, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.5, duration: 0.5, ease: "easeOut" }}
                  >
                    {projects[currentProject].desc}
                  </motion.p>
                  
                  <motion.div 
                    className={`inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium mb-6 w-fit transition-all duration-700 ${
                      isDark 
                        ? 'bg-blue-500/20 text-blue-300 border border-blue-500/30' 
                        : 'bg-amber-100 text-amber-700 border border-amber-300'
                    }`}
                    initial={{ y: 15, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.6, duration: 0.5, ease: "easeOut" }}
                  >
                    {projects[currentProject].tech}
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
                      openModal(projects[currentProject]);
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
                    
                    <span className="relative z-10">{labels.viewProject}</span>
                    <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform duration-300 relative z-10" />
                  </motion.button>
                </motion.div>
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Project Detail Modal */}
      {modalOpen && selectedProject && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-md flex items-center justify-center z-[9999]">
          <motion.div
            className={`font-poppins max-w-4xl w-full mx-4 max-h-[90vh] rounded-3xl backdrop-blur-xl border overflow-hidden transition-all duration-700 relative ${
              isDark 
                ? 'bg-gradient-to-br from-blue-600/20 via-purple-600/20 to-pink-600/20 border-white/20' 
                : 'bg-gradient-to-br from-amber-100/40 via-orange-100/40 to-rose-100/40 border-amber-200/60'
            }`}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Animated glassmorphism overlay */}
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
            <div className="overflow-y-auto max-h-[90vh] p-8 scrollbar-thin scrollbar-thumb-slate-400 scrollbar-track-transparent relative z-10">
            <button 
              onClick={() => setModalOpen(false)}
              className={`float-right text-3xl font-light hover:rotate-90 transition-all duration-700 ${
                isDark ? 'text-slate-300 hover:text-white' : 'text-amber-600 hover:text-amber-800'
              }`}
            >
              ×
            </button>
            
            <div className="space-y-8">
              {/* Project Header */}
              <div>
                <h2 className={`font-playfair text-4xl font-bold mb-4 transition-colors duration-700 ${
                  isDark ? 'text-blue-100' : 'text-amber-800'
                }`}>
                  {selectedProject.title}
                </h2>
                <div className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium mb-6 transition-all duration-700 ${
                  isDark 
                    ? 'bg-blue-500/20 text-blue-300 border border-blue-500/30' 
                    : 'bg-amber-100 text-amber-700 border border-amber-300'
                }`}>
                  {selectedProject.tech}
                </div>
              </div>

              {/* Project Image */}
              <div className="relative h-64 md:h-80 overflow-hidden rounded-2xl">
                <div 
                  className={`w-full h-full flex items-center justify-center relative transition-all duration-700 ${
                    isDark 
                      ? 'bg-gradient-to-br from-slate-800/95 via-slate-700/90 to-slate-800/95' 
                      : 'bg-gradient-to-br from-amber-50/95 via-orange-50/90 to-rose-50/95'
                  }`}
                >
                  {/* Same background pattern as card */}
                  <div
                    className="absolute inset-0 opacity-20"
                    style={{
                      backgroundImage: isDark
                        ? 'radial-gradient(circle at 25% 35%, rgba(59, 130, 246, 0.6) 0%, transparent 50%), radial-gradient(circle at 75% 65%, rgba(147, 51, 234, 0.6) 0%, transparent 50%)'
                        : 'radial-gradient(circle at 25% 35%, rgba(245, 158, 11, 0.6) 0%, transparent 50%), radial-gradient(circle at 75% 65%, rgba(249, 115, 22, 0.6) 0%, transparent 50%)'
                    }}
                  />
                  <div 
                    className={`text-2xl font-semibold z-10 transition-colors duration-700 ${
                      isDark ? 'text-slate-300' : 'text-amber-700'
                    }`}
                  >
                    Project Preview
                  </div>
                </div>
              </div>

              {/* Project Description */}
              <div>
                <h3 className={`font-montserrat text-xl font-semibold mb-3 transition-colors duration-700 ${
                  isDark ? 'text-blue-200' : 'text-amber-700'
                }`}>
                  About This Project
                </h3>
                <p className={`font-opensans text-lg leading-relaxed transition-colors duration-700 ${
                  isDark ? 'text-blue-200' : 'text-amber-700'
                }`}>
                  {selectedProject.fullDesc}
                </p>
              </div>

              {/* Technologies Used */}
              <div>
                <h3 className={`font-montserrat text-xl font-semibold mb-4 transition-colors duration-700 ${
                  isDark ? 'text-blue-200' : 'text-amber-700'
                }`}>
                  Technologies Used
                </h3>
                <div className="flex flex-wrap gap-2">
                  {selectedProject.techStack.map((tech, index) => (
                    <span 
                      key={index}
                      className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-700 ${
                        isDark 
                          ? 'bg-slate-800/60 text-slate-300 border border-slate-700/50' 
                          : 'bg-amber-100/80 text-amber-700 border border-amber-200/60'
                      }`}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Key Features */}
              <div>
                <h3 className={`font-montserrat text-xl font-semibold mb-4 transition-colors duration-700 ${
                  isDark ? 'text-blue-200' : 'text-amber-700'
                }`}>
                  Key Features
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {selectedProject.features.map((feature, index) => (
                    <div 
                      key={index}
                      className={`flex items-center gap-3 p-3 rounded-xl transition-all duration-700 ${
                        isDark ? 'bg-slate-800/50' : 'bg-amber-50/80'
                      }`}
                    >
                      <div className={`w-2 h-2 rounded-full transition-all duration-700 ${
                        isDark 
                          ? 'bg-gradient-to-r from-blue-500 to-purple-500' 
                          : 'bg-gradient-to-r from-amber-500 to-orange-500'
                      }`} />
                      <span className={`text-sm transition-colors duration-700 ${
                        isDark ? 'text-slate-300' : 'text-amber-700'
                      }`}>
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4 pt-4">
                <motion.a
                  href={selectedProject.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`relative overflow-hidden font-semibold px-6 py-3 rounded-full flex items-center justify-center gap-3 flex-1 group backdrop-blur-xl border shadow-2xl transition-all duration-700 ${
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
                  
                  <span className="relative z-10">View Live Demo</span>
                </motion.a>
                <a
                  href={selectedProject.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex-1 text-center font-semibold px-6 py-3 rounded-full border transition-all duration-700 ${
                    isDark
                      ? 'border-slate-600 text-slate-300 hover:bg-slate-800/50 hover:border-slate-500'
                      : 'border-amber-300 text-amber-700 hover:bg-amber-50 hover:border-amber-400'
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