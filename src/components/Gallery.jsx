import React, { useState } from 'react';
import { Play, X, Image, Video } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import Navbar from './Navbar';
import { HomeBackground } from '../portfolio_animation';

const Gallery = () => {
  const { isDark = false } = useTheme() || {};
  const [filter, setFilter] = useState('image');
  const [selectedMedia, setSelectedMedia] = useState(null);

  const labels = {
    myGallery: 'My Gallery',
    galleryDescription: 'A collection of my work, projects, and creative moments'
  };

  const mediaItems = [
    { id: 1, type: 'image', src: '/api/placeholder/400/300', title: 'Project Screenshot 1' },
    { id: 2, type: 'video', src: '/api/placeholder/400/300', title: 'Demo Video 1' },
    { id: 3, type: 'image', src: '/api/placeholder/400/300', title: 'Design Work 1' },
    { id: 4, type: 'image', src: '/api/placeholder/400/300', title: 'Project Screenshot 2' },
    { id: 5, type: 'video', src: '/api/placeholder/400/300', title: 'Demo Video 2' },
    { id: 6, type: 'image', src: '/api/placeholder/400/300', title: 'Design Work 2' },
    { id: 7, type: 'video', src: '/api/placeholder/400/300', title: 'Tutorial Video' },
    { id: 8, type: 'image', src: '/api/placeholder/400/300', title: 'UI Design' }
  ];

  const filteredItems = mediaItems.filter(item => item.type === filter);

  const MediaCard = ({ item }) => (
    <div
      className={`relative cursor-pointer rounded-2xl overflow-hidden ${isDark ? 'bg-gray-800' : 'bg-white'} shadow-lg hover:shadow-xl transition-shadow`}
      onClick={() => setSelectedMedia(item)}
    >
      <div className="aspect-video relative overflow-hidden">
        <div className={`w-full h-full flex items-center justify-center ${isDark ? 'bg-gray-700' : 'bg-gray-100'}`}>
          <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
            {item.type === 'video' ? 'Video Thumbnail' : 'Image'}
          </span>
        </div>
        
        {item.type === 'video' && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
              <Play size={24} className="text-white ml-1" />
            </div>
          </div>
        )}
        
        <div className="absolute top-3 right-3">
          <div className={`p-2 rounded-lg ${isDark ? 'bg-gray-800/80' : 'bg-white/80'} backdrop-blur-sm`}>
            {item.type === 'video' ? (
              <Video size={16} className="text-blue-500" />
            ) : (
              <Image size={16} className="text-green-500" />
            )}
          </div>
        </div>
      </div>
      
      <div className="p-4">
        <h3 className={`font-medium ${isDark ? 'text-white' : 'text-gray-800'}`}>
          {item.title}
        </h3>
      </div>
    </div>
  );

  return (
    <div className={`min-h-screen ${isDark ? 'bg-gray-900' : 'bg-gradient-to-br from-slate-50 via-white to-blue-50'}`}>
      <HomeBackground />
      <Navbar />
      
      <div className="relative z-10 container mx-auto px-6 pt-32 pb-20">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              {labels.myGallery}
            </span>
          </h1>
          <p className={`text-lg ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
            {labels.galleryDescription}
          </p>
        </div>

        <div className="flex justify-center mb-12">
          <div className={`flex rounded-full p-1 ${isDark ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
            {[
              { key: 'image', label: 'Images', icon: Image },
              { key: 'video', label: 'Videos', icon: Video }
            ].map((filterOption) => {
              const Icon = filterOption.icon;
              return (
                <button
                  key={filterOption.key}
                  onClick={() => setFilter(filterOption.key)}
                  className={`px-6 py-2 rounded-full transition-all flex items-center gap-2 ${
                    filter === filterOption.key
                      ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white'
                      : isDark ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-800'
                  }`}
                >
                  <Icon size={16} />
                  {filterOption.label}
                </button>
              );
            })}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredItems.map((item) => (
            <MediaCard key={item.id} item={item} />
          ))}
        </div>

        {selectedMedia && (
          <div
            className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-50 p-4"
            onClick={() => setSelectedMedia(null)}
          >
            <div
              className={`relative max-w-4xl w-full rounded-2xl overflow-hidden ${isDark ? 'bg-gray-800' : 'bg-white'}`}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedMedia(null)}
                className="absolute top-4 right-4 z-10 p-2 bg-black/50 text-white rounded-full hover:bg-black/70 transition-all"
              >
                <X size={20} />
              </button>
              
              <div className="aspect-video bg-gray-900 flex items-center justify-center">
                <span className="text-white text-lg">
                  {selectedMedia.type === 'video' ? 'Video Player' : 'Full Size Image'}
                </span>
              </div>
              
              <div className="p-6">
                <h2 className={`text-2xl font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-800'}`}>
                  {selectedMedia.title}
                </h2>
                <p className={`${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                  {selectedMedia.type === 'video' ? 'Video content' : 'Image content'}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Gallery;