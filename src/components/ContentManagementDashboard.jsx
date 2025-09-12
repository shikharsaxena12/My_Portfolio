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
  const [localContent, setLocalContent] = useState(content);

  // Sync localContent with global content
  useEffect(() => {
    setLocalContent(content);
  }, [content]);

  const saveContent = async () => {
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      saveToContext(localContent);
      setHasChanges(false);
    } catch (error) {
      console.error('Error saving content:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Update local content and mark as changed
  const updateContent = (section, field, value) => {
    setLocalContent(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
    setHasChanges(true);
  };

  // Handle image upload
  const handleImageUpload = (section, field, event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        // Reset all image settings to default when new image is uploaded
        updateContent(section, field, e.target.result);
        updateContent(section, 'imageSettings', {
          scale: 100,
          rotation: 0,
          brightness: 100,
          contrast: 100,
          saturation: 100,
          positionX: 50,
          positionY: 50
        });
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

  const renderHomeTab = () => (
    <div className="space-y-6">
      <h3 className={`text-2xl font-bold mb-6 ${isDark ? 'text-white' : 'text-gray-900'}`}>
        Home Page Management
      </h3>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Basic Information */}
        <div className={`p-6 rounded-xl ${isDark ? 'bg-gray-700/50' : 'bg-gray-50/50'}`}>
          <h4 className={`text-lg font-semibold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>Basic Information</h4>
          <div className="space-y-4">
            <div>
              <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>Name</label>
              <input
                type="text"
                placeholder="Your name"
                value={localContent.home?.name || ''}
                onChange={(e) => updateContent('home', 'name', e.target.value)}
                className={`w-full px-4 py-3 rounded-lg border ${isDark ? 'bg-gray-800 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'}`}
              />
            </div>
            <div>
              <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>Title</label>
              <input
                type="text"
                placeholder="e.g., Full Stack Developer"
                value={localContent.home?.title || ''}
                onChange={(e) => updateContent('home', 'title', e.target.value)}
                className={`w-full px-4 py-3 rounded-lg border ${isDark ? 'bg-gray-800 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'}`}
              />
            </div>
            <div>
              <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>Description</label>
              <textarea
                placeholder="Brief description..."
                value={localContent.home?.description || ''}
                onChange={(e) => updateContent('home', 'description', e.target.value)}
                rows={4}
                className={`w-full px-4 py-3 rounded-lg border resize-none ${isDark ? 'bg-gray-800 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'}`}
              />
            </div>
          </div>
        </div>

        {/* Profile Image */}
        <div className={`p-6 rounded-xl ${isDark ? 'bg-gray-700/50' : 'bg-gray-50/50'}`}>
          <h4 className={`text-lg font-semibold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>Profile Image</h4>
          <div className="space-y-4">
            <div className="flex gap-2">
              <input type="file" accept="image/*" onChange={(e) => handleImageUpload('home', 'image', e)} className="hidden" id="imageUpload" />
              <label htmlFor="imageUpload" className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg border cursor-pointer ${isDark ? 'bg-gray-800 border-gray-600 text-white hover:bg-gray-700' : 'bg-white border-gray-300 text-gray-900 hover:bg-gray-50'}`}>
                <Upload size={16} /> Upload Image
              </label>
              {localContent.home?.image && (
                <button onClick={() => updateContent('home', 'image', '')} className="p-3 text-red-500 hover:bg-red-500/10 rounded-lg">
                  <Trash2 size={16} />
                </button>
              )}
            </div>
            
            {localContent.home?.image ? (
              <div className="space-y-3">
                <div className={`w-96 h-[28rem] rounded-3xl overflow-hidden shadow-2xl backdrop-blur-sm relative ${isDark ? 'bg-gray-800 border border-gray-700' : 'bg-gradient-to-br from-amber-50 via-orange-50 to-rose-50 border border-orange-200/60'}`}>
                  <img src={localContent.home.image} alt="Preview" className="w-full h-full object-cover" style={{
                    transform: `scale(${(localContent.home?.imageSettings?.scale || 100) / 100}) rotate(${localContent.home?.imageSettings?.rotation || 0}deg) translate(${((localContent.home?.imageSettings?.positionX || 50) - 50) * 2}%, ${((localContent.home?.imageSettings?.positionY || 50) - 50) * 2}%)`,
                    filter: `brightness(${localContent.home?.imageSettings?.brightness || 100}%) contrast(${localContent.home?.imageSettings?.contrast || 100}%) saturate(${localContent.home?.imageSettings?.saturation || 100}%)`
                  }} />
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  {[
                    { key: 'scale', label: 'Scale', min: 50, max: 200, unit: '%' },
                    { key: 'rotation', label: 'Rotate', min: -180, max: 180, unit: '°' },
                    { key: 'brightness', label: 'Bright', min: 50, max: 150, unit: '%' },
                    { key: 'contrast', label: 'Contrast', min: 50, max: 150, unit: '%' },
                    { key: 'saturation', label: 'Saturate', min: 0, max: 200, unit: '%' },
                    { key: 'positionX', label: 'Pos X', min: 0, max: 100, unit: '%' },
                    { key: 'positionY', label: 'Pos Y', min: 0, max: 100, unit: '%' }
                  ].map(control => (
                    <div key={control.key}>
                      <label className={`block font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>{control.label}</label>
                      <input 
                        type="range" 
                        min={control.min} 
                        max={control.max} 
                        value={localContent.home?.imageSettings?.[control.key] || (control.key === 'scale' || control.key === 'brightness' || control.key === 'contrast' ? 100 : control.key === 'positionX' || control.key === 'positionY' ? 50 : 0)} 
                        onChange={(e) => updateContent('home', 'imageSettings', { ...localContent.home?.imageSettings, [control.key]: parseInt(e.target.value) })} 
                        className="w-full" 
                      />
                      <span className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                        {localContent.home?.imageSettings?.[control.key] || (control.key === 'scale' || control.key === 'brightness' || control.key === 'contrast' ? 100 : control.key === 'positionX' || control.key === 'positionY' ? 50 : 0)}{control.unit}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className={`w-96 h-[28rem] rounded-3xl border-2 border-dashed shadow-2xl backdrop-blur-sm flex items-center justify-center ${isDark ? 'border-gray-600 bg-gray-800/30' : 'border-gray-300 bg-gray-50/30'}`}>
                <div className="text-center">
                  <Image size={48} className={`mx-auto mb-4 ${isDark ? 'text-gray-500' : 'text-gray-400'}`} />
                  <p className={`text-lg ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>No image uploaded</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Resume Section */}
      <div className={`p-6 rounded-xl ${isDark ? 'bg-gray-700/50' : 'bg-gray-50/50'}`}>
        <h4 className={`text-lg font-semibold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>Resume</h4>
        <div className="space-y-4">
          <div className="flex gap-2">
            <input type="file" accept=".pdf,.doc,.docx" onChange={(e) => {
              const file = e.target.files[0];
              if (file) {
                const reader = new FileReader();
                reader.onload = (e) => {
                  updateContent('home', 'resume', { name: file.name, data: e.target.result, type: file.type });
                };
                reader.readAsDataURL(file);
              }
            }} className="hidden" id="resumeUpload" />
            <label htmlFor="resumeUpload" className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg border cursor-pointer ${isDark ? 'bg-gray-800 border-gray-600 text-white hover:bg-gray-700' : 'bg-white border-gray-300 text-gray-900 hover:bg-gray-50'}`}>
              <Upload size={16} /> Upload Resume (PDF)
            </label>
            {localContent.home?.resume && (
              <button onClick={() => updateContent('home', 'resume', null)} className="p-3 text-red-500 hover:bg-red-500/10 rounded-lg">
                <Trash2 size={16} />
              </button>
            )}
          </div>
          
          {localContent.home?.resume ? (
            <div className={`p-4 rounded-lg border ${isDark ? 'bg-gray-800/50 border-gray-600' : 'bg-white/50 border-gray-300'}`}>
              <p className={`text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>📄 {localContent.home.resume.name}</p>
            </div>
          ) : (
            <div className={`p-6 rounded-lg border-2 border-dashed text-center ${isDark ? 'border-gray-600 bg-gray-800/30' : 'border-gray-300 bg-gray-50/30'}`}>
              <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>No resume uploaded</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  const renderProjectsTab = () => (
    <div className="space-y-6">
      <h3 className={`text-2xl font-bold mb-6 ${isDark ? 'text-white' : 'text-gray-900'}`}>
        Projects Management
      </h3>
      
      <div className="flex justify-between items-center mb-4">
        <h4 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>Projects</h4>
        <button
          onClick={() => {
            const newProject = {
              title: '',
              description: '',
              fullDescription: '',
              tech: '',
              image: '',
              github: '',
              live: '',
              features: [],
              techStack: []
            };
            addNewItem('projects', newProject);
          }}
          className={`p-2 rounded-lg ${isDark ? 'bg-green-600 hover:bg-green-700' : 'bg-green-500 hover:bg-green-600'} text-white`}
        >
          <Plus size={16} />
        </button>
      </div>
      
      <div className="space-y-4">
        {(localContent.projects || []).map((project, index) => (
          <div key={project.id || index} className={`p-6 rounded-xl border ${isDark ? 'bg-gray-800/50 border-gray-600' : 'bg-white/50 border-gray-300'}`}>
            <div className="flex justify-end mb-4">
              <button
                onClick={() => removeArrayItem('projects', project.id)}
                className="p-2 text-red-500 hover:bg-red-500/10 rounded-lg"
              >
                <Trash2 size={16} />
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <input
                type="text"
                placeholder="Project Title"
                value={project.title || ''}
                onChange={(e) => updateArrayItem('projects', project.id, 'title', e.target.value)}
                className={`px-3 py-2 rounded-lg border ${isDark ? 'bg-gray-800 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'}`}
              />
              <input
                type="text"
                placeholder="Tech Stack (e.g., React, Node.js)"
                value={project.tech || ''}
                onChange={(e) => updateArrayItem('projects', project.id, 'tech', e.target.value)}
                className={`px-3 py-2 rounded-lg border ${isDark ? 'bg-gray-800 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'}`}
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <input
                type="url"
                placeholder="GitHub URL"
                value={project.github || ''}
                onChange={(e) => updateArrayItem('projects', project.id, 'github', e.target.value)}
                className={`px-3 py-2 rounded-lg border ${isDark ? 'bg-gray-800 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'}`}
              />
              <input
                type="url"
                placeholder="Live Demo URL"
                value={project.live || ''}
                onChange={(e) => updateArrayItem('projects', project.id, 'live', e.target.value)}
                className={`px-3 py-2 rounded-lg border ${isDark ? 'bg-gray-800 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'}`}
              />
            </div>
            
            <textarea
              placeholder="Short Description"
              value={project.description || ''}
              onChange={(e) => updateArrayItem('projects', project.id, 'description', e.target.value)}
              rows={2}
              className={`w-full px-3 py-2 rounded-lg border mb-4 resize-none ${isDark ? 'bg-gray-800 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'}`}
            />
            
            <textarea
              placeholder="Full Description"
              value={project.fullDescription || ''}
              onChange={(e) => updateArrayItem('projects', project.id, 'fullDescription', e.target.value)}
              rows={3}
              className={`w-full px-3 py-2 rounded-lg border resize-none ${isDark ? 'bg-gray-800 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'}`}
            />
          </div>
        ))}
      </div>
    </div>
  );

  const renderCertificatesTab = () => (
    <div className="space-y-6">
      <h3 className={`text-2xl font-bold mb-6 ${isDark ? 'text-white' : 'text-gray-900'}`}>
        Certificates Management
      </h3>
      
      <div className="flex justify-between items-center mb-4">
        <h4 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>Certificates</h4>
        <button
          onClick={() => {
            const newCertificate = {
              title: '',
              issuer: '',
              date: '',
              description: '',
              image: ''
            };
            addNewItem('certificates', newCertificate);
          }}
          className={`p-2 rounded-lg ${isDark ? 'bg-green-600 hover:bg-green-700' : 'bg-green-500 hover:bg-green-600'} text-white`}
        >
          <Plus size={16} />
        </button>
      </div>
      
      <div className="space-y-4">
        {(localContent.certificates || []).map((cert, index) => (
          <div key={cert.id || index} className={`p-6 rounded-xl border ${isDark ? 'bg-gray-800/50 border-gray-600' : 'bg-white/50 border-gray-300'}`}>
            <div className="flex justify-end mb-4">
              <button
                onClick={() => removeArrayItem('certificates', cert.id)}
                className="p-2 text-red-500 hover:bg-red-500/10 rounded-lg"
              >
                <Trash2 size={16} />
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <input
                type="text"
                placeholder="Certificate Title"
                value={cert.title || ''}
                onChange={(e) => updateArrayItem('certificates', cert.id, 'title', e.target.value)}
                className={`px-3 py-2 rounded-lg border ${isDark ? 'bg-gray-800 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'}`}
              />
              <input
                type="text"
                placeholder="Issuer (e.g., Google, Microsoft)"
                value={cert.issuer || ''}
                onChange={(e) => updateArrayItem('certificates', cert.id, 'issuer', e.target.value)}
                className={`px-3 py-2 rounded-lg border ${isDark ? 'bg-gray-800 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'}`}
              />
            </div>
            
            <div className="mb-4">
              <input
                type="date"
                value={cert.date || ''}
                onChange={(e) => updateArrayItem('certificates', cert.id, 'date', e.target.value)}
                className={`w-full px-3 py-2 rounded-lg border ${isDark ? 'bg-gray-800 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'}`}
              />
            </div>
            
            <textarea
              placeholder="Certificate Description"
              value={cert.description || ''}
              onChange={(e) => updateArrayItem('certificates', cert.id, 'description', e.target.value)}
              rows={3}
              className={`w-full px-3 py-2 rounded-lg border resize-none ${isDark ? 'bg-gray-800 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'}`}
            />
            
            <div className="mt-4">
              <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files[0];
                  if (file) {
                    const reader = new FileReader();
                    reader.onload = (e) => {
                      updateArrayItem('certificates', cert.id, 'image', e.target.result);
                    };
                    reader.readAsDataURL(file);
                  }
                }}
                className={`w-full px-3 py-2 rounded-lg border ${isDark ? 'bg-gray-800 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'}`}
              />
              {cert.image && (
                <div className="mt-2">
                  <img src={cert.image} alt="Certificate" className="w-32 h-24 object-cover rounded-lg" />
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderSkillsTab = () => (
    <div className="space-y-6">
      <h3 className={`text-2xl font-bold mb-6 ${isDark ? 'text-white' : 'text-gray-900'}`}>
        Skills Management
      </h3>
      
      {/* Skills Right Box Content */}
      <div className={`p-6 rounded-xl ${isDark ? 'bg-gray-700/50' : 'bg-gray-50/50'}`}>
        <h4 className={`text-lg font-semibold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>Skills Page Right Box Content</h4>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div>
            <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>Main Title</label>
            <input
              type="text"
              placeholder="My Skills"
              value={localContent.skillsContent?.title || ''}
              onChange={(e) => updateContent('skillsContent', 'title', e.target.value)}
              className={`w-full px-3 py-2 rounded-lg border ${isDark ? 'bg-gray-800 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'}`}
            />
          </div>
          <div>
            <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>Subtitle</label>
            <input
              type="text"
              placeholder="Technical Expertise & Professional Skills"
              value={localContent.skillsContent?.subtitle || ''}
              onChange={(e) => updateContent('skillsContent', 'subtitle', e.target.value)}
              className={`w-full px-3 py-2 rounded-lg border ${isDark ? 'bg-gray-800 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'}`}
            />
          </div>
          <div className="lg:col-span-2">
            <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>First Description</label>
            <textarea
              placeholder="I specialize in modern web development technologies and frameworks..."
              value={localContent.skillsContent?.description1 || ''}
              onChange={(e) => updateContent('skillsContent', 'description1', e.target.value)}
              rows={3}
              className={`w-full px-3 py-2 rounded-lg border resize-none ${isDark ? 'bg-gray-800 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'}`}
            />
          </div>
          <div className="lg:col-span-2">
            <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>Second Description</label>
            <textarea
              placeholder="With years of experience in JavaScript ecosystem..."
              value={localContent.skillsContent?.description2 || ''}
              onChange={(e) => updateContent('skillsContent', 'description2', e.target.value)}
              rows={3}
              className={`w-full px-3 py-2 rounded-lg border resize-none ${isDark ? 'bg-gray-800 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'}`}
            />
          </div>
          <div className="lg:col-span-2">
            <div className="flex justify-between items-center mb-3">
              <label className={`block text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>"What I Do" List</label>
              <button
                onClick={() => {
                  const currentList = localContent.skillsContent?.whatIDo || [];
                  updateContent('skillsContent', 'whatIDo', [...currentList, 'New Item']);
                }}
                className={`p-1 rounded ${isDark ? 'bg-green-600 hover:bg-green-700' : 'bg-green-500 hover:bg-green-600'} text-white`}
              >
                <Plus size={14} />
              </button>
            </div>
            <div className="space-y-2">
              {(localContent.skillsContent?.whatIDo || []).map((item, index) => (
                <div key={index} className="flex gap-2">
                  <input
                    type="text"
                    value={item}
                    onChange={(e) => {
                      const newList = [...(localContent.skillsContent?.whatIDo || [])];
                      newList[index] = e.target.value;
                      updateContent('skillsContent', 'whatIDo', newList);
                    }}
                    className={`flex-1 px-3 py-2 rounded-lg border text-sm ${isDark ? 'bg-gray-800 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'}`}
                  />
                  <button
                    onClick={() => {
                      const newList = (localContent.skillsContent?.whatIDo || []).filter((_, i) => i !== index);
                      updateContent('skillsContent', 'whatIDo', newList);
                    }}
                    className="p-2 text-red-500 hover:bg-red-500/10 rounded"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Technical Skills */}
        <div className={`p-6 rounded-xl ${isDark ? 'bg-gray-700/50' : 'bg-gray-50/50'}`}>
          <div className="flex justify-between items-center mb-4">
            <h4 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>Technical Skills</h4>
            <button
              onClick={() => {
                const newSkills = [...(localContent.skills?.technical || []), { name: '', level: 80 }];
                updateContent('skills', 'technical', newSkills);
              }}
              className={`p-2 rounded-lg ${isDark ? 'bg-green-600 hover:bg-green-700' : 'bg-green-500 hover:bg-green-600'} text-white`}
            >
              <Plus size={16} />
            </button>
          </div>
          <div className="space-y-4">
            {(localContent.skills?.technical || []).map((skill, index) => (
              <div key={index} className={`p-4 rounded-lg border ${isDark ? 'bg-gray-800/50 border-gray-600' : 'bg-white/50 border-gray-300'}`}>
                <div className="flex justify-end mb-2">
                  <button
                    onClick={() => {
                      const newSkills = (localContent.skills?.technical || []).filter((_, i) => i !== index);
                      updateContent('skills', 'technical', newSkills);
                    }}
                    className="p-1 text-red-500 hover:bg-red-500/10 rounded"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
                <div className="space-y-3">
                  <input
                    type="text"
                    placeholder="Skill name (e.g., React, JavaScript)"
                    value={skill.name || ''}
                    onChange={(e) => {
                      const newSkills = [...(localContent.skills?.technical || [])];
                      newSkills[index] = { ...newSkills[index], name: e.target.value };
                      updateContent('skills', 'technical', newSkills);
                    }}
                    className={`w-full px-3 py-2 rounded-lg border text-sm ${isDark ? 'bg-gray-800 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'}`}
                  />
                  <div>
                    <label className={`block text-xs font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>Proficiency Level</label>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={skill.level || 80}
                      onChange={(e) => {
                        const newSkills = [...(localContent.skills?.technical || [])];
                        newSkills[index] = { ...newSkills[index], level: parseInt(e.target.value) };
                        updateContent('skills', 'technical', newSkills);
                      }}
                      className="w-full"
                    />
                    <div className="flex justify-between text-xs mt-1">
                      <span className={isDark ? 'text-gray-400' : 'text-gray-600'}>Beginner</span>
                      <span className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{skill.level || 80}%</span>
                      <span className={isDark ? 'text-gray-400' : 'text-gray-600'}>Expert</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Soft Skills */}
        <div className={`p-6 rounded-xl ${isDark ? 'bg-gray-700/50' : 'bg-gray-50/50'}`}>
          <div className="flex justify-between items-center mb-4">
            <h4 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>Soft Skills</h4>
            <button
              onClick={() => {
                const newSkills = [...(localContent.skills?.soft || []), { name: '', level: 80 }];
                updateContent('skills', 'soft', newSkills);
              }}
              className={`p-2 rounded-lg ${isDark ? 'bg-green-600 hover:bg-green-700' : 'bg-green-500 hover:bg-green-600'} text-white`}
            >
              <Plus size={16} />
            </button>
          </div>
          <div className="space-y-4">
            {(localContent.skills?.soft || []).map((skill, index) => (
              <div key={index} className={`p-4 rounded-lg border ${isDark ? 'bg-gray-800/50 border-gray-600' : 'bg-white/50 border-gray-300'}`}>
                <div className="flex justify-end mb-2">
                  <button
                    onClick={() => {
                      const newSkills = (localContent.skills?.soft || []).filter((_, i) => i !== index);
                      updateContent('skills', 'soft', newSkills);
                    }}
                    className="p-1 text-red-500 hover:bg-red-500/10 rounded"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
                <div className="space-y-3">
                  <input
                    type="text"
                    placeholder="Skill name (e.g., Leadership, Communication)"
                    value={skill.name || ''}
                    onChange={(e) => {
                      const newSkills = [...(localContent.skills?.soft || [])];
                      newSkills[index] = { ...newSkills[index], name: e.target.value };
                      updateContent('skills', 'soft', newSkills);
                    }}
                    className={`w-full px-3 py-2 rounded-lg border text-sm ${isDark ? 'bg-gray-800 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'}`}
                  />
                  <div>
                    <label className={`block text-xs font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>Proficiency Level</label>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={skill.level || 80}
                      onChange={(e) => {
                        const newSkills = [...(localContent.skills?.soft || [])];
                        newSkills[index] = { ...newSkills[index], level: parseInt(e.target.value) };
                        updateContent('skills', 'soft', newSkills);
                      }}
                      className="w-full"
                    />
                    <div className="flex justify-between text-xs mt-1">
                      <span className={isDark ? 'text-gray-400' : 'text-gray-600'}>Beginner</span>
                      <span className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{skill.level || 80}%</span>
                      <span className={isDark ? 'text-gray-400' : 'text-gray-600'}>Expert</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderAboutTab = () => (
    <div className="space-y-6">
      <h3 className={`text-2xl font-bold mb-6 ${isDark ? 'text-white' : 'text-gray-900'}`}>
        About Page Management
      </h3>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Basic Information */}
        <div className={`p-6 rounded-xl ${isDark ? 'bg-gray-700/50' : 'bg-gray-50/50'}`}>
          <h4 className={`text-lg font-semibold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>Basic Information</h4>
          <div className="space-y-4">
            <div>
              <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>Title</label>
              <input
                type="text"
                value={localContent.about?.title || ''}
                onChange={(e) => updateContent('about', 'title', e.target.value)}
                className={`w-full px-4 py-3 rounded-lg border ${isDark ? 'bg-gray-800 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'}`}
              />
            </div>
            <div>
              <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>Subtitle</label>
              <input
                type="text"
                value={localContent.about?.subtitle || ''}
                onChange={(e) => updateContent('about', 'subtitle', e.target.value)}
                className={`w-full px-4 py-3 rounded-lg border ${isDark ? 'bg-gray-800 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'}`}
              />
            </div>
            <div>
              <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>Description</label>
              <textarea
                value={localContent.about?.description || ''}
                onChange={(e) => updateContent('about', 'description', e.target.value)}
                rows={4}
                className={`w-full px-4 py-3 rounded-lg border resize-none ${isDark ? 'bg-gray-800 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'}`}
              />
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className={`p-6 rounded-xl ${isDark ? 'bg-gray-700/50' : 'bg-gray-50/50'}`}>
          <div className="flex justify-between items-center mb-4">
            <h4 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>Statistics</h4>
            <button
              onClick={() => {
                const newStats = [...(localContent.about?.stats || []), { number: '', label: '' }];
                updateContent('about', 'stats', newStats);
              }}
              className={`p-2 rounded-lg ${isDark ? 'bg-green-600 hover:bg-green-700' : 'bg-green-500 hover:bg-green-600'} text-white`}
            >
              <Plus size={16} />
            </button>
          </div>
          <div className="space-y-4">
            {(localContent.about?.stats || []).map((stat, index) => (
              <div key={index} className={`p-3 rounded-lg border ${isDark ? 'bg-gray-800/50 border-gray-600' : 'bg-white/50 border-gray-300'}`}>
                <div className="flex justify-end mb-2">
                  <button
                    onClick={() => {
                      const newStats = (localContent.about?.stats || []).filter((_, i) => i !== index);
                      updateContent('about', 'stats', newStats);
                    }}
                    className="p-1 text-red-500 hover:bg-red-500/10 rounded"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="text"
                    placeholder="Number"
                    value={stat.number || ''}
                    onChange={(e) => {
                      const newStats = [...(localContent.about?.stats || [])];
                      newStats[index] = { ...newStats[index], number: e.target.value };
                      updateContent('about', 'stats', newStats);
                    }}
                    className={`px-3 py-2 rounded-lg border text-sm ${isDark ? 'bg-gray-800 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'}`}
                  />
                  <input
                    type="text"
                    placeholder="Label"
                    value={stat.label || ''}
                    onChange={(e) => {
                      const newStats = [...(localContent.about?.stats || [])];
                      newStats[index] = { ...newStats[index], label: e.target.value };
                      updateContent('about', 'stats', newStats);
                    }}
                    className={`px-3 py-2 rounded-lg border text-sm ${isDark ? 'bg-gray-800 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'}`}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Experience Section */}
      <div className={`p-6 rounded-xl ${isDark ? 'bg-gray-700/50' : 'bg-gray-50/50'}`}>
        <div className="flex justify-between items-center mb-4">
          <h4 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>Experience</h4>
          <button
            onClick={() => {
              const newExp = [...(localContent.about?.experiences || []), { title: '', company: '', period: '' }];
              updateContent('about', 'experiences', newExp);
            }}
            className={`p-2 rounded-lg ${isDark ? 'bg-green-600 hover:bg-green-700' : 'bg-green-500 hover:bg-green-600'} text-white`}
          >
            <Plus size={16} />
          </button>
        </div>
        <div className="space-y-4">
          {(localContent.about?.experiences || []).map((exp, index) => (
            <div key={index} className={`p-4 rounded-lg border ${isDark ? 'bg-gray-800/50 border-gray-600' : 'bg-white/50 border-gray-300'}`}>
              <div className="flex justify-end mb-2">
                <button
                  onClick={() => {
                    const newExp = (localContent.about?.experiences || []).filter((_, i) => i !== index);
                    updateContent('about', 'experiences', newExp);
                  }}
                  className="p-1 text-red-500 hover:bg-red-500/10 rounded"
                >
                  <Trash2 size={14} />
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <input
                  type="text"
                  placeholder="Job Title"
                  value={exp.title || ''}
                  onChange={(e) => {
                    const newExp = [...(localContent.about?.experiences || [])];
                    newExp[index] = { ...newExp[index], title: e.target.value };
                    updateContent('about', 'experiences', newExp);
                  }}
                  className={`px-3 py-2 rounded-lg border text-sm ${isDark ? 'bg-gray-800 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'}`}
                />
                <input
                  type="text"
                  placeholder="Company"
                  value={exp.company || ''}
                  onChange={(e) => {
                    const newExp = [...(localContent.about?.experiences || [])];
                    newExp[index] = { ...newExp[index], company: e.target.value };
                    updateContent('about', 'experiences', newExp);
                  }}
                  className={`px-3 py-2 rounded-lg border text-sm ${isDark ? 'bg-gray-800 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'}`}
                />
                <input
                  type="text"
                  placeholder="Period"
                  value={exp.period || ''}
                  onChange={(e) => {
                    const newExp = [...(localContent.about?.experiences || [])];
                    newExp[index] = { ...newExp[index], period: e.target.value };
                    updateContent('about', 'experiences', newExp);
                  }}
                  className={`px-3 py-2 rounded-lg border text-sm ${isDark ? 'bg-gray-800 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'}`}
                />
              </div>
              <div className="mt-3">
                <label className={`block text-xs font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>Details (Press Enter for bullet points)</label>
                <textarea
                  placeholder="Enter details, press Enter for new bullet point"
                  value={(exp.details || []).join('\n')}
                  onChange={(e) => {
                    const newExp = [...(localContent.about?.experiences || [])];
                    newExp[index] = { ...newExp[index], details: e.target.value.split('\n') };
                    updateContent('about', 'experiences', newExp);
                  }}
                  rows={3}
                  className={`w-full px-3 py-2 rounded-lg border text-sm resize-none ${isDark ? 'bg-gray-800 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'}`}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Education Section */}
      <div className={`p-6 rounded-xl ${isDark ? 'bg-gray-700/50' : 'bg-gray-50/50'}`}>
        <div className="flex justify-between items-center mb-4">
          <h4 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>Education</h4>
          <button
            onClick={() => {
              const newEdu = [...(localContent.about?.education || []), { title: '', company: '', period: '' }];
              updateContent('about', 'education', newEdu);
            }}
            className={`p-2 rounded-lg ${isDark ? 'bg-green-600 hover:bg-green-700' : 'bg-green-500 hover:bg-green-600'} text-white`}
          >
            <Plus size={16} />
          </button>
        </div>
        <div className="space-y-4">
          {(localContent.about?.education || []).map((edu, index) => (
            <div key={index} className={`p-4 rounded-lg border ${isDark ? 'bg-gray-800/50 border-gray-600' : 'bg-white/50 border-gray-300'}`}>
              <div className="flex justify-end mb-2">
                <button
                  onClick={() => {
                    const newEdu = (localContent.about?.education || []).filter((_, i) => i !== index);
                    updateContent('about', 'education', newEdu);
                  }}
                  className="p-1 text-red-500 hover:bg-red-500/10 rounded"
                >
                  <Trash2 size={14} />
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <input
                  type="text"
                  placeholder="Degree/Course"
                  value={edu.title || ''}
                  onChange={(e) => {
                    const newEdu = [...(localContent.about?.education || [])];
                    newEdu[index] = { ...newEdu[index], title: e.target.value };
                    updateContent('about', 'education', newEdu);
                  }}
                  className={`px-3 py-2 rounded-lg border text-sm ${isDark ? 'bg-gray-800 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'}`}
                />
                <input
                  type="text"
                  placeholder="Institution"
                  value={edu.company || ''}
                  onChange={(e) => {
                    const newEdu = [...(localContent.about?.education || [])];
                    newEdu[index] = { ...newEdu[index], company: e.target.value };
                    updateContent('about', 'education', newEdu);
                  }}
                  className={`px-3 py-2 rounded-lg border text-sm ${isDark ? 'bg-gray-800 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'}`}
                />
                <input
                  type="text"
                  placeholder="Period"
                  value={edu.period || ''}
                  onChange={(e) => {
                    const newEdu = [...(localContent.about?.education || [])];
                    newEdu[index] = { ...newEdu[index], period: e.target.value };
                    updateContent('about', 'education', newEdu);
                  }}
                  className={`px-3 py-2 rounded-lg border text-sm ${isDark ? 'bg-gray-800 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'}`}
                />
              </div>
              <div className="mt-3">
                <label className={`block text-xs font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>Details (Press Enter for bullet points)</label>
                <textarea
                  placeholder="Enter details, press Enter for new bullet point"
                  value={(edu.details || []).join('\n')}
                  onChange={(e) => {
                    const newEdu = [...(localContent.about?.education || [])];
                    newEdu[index] = { ...newEdu[index], details: e.target.value.split('\n') };
                    updateContent('about', 'education', newEdu);
                  }}
                  rows={3}
                  className={`w-full px-3 py-2 rounded-lg border text-sm resize-none ${isDark ? 'bg-gray-800 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'}`}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Achievements Section */}
      <div className={`p-6 rounded-xl ${isDark ? 'bg-gray-700/50' : 'bg-gray-50/50'}`}>
        <div className="flex justify-between items-center mb-4">
          <h4 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>Achievements</h4>
          <button
            onClick={() => {
              const newAch = [...(localContent.about?.achievements || []), { title: '', company: '', period: '' }];
              updateContent('about', 'achievements', newAch);
            }}
            className={`p-2 rounded-lg ${isDark ? 'bg-green-600 hover:bg-green-700' : 'bg-green-500 hover:bg-green-600'} text-white`}
          >
            <Plus size={16} />
          </button>
        </div>
        <div className="space-y-4">
          {(localContent.about?.achievements || []).map((ach, index) => (
            <div key={index} className={`p-4 rounded-lg border ${isDark ? 'bg-gray-800/50 border-gray-600' : 'bg-white/50 border-gray-300'}`}>
              <div className="flex justify-end mb-2">
                <button
                  onClick={() => {
                    const newAch = (localContent.about?.achievements || []).filter((_, i) => i !== index);
                    updateContent('about', 'achievements', newAch);
                  }}
                  className="p-1 text-red-500 hover:bg-red-500/10 rounded"
                >
                  <Trash2 size={14} />
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <input
                  type="text"
                  placeholder="Achievement Title"
                  value={ach.title || ''}
                  onChange={(e) => {
                    const newAch = [...(localContent.about?.achievements || [])];
                    newAch[index] = { ...newAch[index], title: e.target.value };
                    updateContent('about', 'achievements', newAch);
                  }}
                  className={`px-3 py-2 rounded-lg border text-sm ${isDark ? 'bg-gray-800 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'}`}
                />
                <input
                  type="text"
                  placeholder="Organization"
                  value={ach.company || ''}
                  onChange={(e) => {
                    const newAch = [...(localContent.about?.achievements || [])];
                    newAch[index] = { ...newAch[index], company: e.target.value };
                    updateContent('about', 'achievements', newAch);
                  }}
                  className={`px-3 py-2 rounded-lg border text-sm ${isDark ? 'bg-gray-800 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'}`}
                />
                <input
                  type="text"
                  placeholder="Period"
                  value={ach.period || ''}
                  onChange={(e) => {
                    const newAch = [...(localContent.about?.achievements || [])];
                    newAch[index] = { ...newAch[index], period: e.target.value };
                    updateContent('about', 'achievements', newAch);
                  }}
                  className={`px-3 py-2 rounded-lg border text-sm ${isDark ? 'bg-gray-800 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'}`}
                />
              </div>
              <div className="mt-3">
                <label className={`block text-xs font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>Details (Press Enter for bullet points)</label>
                <textarea
                  placeholder="Enter details, press Enter for new bullet point"
                  value={(ach.details || []).join('\n')}
                  onChange={(e) => {
                    const newAch = [...(localContent.about?.achievements || [])];
                    newAch[index] = { ...newAch[index], details: e.target.value.split('\n') };
                    updateContent('about', 'achievements', newAch);
                  }}
                  rows={3}
                  className={`w-full px-3 py-2 rounded-lg border text-sm resize-none ${isDark ? 'bg-gray-800 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'}`}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderTabContent = () => {
    switch(activeTab) {
      case 'dashboard': return renderDashboardTab();
      case 'home': return renderHomeTab();
      case 'skills': return renderSkillsTab();
      case 'projects': return renderProjectsTab();
      case 'certificates': return renderCertificatesTab();
      case 'about': return renderAboutTab();
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
               Dashboard
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