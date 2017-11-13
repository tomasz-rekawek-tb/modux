'use strict'

const webpack = require( 'webpack' )
const HtmlWebpackPlugin = require( 'html-webpack-plugin' )
const CopyWebpackPlugin = require( 'copy-webpack-plugin' )
const UglifyJSPlugin = require( 'uglifyjs-webpack-plugin' )
const ExtractTextPlugin = require( 'extract-text-webpack-plugin' )

module.exports = {
  entry: {
    app: [
      './core/index.js'
    ]
  },
  output: {
    path: __dirname + '/build',
    filename: '[name].min.js'
  },
  devServer: {
    publicPath: '/',
    hot: true,
    inline: true,
    host: '0.0.0.0',
    port: 8080,
    contentBase: __dirname + '/build',
    historyApiFallback: true
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: [ 'env' ]
        }
      },
      {
        test: /core\/styles\/index\.scss$|core\/styles\/index\.scss$/,
        use: ExtractTextPlugin.extract( {
          use: [
            {
              loader: 'css-loader',
              options: {
                url: false
              }
            },
            'sass-loader'
          ]
        } )
      },
      {
        test: /\.(html)$/i,
        loader: 'raw-loader'
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin( 'app.css' ),
    new HtmlWebpackPlugin( {
      template: './core/index.html',
      hash: true
    } ),
    new CopyWebpackPlugin( [
      { from: 'core/api', to: 'api' },
      { from: 'core/images', to: 'images' },
      { from: 'core/fonts', to: 'fonts' },
      { from: 'core/sounds', to: 'sounds' }
    ] ),
    new webpack.HotModuleReplacementPlugin(),
    new UglifyJSPlugin()
  ]
}
