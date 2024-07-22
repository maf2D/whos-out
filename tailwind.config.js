/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],

  theme: {
    extend: {
      screens: {
        'xs': '475px',
      }
    },

    colors: {

      main: {
        transparent: 'transparent',
        black: '#000F30',
        white: '#FFFFFF',
        primary: '#2C8DFF'
      },

      neutral: {
        'dark-100': '#476887',
        'dark-80': '#6C869F',
        'dark-60': '#91A4B7',
        'light-100': '#D3DFEB',
        'light-60': '#E5ECF3',
        'light-40': '#EDF2F7',
        'light-30': '#F1F5F8',
        'light-20': '#F6F9FB'
      }
    }
  },

  plugins: []
};
