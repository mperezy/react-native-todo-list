module.exports = (api) => {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      'inline-dotenv',
      [
        'module-resolver',
        {
          root: ['.'],
          alias: {
            '@assets': './assets',
            '@components': './src/components',
            '@services': './src//services',
          },
        },
      ],
    ],
  };
};
