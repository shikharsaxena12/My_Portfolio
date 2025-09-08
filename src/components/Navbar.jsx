import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Menu, X, Sun, Moon } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { isDark, toggleTheme } = useTheme();

  const location = useLocation();

  const getNavItemProps = (item) => {
    const isActive = item.href.startsWith('/') ? location.pathname === item.href : false;
    const Component = item.href.startsWith('/') ? Link : 'a';
    const linkProps = item.href.startsWith('/') ? { to: item.href } : { href: item.href };
    return { isActive, Component, linkProps };
  };
  
  const labels = {
    logo: 'Shikhar',
    home: 'Home',
    about: 'About',
    skills: 'Skills',
    projects: 'Projects',
    certificates: 'Certificates',
    gallery: 'Gallery',
    contact: 'Contact'
  };
  
  const navItems = [
    { label: labels.home, href: '/' },
    { label: labels.about, href: '/about' },
    { label: labels.skills, href: '/skills' },
    { label: labels.projects, href: '/projects' },
    { label: labels.certificates, href: '/certificates' },
    { label: labels.gallery, href: '/gallery' },
    { label: labels.contact, href: '/contact' }
  ];

  return (
    <motion.nav 
      className="fixed top-4 left-1/2 transform -translate-x-1/2 z-40 w-auto max-w-4xl"
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <div className="bg-white/90 dark:bg-gray-800 backdrop-blur-md rounded-full border border-gray-200/50 dark:border-gray-700 shadow-lg px-6 py-3">
        <div className="flex items-center justify-between gap-8">
          {/* Logo */}
          <Link to="/landing">
            <motion.div 
              className="text-blue-500 dark:text-blue-400 text-xl font-bold cursor-pointer"
              whileHover={{ scale: 1.05 }}
            >
              {labels.logo}
            </motion.div>
          </Link>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item, index) => {
              const { isActive, Component, linkProps } = getNavItemProps(item);
              
              return (
                <Component
                  key={item.label}
                  {...linkProps}
                  className="block"
                >
                  <motion.div
                    className={`text-sm font-medium transition-colors duration-300 ${
                      isActive 
                        ? 'text-blue-500 dark:text-blue-400' 
                        : 'text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
                    }`}
                    whileHover={{ y: -1 }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    {item.label}
                  </motion.div>
                </Component>
              );
            })}
          </div>

          {/* Theme Toggle */}
          <motion.button
            onClick={toggleTheme}
            className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors duration-200"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            {isDark ? <Sun size={16} /> : <Moon size={16} />}
          </motion.button>

          {/* Mobile Menu Button */}
          <motion.button
            className="md:hidden text-gray-700 dark:text-gray-300 p-2"
            onClick={() => setIsOpen(!isOpen)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </motion.button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <motion.div
          className="md:hidden mt-4 bg-white/90 dark:bg-gray-800 backdrop-blur-md rounded-2xl border border-gray-200/50 dark:border-gray-700 shadow-lg p-6"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
        >
          {navItems.map((item, index) => {
            const { isActive, Component, linkProps } = getNavItemProps(item);
            
            return (
              <Component
                key={item.label}
                {...linkProps}
                className="block"
                onClick={() => setIsOpen(false)}
              >
                <motion.div
                  className={`block font-medium py-3 transition-colors duration-300 ${
                    isActive 
                      ? 'text-blue-500 dark:text-blue-400' 
                      : 'text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
                  }`}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  {item.label}
                </motion.div>
              </Component>
            );
          })}
        </motion.div>
      )}
    </motion.nav>
  );
};

export default Navbar;