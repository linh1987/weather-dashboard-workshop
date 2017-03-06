
var path = require('path');
var ReplaceHashWebpackPlugin = require('replace-hash-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
  	'main': './weather/app.js'
  },

  module: {
    rules: [
      {
        test: /\.js?$/,
        loader: "babel-loader"
      }
    ],
  },


  output: {
    filename: '[name].[hash].js',
    path: path.resolve(__dirname, 'dist')
  },

  plugins: [
    new HtmlWebpackPlugin({
    	template: 'index.html',
    	inject: true
    })
  ]
};