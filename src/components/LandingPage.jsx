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
    <div className="min-h-screen relative overflow-hidden bg-white dark:bg-slate-900">
      <PortfolioLandingPageAnimation />
      
      <motion.button
        onClick={toggleTheme}
        className="fixed top-6 right-6 z-20 p-3 rounded-full bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-700 transition-colors duration-200"
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
              <span className="bg-gradient-to-r from-slate-800 to-gray-900 dark:from-white dark:to-gray-100 bg-clip-text text-transparent">Shikhar</span>
              <br />
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-violet-600 dark:from-blue-400 dark:via-purple-400 dark:to-violet-400 bg-clip-text text-transparent">Portfolio's</span>
              <br />
 
            </h1>
            
            <motion.p
              className="font-montserrat text-xl md:text-2xl bg-gradient-to-r from-gray-600 to-slate-700 dark:from-slate-300 dark:to-slate-400 bg-clip-text text-transparent mb-12 font-light"
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
            <Link 
              to="/portfolio"
              className="inline-block bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 rounded-full font-semibold text-lg transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              {labels.exploreWork}
            </Link>
            
            <Link 
              to="/contact"
              className="border-2 border-gradient bg-gradient-to-r from-transparent to-transparent hover:from-blue-50 hover:to-purple-50 dark:hover:from-blue-900/20 dark:hover:to-purple-900/20 border-gray-800 dark:border-white text-gray-800 dark:text-white px-8 py-4 rounded-full font-semibold text-lg transition-all duration-200"
            >
              {labels.contactMe}
            </Link>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;