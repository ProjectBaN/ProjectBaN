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
        PCbase: '45px',
      },
      boxShadow: {
        customShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px; ',
        hoverShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px',
      },
      width: {
        pcContainer: '1200px',
        pcSearchForm: '440px',
      },
    },
  },
  plugins: [],
};
