module.exports = {
  env: {
    browser: true,
    node: true,
    es2021: true,

  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
    'airbnb-base',
  ],
  overrides: [
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: [
    'react',
  ],
  rules: {
    'no-underscore-dangle': ['error', { allow: ['_id'] }],
  },
};
