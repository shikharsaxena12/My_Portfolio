import React, { Suspense, useState, useRef, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ThemeProvider, useTheme } from './contexts/ThemeContext';
import { ContentProvider } from './contexts/ContentContext';
import './index.css';

// Lazy load components
const LandingPage = lazy(() => import('./components/LandingPage'));
const Portfolio = lazy(() => import('./components/Portfolio'));
const About = lazy(() => import('./components/About'));
const Skills = lazy(() => import('./components/Skills'));
const Projects = lazy(() => import('./components/Projects'));
const Contact = lazy(() => import('./components/Contact'));
const Gallery = lazy(() => import('./components/Gallery'));
const Certificates = lazy(() => import('./components/Certificates'));
const Testimonials = lazy(() => import('./components/Testimonials'));
const OwnerLogin = lazy(() => import('./components/OwnerLogin'));
const ContentManagement = lazy(() => import('./components/ContentManagementDashboard'));

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
    <motion.div
      className="fixed top-0 left-4 h-32 w-auto z-50 cursor-pointer"
      style={{ transform: 'rotate(20deg)' }}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6 }}
      whileHover={{ scale: 1.05 }}
      onClick={handleClick}
    >
      <img 
        src="/Elegant Cursive Script_ Shikhar.png"
        alt="Shikhar Logo"
        className="h-32 w-auto"
        style={{ 
          filter: isDark 
            ? 'brightness(0) saturate(100%) invert(1)'
            : 'brightness(0) saturate(100%)'
        }}
      />
    </motion.div>
  );
};

// Loading component
const LoadingSpinner = () => {
  const { isDark } = useTheme();
  return (
    <div className={`min-h-screen flex items-center justify-center ${
      isDark ? 'bg-gray-900' : 'bg-gradient-to-br from-slate-50 via-white to-blue-50'
    }`}>
      <div className="flex flex-col items-center space-y-4">
        <div className="relative">
          <div className="w-16 h-16 border-4 border-blue-200 rounded-full animate-spin">
            <div className="absolute top-0 left-0 w-16 h-16 border-4 border-transparent border-t-blue-600 rounded-full animate-spin"></div>
          </div>
        </div>
        <p className={`text-lg font-medium ${
          isDark ? 'text-gray-300' : 'text-gray-600'
        }`}>Loading...</p>
      </div>
    </div>
  );
};

function App() {
  return (
    <ThemeProvider>
      <ContentProvider>
        <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
          <div className="App">
            <Logo />
            <Suspense fallback={<LoadingSpinner />}>
              <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/portfolio" element={<Portfolio />} />
                <Route path="/about" element={<About />} />
                <Route path="/skills" element={<Skills />} />
                <Route path="/projects" element={<Projects />} />
                <Route path="/certificates" element={<Certificates />} />
                <Route path="/gallery" element={<Gallery />} />
                <Route path="/testimonials" element={<Testimonials />} />
                <Route path="/contact" element={<Contact />} />
              <Route path="/owner" element={<OwnerLogin />} />
              <Route path="/content-management" element={<ContentManagement />} />
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </Suspense>
          </div>
        </Router>
      </ContentProvider>
    </ThemeProvider>
  );
}

export default App;