const path = require('path');
const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const webpackConfigBase = require('./webpack.config.base.js');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const portfinder = require('portfinder');

const webpackConfigDev = webpackMerge(webpackConfigBase, {
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'style-loader', { loader: 'css-loader', options: { importLoaders: 1 } }, 'postcss-loader',
        ],
      },
    ],
  },
  devServer: {
    contentBase: path.resolve(__dirname, '../dist'),
    port: 8081,
    watchOptions: {
      poll: 1000,
    },
    stats: {
      children: false,
    },
  writeToDisk: true,
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'css/[name].css',
      chunkFilename: 'css/[id].css',
    }),

    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery"
    })
  ],
});

module.exports = new Promise((resolve, reject) => {
  portfinder.basePort = 8081;
  portfinder.getPort((err, port) => {
    if (err) {
      reject(err);
    } else {
      webpackConfigDev.devServer.port = port;
      resolve(webpackConfigDev);
    }
  });
});
