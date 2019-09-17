const path = require('path');
const CSSModuleLoader = {
  loader: 'css-loader',
  options: {
    modules: true,
    sourceMap: true,
    localIdentName: '[local]__[hash:base64:5]',
  },
};

module.exports = {
  resolve: {
    alias: {
      '@xcritical/xc-sidebar': path.join(__dirname, '../src/'),
    },
  },
  module: {
    rules: [
      {
        test: /\.stories\.jsx?$/,
        loaders: [require.resolve('@storybook/addon-storysource/loader')],
        enforce: 'pre',
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 1,
            },
          },
        ],
      },
      {
        test: /\.scss$/,
        use: ['style-loader', CSSModuleLoader],
      },
    ],
  },
};
