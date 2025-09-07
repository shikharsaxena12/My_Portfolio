import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import Navbar from './Navbar';
import HomeBackground from './HomeBackground';

const Contact = () => {
  const { isDark = false } = useTheme() || {};
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  return (
    <div className={`h-screen overflow-hidden ${isDark ? 'bg-gray-900' : 'bg-gradient-to-br from-slate-50 via-white to-blue-50'}`}>
      <HomeBackground />
      <Navbar />
      
      <div className="relative z-10 container mx-auto px-6 pt-32 pb-16 h-full flex flex-col justify-center">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Contact Me
            </span>
          </h1>
          <p className={`text-lg ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
            Let's discuss your next project
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
          >
            {[
              { icon: Mail, title: 'Email', info: 'shikhar@example.com' },
              { icon: Phone, title: 'Phone', info: '+1 (555) 123-4567' },
              { icon: MapPin, title: 'Location', info: 'New York, NY' }
            ].map((contact, index) => {
              const Icon = contact.icon;
              return (
                <div key={index} className={`p-6 rounded-xl ${isDark ? 'bg-gray-800/50' : 'bg-white/50'} backdrop-blur-sm border ${isDark ? 'border-gray-700' : 'border-white/60'}`}>
                  <div className="flex items-center gap-4">
                    <Icon className="text-blue-500" size={24} />
                    <div>
                      <h3 className={`font-semibold ${isDark ? 'text-white' : 'text-gray-800'}`}>{contact.title}</h3>
                      <p className={`${isDark ? 'text-gray-300' : 'text-gray-600'}`}>{contact.info}</p>
                    </div>
                  </div>
                </div>
              );
            })}
            
            {/* Download CV Button */}
            <button className="w-full bg-gradient-to-r from-green-500 to-emerald-500 text-white p-4 rounded-xl font-medium hover:shadow-lg transition-all flex items-center justify-center gap-2">
              Download CV
            </button>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <form className={`p-8 rounded-xl ${isDark ? 'bg-gray-800/50' : 'bg-white/50'} backdrop-blur-sm border ${isDark ? 'border-gray-700' : 'border-white/60'}`}>
              <div className="space-y-6">
                <input
                  type="text"
                  placeholder="Your Name"
                  className={`w-full p-4 rounded-lg border ${isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-800'} focus:outline-none focus:ring-2 focus:ring-blue-500`}
                />
                <input
                  type="email"
                  placeholder="Your Email"
                  className={`w-full p-4 rounded-lg border ${isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-800'} focus:outline-none focus:ring-2 focus:ring-blue-500`}
                />
                <textarea
                  placeholder="Your Message"
                  rows="5"
                  className={`w-full p-4 rounded-lg border ${isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-800'} focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none`}
                />
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white p-4 rounded-lg font-medium hover:shadow-lg transition-all flex items-center justify-center gap-2"
                >
                  Send Message
                  <Send size={16} />
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Contact;