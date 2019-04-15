const { resolve } = require('path');
const merge = require('webpack-merge');
const common = require('./webpack.config.js');

module.exports(common, {
  mode: 'production',
});