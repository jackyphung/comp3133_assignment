// webpack.config.js
const { resolve } = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin')
const ErrorOverlayPlugin = require('error-overlay-webpack-plugin');

module.exports = {
  entry: {
    'bundle': [
      'babel-polyfill',
      './client/src/index.js',
    ],
    "bundle.min": [
      'babel-polyfill',
      './client/src/index.js',
    ]
  },
  output: {
    path: resolve(__dirname, './client/public/'),
    filename: '[name].js',
    publicPath: '/'
  },
  resolve: {
    extensions: [".js", ".jsx"]
  },
  module: {
    rules: [{
      test: /.js(x)?$/,
      loader: "babel-loader",
      include: resolve(__dirname, './client'),
      exclude: /node_modules/,
      options: {
        presets: ['es2015', 'react', 'stage-1'],
        plugins: [
          ["module-resolver", {
            "root": ["./client/src/components"],
            "alias": {
              "assets": "./client/public/assets",
              "services": "./client/src/services",
              "models": "./client/src/models"
            }
          }],
          ["react-hot-loader/babel"]
        ]
      }
    },
    {
      test: /\.css$/,
      loader: "style-loader!css-loader"
    }]
  },
  plugins: [
    new ErrorOverlayPlugin(),
    new HtmlWebpackPlugin({
      title: "ArtXperience",
      template: "./client/public/index.html",
      inject: false,
      hash: true
    })
  ],
  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin({
      parallel: true,
      terserOptions: {
        ecma: 6,
      },
    }),]
  },
}