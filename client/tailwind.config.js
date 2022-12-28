/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js,jsx}'],
  theme: {
    screens: {
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px',
    },
    fontFamily: {
      title: ['Anton-Regular', 'sans-serif'],
      subtitle: ['Cafe24Ssurround'],
      contents: ['Cafe24SsurroundAir'],
    },
    color: {
      black: '#000000',
      darkGray: '#474747',
    },
    extend: {
      spacing: {
        HeaderMarginBottomSpace: '-8px',
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
