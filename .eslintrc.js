module.exports = {
  extends: 'airbnb',
  parser: 'babel-eslint',
  rules: {
    // This linting rule forces files with JSX in to have a .jsx extension,
    // however React Native isn't a fan of that – we have to use .js.
    'react/jsx-filename-extension': 'off',

    // The following rules are just dumb
    'react/sort-comp': 'off',
    'class-methods-use-this': 'off',
  },
  plugins: [
    'react-native',
  ],
};
