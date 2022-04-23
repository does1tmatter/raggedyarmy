module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        redish: {
          DEFAULT: '#760F0F',
          50: '#E95353',
          100: '#E74141',
          200: '#E21D1D',
          300: '#BE1818',
          400: '#9A1414',
          500: '#760F0F',
          600: '#440909',
          700: '#120202',
          800: '#000000',
          900: '#000000'
        },
        sunflower: {
          DEFAULT: '#E9C822',
          50: '#FAF2C9',
          100: '#F8EDB6',
          200: '#F4E491',
          300: '#F0DA6C',
          400: '#EDD147',
          500: '#E9C822',
          600: '#C0A313',
          700: '#8D780E',
          800: '#5A4C09',
          900: '#272104'
        }
      },
      fontFamily: {
        bitter: 'Bitter'
      }
    },
  },
  plugins: [],
}