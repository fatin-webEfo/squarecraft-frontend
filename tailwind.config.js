/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'jaffa-400': 'var(--Jaffa-400, #F08234)', // Use the CSS variable with a fallback
      },
      fontFamily: {
        inter: ['Inter', 'sans-serif'], // Add "Inter" font
        roboto: ['Roboto', 'sans-serif'], // Add "Roboto" font
      }, animation: {
        "spin-fast": "spin 0.5s linear infinite",
      },
    },
  },
  plugins: [],
}