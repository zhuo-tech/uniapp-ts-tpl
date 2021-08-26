// eslint-disable-next-line no-undef
module.exports = {
  root: true,
  parserOptions: {
    ecmaVersion: 2020
  },
  env: {
    browser: true,
    node: true,
    es6: true
  },
  plugins: ['@typescript-eslint'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:vue/recommended',
    '@vue/typescript/recommended',
    'plugin:prettier/recommended'
  ],
  globals: {
    uni: true,
    plus: true,
    uniCloud: true,
    wx: true,
    TcPlayer: true,
    WeixinJSBridge: true,
    weex: true
  },
  rules: {
    'vue/name-property-casing': ['error', 'PascalCase'],
    'vue/no-v-html': 'off',
    'vue/no-unused-components': [
      2,
      {
        ignoreWhenBindingPresent: true
      }
    ],
    'vue/script-setup-uses-vars': 'off',
    'no-mixed-spaces-and-tabs': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    'prettier/prettier': [
      'error',
      { singleQuote: true, semi: false, htmlWhitespaceSensitivity: 'ignore' }
    ]
  }
}
