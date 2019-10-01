const path = require('path');

module.exports = {
  resolve: {
    alias: {
      '@xcritical/xc-sidebar': path.join(__dirname, '../src/'),
      '@xcritical/xc-theme': path.join(__dirname, '../../xc-theme/src/'),
    },
    extensions: [".ts", ".tsx"],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: {
          loader: 'ts-loader',
        },
        // enforce: 'pre',
        exclude: [
          path.resolve(__dirname, '..' ,'node_modules'),
        ]
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
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
};
