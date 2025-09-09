import React from "react";
import { motion } from "framer-motion";
import { Sun, Moon } from "lucide-react";
import { Link } from "react-router-dom";
import { useTheme } from '../contexts/ThemeContext';
import { PortfolioLandingPageAnimation } from "../portfolio_animation";

const LandingPage = () => {
  const { isDark, toggleTheme } = useTheme();

  const labels = {
    subtitle: 'Innovative Developer & Designer',
    exploreWork: 'EXPLORE WORK',
    contactMe: 'CONTACT ME'
  };

  return (
    <div className={`min-h-screen relative overflow-hidden transition-all duration-1000 ${isDark ? 'bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600' : 'bg-gradient-to-br from-amber-200 via-orange-300 to-rose-400'}`}>
      <PortfolioLandingPageAnimation />
      
      <motion.button
        onClick={toggleTheme}
        className={`fixed top-6 right-6 z-20 p-3 rounded-full text-white transition-all duration-500 ${isDark ? 'bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600' : 'bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500'}`}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        {isDark ? <Sun size={20} /> : <Moon size={20} />}
      </motion.button>
      
      <div className="relative z-10 flex items-center justify-center min-h-screen px-6">
        <div className="text-center max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <h1 className="font-oswald text-6xl md:text-8xl lg:text-9xl font-black leading-tight mb-8">
              <span className={`drop-shadow-2xl transition-all duration-700 ${isDark ? 'text-white shadow-black/50' : 'text-gray-800 shadow-white/80'}`}>Shikhar</span>
              <br />
              <span className={`drop-shadow-2xl transition-all duration-700 ${isDark ? 'text-white shadow-black/50' : 'text-gray-800 shadow-white/80'}`}>Portfolio's</span>
              <br />
 
            </h1>
            
            <motion.p
              className={`font-montserrat text-xl md:text-2xl mb-12 font-light drop-shadow-2xl transition-all duration-700 ${isDark ? 'text-white shadow-black/60' : 'text-gray-700 shadow-white/80'}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            >
              {labels.subtitle}
            </motion.p>
          </motion.div>

          <motion.div
            className="flex flex-col sm:flex-row justify-center gap-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
          >
            <Link to="/portfolio">
              <motion.button
                className={`relative overflow-hidden font-semibold px-8 py-4 rounded-full flex items-center justify-center gap-3 group backdrop-blur-xl border shadow-2xl transition-all duration-500 ${isDark ? 'text-white border-white/30' : 'text-gray-800 border-gray-800/30'}`}
                style={{
                  background: isDark ? 'linear-gradient(135deg, rgba(99, 102, 241, 0.8), rgba(168, 85, 247, 0.8), rgba(236, 72, 153, 0.8))' : 'linear-gradient(135deg, rgba(251, 191, 36, 0.8), rgba(249, 115, 22, 0.8), rgba(244, 63, 94, 0.8))'
                }}
                whileHover={{ 
                  scale: 1.02, 
                  y: -2,
                  boxShadow: isDark ? '0 15px 30px rgba(99, 102, 241, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.2)' : '0 15px 30px rgba(251, 191, 36, 0.3), 0 0 0 1px rgba(0, 0, 0, 0.2)'
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
                
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                  initial={{ x: '-100%' }}
                  whileHover={{ x: '100%' }}
                  transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
                />
                
                <span className="relative z-10">{labels.exploreWork}</span>
              </motion.button>
            </Link>
            
            <Link to="/contact">
              <motion.button
                className={`relative overflow-hidden font-semibold px-8 py-4 rounded-full flex items-center justify-center gap-3 group backdrop-blur-xl border shadow-2xl transition-all duration-500 ${isDark ? 'text-white border-white/30' : 'text-gray-800 border-gray-800/30'}`}
                style={{
                  background: isDark ? 'linear-gradient(135deg, rgba(99, 102, 241, 0.8), rgba(168, 85, 247, 0.8), rgba(236, 72, 153, 0.8))' : 'linear-gradient(135deg, rgba(251, 191, 36, 0.8), rgba(249, 115, 22, 0.8), rgba(244, 63, 94, 0.8))'
                }}
                whileHover={{ 
                  scale: 1.02, 
                  y: -2,
                  boxShadow: isDark ? '0 15px 30px rgba(99, 102, 241, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.2)' : '0 15px 30px rgba(251, 191, 36, 0.3), 0 0 0 1px rgba(0, 0, 0, 0.2)'
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
                
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                  initial={{ x: '-100%' }}
                  whileHover={{ x: '100%' }}
                  transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
                />
                
                <span className="relative z-10">{labels.contactMe}</span>
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;