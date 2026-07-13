export default {
  darkMode: "class",
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        // Use: className="font-sans" (Default)
        sans: ['Inter', 'sans-serif'], 
        
        // Use: className="font-heading"
        heading: ['"Playfair Display"', 'serif'], 
        
        // Use: className="font-mono"
        mono: ['"JetBrains Mono"', 'monospace'],
        
        // Use: className="font-brand"
        brand: ['"Outfit"', 'sans-serif'],

        Outfit: ['"Outfit"', 'sans-serif'],  
      },
    },
  },
  plugins: [],
};