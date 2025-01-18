/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#01213c',
        'secondary': '#3B79C9',
        'tertiary': '#01213c',
        'quaternary': '#01213c',
        'quinary': '#01213c',
      },
      fontFamily: {
        merriweather: ['Merriweather', 'sans-serif'],
        montserratbold: ['Montserrat-Bold', 'sans-serif'],
        montserratreg: ['Montserrat-Regular', 'sans-serif'], 
      },
    },
  },
  plugins: [],
}