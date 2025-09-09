/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        'inter': ['Inter', 'sans-serif'],
        'poppins': ['Poppins', 'sans-serif'],
        'playfair': ['Playfair Display', 'serif'],
        'mono': ['JetBrains Mono', 'monospace'],
        'montserrat': ['Montserrat', 'sans-serif'],
        'roboto': ['Roboto', 'sans-serif'],
        'opensans': ['Open Sans', 'sans-serif'],
        'lato': ['Lato', 'sans-serif'],
        'nunito': ['Nunito', 'sans-serif'],
        'source': ['Source Sans Pro', 'sans-serif'],
        'raleway': ['Raleway', 'sans-serif'],
        'oswald': ['Oswald', 'sans-serif'],
        'merriweather': ['Merriweather', 'serif'],
        'crimson': ['Crimson Text', 'serif'],
      },
    },
  },
  plugins: [],
}