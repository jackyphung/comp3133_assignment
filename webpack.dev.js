const { resolve } = require('path');
const merge = require('webpack-merge');
const common = require('./webpack.config.js');

module.exports = merge(common, {
  mode: 'development',
  devtool: 'cheap-module-source-map',
  devServer: {
    hot: true,
    inline: true,
    overlay: true,
    contentBase: resolve(__dirname, './client/public/'), //serve your static files from here
    watchContentBase: true,
    proxy: [ // allows redirect of requests to webpack-dev-server to another destination
      {
        context: [ 
          '/api/**', 
        ],  // can have multiple
        target: 'http://localhost:8000', //server and port to redirect to
        secure: false //don't use https
      }
    ],
    port: 3030, // port webpack-dev-server listens to, defaults to 8080
    overlay: { // Shows a full-screen overlay in the browser when there are compiler errors or warnings
      warnings: false, // defaults to false
      errors: false, // defaults to false
    },
    historyApiFallback: {
      true: true,
      index: "index.html"
    },
  },
});