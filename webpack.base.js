
var path = require('path');
var webpack = require('webpack');
var ReplaceHashWebpackPlugin = require('replace-hash-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');


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
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          use: "css-loader",
        }),
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2)$/,
        loader: 'file-loader?name=fonts/[name].[ext]'
      }
    ],
  },

  devtool: 'source-map',

  output: {
    filename: '[name].[hash].js',
    path: path.resolve(__dirname, 'dist')
  },

  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor' // Specify the common bundle's name.
    }),
    new ExtractTextPlugin('styles.css'),
    new HtmlWebpackPlugin({
      template: 'index.html',
      inject: true
    })
  ]
};