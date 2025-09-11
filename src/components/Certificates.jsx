import React, { useMemo, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Award, ExternalLink } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { useContent } from '../contexts/ContentContext';
import Navbar from './Navbar';
import { HomeBackground } from '../portfolio_animation';

const Certificates = () => {
  const { isDark = false } = useTheme() || {};
  const { content } = useContent();
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const [modalOpen, setModalOpen] = React.useState(false);
  const [selectedCertificate, setSelectedCertificate] = React.useState(null);
  
  const openModal = (cert) => {
    setSelectedCertificate(cert);
    setModalOpen(true);
  };

  const labels = {
    myCertificates: content?.certificatesPage?.title || 'My Certificates',
    certificatesDescription: content?.certificatesPage?.description || 'A showcase of my professional certifications and achievements that demonstrate my commitment to continuous learning and expertise across various technologies. These credentials validate my skills in modern web development, cloud computing, and software engineering best practices.'
  };

  const certificates = useMemo(() => content?.certificates || [], [content?.certificates]);
  
  React.useEffect(() => {
    if (certificates.length > 1) {
      const interval = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % certificates.length);
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [certificates.length]);

  return (
    <div className={`h-screen overflow-hidden transition-all duration-1000 ${isDark ? 'bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600' : 'bg-gradient-to-br from-amber-100 via-orange-200 to-rose-300'}`}>
      <HomeBackground />
      <Navbar />
      
      <div className="relative z-10 h-full flex">
        {/* Left Side - Full Height Moving Certificate Strips */}
        <motion.div
          className="w-1/2 lg:w-1/2 relative overflow-hidden flex items-center justify-center"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="relative w-96 h-96" style={{ perspective: '2000px' }}>
            {certificates.length > 0 ? (
              certificates.map((cert, index) => {
                const angle = (index * 360) / certificates.length;
                const isActive = index === currentIndex;
                return (
                  <motion.div
                    key={cert.id}
                    className={`font-inter group absolute rounded-2xl overflow-hidden shadow-2xl cursor-pointer backdrop-blur-xl border ${
                      isDark 
                        ? 'bg-gradient-to-br from-blue-600/20 via-purple-600/20 to-pink-600/20 border-white/20' 
                        : 'bg-gradient-to-br from-amber-100/40 via-orange-100/40 to-rose-100/40 border-amber-200/60'
                    }`}
                    initial={{ 
                      rotateY: angle,
                      rotateX: -15,
                      z: -500,
                      scale: 0.4,
                      opacity: 0
                    }}
                    animate={{
                      rotateY: angle - (currentIndex * 360 / certificates.length),
                      rotateX: isActive ? [0, 15, -10, 5, 0] : -15,
                      z: isActive ? 200 : -500,
                      scale: isActive ? 1.3 : 0.4,
                      opacity: isActive ? 1 : 0,
                      y: isActive ? [0, -30, 10, -15, 0] : 50,
                      rotateZ: isActive ? [0, 3, -2, 1, 0] : 0
                    }}
                    transition={{
                      duration: 1.8,
                      ease: [0.25, 0.46, 0.45, 0.94],
                      rotateX: { duration: 4, repeat: Infinity, ease: "easeInOut" },
                      y: { duration: 4, repeat: Infinity, ease: "easeInOut" },
                      rotateZ: { duration: 4, repeat: Infinity, ease: "easeInOut" }
                    }}
                    whileHover={{
                      scale: isActive ? 1.4 : 0.5,
                      rotateZ: isActive ? 8 : 0,
                      rotateX: isActive ? 20 : -15,
                      z: isActive ? 300 : -400,
                      transition: { duration: 0.4, ease: "easeOut" }
                    }}
                    onClick={() => openModal(cert)}
                    style={{
                      width: '260px',
                      height: '340px',
                      transformStyle: 'preserve-3d',
                      left: '50%',
                      top: '50%',
                      marginLeft: '-130px',
                      marginTop: '-170px'
                    }}
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
                  <div className={`relative h-40 overflow-hidden transition-all duration-700 ${
                    cert?.image 
                      ? (isDark ? 'bg-slate-800' : 'bg-white') 
                      : (isDark ? 'bg-gradient-to-br from-indigo-600/20 to-purple-600/20' : 'bg-gradient-to-br from-amber-100/60 to-orange-100/60')
                  }`}>
                    {cert?.image ? (
                      <img 
                        src={cert.image} 
                        alt={cert?.title || 'Certificate'} 
                        className="w-full h-full object-contain"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <Award size={48} className={`transition-all duration-700 ${isDark ? 'text-yellow-500' : 'text-orange-600'}`} />
                      </div>
                    )}
                  </div>
                  <div className="p-4 flex flex-col flex-1 relative z-10">
                    <h3 className={`text-base font-bold mb-1 line-clamp-2 transition-all duration-700 ${
                      isDark ? 'text-white' : 'text-gray-800'
                    }`}>
                      {cert?.title || 'Certificate Title'}
                    </h3>
                    <div className={`text-xs font-medium mb-1 transition-all duration-700 ${
                      isDark ? 'text-indigo-400' : 'text-orange-600'
                    }`}>
                      {cert?.issuer || 'Issuer'}
                    </div>
                    <div className={`text-xs mb-3 transition-all duration-700 ${
                      isDark ? 'text-slate-400' : 'text-gray-600'
                    }`}>
                      {cert?.date || 'Date'}
                    </div>
                    <div className={`text-xs text-center mt-auto px-2 py-1 rounded-full transition-all duration-700 ${
                      isDark ? 'bg-blue-500/20 text-blue-300' : 'bg-orange-500/20 text-orange-700'
                    }`}>
                      View Details
                    </div>
                  </div>
                  </motion.div>
                );
              })
            ) : (
              <motion.div
                className={`w-64 h-80 rounded-2xl overflow-hidden shadow-lg backdrop-blur-xl transition-all duration-700 ${
                  isDark 
                    ? 'bg-gradient-to-br from-blue-600/20 via-purple-600/20 to-pink-600/20 border-white/20' 
                    : 'bg-gradient-to-br from-amber-100/40 via-orange-100/40 to-rose-100/40 border-amber-200/60'
                } border`}
                animate={{ 
                  y: [0, -10, 0]
                }}
                transition={{ 
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <div className="flex items-center justify-center h-full">
                  <div className={`text-center transition-colors duration-700 ${
                    isDark ? 'text-blue-200' : 'text-gray-700'
                  }`}>
                    <Award size={48} className={`mx-auto mb-4 ${isDark ? 'text-yellow-500' : 'text-orange-600'}`} />
                    <div className="text-xl font-bold mb-2">No Certificates Available</div>
                    <div className="text-sm opacity-70">Certificates will appear here when loaded</div>
                  </div>
                </div>
              </motion.div>
            )}

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
                isDark ? 'text-gray-200' : 'text-black'
              }`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              {content?.certificatesPage?.subtitle || 'Professional Certifications & Achievements'}
            </motion.h2>

            {/* Description */}
            <motion.p 
              className={`font-opensans text-lg leading-relaxed mb-6 transition-all duration-700 ${
                isDark ? 'text-gray-300' : 'text-black'
              }`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              {certificates.length > 0 
                ? labels.certificatesDescription
                : "This section will showcase my professional certifications and achievements when they are loaded from the dashboard. These credentials will demonstrate my commitment to continuous learning and expertise across various technologies."
              }
            </motion.p>

            {/* Additional Content */}
            <motion.div 
              className={`font-opensans space-y-4 mb-8 text-base leading-relaxed transition-all duration-700 ${
                isDark ? 'text-gray-300' : 'text-black'
              }`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
            >
              {certificates.length > 0 ? (
                <>
                  <p>
                    {content?.certificatesPage?.additionalContent1 || 'These certifications represent my dedication to staying current with industry standards and emerging technologies. Each credential validates my expertise and commitment to delivering high-quality solutions.'}
                  </p>
                  <p>
                    {content?.certificatesPage?.additionalContent2 || 'From cloud computing to modern web frameworks, these achievements demonstrate my comprehensive understanding of the full development lifecycle and best practices in software engineering.'}
                  </p>
                </>
              ) : (
                <>
                  <p>
                    Once certificates are added through the dashboard, they will appear here 
                    with detailed information about each credential and achievement.
                  </p>
                  <p>
                    The certificates will validate skills in modern web development, cloud 
                    computing, and software engineering best practices, demonstrating 
                    commitment to professional growth.
                  </p>
                </>
              )}
            </motion.div>

            {/* Stats */}
            <motion.div 
              className="grid grid-cols-3 gap-6 mb-8"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              {[
                { number: `${certificates.length || 0}+`, label: "Certificates" },
                { number: `${certificates.length > 0 ? new Set(certificates.map(cert => cert.issuer)).size : 0}+`, label: "Platforms" },
                { number: certificates.length > 0 ? "100%" : "0%", label: "Verified" }
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
                    isDark ? 'text-white' : 'text-black'
                  }`}>
                    {stat.number}
                  </div>
                  <div className={`text-sm font-medium relative z-10 transition-all duration-700 ${
                    isDark ? 'text-gray-200' : 'text-black'
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
            className={`font-playfair max-w-3xl w-full mx-4 max-h-[90vh] rounded-3xl backdrop-blur-xl border overflow-hidden transition-all duration-700 relative ${
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
              className={`float-right text-3xl font-light hover:rotate-90 transition-transform duration-300 ${
                isDark ? 'text-slate-300 hover:text-white' : 'text-black hover:text-black'
              }`}
            >
              ×
            </button>
            
            <div className="space-y-8">
              {/* Certificate Header */}
              <div>
                <h2 className={`font-playfair text-4xl font-bold mb-4 transition-all duration-700 ${
                  isDark ? 'text-white' : 'text-black'
                }`}>
                  {selectedCertificate?.title || 'Certificate Title'}
                </h2>
                <div className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium mb-6 transition-all duration-700 ${
                  isDark 
                    ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30' 
                    : 'bg-amber-50 text-black border border-amber-200'
                }`}>
                  {selectedCertificate?.issuer || 'Issuer'}
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
                  {selectedCertificate?.image ? (
                    <img 
                      src={selectedCertificate.image} 
                      alt={selectedCertificate?.title || 'Certificate'} 
                      className="w-full h-full object-contain bg-white"
                    />
                  ) : (
                    <>
                      <div
                        className="absolute inset-0 opacity-20"
                        style={{
                          backgroundImage: isDark
                            ? 'radial-gradient(circle at 25% 35%, rgba(99, 102, 241, 0.6) 0%, transparent 50%), radial-gradient(circle at 75% 65%, rgba(168, 85, 247, 0.6) 0%, transparent 50%)'
                            : 'radial-gradient(circle at 25% 35%, rgba(251, 191, 36, 0.4) 0%, transparent 50%), radial-gradient(circle at 75% 65%, rgba(249, 115, 22, 0.4) 0%, transparent 50%)'
                        }}
                      />
                      <Award size={80} className={`z-10 transition-all duration-700 ${isDark ? 'text-yellow-500' : 'text-black'}`} />
                    </>
                  )}
                </div>
              </div>

              {/* Certificate Description */}
              <div>
                <h3 className={`font-montserrat text-xl font-semibold mb-3 transition-all duration-700 ${
                  isDark ? 'text-slate-200' : 'text-black'
                }`}>
                  About This Certificate
                </h3>
                <p className={`font-opensans text-lg leading-relaxed transition-all duration-700 ${
                  isDark ? 'text-slate-300' : 'text-black'
                }`}>
                  {selectedCertificate?.description || 'Certificate description'}
                </p>
              </div>

              {/* Certificate Details */}
              <div>
                <h3 className={`font-montserrat text-xl font-semibold mb-4 transition-all duration-700 ${
                  isDark ? 'text-slate-200' : 'text-black'
                }`}>
                  Certificate Details
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className={`p-4 rounded-xl transition-all duration-700 ${
                    isDark ? 'bg-slate-800/50' : 'bg-amber-50/80'
                  }`}>
                    <div className={`text-sm font-medium mb-1 transition-all duration-700 ${isDark ? 'text-indigo-500' : 'text-black'}`}>Issued By</div>
                    <div className={`font-semibold transition-all duration-700 ${
                      isDark ? 'text-slate-200' : 'text-black'
                    }`}>
                      {selectedCertificate?.issuer || 'Issuer'}
                    </div>
                  </div>
                  <div className={`p-4 rounded-xl transition-all duration-700 ${
                    isDark ? 'bg-slate-800/50' : 'bg-amber-50/80'
                  }`}>
                    <div className={`text-sm font-medium mb-1 transition-all duration-700 ${isDark ? 'text-indigo-500' : 'text-black'}`}>Date Earned</div>
                    <div className={`font-semibold text-sm transition-all duration-700 ${
                      isDark ? 'text-slate-200' : 'text-black'
                    }`}>
                      {selectedCertificate?.date || 'Date'}
                    </div>
                  </div>
                  <div className={`p-4 rounded-xl transition-all duration-700 ${
                    isDark ? 'bg-slate-800/50' : 'bg-amber-50/80'
                  }`}>
                    <div className={`text-sm font-medium mb-1 transition-all duration-700 ${isDark ? 'text-indigo-500' : 'text-black'}`}>Certificate Type</div>
                    <div className={`font-semibold transition-all duration-700 ${
                      isDark ? 'text-slate-200' : 'text-black'
                    }`}>
                      Professional Certification
                    </div>
                  </div>
                  <div className={`p-4 rounded-xl transition-all duration-700 ${
                    isDark ? 'bg-slate-800/50' : 'bg-amber-50/80'
                  }`}>
                    <div className={`text-sm font-medium mb-1 transition-all duration-700 ${isDark ? 'text-indigo-500' : 'text-black'}`}>Validity</div>
                    <div className={`font-semibold transition-all duration-700 ${
                      isDark ? 'text-slate-200' : 'text-black'
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