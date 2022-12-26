/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js,jsx}'],
  theme: {
    fontFamily: {
      title: ['Anton-Regular', 'sans-serif'],
      subtitle: ['Cafe24Ssurround'],
      contents: ['Cafe24SsurroundAir'],
    },
    extend: {
      spacing: {
        PCsm: '12px',
        PCmd: '25px',
        base: '45px',
      },
      width: {
        pcContainer: '1200px',
        pcSearchForm: '440px',
      },
    },
  },
  plugins: [],
};
