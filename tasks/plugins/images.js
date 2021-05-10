const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = (env) => {
  const defaultConfig = new CopyWebpackPlugin({
    patterns: [{ from: './src/assets/images', to: 'images', noErrorOnMissing: true }]
  });

  const plugin = {
    production: defaultConfig,
    development: defaultConfig
  };

  return plugin[env];
};
