# 🚀 Portfolio 3D Shikhar

A stunning, modern portfolio website built with React featuring immersive 3D animations, smooth transitions, and a responsive design. This portfolio showcases advanced web development skills with cutting-edge animations and user experience.

## ✨ Features

### 🎨 Visual Excellence
- **Stunning 3D Animations** - Advanced Framer Motion animations with 3D transformations
- **Dual Animation Systems** - Unique landing page animation + enhanced background animations
- **Dark/Light Theme** - Seamless theme switching with persistent preferences
- **Responsive Design** - Optimized for all devices and screen sizes
- **Glassmorphism UI** - Modern frosted glass effects with backdrop blur

### 🎭 Animation Highlights
- **3D Floating Orbs** - Multi-axis animated orbs with gradient effects
- **Neural Network Particles** - 30+ animated particles with complex movement patterns
- **Energy Waves** - Massive animated gradients with color-shifting effects
- **Ambient Light Rays** - Rotating conic gradients for atmospheric lighting
- **3D Floating Cards** - Interactive cards with multi-axis rotation
- **Enhanced Grid Patterns** - Dynamic 3D grid with subtle rotation effects

### 📱 Pages & Sections
- **Landing Page** - Immersive entry point with unique animations
- **Home/Portfolio** - Main showcase with interactive elements
- **About** - Personal information with animated statistics
- **Skills** - Interactive skill bars with tech/soft skills tabs
- **Projects** - Project showcase with hover effects
- **Certificates** - Achievement gallery with modal views
- **Gallery** - Media showcase with image/video filtering
- **Contact** - Contact form with social links

## 🛠️ Tech Stack

### Frontend
- **React 18.2.0** - Modern React with hooks and functional components
- **Framer Motion 10.16.4** - Advanced animations and 3D transformations
- **React Router DOM 6.30.1** - Client-side routing with modern API
- **Tailwind CSS 3.3.6** - Utility-first CSS framework
- **Lucide React 0.294.0** - Beautiful, customizable icons

### Development Tools
- **React Scripts 5.0.1** - Build tools and development server
- **PostCSS 8.4.32** - CSS processing and optimization
- **Autoprefixer 10.4.16** - Automatic vendor prefixing

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/shikharsaxena12/My_Portfolio.git
   cd My_Portfolio
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm start
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000`

### Build for Production
```bash
npm run build
```

## 📁 Project Structure

```
src/
├── components/
│   ├── About.jsx              # About page with animated stats
│   ├── Certificates.jsx       # Certificates showcase
│   ├── Contact.jsx            # Contact form and info
│   ├── FlipCard.jsx           # Reusable flip card component
│   ├── Gallery.jsx            # Media gallery with filters
│   ├── HomeBackground.jsx     # Enhanced 3D background animations
│   ├── LandingPage.jsx        # Immersive landing page
│   ├── Navbar.jsx             # Responsive navigation
│   ├── Portfolio.jsx          # Main portfolio page
│   ├── PortfolioLandingPageAnimation.jsx  # Landing page animations
│   ├── Projects.jsx           # Projects showcase
│   └── Skills.jsx             # Interactive skills display
├── contexts/
│   └── ThemeContext.jsx       # Theme management context
├── utils/                     # Utility functions
├── App.js                     # Main app component
├── index.css                  # Global styles
└── index.js                   # App entry point
```

## 🎯 Key Components

### HomeBackground.jsx
- **50+ Animated Elements** - Complex 3D animations
- **Performance Optimized** - useMemo for stable animations
- **Theme Responsive** - Adapts to dark/light themes
- **Multi-layered Effects** - Orbs, particles, waves, and rays

### Navbar.jsx
- **Glassmorphism Design** - Frosted glass effect
- **Smooth Animations** - Framer Motion transitions
- **Mobile Responsive** - Collapsible mobile menu
- **Active State Tracking** - Visual feedback for current page

### ThemeContext.jsx
- **Global State Management** - Centralized theme control
- **Persistent Preferences** - Remembers user choice
- **Smooth Transitions** - Animated theme switching

## 🎨 Animation Features

### 3D Transformations
- Multi-axis rotation (X, Y, Z)
- Scale and position animations
- Perspective-based 3D effects

### Performance Optimizations
- Memoized random values
- Efficient re-render prevention
- Smooth 60fps animations

### Responsive Animations
- Adapts to screen sizes
- Touch-friendly interactions
- Reduced motion support

## 🌟 Customization

### Theme Colors
Edit `tailwind.config.js` to customize the color palette:
```javascript
theme: {
  extend: {
    colors: {
      primary: '#3B82F6',    // Blue
      secondary: '#8B5CF6',  // Purple
      accent: '#EC4899'      // Pink
    }
  }
}
```

### Animation Timing
Modify animation durations in component files:
```javascript
transition={{ duration: 8, repeat: Infinity }}
```

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 🚀 Deployment

### Netlify
1. Build the project: `npm run build`
2. Deploy the `build` folder to Netlify

### Vercel
1. Connect your GitHub repository
2. Vercel will automatically build and deploy

### GitHub Pages
1. Install gh-pages: `npm install --save-dev gh-pages`
2. Add to package.json: `"homepage": "https://shikharsaxena12.github.io/My_Portfolio"`
3. Deploy: `npm run deploy`

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Shikhar Saxena**
- Portfolio: [https://shikharsaxena12.github.io/My_Portfolio](https://shikharsaxena12.github.io/My_Portfolio)
- LinkedIn: [Your LinkedIn Profile]
- GitHub: [https://github.com/shikharsaxena12](https://github.com/shikharsaxena12)
- Email: [Your Email]

## 🙏 Acknowledgments

- [Framer Motion](https://www.framer.com/motion/) for amazing animations
- [Tailwind CSS](https://tailwindcss.com/) for utility-first styling
- [Lucide React](https://lucide.dev/) for beautiful icons
- [React](https://reactjs.org/) for the powerful framework

---

⭐ **Star this repository if you found it helpful!**