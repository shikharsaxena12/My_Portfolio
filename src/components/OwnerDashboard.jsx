import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { X, User, Briefcase, Award, Image, Mail, Settings, Save } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext';

const OwnerDashboard = () => {
  const { isDark } = useTheme();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('profile');
  
  const [profileData, setProfileData] = useState({
    name: 'Shikhar',
    title: 'Full Stack Developer & UI/UX Designer',
    description: 'I create beautiful, functional digital experiences with clean code and thoughtful design.',
    photo: '',
    email: 'your.email@example.com',
    phone: '+1 234 567 8900',
    location: 'Your City, Country'
  });

  const [projects, setProjects] = useState([
    { id: 1, title: 'Project 1', description: 'Description', image: '', tech: ['React', 'Node.js'], link: '' }
  ]);

  const [skills, setSkills] = useState([
    { name: 'React', level: 90, category: 'technical' },
    { name: 'JavaScript', level: 85, category: 'technical' }
  ]);

  const [certificates, setCertificates] = useState([
    { id: 1, title: 'React Developer', issuer: 'Meta', date: '2023-03-15', description: 'Advanced React development' }
  ]);

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'projects', label: 'Projects', icon: Briefcase },
    { id: 'skills', label: 'Skills', icon: Settings },
    { id: 'certificates', label: 'Certificates', icon: Award },
    { id: 'gallery', label: 'Gallery', icon: Image },
    { id: 'contact', label: 'Contact', icon: Mail }
  ];

  const handleSave = () => {
    // Save data to localStorage or API
    localStorage.setItem('portfolioData', JSON.stringify({
      profile: profileData,
      projects,
      skills,
      certificates
    }));
    alert('Data saved successfully!');
  };

  const renderProfileTab = () => (
    <div className="space-y-6">
      <h3 className="text-2xl font-bold mb-4">Profile Information</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          type="text"
          placeholder="Full Name"
          value={profileData.name}
          onChange={(e) => setProfileData({...profileData, name: e.target.value})}
          className={`p-3 rounded-lg border ${isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-gray-50 border-gray-300'}`}
        />
        <input
          type="text"
          placeholder="Professional Title"
          value={profileData.title}
          onChange={(e) => setProfileData({...profileData, title: e.target.value})}
          className={`p-3 rounded-lg border ${isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-gray-50 border-gray-300'}`}
        />
        <textarea
          placeholder="Description"
          value={profileData.description}
          onChange={(e) => setProfileData({...profileData, description: e.target.value})}
          className={`p-3 rounded-lg border col-span-2 ${isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-gray-50 border-gray-300'}`}
          rows="3"
        />
        <input
          type="email"
          placeholder="Email"
          value={profileData.email}
          onChange={(e) => setProfileData({...profileData, email: e.target.value})}
          className={`p-3 rounded-lg border ${isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-gray-50 border-gray-300'}`}
        />
        <input
          type="text"
          placeholder="Phone"
          value={profileData.phone}
          onChange={(e) => setProfileData({...profileData, phone: e.target.value})}
          className={`p-3 rounded-lg border ${isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-gray-50 border-gray-300'}`}
        />
      </div>
    </div>
  );

  const renderProjectsTab = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-2xl font-bold">Projects</h3>
        <button
          onClick={() => setProjects([...projects, { id: Date.now(), title: '', description: '', image: '', tech: [], link: '' }])}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          Add Project
        </button>
      </div>
      {projects.map((project, index) => (
        <div key={project.id} className={`p-4 rounded-lg border ${isDark ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-300'}`}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Project Title"
              value={project.title}
              onChange={(e) => {
                const newProjects = [...projects];
                newProjects[index].title = e.target.value;
                setProjects(newProjects);
              }}
              className={`p-3 rounded-lg border ${isDark ? 'bg-gray-600 border-gray-500 text-white' : 'bg-white border-gray-300'}`}
            />
            <input
              type="text"
              placeholder="Project Link"
              value={project.link}
              onChange={(e) => {
                const newProjects = [...projects];
                newProjects[index].link = e.target.value;
                setProjects(newProjects);
              }}
              className={`p-3 rounded-lg border ${isDark ? 'bg-gray-600 border-gray-500 text-white' : 'bg-white border-gray-300'}`}
            />
            <textarea
              placeholder="Description"
              value={project.description}
              onChange={(e) => {
                const newProjects = [...projects];
                newProjects[index].description = e.target.value;
                setProjects(newProjects);
              }}
              className={`p-3 rounded-lg border col-span-2 ${isDark ? 'bg-gray-600 border-gray-500 text-white' : 'bg-white border-gray-300'}`}
              rows="2"
            />
          </div>
        </div>
      ))}
    </div>
  );

  const renderSkillsTab = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-2xl font-bold">Skills</h3>
        <button
          onClick={() => setSkills([...skills, { name: '', level: 50, category: 'technical' }])}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          Add Skill
        </button>
      </div>
      {skills.map((skill, index) => (
        <div key={index} className={`p-4 rounded-lg border ${isDark ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-300'}`}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <input
              type="text"
              placeholder="Skill Name"
              value={skill.name}
              onChange={(e) => {
                const newSkills = [...skills];
                newSkills[index].name = e.target.value;
                setSkills(newSkills);
              }}
              className={`p-3 rounded-lg border ${isDark ? 'bg-gray-600 border-gray-500 text-white' : 'bg-white border-gray-300'}`}
            />
            <input
              type="range"
              min="0"
              max="100"
              value={skill.level}
              onChange={(e) => {
                const newSkills = [...skills];
                newSkills[index].level = parseInt(e.target.value);
                setSkills(newSkills);
              }}
              className="p-3"
            />
            <span className={`p-3 ${isDark ? 'text-white' : 'text-black'}`}>{skill.level}%</span>
          </div>
        </div>
      ))}
    </div>
  );

  const renderCertificatesTab = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-2xl font-bold">Certificates</h3>
        <button
          onClick={() => setCertificates([...certificates, { id: Date.now(), title: '', issuer: '', date: '', description: '' }])}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          Add Certificate
        </button>
      </div>
      {certificates.map((cert, index) => (
        <div key={cert.id} className={`p-4 rounded-lg border ${isDark ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-300'}`}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Certificate Title"
              value={cert.title}
              onChange={(e) => {
                const newCerts = [...certificates];
                newCerts[index].title = e.target.value;
                setCertificates(newCerts);
              }}
              className={`p-3 rounded-lg border ${isDark ? 'bg-gray-600 border-gray-500 text-white' : 'bg-white border-gray-300'}`}
            />
            <input
              type="text"
              placeholder="Issuer"
              value={cert.issuer}
              onChange={(e) => {
                const newCerts = [...certificates];
                newCerts[index].issuer = e.target.value;
                setCertificates(newCerts);
              }}
              className={`p-3 rounded-lg border ${isDark ? 'bg-gray-600 border-gray-500 text-white' : 'bg-white border-gray-300'}`}
            />
            <input
              type="date"
              value={cert.date}
              onChange={(e) => {
                const newCerts = [...certificates];
                newCerts[index].date = e.target.value;
                setCertificates(newCerts);
              }}
              className={`p-3 rounded-lg border ${isDark ? 'bg-gray-600 border-gray-500 text-white' : 'bg-white border-gray-300'}`}
            />
            <textarea
              placeholder="Description"
              value={cert.description}
              onChange={(e) => {
                const newCerts = [...certificates];
                newCerts[index].description = e.target.value;
                setCertificates(newCerts);
              }}
              className={`p-3 rounded-lg border ${isDark ? 'bg-gray-600 border-gray-500 text-white' : 'bg-white border-gray-300'}`}
              rows="2"
            />
          </div>
        </div>
      ))}
    </div>
  );

  const renderTabContent = () => {
    switch(activeTab) {
      case 'profile': return renderProfileTab();
      case 'projects': return renderProjectsTab();
      case 'skills': return renderSkillsTab();
      case 'certificates': return renderCertificatesTab();
      default: return <div>Content for {activeTab}</div>;
    }
  };

  return (
    <div className={`min-h-screen ${isDark ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <div className="container mx-auto px-6 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className={`text-4xl font-bold ${isDark ? 'text-white' : 'text-black'}`}>
            Owner Dashboard
          </h1>
          <div className="flex gap-4">
            <button
              onClick={handleSave}
              className="flex items-center gap-2 bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700"
            >
              <Save size={20} />
              Save Changes
            </button>
            <button
              onClick={() => navigate('/portfolio')}
              className={`p-3 rounded-lg ${isDark ? 'hover:bg-gray-700' : 'hover:bg-gray-200'}`}
            >
              <X size={24} className={isDark ? 'text-gray-400' : 'text-black'} />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className={`lg:col-span-1 ${isDark ? 'bg-gray-800' : 'bg-white'} rounded-lg p-6 h-fit`}>
            <nav className="space-y-2">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                      activeTab === tab.id
                        ? 'bg-blue-600 text-white'
                        : isDark
                        ? 'text-gray-300 hover:bg-gray-700'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <Icon size={20} />
                    {tab.label}
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Main Content */}
          <div className={`lg:col-span-3 ${isDark ? 'bg-gray-800' : 'bg-white'} rounded-lg p-6`}>
            {renderTabContent()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OwnerDashboard;