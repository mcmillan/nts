module.exports = {
  extends: 'airbnb',
  rules: {
    // This linting rule forces files with JSX in to have a .jsx extension,
    // however React Native isn't a fan of that – we have to use .js.
    'react/jsx-filename-extension': 'off'
  },
};
