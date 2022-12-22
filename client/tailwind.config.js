/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js,jsx}'],
  theme: {
    extend: {
      spacing: {
        sm: '12px',
        md: '18px',
        lg: '22px',
      },
      width: {
        pcContainer: '1200px',
        pcSearchForm: '440px',
      },
    },
  },
  plugins: [],
};
