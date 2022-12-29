/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js,jsx}'],
  variants: {
    extend: {
      backgroundColor: ['checked'],
      borderColor: ['checked'],
    },
  },
  theme: {
    screens: {
      xs: '540px',
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
        PcSm: '12px',
        PcMd: '25px',
        PcBase: '45px',
        MbSm: '10px',
        MbMedium: '25px',
        MbBase: '40px',
      },
      maxWidth: {
        signUpContainer: '480px',
      },
      boxShadow: {
        customShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px; ',
        hoverShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px',
      },
      width: {
        PcContainer: '1200px',
        mbContainer: '768px',
        PcSearchForm: '440px',
        MbSearchForm: '320px',
        Mb1SearchForm: '800px',
        signUpContainer: '480px',
      },
      backgroundImage: {
        'hero-pattern':
          "url('data:image/png;base64,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')",
        'footer-texture': "url('/img/footer-texture.png')",
      },
    },
  },
  plugins: [],
};
