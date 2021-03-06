module.exports = {
  env: {
    es2021: true,
    node: true,
  },
  extends: ['eslint:recommended', 'plugin:react/recommended', 'prettier'],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  plugins: ['react', 'react-native'],
  rules: {
    quotes: ['error', 'single'],
    'no-trailing-spaces': ['error', { skipBlankLines: true }],
    'eol-last': ['error', 'always'],

    // allow .js files to contain JSX code
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],

    // prevent eslint to complain about the "styles" variable being used before it was defined
    'no-use-before-define': ['error', { variables: false }],

    // ignore errors for the react-navigation package
    'react/prop-types': ['error', { ignore: ['navigation', 'navigation.navigate'] }],

    'react-hooks/exhaustive-deps': 0,
    'import/no-extraneous-dependencies': 0,
    'global-require': 0,
    'react/no-unescaped-entities': 0,
    'no-nested-ternary': 0,
  },
};
