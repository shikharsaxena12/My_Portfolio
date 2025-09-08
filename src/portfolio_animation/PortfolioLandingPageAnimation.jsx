import React, { useMemo } from 'react';
import { motion } from 'framer-motion';

const PortfolioLandingPageAnimation = () => {
  const FloatingOrb = ({ size, color, delay, duration, x, y }) => (
    <motion.div
      className={`absolute rounded-full ${color} blur-xl opacity-15 dark:opacity-60`}
      style={{ 
        width: size, 
        height: size,
        left: `${x}%`,
        top: `${y}%`,
        transform: 'translate3d(0, 0, 0)'
      }}
      animate={{
        x: [0, 150, -100, 80, 0],
        y: [0, -120, 90, -60, 0],
        z: [0, 50, -30, 20, 0],
        scale: [1, 1.4, 0.7, 1.2, 1],
        rotateX: [0, 180, 360],
        rotateY: [0, 180, 360]
      }}
      transition={{
        duration: duration,
        delay: delay,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    />
  );

  return (
    <div className="fixed inset-0 z-0">
      <div className="absolute inset-0 bg-gradient-to-br from-white via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-slate-800 dark:to-black" />
      
      {/* 3D Floating Neural Network */}
      {useMemo(() => {
        const particles = [];
        for (let i = 0; i < 15; i++) {
          particles.push({
            id: i,
            left: (i * 7) % 100,
            top: (i * 11) % 100,
            x1: (i * 13) % 400 - 200,
            x2: (i * 17) % 400 - 200,
            y1: (i * 19) % 400 - 200,
            y2: (i * 23) % 400 - 200,
            z1: (i * 29) % 200 - 100,
            z2: (i * 31) % 200 - 100,
            duration: 15 + (i % 10)
          });
        }
        return particles.map(p => (
          <motion.div
            key={p.id}
            className="absolute w-2 h-2 bg-indigo-600 dark:bg-indigo-200 rounded-full shadow-lg dark:shadow-indigo-300/50"
            style={{
              left: `${p.left}%`,
              top: `${p.top}%`,
            }}
            animate={{
              x: [0, p.x1, p.x2, 0],
              y: [0, p.y1, p.y2, 0],
              z: [0, p.z1, p.z2, 0],
              scale: [1, 1.5, 0.8, 1],
              opacity: [0.3, 0.8, 0.4, 0.3]
            }}
            transition={{
              duration: p.duration,
              delay: p.id * 0.5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        ));
      }, [])}
      
      {/* 3D Geometric Shapes */}
      <motion.div
        className="absolute w-32 h-32 border-2 border-indigo-400/40 dark:border-indigo-200/80"
        style={{ left: '10%', top: '20%', transform: 'rotateX(45deg) rotateY(45deg)' }}
        animate={{
          rotateX: [45, 135, 225, 315, 45],
          rotateY: [45, 135, 225, 315, 45],
          scale: [1, 1.2, 0.8, 1.1, 1]
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      />
      
      <motion.div
        className="absolute w-24 h-24 bg-gradient-to-r from-indigo-500/20 to-violet-500/20 dark:from-indigo-300/50 dark:to-violet-300/50 rounded-full"
        style={{ right: '15%', top: '30%', transform: 'rotateZ(0deg)' }}
        animate={{
          rotateZ: [0, 360],
          x: [0, 50, -30, 0],
          y: [0, -40, 30, 0],
          scale: [1, 1.3, 0.9, 1]
        }}
        transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
      />
      
      {/* 3D Grid Pattern */}
      <div className="absolute inset-0 opacity-10 dark:opacity-40">
        <svg className="w-full h-full">
          <defs>
            <pattern id="grid3d" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M 60 0 L 0 0 0 60" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.5"/>
              <circle cx="30" cy="30" r="2" fill="currentColor" opacity="0.7"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid3d)" className="text-indigo-500 dark:text-indigo-400"/>
        </svg>
      </div>
      
      {/* Floating 3D Orbs */}
      <FloatingOrb size="300px" color="bg-indigo-500 dark:bg-indigo-300" delay={0} duration={20} x={20} y={30} />
      <FloatingOrb size="200px" color="bg-violet-500 dark:bg-violet-300" delay={5} duration={15} x={60} y={50} />
      <FloatingOrb size="150px" color="bg-blue-500 dark:bg-blue-300" delay={10} duration={25} x={40} y={70} />
    </div>
  );
};

export default PortfolioLandingPageAnimation;