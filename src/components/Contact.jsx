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
      color: isDark ? 'from-red-500 to-pink-500' : 'from-amber-500 to-orange-500',
      bgColor: isDark ? 'bg-red-500/10' : 'bg-amber-500/20'
    },
    { 
      icon: MdPhone, 
      title: 'Phone', 
      info: '+1 (555) 123-4567',
      color: isDark ? 'from-green-500 to-emerald-500' : 'from-orange-500 to-rose-500',
      bgColor: isDark ? 'bg-green-500/10' : 'bg-orange-500/20'
    },
    { 
      icon: MdLocationOn, 
      title: 'Location', 
      info: 'New York, NY',
      color: isDark ? 'from-blue-500 to-cyan-500' : 'from-rose-500 to-pink-500',
      bgColor: isDark ? 'bg-blue-500/10' : 'bg-rose-500/20'
    }
  ], [isDark]);

  const socialLinks = useMemo(() => [
    { icon: FaGithub, label: 'GitHub', href: '#', color: isDark ? '#f0f6fc' : '#24292f' },
    { icon: FaLinkedin, label: 'LinkedIn', href: '#', color: isDark ? '#0A66C2' : '#0A66C2' },
    { icon: FaTwitter, label: 'Twitter', href: '#', color: isDark ? '#1D9BF0' : '#1D9BF0' },
    { icon: FaDiscord, label: 'Discord', href: '#', color: isDark ? '#5865F2' : '#5865F2' }
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsSubmitting(false);
  };

  return (
    <div className={`min-h-screen transition-all duration-1000 ${isDark ? 'bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600' : 'bg-gradient-to-br from-amber-100 via-orange-200 to-rose-300'}`}>
      <HomeBackground />
      <Navbar />
      
      <motion.div 
        className="relative z-10 container mx-auto px-6 pt-24 pb-12"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Side - Contact Form */}
          <motion.div
            className="flex items-start justify-center pt-0"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="relative w-full max-w-md" style={{ perspective: '1000px' }}>
              <motion.form 
                className={`font-poppins group relative w-full rounded-3xl overflow-hidden backdrop-blur-xl border p-8 transition-all duration-700 ${
                  isDark 
                    ? 'bg-gradient-to-br from-blue-600/20 via-purple-600/20 to-pink-600/20 border-white/20' 
                    : 'bg-gradient-to-br from-amber-100/40 via-orange-100/40 to-rose-100/40 border-amber-200/60'
                }`}
                onSubmit={handleSubmit}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
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

                <div className="mb-6 relative z-10">
                  <h3 className={`font-roboto text-xl font-bold mb-2 transition-all duration-700 ${isDark ? 'text-white' : 'text-black'}`}>
                    Send Message
                  </h3>
                  <p className={`font-opensans text-xs transition-all duration-700 ${isDark ? 'text-gray-300' : 'text-black'}`}>
                    Let's start a conversation
                  </p>
                </div>

                <div className="grid grid-cols-1 gap-3 mb-3">
                  {['name', 'email'].map((field, index) => (
                    <motion.input
                      key={field}
                      type={field === 'email' ? 'email' : 'text'}
                      placeholder={field === 'name' ? 'Your Name' : 'Your Email'}
                      className={`font-opensans w-full p-3 rounded-lg border transition-all duration-700 backdrop-blur-sm text-sm ${
                        isDark 
                          ? 'bg-slate-800/50 border-slate-600 text-white placeholder-gray-400' 
                          : 'bg-white/70 border-amber-200 text-black placeholder-gray-500'
                      } focus:outline-none ${
                        isDark ? 'focus:border-blue-500' : 'focus:border-amber-500'
                      }`}
                      onFocus={() => setFocusedField(field)}
                      onBlur={() => setFocusedField(null)}
                      whileFocus={{ scale: 1.02 }}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 + index * 0.1 }}
                    />
                  ))}
                </div>

                <motion.input
                  type="text"
                  placeholder="Subject"
                  className={`font-opensans w-full p-3 rounded-lg border transition-all duration-700 backdrop-blur-sm mb-3 text-sm ${
                    isDark 
                      ? 'bg-slate-800/50 border-slate-600 text-white placeholder-gray-400' 
                      : 'bg-white/70 border-amber-200 text-black placeholder-gray-500'
                  } focus:outline-none ${
                    isDark ? 'focus:border-blue-500' : 'focus:border-amber-500'
                  }`}
                  onFocus={() => setFocusedField('subject')}
                  onBlur={() => setFocusedField(null)}
                  whileFocus={{ scale: 1.02 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                />

                <motion.textarea
                  rows={3}
                  placeholder="Your Message"
                  className={`font-opensans w-full p-3 rounded-lg border transition-all duration-700 resize-none backdrop-blur-sm mb-4 text-sm ${
                    isDark 
                      ? 'bg-slate-800/50 border-slate-600 text-white placeholder-gray-400' 
                      : 'bg-white/70 border-amber-200 text-black placeholder-gray-500'
                  } focus:outline-none ${
                    isDark ? 'focus:border-blue-500' : 'focus:border-amber-500'
                  }`}
                  onFocus={() => setFocusedField('message')}
                  onBlur={() => setFocusedField(null)}
                  whileFocus={{ scale: 1.02 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                />
                
                <motion.button
                  type="submit"
                  className={`relative overflow-hidden font-semibold px-6 py-3 rounded-full flex items-center justify-center gap-3 w-full group backdrop-blur-xl border shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed relative z-10 transition-all duration-500 ${
                    isDark ? 'text-white border-white/30' : 'text-black border-gray-800/30'
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
                    delay: 0.7,
                    type: "spring",
                    stiffness: 300,
                    damping: 20
                  }}
                  disabled={isSubmitting}
                >
                  {/* Button gradient animation */}
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
                  
                  {/* Shimmer effect */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                    initial={{ x: '-100%' }}
                    whileHover={{ x: '100%' }}
                    transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
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
                        <span className="font-opensans">Sending...</span>
                      </motion.div>
                    ) : (
                      <motion.div
                        key="send"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="flex items-center gap-3 relative z-10"
                      >
                        <span className="font-opensans relative z-10">{labels.sendMessage}</span>
                        <Send size={16} className="group-hover:translate-x-1 transition-transform duration-300" />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.button>
                
                {/* Social Links */}
                <motion.div className="mt-6">
                  <h3 className={`font-medium mb-3 text-sm transition-all duration-700 ${isDark ? 'text-white' : 'text-black'}`}>
                    Connect with me
                  </h3>
                  <div className="flex gap-3">
                    {socialLinks.map((social, index) => {
                      const Icon = social.icon;
                      return (
                        <motion.a
                          key={index}
                          href={social.href}
                          className="w-10 h-10 rounded-lg bg-transparent flex items-center justify-center"
                          whileHover={{ scale: 1.1, y: -2 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <Icon size={24} style={{ color: social.color }} />
                        </motion.a>
                      );
                    })}
                  </div>
                </motion.div>
              </motion.form>
            </div>
          </motion.div>

          {/* Right Side - Main Text & Info */}
          <div className="space-y-8">
            <div className="sticky top-32">
              <motion.h1 
                className="font-playfair text-4xl md:text-5xl font-bold mb-6"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <span className={`bg-clip-text text-transparent transition-all duration-700 ${
                  isDark ? 'bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600' : 'bg-gradient-to-r from-amber-600 via-orange-600 to-rose-600'
                }`}>
                  {labels.contactMe}
                </span>
              </motion.h1>
              
              <motion.h2 
                className={`font-montserrat text-xl md:text-2xl font-light mb-8 transition-all duration-700 ${isDark ? 'text-gray-200' : 'text-black'}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                {labels.subtitle}
              </motion.h2>
              
              <motion.p 
                className={`font-opensans text-lg leading-relaxed mb-8 transition-all duration-700 ${isDark ? 'text-gray-300' : 'text-black'}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                {labels.description}
              </motion.p>
              
              <div className={`font-opensans text-base leading-relaxed space-y-4 transition-all duration-700 ${isDark ? 'text-gray-300' : 'text-black'}`}>
                <p>
                  Ready to bring your vision to life? I'm passionate about creating innovative solutions that make a difference.
                  Whether you're looking to build a stunning web application, need technical consultation, or want to collaborate on an exciting project, I'd love to hear from you.
                  Let's connect and explore how we can work together to create something extraordinary.
                </p>
              </div>
              
              {/* Contact Info Cards */}
              <motion.div className="grid grid-cols-1 gap-3 mt-6">
                {contactInfo.map((contact, index) => {
                  const Icon = contact.icon;
                  return (
                    <motion.div 
                      key={index} 
                      className={`group relative p-3 rounded-full backdrop-blur-xl border cursor-pointer overflow-hidden transition-all duration-700 ${
                        isDark 
                          ? 'bg-gradient-to-br from-blue-600/20 via-purple-600/20 to-pink-600/20 border-white/20' 
                          : 'bg-gradient-to-br from-amber-100/40 via-orange-100/40 to-rose-100/40 border-amber-200/60'
                      }`}
                      whileHover={{ 
                        scale: 1.02, 
                        y: -5,
                        boxShadow: isDark
                          ? '0 20px 40px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(99, 102, 241, 0.2)'
                          : '0 20px 40px rgba(15, 23, 42, 0.08), 0 0 0 1px rgba(251, 191, 36, 0.3)'
                      }}
                      initial={{ opacity: 0, x: 30 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
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
                      <div className="flex items-center gap-3 relative z-10">
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-700 ${
                          isDark ? 'bg-gradient-to-r from-blue-500 to-purple-500' : 'bg-gradient-to-r from-amber-500 to-orange-500'
                        }`}>
                          <Icon className="text-white" size={16} />
                        </div>
                        <div>
                          <h3 className={`font-medium text-sm transition-all duration-700 ${isDark ? 'text-white' : 'text-black'}`}>
                            {contact.title}
                          </h3>
                          <p className={`text-xs transition-all duration-700 ${isDark ? 'text-gray-300' : 'text-black'}`}>
                            {contact.info}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </motion.div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Contact;