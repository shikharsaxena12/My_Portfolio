import React, { Suspense, useState, useRef } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ThemeProvider, useTheme } from './contexts/ThemeContext';
import LandingPage from './components/LandingPage';
import Portfolio from './components/Portfolio';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Gallery from './components/Gallery';
import Certificates from './components/Certificates';
import OwnerLogin from './components/OwnerLogin';
import OwnerDashboard from './components/OwnerDashboard';
import './index.css';

const Logo = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { isDark } = useTheme();
  const [clickCount, setClickCount] = useState(0);
  const clickTimer = useRef(null);
  
  if (location.pathname === '/') return null;
  
  const handleClick = () => {
    setClickCount(prev => prev + 1);
    
    if (clickTimer.current) {
      clearTimeout(clickTimer.current);
    }
    
    clickTimer.current = setTimeout(() => {
      if (clickCount + 1 === 1) {
        navigate('/');
      } else if (clickCount + 1 === 3) {
        navigate('/owner');
      }
      setClickCount(0);
    }, 500);
  };
  
  return (
    <motion.img 
      src="/Elegant Cursive Script_ Shikhar.png"
      alt="Shikhar Logo"
      className="fixed top-4 left-4 h-32 w-auto z-50 cursor-pointer"
      style={{ filter: isDark ? 'invert(1) brightness(2)' : 'none', transform: 'rotate(20deg)' }}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6 }}
      whileHover={{ scale: 1.05 }}
      onClick={handleClick}
    />
  );
};

function App() {
  return (
    <ThemeProvider>
      <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <div className="App">
          <Logo />
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/portfolio" element={<Portfolio />} />
            <Route path="/about" element={<About />} />
            <Route path="/skills" element={<Skills />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/certificates" element={<Certificates />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/owner" element={<OwnerLogin />} />
            <Route path="/owner/dashboard" element={<OwnerDashboard />} />

            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;