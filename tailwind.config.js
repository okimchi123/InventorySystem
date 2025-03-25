/** @type {import('tailwindcss').Config} */
export default {
  content: ["./app/**/*.{html,js,jsx}", "./app/*.{html,js,jsx}"],
  theme: {
    extend: {
      screens: {
        'zoomOut': '1300px', 
        'phone': '480px',
        'sm': '640px',
        'md': '768px',
        'laptop': '1024px',
        'desktop': '1280px',
        '2xl': '1536px',
      },
      maxWidth: {
        '7xl': '80rem', // or whatever value you want for 7xl
      },
    },
  },
  plugins: [],
}

