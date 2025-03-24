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
        'xl': '1280px',
        '2xl': '1536px',
      },
    },
  },
  plugins: [],
}

