import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../contexts/ThemeContext';

const FlipCard = ({ frontContent, backContent, className = "" }) => {
  const { isDark = false } = useTheme() || {};

  const frontFaceStyles = `absolute inset-0 w-full h-full rounded-2xl backdrop-blur-sm border [backface-visibility:hidden] p-6 flex flex-col justify-center ${
    isDark ? 'bg-gray-800/50 border-gray-700' : 'bg-white/60 border-white/60'
  }`;

  const backFaceStyles = `absolute inset-0 w-full h-full rounded-2xl backdrop-blur-sm border [backface-visibility:hidden] [transform:rotateY(180deg)] p-6 flex flex-col justify-center ${
    isDark ? 'bg-gray-800/70 border-gray-700' : 'bg-white/80 border-white/80'
  }`;

  return (
    <motion.div
      className={`group h-48 [perspective:1000px] ${className}`}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <div className="relative w-full h-full [transform-style:preserve-3d] transition-transform duration-700 group-hover:[transform:rotateY(180deg)]">
        {/* Front Face */}
        <div className={frontFaceStyles}>
          {frontContent}
        </div>
        
        {/* Back Face */}
        <div className={backFaceStyles}>
          {backContent}
        </div>
      </div>
    </motion.div>
  );
};

export default FlipCard;