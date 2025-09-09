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
    <div className={`h-screen overflow-hidden transition-all duration-1000 ${isDark ? 'bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600' : 'bg-gradient-to-br from-amber-100 via-orange-200 to-rose-300'}`}>
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
                    className={`font-inter group relative rounded-xl overflow-hidden shadow-lg flex-shrink-0 w-52 h-64 flex flex-col cursor-pointer backdrop-blur-xl transition-all duration-700 ${
                      isDark 
                        ? 'bg-gradient-to-br from-blue-600/20 via-purple-600/20 to-pink-600/20 border-white/20' 
                        : 'bg-gradient-to-br from-amber-100/40 via-orange-100/40 to-rose-100/40 border-amber-200/60'
                    } border`}
                    whileHover={{ scale: 1.05, x: 10 }}
                    onClick={() => openModal(cert)}
                  >
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
                    <div className={`relative h-20 p-3 flex items-center justify-center transition-all duration-700 ${
                      isDark ? 'bg-gradient-to-br from-indigo-600/20 to-purple-600/20' : 'bg-gradient-to-br from-amber-100/60 to-orange-100/60'
                    }`}>
                      <Award size={24} className={`transition-all duration-700 ${isDark ? 'text-yellow-500' : 'text-amber-600'}`} />
                    </div>
                    <div className="p-3 flex flex-col flex-1">
                      <h3 className={`text-sm font-bold mb-1 line-clamp-2 transition-all duration-700 ${
                        isDark ? 'text-white' : 'text-slate-800'
                      }`}>
                        {cert.title}
                      </h3>
                      <div className={`text-xs font-medium mb-2 transition-all duration-700 ${
                        isDark ? 'text-indigo-400' : 'text-amber-600'
                      }`}>
                        {cert.issuer}
                      </div>
                      <div className={`text-xs mt-auto transition-all duration-700 ${
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
                    className={`font-poppins group relative rounded-xl overflow-hidden shadow-lg flex-shrink-0 w-52 h-64 flex flex-col cursor-pointer backdrop-blur-xl transition-all duration-700 ${
                      isDark 
                        ? 'bg-gradient-to-br from-blue-600/20 via-purple-600/20 to-pink-600/20 border-white/20' 
                        : 'bg-gradient-to-br from-amber-100/40 via-orange-100/40 to-rose-100/40 border-amber-200/60'
                    } border`}
                    whileHover={{ scale: 1.05, x: -10 }}
                    onClick={() => openModal(cert)}
                  >
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
                    <div className={`relative h-20 p-3 flex items-center justify-center transition-all duration-700 ${
                      isDark ? 'bg-gradient-to-br from-purple-600/20 to-pink-600/20' : 'bg-gradient-to-br from-orange-100/60 to-rose-100/60'
                    }`}>
                      <Award size={24} className={`transition-all duration-700 ${isDark ? 'text-yellow-500' : 'text-orange-600'}`} />
                    </div>
                    <div className="p-3 flex flex-col flex-1">
                      <h3 className={`text-sm font-bold mb-1 line-clamp-2 transition-all duration-700 ${
                        isDark ? 'text-white' : 'text-slate-800'
                      }`}>
                        {cert.title}
                      </h3>
                      <div className={`text-xs font-medium mb-2 transition-all duration-700 ${
                        isDark ? 'text-purple-400' : 'text-orange-600'
                      }`}>
                        {cert.issuer}
                      </div>
                      <div className={`text-xs mt-auto transition-all duration-700 ${
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
              className="font-playfair text-5xl md:text-6xl font-bold mb-6"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <span className={`bg-clip-text text-transparent transition-all duration-700 ${
                isDark ? 'bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600' : 'bg-gradient-to-r from-amber-600 via-orange-600 to-rose-600'
              }`}>
                {labels.myCertificates}
              </span>
            </motion.h1>

            {/* Subtitle */}
            <motion.h2 
              className={`font-montserrat text-2xl md:text-3xl font-light mb-6 transition-all duration-700 ${
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
              className={`font-opensans text-lg leading-relaxed mb-6 transition-all duration-700 ${
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
              className={`font-opensans space-y-4 mb-8 text-base leading-relaxed transition-all duration-700 ${
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
                  className={`text-center p-6 rounded-2xl backdrop-blur-xl border shadow-lg relative overflow-hidden transition-all duration-700 ${
                    isDark 
                      ? 'bg-gradient-to-br from-blue-600/20 via-purple-600/20 to-pink-600/20 border-white/20' 
                      : 'bg-gradient-to-br from-amber-100/40 via-orange-100/40 to-rose-100/40 border-amber-200/60'
                  }`}
                  whileHover={{ scale: 1.05, y: -5 }}
                  transition={{ type: "spring", damping: 15, stiffness: 300 }}
                >
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
                  <div className={`text-3xl md:text-4xl font-bold mb-2 relative z-10 transition-all duration-700 ${
                    isDark ? 'text-white' : 'text-gray-800'
                  }`}>
                    {stat.number}
                  </div>
                  <div className={`text-sm font-medium relative z-10 transition-all duration-700 ${
                    isDark ? 'text-gray-200' : 'text-gray-700'
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
        <div className="fixed inset-0 bg-black/50 backdrop-blur-md flex items-center justify-center z-[9999]">
          <motion.div
            className={`font-playfair max-w-3xl w-full mx-4 max-h-[90vh] rounded-3xl backdrop-blur-sm border overflow-hidden transition-all duration-700 ${
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
                <h2 className={`font-playfair text-4xl font-bold mb-4 transition-all duration-700 ${
                  isDark ? 'text-white' : 'text-slate-800'
                }`}>
                  {selectedCertificate.title}
                </h2>
                <div className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium mb-6 transition-all duration-700 ${
                  isDark 
                    ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30' 
                    : 'bg-amber-50 text-amber-700 border border-amber-200'
                }`}>
                  {selectedCertificate.issuer}
                </div>
              </div>

              {/* Certificate Image */}
              <div className="relative h-80 md:h-96 overflow-hidden rounded-2xl">
                <div 
                  className={`w-full h-full flex items-center justify-center relative transition-all duration-700 ${
                    isDark 
                      ? 'bg-gradient-to-br from-slate-800/95 via-slate-700/90 to-slate-800/95' 
                      : 'bg-gradient-to-br from-amber-50/95 via-orange-50/90 to-rose-50/95'
                  }`}
                >
                  <div
                    className="absolute inset-0 opacity-20"
                    style={{
                      backgroundImage: isDark
                        ? 'radial-gradient(circle at 25% 35%, rgba(99, 102, 241, 0.6) 0%, transparent 50%), radial-gradient(circle at 75% 65%, rgba(168, 85, 247, 0.6) 0%, transparent 50%)'
                        : 'radial-gradient(circle at 25% 35%, rgba(251, 191, 36, 0.4) 0%, transparent 50%), radial-gradient(circle at 75% 65%, rgba(249, 115, 22, 0.4) 0%, transparent 50%)'
                    }}
                  />
                  <Award size={80} className={`z-10 transition-all duration-700 ${isDark ? 'text-yellow-500' : 'text-amber-600'}`} />
                </div>
              </div>

              {/* Certificate Description */}
              <div>
                <h3 className={`font-montserrat text-xl font-semibold mb-3 transition-all duration-700 ${
                  isDark ? 'text-slate-200' : 'text-slate-700'
                }`}>
                  About This Certificate
                </h3>
                <p className={`font-opensans text-lg leading-relaxed transition-all duration-700 ${
                  isDark ? 'text-slate-300' : 'text-slate-600'
                }`}>
                  {selectedCertificate.description}
                </p>
              </div>

              {/* Certificate Details */}
              <div>
                <h3 className={`font-montserrat text-xl font-semibold mb-4 transition-all duration-700 ${
                  isDark ? 'text-slate-200' : 'text-slate-700'
                }`}>
                  Certificate Details
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className={`p-4 rounded-xl transition-all duration-700 ${
                    isDark ? 'bg-slate-800/50' : 'bg-amber-50/80'
                  }`}>
                    <div className={`text-sm font-medium mb-1 transition-all duration-700 ${isDark ? 'text-indigo-500' : 'text-amber-600'}`}>Issued By</div>
                    <div className={`font-semibold transition-all duration-700 ${
                      isDark ? 'text-slate-200' : 'text-slate-700'
                    }`}>
                      {selectedCertificate.issuer}
                    </div>
                  </div>
                  <div className={`p-4 rounded-xl transition-all duration-700 ${
                    isDark ? 'bg-slate-800/50' : 'bg-amber-50/80'
                  }`}>
                    <div className={`text-sm font-medium mb-1 transition-all duration-700 ${isDark ? 'text-indigo-500' : 'text-amber-600'}`}>Date Earned</div>
                    <div className={`font-semibold text-sm transition-all duration-700 ${
                      isDark ? 'text-slate-200' : 'text-slate-700'
                    }`}>
                      {selectedCertificate.date}
                    </div>
                  </div>
                  <div className={`p-4 rounded-xl transition-all duration-700 ${
                    isDark ? 'bg-slate-800/50' : 'bg-amber-50/80'
                  }`}>
                    <div className={`text-sm font-medium mb-1 transition-all duration-700 ${isDark ? 'text-indigo-500' : 'text-amber-600'}`}>Certificate Type</div>
                    <div className={`font-semibold transition-all duration-700 ${
                      isDark ? 'text-slate-200' : 'text-slate-700'
                    }`}>
                      Professional Certification
                    </div>
                  </div>
                  <div className={`p-4 rounded-xl transition-all duration-700 ${
                    isDark ? 'bg-slate-800/50' : 'bg-amber-50/80'
                  }`}>
                    <div className={`text-sm font-medium mb-1 transition-all duration-700 ${isDark ? 'text-indigo-500' : 'text-amber-600'}`}>Validity</div>
                    <div className={`font-semibold transition-all duration-700 ${
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