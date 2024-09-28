/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary:{
          100: "#BFBFBF",
          200: "#3bba9c",
          300: "#FBBC04",
          400: "#003366"
        }
      },
    },
  },
  plugins: [],
}