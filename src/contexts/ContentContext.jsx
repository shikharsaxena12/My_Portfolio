import React, { createContext, useContext, useState, useEffect } from 'react';

const ContentContext = createContext();

export const useContent = () => {
  const context = useContext(ContentContext);
  if (!context) {
    throw new Error('useContent must be used within a ContentProvider');
  }
  return context;
};

const defaultContent = {
  home: {
    name: 'Shikhar',
    title: 'Full Stack Developer & UI/UX Designer',
    description: 'I create beautiful, functional digital experiences with clean code and thoughtful design.',
    image: '',
    imageSettings: {
      objectFit: 'cover',
      positionX: 50,
      positionY: 50,
      scale: 100,
      rotation: 0,
      brightness: 100,
      contrast: 100,
      saturation: 100
    },
    resumeLabel: 'View My Resume',
    contactLabel: 'Get In Touch'
  },
  about: {
    title: 'About Me',
    subtitle: 'Passionate Developer & Designer',
    description: 'I am a dedicated full-stack developer with expertise in modern web technologies and a passion for creating exceptional user experiences. My journey in technology spans over 3 years, during which I\'ve worked on diverse projects ranging from e-commerce platforms to complex web applications.',
    image: '',
    stats: [
      { number: '3+', label: 'Years Experience' },
      { number: '50+', label: 'Projects Completed' },
      { number: '100%', label: 'Client Satisfaction' }
    ],
    experiences: [
      { 
        title: 'Full Stack Developer', 
        company: 'Tech Corp', 
        period: '2022-Present',
        details: ['Led development of 5+ major projects', 'Mentored junior developers', 'Implemented CI/CD pipelines', 'Improved application performance by 40%']
      },
      { 
        title: 'Frontend Developer', 
        company: 'StartupXYZ', 
        period: '2021-2022',
        details: ['Built responsive React components', 'Collaborated with design team', 'Optimized web performance', 'Delivered projects on time']
      }
    ],
    education: [
      { 
        title: 'Computer Science', 
        company: 'University of Tech', 
        period: '2018-2022',
        details: ['GPA: 3.8/4.0', 'Data Structures & Algorithms', 'Software Engineering', 'Database Management Systems']
      },
      { 
        title: 'Web Development Bootcamp', 
        company: 'CodeAcademy', 
        period: '2021',
        details: ['Full-stack web development', 'Modern JavaScript frameworks', 'Database design', 'API development']
      }
    ],
    achievements: [
      { 
        title: 'Best Developer Award', 
        company: 'Tech Corp', 
        period: '2023',
        details: ['Recognized for outstanding performance', '500+ GitHub contributions', 'Contributed to 10+ open source projects', 'Speaker at tech conferences']
      },
      { 
        title: 'Open Source Contributor', 
        company: 'GitHub', 
        period: '2022-Present',
        details: ['Active contributor to React ecosystem', 'Maintained popular npm packages', 'Helped 100+ developers', 'Featured in GitHub Spotlight']
      }
    ]
  },
  projects: [
    {
      id: 1,
      title: 'E-Commerce Platform',
      description: 'Full-stack shopping platform',
      fullDescription: 'A comprehensive e-commerce solution with user authentication, payment integration, inventory management, and admin dashboard. Built with modern technologies to ensure scalability and performance.',
      tech: 'React, Node.js, MongoDB',
      image: '',
      github: 'https://github.com/username/ecommerce',
      live: 'https://ecommerce-demo.com',
      features: ['User Authentication & Authorization', 'Payment Gateway Integration', 'Real-time Inventory Management', 'Admin Dashboard', 'Order Tracking System'],
      techStack: ['React', 'Node.js', 'MongoDB', 'Express', 'JWT', 'Stripe API']
    },
    {
      id: 2,
      title: 'Task Management App',
      description: 'Collaborative task tracker',
      fullDescription: 'A collaborative task management application with real-time updates, team collaboration features, and project analytics.',
      tech: 'Vue.js, Firebase, Vuex',
      image: '',
      github: 'https://github.com/username/taskmanager',
      live: 'https://taskmanager-demo.com',
      features: ['Real-time Collaboration', 'Project Analytics', 'Task Prioritization', 'Team Management', 'Progress Tracking'],
      techStack: ['Vue.js', 'Firebase', 'Vuex', 'Vue Router', 'Chart.js', 'Tailwind CSS']
    }
  ],
  certificates: [
    {
      id: 1,
      title: 'React Developer Certification',
      issuer: 'Meta',
      date: '2023-03-15',
      description: 'Advanced React development certification covering hooks, context, performance optimization, and modern React patterns.',
      image: ''
    },
    {
      id: 2,
      title: 'Full Stack Web Development',
      issuer: 'freeCodeCamp',
      date: '2023-01-20',
      description: 'Comprehensive full-stack development certification covering frontend and backend technologies.',
      image: ''
    }
  ],
  certificatesPage: {
    title: 'My Certificates',
    subtitle: 'Professional Certifications & Achievements',
    description: 'A showcase of my professional certifications and achievements that demonstrate my commitment to continuous learning and expertise across various technologies. These credentials validate my skills in modern web development, cloud computing, and software engineering best practices.',
    additionalContent1: 'These certifications represent my dedication to staying current with industry standards and emerging technologies. Each credential validates my expertise and commitment to delivering high-quality solutions.',
    additionalContent2: 'From cloud computing to modern web frameworks, these achievements demonstrate my comprehensive understanding of the full development lifecycle and best practices in software engineering.'
  },
  gallery: {
    images: [],
    videos: []
  },
  contact: {
    title: 'Get In Touch',
    subtitle: 'Let\'s work together',
    description: 'I\'m always open to discussing new opportunities and interesting projects. Whether you have a question or just want to say hi, I\'ll try my best to get back to you!',
    email: 'your.email@example.com',
    phone: '+1 234 567 8900',
    location: 'Your City, Country'
  },
  socialMedia: [
    { platform: 'GitHub', url: 'https://github.com/shikharsaxena12', icon: 'FaGithub' },
    { platform: 'LinkedIn', url: 'https://linkedin.com/in/username', icon: 'FaLinkedin' },
    { platform: 'Twitter', url: 'https://twitter.com/username', icon: 'FaTwitter' },
    { platform: 'Instagram', url: 'https://instagram.com/username', icon: 'FaInstagram' },
    { platform: 'Email', url: 'mailto:your.email@example.com', icon: 'MdEmail' }
  ],
  theme: {
    defaultMode: 'dark',
    primaryColor: '#3B82F6',
    secondaryColor: '#8B5CF6',
    accentColor: '#EC4899'
  }
};

