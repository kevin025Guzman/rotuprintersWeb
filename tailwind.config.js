/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: '#f97316',
        'primary-dark': '#ea580c',
      },
      fontFamily: {
        display: ['Outfit', 'sans-serif'],
        body: ['DM Sans', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

