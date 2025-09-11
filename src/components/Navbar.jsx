import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Sun, Moon } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { isDark, toggleTheme } = useTheme();
  const location = useLocation();

  const navItems = [
    { label: 'Home', path: '/portfolio' },
    { label: 'About', path: '/about' },
    { label: 'Skills', path: '/skills' },
    { label: 'Projects', path: '/projects' },
    { label: 'Certificates', path: '/certificates' },
    { label: 'Gallery', path: '/gallery' },
    { label: 'Testimonials', path: '/testimonials' },
    { label: 'Contact', path: '/contact' }
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <motion.nav 
      className={`fixed top-4 left-1/2 transform -translate-x-1/2 z-40 w-auto max-w-5xl ${location.pathname === '/' ? 'hidden' : ''}`}
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className={`relative backdrop-blur-xl rounded-full border shadow-2xl px-6 py-3 transition-all duration-700 overflow-hidden ${
        isDark 
          ? 'bg-slate-900/80 border-blue-400/20' 
          : 'bg-white/90 border-amber-300/30'
      }`}>
        
        {/* Animated Background Overlay */}
        <motion.div
          className="absolute inset-0 opacity-30"
          animate={{
            background: isDark ? [
              'linear-gradient(135deg, rgba(59, 130, 246, 0.1), rgba(147, 51, 234, 0.1), rgba(236, 72, 153, 0.1))',
              'linear-gradient(225deg, rgba(147, 51, 234, 0.1), rgba(236, 72, 153, 0.1), rgba(59, 130, 246, 0.1))',
              'linear-gradient(315deg, rgba(236, 72, 153, 0.1), rgba(59, 130, 246, 0.1), rgba(147, 51, 234, 0.1))',
              'linear-gradient(45deg, rgba(59, 130, 246, 0.1), rgba(147, 51, 234, 0.1), rgba(236, 72, 153, 0.1))'
            ] : [
              'linear-gradient(135deg, rgba(245, 158, 11, 0.15), rgba(249, 115, 22, 0.15), rgba(244, 63, 94, 0.15))',
              'linear-gradient(225deg, rgba(249, 115, 22, 0.15), rgba(244, 63, 94, 0.15), rgba(245, 158, 11, 0.15))',
              'linear-gradient(315deg, rgba(244, 63, 94, 0.15), rgba(245, 158, 11, 0.15), rgba(249, 115, 22, 0.15))',
              'linear-gradient(45deg, rgba(245, 158, 11, 0.15), rgba(249, 115, 22, 0.15), rgba(244, 63, 94, 0.15))'
            ]
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear", repeatType: "loop" }}
        />



        {/* Border Shimmer */}
        <motion.div
          className="absolute inset-0 rounded-full"
          style={{
            background: isDark 
              ? 'linear-gradient(45deg, transparent, rgba(59, 130, 246, 0.2), transparent, rgba(147, 51, 234, 0.2), transparent)'
              : 'linear-gradient(45deg, transparent, rgba(245, 158, 11, 0.2), transparent, rgba(249, 115, 22, 0.2), transparent)',
            backgroundSize: '400% 400%'
          }}
          animate={{
            backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
          }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />

        <div className="flex items-center justify-between gap-6 relative z-10">
          
          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center gap-0.5">
            {navItems.map((item, index) => (
              <Link key={item.label} to={item.path}>
                <motion.div
                  className="relative px-3 py-1.5 rounded-full cursor-pointer"
                  whileHover={{ 
                    scale: 1.05,
                    boxShadow: isDark 
                      ? '0 4px 20px rgba(59, 130, 246, 0.3)' 
                      : '0 4px 20px rgba(245, 158, 11, 0.3)'
                  }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                >
                  {isActive(item.path) && (
                    <motion.div
                      className={`absolute inset-0 rounded-full transition-all duration-700 ${
                        isDark 
                          ? 'bg-gradient-to-r from-blue-500/30 to-purple-500/30' 
                          : 'bg-gradient-to-r from-amber-400/30 to-orange-400/30'
                      }`}
                      layoutId="activeTab"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                  
                  {/* Hover Glow Effect */}
                  <motion.div
                    className={`absolute inset-0 rounded-full opacity-0 transition-all duration-700 ${
                      isDark 
                        ? 'bg-gradient-to-r from-blue-400/10 to-purple-400/10' 
                        : 'bg-gradient-to-r from-amber-400/10 to-orange-400/10'
                    }`}
                    whileHover={{ opacity: 1 }}
                  />
                  
                  <span className={`relative z-10 text-xs font-medium transition-colors duration-700 ${
                    isActive(item.path)
                      ? isDark ? 'text-blue-300' : 'text-black'
                      : isDark ? 'text-blue-200 hover:text-blue-100' : 'text-black hover:text-black'
                  }`}>
                    {item.label}
                  </span>
                </motion.div>
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-2">
            {/* Theme Toggle */}
            <motion.button
              onClick={toggleTheme}
              className={`relative p-2 rounded-full transition-all duration-700 overflow-hidden ${
                isDark 
                  ? 'bg-slate-800/60 hover:bg-slate-700/80 border border-blue-400/20' 
                  : 'bg-amber-100/60 hover:bg-amber-200/80 border border-amber-300/30'
              }`}
              whileHover={{ 
                scale: 1.1, 
                rotate: 180,
                boxShadow: isDark 
                  ? '0 4px 20px rgba(59, 130, 246, 0.4)' 
                  : '0 4px 20px rgba(245, 158, 11, 0.4)'
              }}
              whileTap={{ scale: 0.9 }}
            >
              {/* Button Background Animation */}
              <motion.div
                className="absolute inset-0"
                animate={{
                  background: isDark ? [
                    'radial-gradient(circle, rgba(59, 130, 246, 0.1) 0%, transparent 70%)',
                    'radial-gradient(circle, rgba(147, 51, 234, 0.1) 0%, transparent 70%)',
                    'radial-gradient(circle, rgba(59, 130, 246, 0.1) 0%, transparent 70%)'
                  ] : [
                    'radial-gradient(circle, rgba(245, 158, 11, 0.15) 0%, transparent 70%)',
                    'radial-gradient(circle, rgba(249, 115, 22, 0.15) 0%, transparent 70%)',
                    'radial-gradient(circle, rgba(245, 158, 11, 0.15) 0%, transparent 70%)'
                  ]
                }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              />
              
              <AnimatePresence mode="wait">
                {isDark ? (
                  <motion.div
                    key="sun"
                    initial={{ rotate: -180, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 180, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="relative z-10"
                  >
                    <Sun size={16} className="text-yellow-400" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="moon"
                    initial={{ rotate: -180, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 180, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="relative z-10"
                  >
                    <Moon size={16} className="text-black" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>

            {/* Mobile Menu Button */}
            <motion.button
              className={`lg:hidden p-2 rounded-full transition-all duration-700 ${
                isDark ? 'text-blue-200 hover:text-blue-100' : 'text-black hover:text-black'
              }`}
              onClick={() => setIsOpen(!isOpen)}
              whileHover={{ 
                scale: 1.1,
                boxShadow: isDark 
                  ? '0 4px 15px rgba(59, 130, 246, 0.3)' 
                  : '0 4px 15px rgba(245, 158, 11, 0.3)'
              }}
              whileTap={{ scale: 0.9 }}
            >
              <AnimatePresence mode="wait">
                {isOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X size={20} />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu size={20} />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className={`lg:hidden mt-4 backdrop-blur-xl rounded-2xl border shadow-2xl overflow-hidden transition-all duration-700 relative ${
              isDark 
                ? 'bg-slate-900/90 border-blue-400/20' 
                : 'bg-white/95 border-amber-300/30'
            }`}
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            {/* Mobile Menu Background Animation */}
            <motion.div
              className="absolute inset-0 opacity-20"
              animate={{
                background: isDark ? [
                  'linear-gradient(135deg, rgba(59, 130, 246, 0.1), rgba(147, 51, 234, 0.1))',
                  'linear-gradient(225deg, rgba(147, 51, 234, 0.1), rgba(59, 130, 246, 0.1))',
                  'linear-gradient(135deg, rgba(59, 130, 246, 0.1), rgba(147, 51, 234, 0.1))'
                ] : [
                  'linear-gradient(135deg, rgba(245, 158, 11, 0.15), rgba(249, 115, 22, 0.15))',
                  'linear-gradient(225deg, rgba(249, 115, 22, 0.15), rgba(245, 158, 11, 0.15))',
                  'linear-gradient(135deg, rgba(245, 158, 11, 0.15), rgba(249, 115, 22, 0.15))'
                ]
              }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            />



            <div className="p-6 space-y-2 relative z-10">
              {navItems.map((item, index) => (
                <Link key={item.label} to={item.path} onClick={() => setIsOpen(false)}>
                  <motion.div
                    className={`relative p-3 rounded-xl cursor-pointer transition-all duration-700 overflow-hidden ${
                      isActive(item.path)
                        ? isDark 
                          ? 'bg-gradient-to-r from-blue-500/20 to-purple-500/20' 
                          : 'bg-gradient-to-r from-amber-400/20 to-orange-400/20'
                        : isDark 
                          ? 'hover:bg-slate-800/50' 
                          : 'hover:bg-amber-100/50'
                    }`}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.3 }}
                    whileHover={{ 
                      x: 5,
                      boxShadow: isDark 
                        ? '0 4px 15px rgba(59, 130, 246, 0.2)' 
                        : '0 4px 15px rgba(245, 158, 11, 0.2)'
                    }}
                  >
                    {/* Menu Item Glow Effect */}
                    <motion.div
                      className={`absolute inset-0 rounded-xl opacity-0 transition-all duration-700 ${
                        isDark 
                          ? 'bg-gradient-to-r from-blue-400/5 to-purple-400/5' 
                          : 'bg-gradient-to-r from-amber-400/5 to-orange-400/5'
                      }`}
                      whileHover={{ opacity: 1 }}
                    />
                    
                    <span className={`font-medium transition-colors duration-700 relative z-10 ${
                      isActive(item.path)
                        ? isDark ? 'text-blue-300' : 'text-black'
                        : isDark ? 'text-blue-200' : 'text-black'
                    }`}>
                      {item.label}
                    </span>
                  </motion.div>
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;