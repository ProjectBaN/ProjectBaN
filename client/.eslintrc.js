module.exports = {
  root: true,
  env: {
    browser: true,
    es6: true,
  },
  extends: ['plugin:import/errors', 'plugin:import/warnings', 'plugin:prettier/recommended', 'prettier/react'],
  parserOptions: {
    ecmaVersion: 2018,
  },
  rules: {},
};
