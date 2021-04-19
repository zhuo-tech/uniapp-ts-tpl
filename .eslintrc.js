// eslint-disable-next-line no-undef
module.exports = {
  root: true,
  // parser: 'babel-eslint',
  // parser: '@typescript-eslint/parser',
  parserOptions: {
    // parser: 'babel-eslint',
    // sourceType: 'module',
    ecmaVersion: 2020
  },
  env: {
    browser: true,
    node: true,
    es6: true
  },
  plugins: [
    '@typescript-eslint',
  ],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:vue/recommended',
    '@vue/typescript/recommended',
    // 'plugin:vue/recommended'
  ],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off'
  }
};