export const ContentProvider = ({ children }) => {
  const [content, setContent] = useState(defaultContent);
  const [isLoading, setIsLoading] = useState(true);

  // Load content from localStorage on mount
  useEffect(() => {
    try {
      const savedContent = localStorage.getItem('portfolioContent');
      if (savedContent) {
        const parsedContent = JSON.parse(savedContent);
        // Merge with default content to ensure all fields exist
        setContent(prevContent => ({
          ...prevContent,
          ...parsedContent,
          // Ensure arrays exist
          projects: parsedContent.projects || defaultContent.projects,
          certificates: parsedContent.certificates || defaultContent.certificates,
          socialMedia: parsedContent.socialMedia || defaultContent.socialMedia,
          // Ensure nested objects exist
          home: {
            ...defaultContent.home,
            ...parsedContent.home,
            imageSettings: {
              ...defaultContent.home.imageSettings,
              ...parsedContent.home?.imageSettings
            }
          },
          certificatesPage: {
            ...defaultContent.certificatesPage,
            ...parsedContent.certificatesPage
          }
        }));
      }
    } catch (error) {
      console.error('Error loading saved content:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Save content to localStorage whenever it changes
  const saveContent = (newContent) => {
    try {
      setContent(newContent);
      localStorage.setItem('portfolioContent', JSON.stringify(newContent));
    } catch (error) {
      console.error('Error saving content:', error);
    }
  };

  // Update specific section
  const updateSection = (section, data) => {
    const newContent = {
      ...content,
      [section]: data
    };
    saveContent(newContent);
  };

  // Update specific field in a section
  const updateField = (section, field, value) => {
    if (section === 'socialMedia') {
      // Handle socialMedia as a direct array
      const newContent = {
        ...content,
        socialMedia: field // field is actually the new array value
      };
      saveContent(newContent);
    } else {
      const newContent = {
        ...content,
        [section]: {
          ...content[section],
          [field]: value
        }
      };
      saveContent(newContent);
    }
  };

  // Add item to array section
  const addItem = (section, item) => {
    const newContent = {
      ...content,
      [section]: [...content[section], { ...item, id: Date.now() }]
    };
    saveContent(newContent);
  };

  // Update item in array section
  const updateItem = (section, id, field, value) => {
    const newContent = {
      ...content,
      [section]: content[section].map(item =>
        item.id === id ? { ...item, [field]: value } : item
      )
    };
    saveContent(newContent);
  };

  // Remove item from array section
  const removeItem = (section, id) => {
    const newContent = {
      ...content,
      [section]: content[section].filter(item => item.id !== id)
    };
    saveContent(newContent);
  };

  const value = {
    content,
    isLoading,
    updateSection,
    updateField,
    addItem,
    updateItem,
    removeItem,
    saveContent
  };

  return (
    <ContentContext.Provider value={value}>
      {children}
    </ContentContext.Provider>
  );
};