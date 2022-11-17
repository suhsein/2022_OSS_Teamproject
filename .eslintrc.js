module.exports = {
  env: {
    es2021: true,
    node: true,
    mocha: true,
  },
  extends: ['airbnb-base'],
  overrides: [
  ],
  parserOptions: {
    ecmaVersion: 'latest',
  },
  rules: {
    //'no-undef': 'off',
    'no-return-assign': 'off',
  },
};