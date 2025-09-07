import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    // Return default values instead of throwing error
    return { isDark: false, toggleTheme: () => {} };
  }
  return context;
};

export const ThemeProvider = ({ children }) => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    try {
      const savedTheme = localStorage.getItem('theme');
      if (savedTheme) {
        setIsDark(savedTheme === 'dark');
      } else if (window.matchMedia) {
        setIsDark(window.matchMedia('(prefers-color-scheme: dark)').matches);
      }
    } catch (error) {
      console.warn('Theme initialization failed:', error);
    }
  }, []);

  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.classList.toggle('dark', isDark);
    }
  }, [isDark]);

  const toggleTheme = () => {
    try {
      const newTheme = !isDark;
      setIsDark(newTheme);
      localStorage.setItem('theme', newTheme ? 'dark' : 'light');
    } catch (error) {
      console.warn('Theme toggle failed:', error);
    }
  };

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};