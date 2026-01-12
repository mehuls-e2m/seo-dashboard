/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          orange: '#FF6600',
          dark: '#1a1a1a',
          gray: '#5C6268',
        },
      },
    },
  },
  plugins: [],
}

