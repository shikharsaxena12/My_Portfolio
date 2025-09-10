import React, { useMemo, memo } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../contexts/ThemeContext';

// Extract gradient definitions for better readability
const createGradient = (positions, opacity) => {
  const [pos1, pos2, pos3] = positions;
  return [
    `radial-gradient(circle at ${pos1}, rgba(59, 130, 246, ${opacity.blue}) 0%, transparent 50%)`,
    `radial-gradient(circle at ${pos2}, rgba(147, 51, 234, ${opacity.purple}) 0%, transparent 50%)`,
    `radial-gradient(circle at ${pos3}, rgba(236, 72, 153, ${opacity.pink}) 0%, transparent 50%)`
  ].join(', ');
};

const createLightGradient = (positions, opacity) => {
  const [pos1, pos2, pos3] = positions;
  return [
    `radial-gradient(circle at ${pos1}, rgba(251, 191, 36, ${opacity.amber}) 0%, transparent 50%)`,
    `radial-gradient(circle at ${pos2}, rgba(249, 115, 22, ${opacity.orange}) 0%, transparent 50%)`,
    `radial-gradient(circle at ${pos3}, rgba(244, 63, 94, ${opacity.rose}) 0%, transparent 50%)`
  ].join(', ');
};

// Pre-compute gradient configurations for optimal performance
const GRADIENT_CONFIG = {
  dark: [
    createGradient(['20% 50%', '80% 20%', '40% 80%'], { blue: 0.8, purple: 0.8, pink: 0.7 }),
    createGradient(['80% 50%', '20% 80%', '60% 20%'], { blue: 0.8, purple: 0.8, pink: 0.7 }),
    createGradient(['40% 20%', '60% 80%', '20% 50%'], { blue: 0.8, purple: 0.8, pink: 0.7 })
  ],
  light: [
    createLightGradient(['20% 50%', '80% 20%', '40% 80%'], { amber: 1.0, orange: 0.9, rose: 0.8 }),
    createLightGradient(['80% 50%', '20% 80%', '60% 20%'], { amber: 1.0, orange: 0.9, rose: 0.8 }),
    createLightGradient(['40% 20%', '60% 80%', '20% 50%'], { amber: 1.0, orange: 0.9, rose: 0.8 })
  ]
};

const HomeBackground = memo(() => {
  const { isDark } = useTheme();
  
  // Reduced animation elements for better performance
  const animationConfig = useMemo(() => ({
    shapes: [...Array(4)].map((_, i) => ({
      left: 25 + (i * 20),
      top: 15 + (i * 20),
      duration: 8 + i,
      delay: i * 0.8
    })),
    cards: [...Array(3)].map((_, i) => ({
      left: 20 + (i * 25),
      top: 25 + (i * 20),
      duration: 6 + i,
      delay: i * 1
    }))
  }), []);

  return (
    <div className="fixed inset-0 z-0 overflow-hidden">
      {/* Base Gradient */}
      <div className={`absolute inset-0 transition-all duration-1000 ${
        isDark 
          ? 'bg-gradient-to-br from-blue-900 via-purple-900 to-pink-900' 
          : 'bg-gradient-to-br from-amber-300 via-orange-400 to-rose-400'
      }`} />
      
      {/* Animated Mesh Gradient */}
      <motion.div
        className="absolute inset-0 opacity-100"
        animate={{
          background: isDark ? GRADIENT_CONFIG.dark : GRADIENT_CONFIG.light
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Floating Geometric Shapes */}
      {animationConfig.shapes.map((shape, i) => (
        <motion.div
          key={i}
          className="absolute"
          style={{
            left: `${shape.left}%`,
            top: `${shape.top}%`,
          }}
          animate={{
            y: [0, -30, 0],
            rotate: [0, 180, 360],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: shape.duration,
            repeat: Infinity,
            ease: "easeInOut",
            delay: shape.delay
          }}
        >
          <div className={`w-20 h-20 border-3 transition-all duration-700 ${isDark ? 'border-blue-400/80' : 'border-amber-600'} ${i % 2 === 0 ? 'rounded-full' : 'rotate-45'} backdrop-blur-sm shadow-lg`} />
        </motion.div>
      ))}



      {/* Hexagonal Grid Pattern */}
      <div className={`absolute inset-0 transition-all duration-700 ${isDark ? 'opacity-40' : 'opacity-50'}`}>
        <svg className="w-full h-full">
          <defs>
            <pattern id="hexagons" x="0" y="0" width="100" height="87" patternUnits="userSpaceOnUse">
              <polygon points="50,1 90,26 90,74 50,99 10,74 10,26" fill="none" stroke={isDark ? "rgb(96, 165, 250)" : "rgb(217, 119, 6)"} strokeWidth="1" opacity={isDark ? "0.3" : "0.6"}/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#hexagons)" />
        </svg>
      </div>

      {/* Floating Cards */}
      {animationConfig.cards.map((card, i) => (
        <motion.div
          key={`card-${i}`}
          className={`absolute w-32 h-20 backdrop-blur-md rounded-lg shadow-lg transition-all duration-700 ${isDark ? 'bg-gray-800/20 border-gray-600/30' : 'bg-amber-100/40 border-amber-200/60'} border`}
          style={{
            left: `${card.left}%`,
            top: `${card.top}%`,
          }}
          animate={{
            y: [0, -20, 0],
            rotateY: [0, 10, 0],
            rotateX: [0, 5, 0],
          }}
          transition={{
            duration: card.duration,
            repeat: Infinity,
            ease: "easeInOut",
            delay: card.delay
          }}
        />
      ))}

      {/* Glowing Orbs */}
      <motion.div
        className={`absolute w-80 h-80 rounded-full blur-3xl transition-all duration-700 ${isDark ? 'bg-gradient-to-r from-blue-500/70 to-purple-500/70' : 'bg-gradient-to-r from-amber-500/80 to-orange-500/80'}`}
        style={{ left: '70%', top: '10%' }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.5, 0.8, 0.5],
        }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />
      
      <motion.div
        className={`absolute w-64 h-64 rounded-full blur-3xl transition-all duration-700 ${isDark ? 'bg-gradient-to-r from-indigo-500/70 to-pink-500/70' : 'bg-gradient-to-r from-orange-500/80 to-rose-500/80'}`}
        style={{ left: '10%', top: '60%' }}
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.4, 0.7, 0.4],
        }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      />
    </div>
  );
});

HomeBackground.displayName = 'HomeBackground';

export default HomeBackground;