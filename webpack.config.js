
var path = require('path');
var webpack = require('webpack');
var ReplaceHashWebpackPlugin = require('replace-hash-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
  	'main': './weather/app.js',
    'vendor': ['inferno', 'redux', 'redux-thunk']
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
    new webpack.optimize.CommonsChunkPlugin({
                name: 'vendor' // Specify the common bundle's name.
            }),
    new HtmlWebpackPlugin({
    	template: 'index.html',
    	inject: true
    }),
  ]
};