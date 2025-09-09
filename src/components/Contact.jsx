import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Download, Sparkles } from 'lucide-react';
import { MdEmail, MdPhone, MdLocationOn } from 'react-icons/md';
import { FaGithub, FaLinkedin, FaTwitter, FaDiscord } from 'react-icons/fa';
import { useTheme } from '../contexts/ThemeContext';
import Navbar from './Navbar';
import { HomeBackground } from '../portfolio_animation';

const Contact = () => {
  const { isDark = false } = useTheme() || {};
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [focusedField, setFocusedField] = useState(null);
  const [hoveredSocial, setHoveredSocial] = useState(null);

  const labels = {
    contactMe: 'Contact Me',
    subtitle: 'Ready to Create Something Amazing?',
    description: 'Let\'s collaborate and bring your vision to life with cutting-edge technology and creative excellence.',
    downloadCV: 'Download Resume',
    sendMessage: 'Send Message',
    quickConnect: 'Quick Connect'
  };

  const contactInfo = useMemo(() => [
    { 
      icon: MdEmail, 
      title: 'Email', 
      info: 'shikhar@example.com',
      color: 'from-red-500 to-pink-500',
      bgColor: 'bg-red-500/10'
    },
    { 
      icon: MdPhone, 
      title: 'Phone', 
      info: '+1 (555) 123-4567',
      color: 'from-green-500 to-emerald-500',
      bgColor: 'bg-green-500/10'
    },
    { 
      icon: MdLocationOn, 
      title: 'Location', 
      info: 'New York, NY',
      color: 'from-blue-500 to-cyan-500',
      bgColor: 'bg-blue-500/10'
    }
  ], []);

  const socialLinks = useMemo(() => [
    { icon: FaGithub, label: 'GitHub', href: '#', color: isDark ? '#f0f6fc' : '#24292f' },
    { icon: FaLinkedin, label: 'LinkedIn', href: '#', color: '#0A66C2' },
    { icon: FaTwitter, label: 'Twitter', href: '#', color: '#1D9BF0' },
    { icon: FaDiscord, label: 'Discord', href: '#', color: '#5865F2' }
  ], [isDark]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    },
    hover: {
      scale: 1.02,
      y: -5,
      transition: {
        duration: 0.3,
        ease: "easeInOut"
      }
    }
  };

  const formVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsSubmitting(false);
  };

  return (
    <div className={`min-h-screen ${isDark ? 'bg-gray-900' : 'bg-gradient-to-br from-slate-50 via-white to-blue-50'}`}>
      <HomeBackground />
      <Navbar />
      
      <motion.div 
        className="relative z-10 container mx-auto px-6 pt-32 pb-20"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Hero Section */}
        <motion.div
          className="text-center mb-20"
          variants={itemVariants}
        >
          <motion.div
            className="flex items-center justify-center gap-3 mb-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Sparkles className="text-yellow-500" size={32} />
            <motion.h1 
              className="font-playfair text-6xl md:text-7xl font-bold"
              animate={{
                backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
              }}
              transition={{ duration: 4, repeat: Infinity }}
            >
              <span 
                className="bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent"
                style={{ backgroundSize: '200% 200%' }}
              >
                {labels.contactMe}
              </span>
            </motion.h1>
            <Sparkles className="text-pink-500" size={32} />
          </motion.div>
          
          <motion.h2 
            className={`font-montserrat text-3xl md:text-4xl font-light mb-6 ${isDark ? 'text-gray-200' : 'text-gray-700'}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {labels.subtitle}
          </motion.h2>
          
          <motion.p 
            className={`font-opensans text-xl leading-relaxed max-w-3xl mx-auto ${isDark ? 'text-gray-300' : 'text-gray-600'}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            {labels.description}
          </motion.p>
        </motion.div>

        <div className="max-w-7xl mx-auto">
          {/* Contact Cards */}
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16"
            variants={containerVariants}
          >
            {contactInfo.map((contact, index) => {
              const Icon = contact.icon;
              return (
                <motion.div 
                  key={index} 
                  className={`group relative p-8 rounded-3xl ${isDark ? 'bg-gray-800/30' : 'bg-white/30'} backdrop-blur-xl border border-white/10 cursor-pointer overflow-hidden`}
                  variants={cardVariants}
                  whileHover={{ 
                    scale: 1.05, 
                    rotateY: 5,
                    z: 50
                  }}
                  initial="hidden"
                  animate="visible"
                  transition={{ delay: index * 0.15 }}
                  style={{ transformStyle: 'preserve-3d' }}
                >
                  
                  <div className="relative z-10 text-center">
                    <motion.div
                      className="w-20 h-20 mx-auto mb-6 flex items-center justify-center"
                      whileHover={{ rotate: 360, scale: 1.1 }}
                      transition={{ duration: 0.6 }}
                    >
                      <Icon className={`text-4xl ${isDark ? 'text-white' : 'text-gray-700'}`} size={48} />
                    </motion.div>
                    
                    <h3 className={`font-montserrat text-xl font-semibold mb-3 ${isDark ? 'text-white' : 'text-gray-800'}`}>
                      {contact.title}
                    </h3>
                    <p className={`font-opensans text-lg ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                      {contact.info}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
            {/* Left Side - Social & CV */}
            <motion.div
              className="lg:col-span-2 space-y-8"
              variants={containerVariants}
            >
              {/* Social Links */}
              <motion.div
                className={`p-8 rounded-3xl ${isDark ? 'bg-gray-800/30' : 'bg-white/30'} backdrop-blur-xl border border-white/10`}
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 }}
              >
                <h3 className={`font-montserrat text-2xl font-semibold mb-6 ${isDark ? 'text-white' : 'text-gray-800'}`}>
                  {labels.quickConnect}
                </h3>
                
                <div className="grid grid-cols-2 gap-4">
                  {socialLinks.map((social, index) => {
                    const Icon = social.icon;
                    return (
                      <motion.a
                        key={index}
                        href={social.href}
                        className="group p-2 flex flex-col items-center gap-3 transition-all duration-300"
                        whileHover={{ scale: 1.05, y: -5 }}
                        whileTap={{ scale: 0.95 }}
                        onHoverStart={() => setHoveredSocial(index)}
                        onHoverEnd={() => setHoveredSocial(null)}
                      >
                        <motion.div
                          animate={{
                            scale: hoveredSocial === index ? 1.2 : 1
                          }}
                          transition={{ duration: 0.3 }}
                        >
                          <Icon 
                            size={24} 
                            style={{ color: social.color }}
                            className="transition-colors duration-300"
                          />
                        </motion.div>
                        <span className={`font-opensans text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-600'} group-hover:text-blue-500 transition-colors`}>
                          {social.label}
                        </span>
                      </motion.a>
                    );
                  })}
                </div>
              </motion.div>
              
              {/* Download CV */}
              <motion.button 
                className="group relative bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 rounded-full font-medium transition-all duration-500 overflow-hidden shadow-lg hover:shadow-2xl flex items-center justify-center gap-2"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent"
                  initial={{ x: '-100%' }}
                  whileHover={{ x: '100%' }}
                  transition={{ duration: 0.8, ease: "easeInOut" }}
                />
                <Download size={16} className="relative z-10" />
                <span className="font-opensans relative z-10">{labels.downloadCV}</span>
              </motion.button>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              className="lg:col-span-3"
              variants={formVariants}
            >
              <motion.form 
                className={`p-10 rounded-3xl ${isDark ? 'bg-gray-800/30' : 'bg-white/30'} backdrop-blur-xl border border-white/10 shadow-2xl`}
                onSubmit={handleSubmit}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <div className="mb-8">
                  <h3 className={`font-playfair text-3xl font-bold mb-3 ${isDark ? 'text-white' : 'text-gray-800'}`}>
                    Send Message
                  </h3>
                  <p className={`font-opensans ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                    Let's start a conversation about your next project
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  {['name', 'email'].map((field, index) => (
                    <motion.div
                      key={field}
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 + index * 0.1 }}
                    >
                      <motion.input
                        type={field === 'email' ? 'email' : 'text'}
                        placeholder={field === 'name' ? 'Your Name' : 'Your Email'}
                        className={`font-opensans w-full p-5 rounded-2xl border-2 ${isDark ? 'bg-gray-700/50 border-gray-600 text-white placeholder-gray-400' : 'bg-white/50 border-gray-200 text-gray-800 placeholder-gray-500'} focus:outline-none focus:border-blue-500 transition-all duration-300 backdrop-blur-sm`}
                        onFocus={() => setFocusedField(field)}
                        onBlur={() => setFocusedField(null)}
                        whileFocus={{ scale: 1.02 }}
                        animate={{
                          borderColor: focusedField === field ? '#3B82F6' : undefined,
                          boxShadow: focusedField === field ? '0 0 0 4px rgba(59, 130, 246, 0.1)' : undefined
                        }}
                      />
                    </motion.div>
                  ))}
                </div>

                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 }}
                  className="mb-6"
                >
                  <motion.input
                    type="text"
                    placeholder="Subject"
                    className={`font-opensans w-full p-5 rounded-2xl border-2 ${isDark ? 'bg-gray-700/50 border-gray-600 text-white placeholder-gray-400' : 'bg-white/50 border-gray-200 text-gray-800 placeholder-gray-500'} focus:outline-none focus:border-blue-500 transition-all duration-300 backdrop-blur-sm`}
                    onFocus={() => setFocusedField('subject')}
                    onBlur={() => setFocusedField(null)}
                    whileFocus={{ scale: 1.02 }}
                    animate={{
                      borderColor: focusedField === 'subject' ? '#3B82F6' : undefined,
                      boxShadow: focusedField === 'subject' ? '0 0 0 4px rgba(59, 130, 246, 0.1)' : undefined
                    }}
                  />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 }}
                  className="mb-8"
                >
                  <motion.textarea
                    rows={6}
                    placeholder="Your Message"
                    className={`font-opensans w-full p-5 rounded-2xl border-2 ${isDark ? 'bg-gray-700/50 border-gray-600 text-white placeholder-gray-400' : 'bg-white/50 border-gray-200 text-gray-800 placeholder-gray-500'} focus:outline-none focus:border-blue-500 transition-all duration-300 resize-none backdrop-blur-sm`}
                    onFocus={() => setFocusedField('message')}
                    onBlur={() => setFocusedField(null)}
                    whileFocus={{ scale: 1.02 }}
                    animate={{
                      borderColor: focusedField === 'message' ? '#3B82F6' : undefined,
                      boxShadow: focusedField === 'message' ? '0 0 0 4px rgba(59, 130, 246, 0.1)' : undefined
                    }}
                  />
                </motion.div>
                
                <motion.button
                  type="submit"
                  className="group relative bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 rounded-full font-medium transition-all duration-500 overflow-hidden shadow-lg hover:shadow-2xl flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.9 }}
                  disabled={isSubmitting}
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent"
                    initial={{ x: '-100%' }}
                    whileHover={{ x: '100%' }}
                    transition={{ duration: 0.8, ease: "easeInOut" }}
                  />
                  
                  <AnimatePresence mode="wait">
                    {isSubmitting ? (
                      <motion.div
                        key="submitting"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="flex items-center gap-3 relative z-10"
                      >
                        <motion.div
                          className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        />
                        <span className="font-opensans">Sending Message...</span>
                      </motion.div>
                    ) : (
                      <motion.div
                        key="send"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="flex items-center gap-3 relative z-10"
                      >
                        <span className="font-opensans">{labels.sendMessage}</span>
                        <motion.div
                          whileHover={{ x: 5 }}
                          transition={{ duration: 0.2 }}
                        >
                          <Send size={16} />
                        </motion.div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.button>
              </motion.form>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Contact;