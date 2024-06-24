/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'selector',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "mint-pearl": "#f4fffc",
        "graffito": "#1c1c1c"
      }
    },
  },
  plugins: [],
}

