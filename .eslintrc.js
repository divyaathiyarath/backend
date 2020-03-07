module.exports = {
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
      sourceType: 'module',
  },
  env: {
      browser: true,
  },
  // https://github.com/feross/standard/blob/master/RULES.md#javascript-standard-style
  extends: ['standard'],
  plugins: ['prettier'],
  // add your custom rules here
  rules: {
      // allow paren-less arrow functions
      /* eslint-disable eol-last */
      indent: ["error", 4, { "SwitchCase": 1 }],
      'camelcase': 1,
      'comma-style': 1,
      'semi': [2, "always"],
      'arrow-parens': 0,
      // allow async-await
      'generator-star-spacing': 0,
      // allow debugger during development
      'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
      //'prettier/prettier': 'error',
  },
};