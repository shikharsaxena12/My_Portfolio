import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../contexts/ThemeContext';

const HomeBackground = () => {
  const { isDark } = useTheme();
  
  // Memoize gradient configurations to prevent recalculation
  const gradientConfig = useMemo(() => ({
    dark: [
      'radial-gradient(circle at 20% 50%, rgba(59, 130, 246, 0.2) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(147, 51, 234, 0.2) 0%, transparent 50%), radial-gradient(circle at 40% 80%, rgba(236, 72, 153, 0.15) 0%, transparent 50%)',
      'radial-gradient(circle at 80% 50%, rgba(59, 130, 246, 0.2) 0%, transparent 50%), radial-gradient(circle at 20% 80%, rgba(147, 51, 234, 0.2) 0%, transparent 50%), radial-gradient(circle at 60% 20%, rgba(236, 72, 153, 0.15) 0%, transparent 50%)',
      'radial-gradient(circle at 40% 20%, rgba(59, 130, 246, 0.2) 0%, transparent 50%), radial-gradient(circle at 60% 80%, rgba(147, 51, 234, 0.2) 0%, transparent 50%), radial-gradient(circle at 20% 50%, rgba(236, 72, 153, 0.15) 0%, transparent 50%)'
    ],
    light: [
      'radial-gradient(circle at 20% 50%, rgba(59, 130, 246, 0.3) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(147, 51, 234, 0.3) 0%, transparent 50%), radial-gradient(circle at 40% 80%, rgba(236, 72, 153, 0.2) 0%, transparent 50%)',
      'radial-gradient(circle at 80% 50%, rgba(59, 130, 246, 0.3) 0%, transparent 50%), radial-gradient(circle at 20% 80%, rgba(147, 51, 234, 0.3) 0%, transparent 50%), radial-gradient(circle at 60% 20%, rgba(236, 72, 153, 0.2) 0%, transparent 50%)',
      'radial-gradient(circle at 40% 20%, rgba(59, 130, 246, 0.3) 0%, transparent 50%), radial-gradient(circle at 60% 80%, rgba(147, 51, 234, 0.3) 0%, transparent 50%), radial-gradient(circle at 20% 50%, rgba(236, 72, 153, 0.2) 0%, transparent 50%)'
    ]
  }), []);
  
  // Memoize all random values to prevent recalculation
  const animationConfig = useMemo(() => ({
    particles: [...Array(20)].map(() => ({
      left: Math.random() * 100,
      top: Math.random() * 100,
      x: Math.random() * 200 - 100,
      y: Math.random() * 200 - 100,
      duration: 4 + Math.random() * 4,
      delay: Math.random() * 2
    })),
    shapes: [...Array(6)].map((_, i) => ({
      left: 20 + (i * 15),
      top: 10 + (i * 12),
      duration: 6 + i,
      delay: i * 0.5
    })),
    cards: [...Array(4)].map((_, i) => ({
      left: 15 + (i * 20),
      top: 20 + (i * 15),
      duration: 5 + i,
      delay: i * 0.8
    }))
  }), []);

  return (
    <div className="fixed inset-0 z-0 overflow-hidden">
      {/* Base Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-blue-50/50 to-indigo-100/80 dark:from-slate-900 dark:via-slate-800/50 dark:to-gray-900/80" />
      
      {/* Animated Mesh Gradient */}
      <motion.div
        className="absolute inset-0 opacity-60"
        animate={{
          background: isDark ? gradientConfig.dark : gradientConfig.light
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
          <div className={`w-16 h-16 border-2 border-blue-300/40 dark:border-blue-400/30 ${i % 2 === 0 ? 'rounded-full' : 'rotate-45'} backdrop-blur-sm`} />
        </motion.div>
      ))}

      {/* Particle System */}
      {animationConfig.particles.map((particle, i) => (
        <motion.div
          key={`particle-${i}`}
          className="absolute w-1 h-1 bg-blue-400/60 dark:bg-blue-300/50 rounded-full"
          style={{
            left: `${particle.left}%`,
            top: `${particle.top}%`,
          }}
          animate={{
            x: [0, particle.x],
            y: [0, particle.y],
            opacity: [0, 1, 0],
            scale: [0, 1, 0],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            delay: particle.delay,
            ease: "easeInOut"
          }}
        />
      ))}

      {/* Hexagonal Grid Pattern */}
      <div className="absolute inset-0 opacity-20">
        <svg className="w-full h-full">
          <defs>
            <pattern id="hexagons" x="0" y="0" width="100" height="87" patternUnits="userSpaceOnUse">
              <polygon points="50,1 90,26 90,74 50,99 10,74 10,26" fill="none" stroke={isDark ? "rgb(96, 165, 250)" : "rgb(59, 130, 246)"} strokeWidth="1" opacity={isDark ? "0.2" : "0.3"}/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#hexagons)" />
        </svg>
      </div>

      {/* Floating Cards */}
      {[...Array(4)].map((_, i) => (
        <motion.div
          key={`card-${i}`}
          className="absolute w-32 h-20 bg-white/20 dark:bg-gray-800/20 backdrop-blur-md rounded-lg border border-white/30 dark:border-gray-600/30 shadow-lg"
          style={{
            left: `${15 + (i * 20)}%`,
            top: `${20 + (i * 15)}%`,
          }}
          animate={{
            y: [0, -20, 0],
            rotateY: [0, 10, 0],
            rotateX: [0, 5, 0],
          }}
          transition={{
            duration: 5 + i,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.8
          }}
        />
      ))}

      {/* Glowing Orbs */}
      <motion.div
        className="absolute w-64 h-64 bg-gradient-to-r from-blue-400/30 to-purple-400/30 dark:from-blue-500/20 dark:to-purple-500/20 rounded-full blur-3xl"
        style={{ left: '70%', top: '10%' }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />
      
      <motion.div
        className="absolute w-48 h-48 bg-gradient-to-r from-indigo-400/30 to-pink-400/30 dark:from-indigo-500/20 dark:to-pink-500/20 rounded-full blur-3xl"
        style={{ left: '10%', top: '60%' }}
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.2, 0.5, 0.2],
        }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      />
    </div>
  );
};

export default HomeBackground;