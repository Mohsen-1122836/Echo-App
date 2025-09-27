const { heroui } = require("@heroui/theme");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",                
    "./src/**/*.{js,ts,jsx,tsx}",  
    "./node_modules/@heroui/theme/dist/components/**/*.{js,mjs}", 
  ],
  theme: {
    extend: {},
  },
  darkMode: "class", 
  plugins: [heroui()],
};
