import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { Award, Calendar, ExternalLink } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import Navbar from './Navbar';
import { HomeBackground } from '../portfolio_animation';

const Certificates = () => {
  const { isDark = false } = useTheme() || {};

  const labels = {
    myCertificates: 'My Certificates',
    certificatesDescription: 'Professional certifications and achievements'
  };

  const certificates = useMemo(() => [
    {
      id: 1,
      title: 'React Developer Certification',
      issuer: 'Meta',
      date: '2023',
      description: 'Advanced React development and best practices',
      image: '/api/placeholder/300/200'
    },
    {
      id: 2,
      title: 'Full Stack Web Development',
      issuer: 'freeCodeCamp',
      date: '2023',
      description: 'Complete full-stack development certification',
      image: '/api/placeholder/300/200'
    },
    {
      id: 3,
      title: 'JavaScript Algorithms',
      issuer: 'freeCodeCamp',
      date: '2022',
      description: 'Data structures and algorithms in JavaScript',
      image: '/api/placeholder/300/200'
    },
    {
      id: 4,
      title: 'AWS Cloud Practitioner',
      issuer: 'Amazon Web Services',
      date: '2023',
      description: 'Cloud computing fundamentals and AWS services',
      image: '/api/placeholder/300/200'
    },
    {
      id: 5,
      title: 'Node.js Development',
      issuer: 'MongoDB University',
      date: '2022',
      description: 'Backend development with Node.js and MongoDB',
      image: '/api/placeholder/300/200'
    },
    {
      id: 6,
      title: 'UI/UX Design',
      issuer: 'Google',
      date: '2023',
      description: 'User experience design principles and practices',
      image: '/api/placeholder/300/200'
    }
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
              {labels.myCertificates}
            </span>
          </h1>
          <p className={`text-lg ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
            {labels.certificatesDescription}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {certificates.map((cert, index) => (
            <motion.div
              key={cert.id}
              className={`group relative rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 ${
                isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'
              }`}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.05, y: -10 }}
            >
              {/* Certificate Image */}
              <div className="relative h-48 overflow-hidden">
                <div className={`w-full h-full flex items-center justify-center ${
                  isDark ? 'bg-gray-700' : 'bg-gray-100'
                }`}>
                  <Award size={48} className="text-yellow-500" />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                {/* View Certificate Button */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <button 
                    onClick={() => console.log('Viewing certificate:', cert.title?.replace(/[\r\n]/g, ''))}
                    className="bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-full flex items-center gap-2 hover:bg-white/30 transition-all"
                  >
                    <ExternalLink size={16} />
                    View Certificate
                  </button>
                </div>
              </div>
              
              {/* Certificate Info */}
              <div className="p-6">
                <h3 className={`text-xl font-semibold mb-2 ${
                  isDark ? 'text-white' : 'text-gray-800'
                }`}>
                  {cert.title}
                </h3>
                
                <div className="flex items-center gap-2 mb-3">
                  <div className={`text-sm font-medium ${
                    isDark ? 'text-blue-400' : 'text-blue-600'
                  }`}>
                    {cert.issuer}
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar size={14} className={isDark ? 'text-gray-400' : 'text-gray-500'} />
                    <span className={`text-sm ${
                      isDark ? 'text-gray-400' : 'text-gray-500'
                    }`}>
                      {cert.date}
                    </span>
                  </div>
                </div>
                
                <p className={`text-sm ${
                  isDark ? 'text-gray-300' : 'text-gray-600'
                }`}>
                  {cert.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Certificates;