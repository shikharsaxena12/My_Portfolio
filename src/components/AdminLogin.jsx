import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext';

const AdminLogin = () => {
  const { isDark } = useTheme();
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({ username: '', password: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    const adminEmail = process.env.REACT_APP_ADMIN_EMAIL;
    const adminPassword = process.env.REACT_APP_ADMIN_PASSWORD;
    
    if (credentials.username === adminEmail && credentials.password === adminPassword) {
      navigate('/admin/dashboard');
    } else {
      alert('Invalid credentials');
    }
  };

  return (
    <div className={`min-h-screen flex items-center justify-center ${isDark ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <motion.div
        className={`max-w-md w-full mx-4 p-8 rounded-2xl shadow-2xl ${isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'}`}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="relative">
          <button
            onClick={() => navigate('/portfolio')}
            className={`absolute -top-2 -right-2 p-2 rounded-full ${isDark ? 'hover:bg-gray-700' : 'hover:bg-gray-100'} transition-colors`}
          >
            <X size={20} className={isDark ? 'text-gray-400' : 'text-black'} />
          </button>
          <h2 className={`text-3xl font-bold text-center mb-8 ${isDark ? 'text-white' : 'text-black'}`}>
            Admin Login
          </h2>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <input
              type="email"
              placeholder="Email"
              value={credentials.username}
              onChange={(e) => setCredentials({...credentials, username: e.target.value})}
              className={`w-full px-4 py-3 rounded-lg border ${isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-gray-50 border-gray-300 text-black'} focus:outline-none focus:ring-2 focus:ring-blue-500`}
            />
          </div>
          
          <div>
            <input
              type="password"
              placeholder="Password"
              value={credentials.password}
              onChange={(e) => setCredentials({...credentials, password: e.target.value})}
              className={`w-full px-4 py-3 rounded-lg border ${isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-gray-50 border-gray-300 text-black'} focus:outline-none focus:ring-2 focus:ring-blue-500`}
            />
          </div>
          
          <button
            type="submit"
            className="relative overflow-hidden font-semibold px-6 py-3 rounded-full flex items-center justify-center gap-3 w-full group backdrop-blur-xl border border-white/30 text-white shadow-2xl transition-all duration-500"
            style={{
              background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.8), rgba(168, 85, 247, 0.8), rgba(236, 72, 153, 0.8))'
            }}
          >
            <span className={`relative z-10 ${
              isDark ? 'text-white' : 'text-black'
            }`}>Login</span>
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default AdminLogin;