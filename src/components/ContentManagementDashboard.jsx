import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, Save, Upload, Image, Type, Link, Settings, 
  Home, User, Briefcase, Award, Camera, Mail,
  Plus, Trash2, Edit3, Moon, Sun, Palette, Calendar,
  BarChart3, TrendingUp, Activity, Zap, Globe, Shield,
  ChevronRight, Search, Filter, Grid, List
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext';
import { useContent } from '../contexts/ContentContext';


const ContentManagementDashboard = () => {
  const { isDark, toggleTheme } = useTheme();
  const { content, updateField, addItem, removeItem, updateItem, saveContent: saveToContext } = useContent();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [hasChanges, setHasChanges] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState('grid');

  const saveContent = async () => {
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      setHasChanges(false);
    } catch (error) {
      console.error('Error saving content:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Update content and mark as changed
  const updateContent = (section, field, value) => {
    updateField(section, field, value);
    setHasChanges(true);
  };

  // Handle image upload
  const handleImageUpload = (section, field, event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        updateContent(section, field, e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Add new item to arrays
  const addNewItem = (section, newItem) => {
    addItem(section, newItem);
    setHasChanges(true);
  };

  // Remove item from arrays
  const removeArrayItem = (section, id) => {
    removeItem(section, id);
    setHasChanges(true);
  };

  // Update array item
  const updateArrayItem = (section, id, field, value) => {
    updateItem(section, id, field, value);
    setHasChanges(true);
  };

  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: BarChart3, gradient: 'from-blue-500 to-cyan-400' },
    { id: 'home', label: 'Home', icon: Home, gradient: 'from-green-500 to-emerald-400' },
    { id: 'about', label: 'About', icon: User, gradient: 'from-purple-500 to-violet-400' },
    { id: 'skills', label: 'Skills', icon: Zap, gradient: 'from-yellow-500 to-orange-400' },
    { id: 'projects', label: 'Projects', icon: Briefcase, gradient: 'from-pink-500 to-rose-400' },
    { id: 'certificates', label: 'Certificates', icon: Award, gradient: 'from-indigo-500 to-blue-400' },
    { id: 'gallery', label: 'Gallery', icon: Camera, gradient: 'from-teal-500 to-cyan-400' },
    { id: 'contact', label: 'Contact', icon: Mail, gradient: 'from-red-500 to-pink-400' },
    { id: 'social', label: 'Social Media', icon: Link, gradient: 'from-orange-500 to-red-400' }
  ];

  const stats = [
    { 
      label: 'Total Projects', 
      value: content.projects?.length || 0, 
      icon: Briefcase, 
      gradient: 'from-blue-500 to-cyan-400',
      change: '+12%',
      changeType: 'increase'
    },
    { 
      label: 'Skills Mastered', 
      value: (content.skills?.technical?.length || 0) + (content.skills?.soft?.length || 0), 
      icon: Zap, 
      gradient: 'from-purple-500 to-violet-400',
      change: '+8%',
      changeType: 'increase'
    },
    { 
      label: 'Certifications', 
      value: content.certificates?.length || 0, 
      icon: Award, 
      gradient: 'from-green-500 to-emerald-400',
      change: '+25%',
      changeType: 'increase'
    },
    { 
      label: 'Media Items', 
      value: (content.gallery?.images?.length || 0) + (content.gallery?.videos?.length || 0), 
      icon: Camera, 
      gradient: 'from-orange-500 to-red-400',
      change: '+15%',
      changeType: 'increase'
    }
  ];

  const renderDashboardTab = () => (
    <div className="space-y-6">
      {/* Header Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -4, scale: 1.02 }}
              className={`relative overflow-hidden rounded-2xl p-6 ${
                isDark 
                  ? 'bg-gray-800/50 border border-gray-700/50' 
                  : 'bg-white/80 border border-gray-200/50'
              } backdrop-blur-xl shadow-xl hover:shadow-2xl transition-all duration-300`}
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${stat.gradient} opacity-5`} />
              
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-3 rounded-xl bg-gradient-to-r ${stat.gradient} shadow-lg`}>
                    <Icon size={24} className="text-white" />
                  </div>
                  <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
                    stat.changeType === 'increase' 
                      ? 'bg-green-100 text-green-700' 
                      : 'bg-red-100 text-red-700'
                  }`}>
                    <TrendingUp size={12} />
                    {stat.change}
                  </div>
                </div>
                
                <div>
                  <p className={`text-3xl font-bold mb-1 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    {stat.value}
                  </p>
                  <p className={`text-sm font-medium ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                    {stat.label}
                  </p>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className={`lg:col-span-1 rounded-2xl p-6 ${
            isDark 
              ? 'bg-gray-800/50 border border-gray-700/50' 
              : 'bg-white/80 border border-gray-200/50'
          } backdrop-blur-xl shadow-xl`}
        >
          <h3 className={`text-xl font-bold mb-6 ${isDark ? 'text-white' : 'text-gray-900'}`}>
            Quick Actions
          </h3>
          <div className="space-y-3">
            {[
              { label: 'Add Project', tab: 'projects', icon: Plus, gradient: 'from-blue-500 to-cyan-400' },
              { label: 'Update Skills', tab: 'skills', icon: Zap, gradient: 'from-purple-500 to-violet-400' },
              { label: 'Manage Gallery', tab: 'gallery', icon: Camera, gradient: 'from-green-500 to-emerald-400' },
              { label: 'Edit Profile', tab: 'home', icon: User, gradient: 'from-orange-500 to-red-400' }
            ].map((action, index) => {
              const Icon = action.icon;
              return (
                <motion.button
                  key={action.label}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.02, x: 4 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setActiveTab(action.tab)}
                  className={`w-full flex items-center gap-4 p-4 rounded-xl ${
                    isDark 
                      ? 'bg-gray-700/50 hover:bg-gray-700/80' 
                      : 'bg-gray-50/50 hover:bg-gray-100/80'
                  } transition-all duration-300 group`}
                >
                  <div className={`p-2 rounded-lg bg-gradient-to-r ${action.gradient} shadow-lg`}>
                    <Icon size={18} className="text-white" />
                  </div>
                  <span className={`font-medium ${isDark ? 'text-gray-300 group-hover:text-white' : 'text-gray-700 group-hover:text-gray-900'}`}>
                    {action.label}
                  </span>
                  <ChevronRight size={16} className={`ml-auto ${isDark ? 'text-gray-500' : 'text-gray-400'} group-hover:translate-x-1 transition-transform`} />
                </motion.button>
              );
            })}
          </div>
        </motion.div>

        {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className={`lg:col-span-2 rounded-2xl p-6 ${
            isDark 
              ? 'bg-gray-800/50 border border-gray-700/50' 
              : 'bg-white/80 border border-gray-200/50'
          } backdrop-blur-xl shadow-xl`}
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Recent Activity
            </h3>
            <button className={`p-2 rounded-lg ${isDark ? 'bg-gray-700/50 hover:bg-gray-700' : 'bg-gray-100/50 hover:bg-gray-200'} transition-colors`}>
              <Activity size={16} className={isDark ? 'text-gray-400' : 'text-gray-600'} />
            </button>
          </div>
          
          <div className="space-y-4">
            {[
              { 
                action: 'Updated portfolio content settings', 
                time: '2 hours ago', 
                icon: Settings, 
                gradient: 'from-purple-500 to-violet-400',
                type: 'update'
              },
              { 
                action: 'Added new React project to portfolio', 
                time: '1 day ago', 
                icon: Briefcase, 
                gradient: 'from-blue-500 to-cyan-400',
                type: 'create'
              },
              { 
                action: 'Enhanced JavaScript skills proficiency', 
                time: '3 days ago', 
                icon: Zap, 
                gradient: 'from-yellow-500 to-orange-400',
                type: 'update'
              },
              { 
                action: 'Uploaded new certificate images', 
                time: '1 week ago', 
                icon: Award, 
                gradient: 'from-green-500 to-emerald-400',
                type: 'create'
              }
            ].map((activity, index) => {
              const Icon = activity.icon;
              return (
                <motion.div
                  key={activity.action}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`flex items-center gap-4 p-4 rounded-xl ${
                    isDark 
                      ? 'bg-gray-700/30 hover:bg-gray-700/50' 
                      : 'bg-gray-50/30 hover:bg-gray-100/50'
                  } transition-all duration-300 group cursor-pointer`}
                >
                  <div className={`p-2 rounded-lg bg-gradient-to-r ${activity.gradient} shadow-lg`}>
                    <Icon size={16} className="text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'} truncate`}>
                      {activity.action}
                    </p>
                    <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                      {activity.time}
                    </p>
                  </div>
                  <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                    activity.type === 'create' 
                      ? 'bg-green-100 text-green-700' 
                      : 'bg-blue-100 text-blue-700'
                  }`}>
                    {activity.type}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>

      {/* Performance Overview */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className={`rounded-2xl p-6 ${
          isDark 
            ? 'bg-gray-800/50 border border-gray-700/50' 
            : 'bg-white/80 border border-gray-200/50'
        } backdrop-blur-xl shadow-xl`}
      >
        <div className="flex items-center justify-between mb-6">
          <h3 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
            Portfolio Performance
          </h3>
          <div className="flex items-center gap-2">
            <button className={`p-2 rounded-lg ${isDark ? 'bg-gray-700/50 hover:bg-gray-700' : 'bg-gray-100/50 hover:bg-gray-200'} transition-colors`}>
              <Filter size={16} className={isDark ? 'text-gray-400' : 'text-gray-600'} />
            </button>
            <button className={`p-2 rounded-lg ${isDark ? 'bg-gray-700/50 hover:bg-gray-700' : 'bg-gray-100/50 hover:bg-gray-200'} transition-colors`}>
              <BarChart3 size={16} className={isDark ? 'text-gray-400' : 'text-gray-600'} />
            </button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { label: 'Portfolio Views', value: '2.4K', change: '+18%', gradient: 'from-blue-500 to-cyan-400' },
            { label: 'Project Clicks', value: '892', change: '+24%', gradient: 'from-green-500 to-emerald-400' },
            { label: 'Contact Forms', value: '47', change: '+12%', gradient: 'from-purple-500 to-violet-400' }
          ].map((metric, index) => (
            <div key={metric.label} className={`p-4 rounded-xl ${isDark ? 'bg-gray-700/30' : 'bg-gray-50/30'}`}>
              <div className="flex items-center justify-between mb-2">
                <p className={`text-sm font-medium ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  {metric.label}
                </p>
                <span className="text-green-500 text-xs font-medium">{metric.change}</span>
              </div>
              <p className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                {metric.value}
              </p>
              <div className={`mt-2 h-2 rounded-full bg-gradient-to-r ${metric.gradient} opacity-20`}>
                <div className={`h-full w-3/4 rounded-full bg-gradient-to-r ${metric.gradient}`} />
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );

  const renderTabContent = () => {
    switch(activeTab) {
      case 'dashboard': return renderDashboardTab();
      default: return (
        <div className={`text-center py-16 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="space-y-6"
          >
            <div className={`w-20 h-20 mx-auto rounded-2xl bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center shadow-xl`}>
              <Settings size={40} className="text-white" />
            </div>
            <div>
              <h3 className={`text-2xl font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} Management
              </h3>
              <p className="text-lg">Advanced content management features coming soon</p>
            </div>
          </motion.div>
        </div>
      );
    }
  };

  return (
    <div className={`min-h-screen ${isDark ? 'bg-gray-900' : 'bg-gradient-to-br from-gray-50 via-blue-50/30 to-purple-50/30'}`}>
      {/* Background Pattern */}
      <div className="fixed inset-0 z-0">
        <div className={`absolute inset-0 ${isDark ? 'opacity-5' : 'opacity-10'}`}>
          <svg className="w-full h-full">
            <defs>
              <pattern id="modernGrid" width="60" height="60" patternUnits="userSpaceOnUse">
                <path d="M 60 0 L 0 0 0 60" fill="none" stroke={isDark ? "#3B82F6" : "#6366F1"} strokeWidth="1"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#modernGrid)" />
          </svg>
        </div>
      </div>

      <div className="relative z-10 container mx-auto px-6 py-8">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col lg:flex-row lg:items-center justify-between mb-8 gap-4"
        >
          <div>
            <h1 className={`text-4xl lg:text-5xl font-bold mb-2 bg-gradient-to-r ${
              isDark 
                ? 'from-white via-blue-200 to-purple-200' 
                : 'from-gray-900 via-blue-600 to-purple-600'
            } bg-clip-text text-transparent`}>
              Content Management Dashboard
            </h1>
            <p className={`text-lg ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              Comprehensive portfolio content management system
            </p>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}
                className={`p-3 rounded-xl ${
                  isDark 
                    ? 'bg-gray-800/50 hover:bg-gray-800 border border-gray-700/50' 
                    : 'bg-white/50 hover:bg-white border border-gray-200/50'
                } backdrop-blur-xl transition-all duration-300`}
              >
                {viewMode === 'grid' ? <List size={20} /> : <Grid size={20} />}
              </button>
              
              <button
                onClick={toggleTheme}
                className={`p-3 rounded-xl ${
                  isDark 
                    ? 'bg-gray-800/50 hover:bg-gray-800 border border-gray-700/50' 
                    : 'bg-white/50 hover:bg-white border border-gray-200/50'
                } backdrop-blur-xl transition-all duration-300`}
              >
                {isDark ? <Sun size={20} /> : <Moon size={20} />}
              </button>
            </div>
            
            <AnimatePresence>
              {hasChanges && (
                <motion.button
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={saveContent}
                  disabled={isLoading}
                  className="flex items-center gap-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white px-6 py-3 rounded-xl hover:from-green-600 hover:to-emerald-600 transition-all duration-300 shadow-lg hover:shadow-green-500/25"
                >
                  {isLoading ? (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                    />
                  ) : (
                    <Save size={20} />
                  )}
                  {isLoading ? 'Saving...' : 'Save Changes'}
                </motion.button>
              )}
            </AnimatePresence>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/portfolio')}
              className={`p-3 rounded-xl ${
                isDark 
                  ? 'bg-gray-800/50 hover:bg-gray-800 border border-gray-700/50' 
                  : 'bg-white/50 hover:bg-white border border-gray-200/50'
              } backdrop-blur-xl transition-all duration-300`}
            >
              <X size={20} className={isDark ? 'text-gray-400' : 'text-gray-600'} />
            </motion.button>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-6 gap-8">
          {/* Sidebar */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-1"
          >
            <div className={`sticky top-8 rounded-2xl p-6 ${
              isDark 
                ? 'bg-gray-800/50 border border-gray-700/50' 
                : 'bg-white/80 border border-gray-200/50'
            } backdrop-blur-xl shadow-xl`}>
              <nav className="space-y-2">
                {tabs.map((tab, index) => {
                  const Icon = tab.icon;
                  const isActive = activeTab === tab.id;
                  
                  return (
                    <motion.button
                      key={tab.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      whileHover={{ scale: 1.02, x: 4 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${
                        isActive
                          ? `bg-gradient-to-r ${tab.gradient} text-white shadow-lg`
                          : isDark
                          ? 'hover:bg-gray-700/50 text-gray-400 hover:text-white'
                          : 'hover:bg-gray-100/50 text-gray-600 hover:text-gray-900'
                      }`}
                    >
                      <Icon size={20} />
                      <span className="font-medium text-sm">{tab.label}</span>
                      
                      {isActive && (
                        <motion.div
                          layoutId="activeIndicator"
                          className="ml-auto w-2 h-2 rounded-full bg-white/80"
                        />
                      )}
                    </motion.button>
                  );
                })}
              </nav>
            </div>
          </motion.div>

          {/* Main Content */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-5"
          >
            <div className={`rounded-2xl p-8 min-h-[700px] ${
              isDark 
                ? 'bg-gray-800/30 border border-gray-700/30' 
                : 'bg-white/60 border border-gray-200/30'
            } backdrop-blur-xl shadow-xl`}>
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  {renderTabContent()}
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ContentManagementDashboard;