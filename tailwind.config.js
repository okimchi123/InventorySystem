/** @type {import('tailwindcss').Config} */
export default {
  content: ["./app/**/*.{html,js,jsx}", "./app/*.{html,js,jsx}"],
  theme: {
    extend: {
      screens: {
        'zoomOut': '1300px', 
        'phone': '480px',
        'md': '768px',
        'laptop': '1024px',
        'desktop': '1280px',
      },
    },
  },
  plugins: [],
}

