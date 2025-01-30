/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Roboto', 'system-ui', 'sans-serif'],
      },
      colors: {
        primary: "#151b23",
        secondary: "#202830",
        tertiary: "#4d5662",
        error: "#dc2626"
      }
    },
  },
  plugins: [],
};