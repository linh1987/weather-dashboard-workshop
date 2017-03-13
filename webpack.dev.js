const webpackMerge = require('webpack-merge');
const commonConfig = require('./webpack.base.js');

module.exports = webpackMerge(commonConfig, {
    module: {
    rules: [{
      test: /\.js$/,
      exclude: /(node_modules)/,
      use: [{
        loader: 'babel-loader',
        options: {
          presets: [['es2015', {modules: false}]],
          plugins: [
            'syntax-dynamic-import',
          ]
        }
      }]
    }]
  }
});