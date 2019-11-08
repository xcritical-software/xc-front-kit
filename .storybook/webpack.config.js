const path = require('path');

module.exports = {
  resolve: {
    extensions: [".ts", ".tsx"],
  },
  devtool: 'source-map', 
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: {
          loader: 'ts-loader',
        },
        // enforce: 'pre',
        exclude(modulePath) {
          return /node_modules/.test(modulePath) &&
            !/xcritical/.test(modulePath)
         },
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
