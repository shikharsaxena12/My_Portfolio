import React, { useMemo, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Award, ExternalLink } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import Navbar from './Navbar';
import { HomeBackground } from '../portfolio_animation';

const Certificates = () => {
  const { isDark = false } = useTheme() || {};
  const [isHovered, setIsHovered] = React.useState(false);
  const [modalOpen, setModalOpen] = React.useState(false);
  const [selectedCertificate, setSelectedCertificate] = React.useState(null);
  
  const handleHoverStart = useCallback(() => setIsHovered(true), []);
  const handleHoverEnd = useCallback(() => setIsHovered(false), []);
  
  const openModal = (cert) => {
    setSelectedCertificate(cert);
    setModalOpen(true);
  };

  const labels = {
    myCertificates: 'My Certificates',
    certificatesDescription: 'A showcase of my professional certifications and achievements that demonstrate my commitment to continuous learning and expertise across various technologies. These credentials validate my skills in modern web development, cloud computing, and software engineering best practices.'
  };

  const certificates = useMemo(() => [
    {
      id: 1,
      title: 'React Developer Certification',
      issuer: 'Meta',
      date: 'March 15, 2023',
      description: 'Advanced React development and best practices',
      image: '/api/placeholder/300/200'
    },
    {
      id: 2,
      title: 'Full Stack Web Development',
      issuer: 'freeCodeCamp',
      date: 'August 22, 2023',
      description: 'Complete full-stack development certification',
      image: '/api/placeholder/300/200'
    },
    {
      id: 3,
      title: 'JavaScript Algorithms',
      issuer: 'freeCodeCamp',
      date: 'November 10, 2022',
      description: 'Data structures and algorithms in JavaScript',
      image: '/api/placeholder/300/200'
    },
    {
      id: 4,
      title: 'AWS Cloud Practitioner',
      issuer: 'Amazon Web Services',
      date: 'June 5, 2023',
      description: 'Cloud computing fundamentals and AWS services',
      image: '/api/placeholder/300/200'
    },
    {
      id: 5,
      title: 'Node.js Development',
      issuer: 'MongoDB University',
      date: 'September 18, 2022',
      description: 'Backend development with Node.js and MongoDB',
      image: '/api/placeholder/300/200'
    },
    {
      id: 6,
      title: 'UI/UX Design',
      issuer: 'Google',
      date: 'December 3, 2023',
      description: 'User experience design principles and practices',
      image: '/api/placeholder/300/200'
    }
  ], []);

  return (
    <div className={`h-screen overflow-hidden ${isDark ? 'bg-gray-900' : 'bg-gradient-to-br from-slate-50 via-white to-blue-50'}`}>
      <HomeBackground />
      <Navbar />
      
      <div className="relative z-10 h-full flex">
        {/* Left Side - Full Height Moving Certificate Strips */}
        <motion.div
          className="w-1/2 lg:w-1/2 relative overflow-hidden"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="relative w-full h-full flex justify-center items-center">
            <div className="relative w-full max-w-md h-full overflow-hidden">
              {/* First Column */}
              <motion.div 
                className="absolute left-0 flex flex-col gap-4"
                animate={{ y: isHovered ? undefined : [-600, 0] }}
                transition={{
                  duration: 15,
                  repeat: Infinity,
                  ease: "linear"
                }}
                onHoverStart={handleHoverStart}
                onHoverEnd={handleHoverEnd}
              >
                {[...certificates.slice(0, 3), ...certificates.slice(0, 3), ...certificates.slice(0, 3)].map((cert, index) => (
                  <motion.div
                    key={`col1-${index}`}
                    className={`group relative rounded-xl overflow-hidden shadow-lg flex-shrink-0 w-52 h-64 flex flex-col cursor-pointer ${
                      isDark ? 'bg-slate-800/90 border border-slate-700/50' : 'bg-white/95 border border-slate-200/60'
                    }`}
                    whileHover={{ scale: 1.05, x: 10 }}
                    onClick={() => openModal(cert)}
                  >
                    <div className={`relative h-20 p-3 flex items-center justify-center ${
                      isDark ? 'bg-gradient-to-br from-indigo-600/20 to-purple-600/20' : 'bg-gradient-to-br from-indigo-50 to-purple-50'
                    }`}>
                      <Award size={24} className="text-yellow-500" />
                    </div>
                    <div className="p-3 flex flex-col flex-1">
                      <h3 className={`text-sm font-bold mb-1 line-clamp-2 ${
                        isDark ? 'text-white' : 'text-slate-800'
                      }`}>
                        {cert.title}
                      </h3>
                      <div className={`text-xs font-medium mb-2 ${
                        isDark ? 'text-indigo-400' : 'text-indigo-600'
                      }`}>
                        {cert.issuer}
                      </div>
                      <div className={`text-xs mt-auto ${
                        isDark ? 'text-slate-400' : 'text-slate-500'
                      }`}>
                        {cert.date}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>

              {/* Second Column */}
              <motion.div 
                className="absolute right-0 flex flex-col gap-4"
                animate={{ y: isHovered ? undefined : [0, -600] }}
                transition={{
                  duration: 15,
                  repeat: Infinity,
                  ease: "linear"
                }}
                onHoverStart={handleHoverStart}
                onHoverEnd={handleHoverEnd}
              >
                {[...certificates.slice(3, 6), ...certificates.slice(3, 6), ...certificates.slice(3, 6)].map((cert, index) => (
                  <motion.div
                    key={`col2-${index}`}
                    className={`group relative rounded-xl overflow-hidden shadow-lg flex-shrink-0 w-52 h-64 flex flex-col cursor-pointer ${
                      isDark ? 'bg-slate-800/90 border border-slate-700/50' : 'bg-white/95 border border-slate-200/60'
                    }`}
                    whileHover={{ scale: 1.05, x: -10 }}
                    onClick={() => openModal(cert)}
                  >
                    <div className={`relative h-20 p-3 flex items-center justify-center ${
                      isDark ? 'bg-gradient-to-br from-purple-600/20 to-pink-600/20' : 'bg-gradient-to-br from-purple-50 to-pink-50'
                    }`}>
                      <Award size={24} className="text-yellow-500" />
                    </div>
                    <div className="p-3 flex flex-col flex-1">
                      <h3 className={`text-sm font-bold mb-1 line-clamp-2 ${
                        isDark ? 'text-white' : 'text-slate-800'
                      }`}>
                        {cert.title}
                      </h3>
                      <div className={`text-xs font-medium mb-2 ${
                        isDark ? 'text-purple-400' : 'text-purple-600'
                      }`}>
                        {cert.issuer}
                      </div>
                      <div className={`text-xs mt-auto ${
                        isDark ? 'text-slate-400' : 'text-slate-500'
                      }`}>
                        {cert.date}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Right Side - Written Content */}
        <div className="w-1/2 lg:w-1/2 flex items-center justify-center px-6 pt-20">
          <motion.div 
            className="space-y-8 max-w-2xl relative z-20"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            {/* Certificates Title */}
            <motion.h1 
              className="text-5xl md:text-6xl font-bold mb-6"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                {labels.myCertificates}
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
              Professional Certifications & Achievements
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
              {labels.certificatesDescription}
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
                These certifications represent my dedication to staying current with 
                industry standards and emerging technologies. Each credential validates 
                my expertise and commitment to delivering high-quality solutions.
              </p>
              <p>
                From cloud computing to modern web frameworks, these achievements 
                demonstrate my comprehensive understanding of the full development 
                lifecycle and best practices in software engineering.
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
                { number: "6+", label: "Certificates" },
                { number: "4+", label: "Platforms" },
                { number: "100%", label: "Verified" }
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
        </div>
      </div>

      {/* Certificate Detail Modal */}
      {modalOpen && selectedCertificate && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-md flex items-center justify-center z-[9999]"
          onClick={() => setModalOpen(false)}
        >
          <motion.div
            className={`max-w-3xl w-full mx-4 max-h-[90vh] rounded-3xl backdrop-blur-sm border overflow-hidden ${
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
              {/* Certificate Header */}
              <div>
                <h2 className={`text-4xl font-bold mb-4 ${
                  isDark ? 'text-white' : 'text-slate-800'
                }`}>
                  {selectedCertificate.title}
                </h2>
                <div className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium mb-6 ${
                  isDark 
                    ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30' 
                    : 'bg-indigo-50 text-indigo-600 border border-indigo-200'
                }`}>
                  {selectedCertificate.issuer}
                </div>
              </div>

              {/* Certificate Image */}
              <div className="relative h-80 md:h-96 overflow-hidden rounded-2xl">
                <div 
                  className={`w-full h-full flex items-center justify-center relative ${
                    isDark 
                      ? 'bg-gradient-to-br from-slate-800/95 via-slate-700/90 to-slate-800/95' 
                      : 'bg-gradient-to-br from-slate-50/95 via-white/90 to-slate-100/95'
                  }`}
                >
                  <div
                    className="absolute inset-0 opacity-20"
                    style={{
                      backgroundImage: isDark
                        ? 'radial-gradient(circle at 25% 35%, rgba(99, 102, 241, 0.6) 0%, transparent 50%), radial-gradient(circle at 75% 65%, rgba(168, 85, 247, 0.6) 0%, transparent 50%)'
                        : 'radial-gradient(circle at 25% 35%, rgba(99, 102, 241, 0.3) 0%, transparent 50%), radial-gradient(circle at 75% 65%, rgba(168, 85, 247, 0.3) 0%, transparent 50%)'
                    }}
                  />
                  <Award size={80} className="text-yellow-500 z-10" />
                </div>
              </div>

              {/* Certificate Description */}
              <div>
                <h3 className={`text-xl font-semibold mb-3 ${
                  isDark ? 'text-slate-200' : 'text-slate-700'
                }`}>
                  About This Certificate
                </h3>
                <p className={`text-lg leading-relaxed ${
                  isDark ? 'text-slate-300' : 'text-slate-600'
                }`}>
                  {selectedCertificate.description}
                </p>
              </div>

              {/* Certificate Details */}
              <div>
                <h3 className={`text-xl font-semibold mb-4 ${
                  isDark ? 'text-slate-200' : 'text-slate-700'
                }`}>
                  Certificate Details
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className={`p-4 rounded-xl ${
                    isDark ? 'bg-slate-800/50' : 'bg-slate-50/80'
                  }`}>
                    <div className="text-sm font-medium text-indigo-500 mb-1">Issued By</div>
                    <div className={`font-semibold ${
                      isDark ? 'text-slate-200' : 'text-slate-700'
                    }`}>
                      {selectedCertificate.issuer}
                    </div>
                  </div>
                  <div className={`p-4 rounded-xl ${
                    isDark ? 'bg-slate-800/50' : 'bg-slate-50/80'
                  }`}>
                    <div className="text-sm font-medium text-indigo-500 mb-1">Date Earned</div>
                    <div className={`font-semibold text-sm ${
                      isDark ? 'text-slate-200' : 'text-slate-700'
                    }`}>
                      {selectedCertificate.date}
                    </div>
                  </div>
                  <div className={`p-4 rounded-xl ${
                    isDark ? 'bg-slate-800/50' : 'bg-slate-50/80'
                  }`}>
                    <div className="text-sm font-medium text-indigo-500 mb-1">Certificate Type</div>
                    <div className={`font-semibold ${
                      isDark ? 'text-slate-200' : 'text-slate-700'
                    }`}>
                      Professional Certification
                    </div>
                  </div>
                  <div className={`p-4 rounded-xl ${
                    isDark ? 'bg-slate-800/50' : 'bg-slate-50/80'
                  }`}>
                    <div className="text-sm font-medium text-indigo-500 mb-1">Validity</div>
                    <div className={`font-semibold ${
                      isDark ? 'text-slate-200' : 'text-slate-700'
                    }`}>
                      Lifetime
                    </div>
                  </div>
                </div>
              </div>
            </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default Certificates;