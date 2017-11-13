'use strict'

const fs = require( 'fs' )
const path = require( 'path' )
const webpack = require( 'webpack' )
const HtmlWebpackPlugin = require( 'html-webpack-plugin' )
const CopyWebpackPlugin = require( 'copy-webpack-plugin' )
const UglifyJSPlugin = require( 'uglifyjs-webpack-plugin' )
const ExtractTextPlugin = require( 'extract-text-webpack-plugin' )

let getFirstApplication = ( dir ) => {
  let all = fs.readdirSync( dir )
  for ( let i = 0; i < all.length; i++ ) {
    let file = path.resolve( dir, all[ i ] )
    let stat = fs.statSync( file )
    if ( stat && stat.isDirectory() ) {
      return file
    }
  }
  return null
}

let apps = getFirstApplication( path.join( __dirname, 'apps' ) )

module.exports = {
  entry: {
    app: [
      path.join( apps, 'app.js' )
    ]
  },
  output: {
    path: path.join( __dirname, 'build' ),
    filename: '[name].min.js'
  },
  devServer: {
    publicPath: '/',
    hot: true,
    inline: true,
    host: '0.0.0.0',
    port: 8080,
    contentBase: path.join( __dirname, '/build' ),
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
        test: new RegExp( '^' + path.join( apps, 'app.scss' ) + '$', 'i' ),
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
      template: path.join( apps, 'app.html' ),
      hash: true
    } ),
    new CopyWebpackPlugin( [
      { from: path.join( apps, '/api' ), to: 'api' },
      { from: path.join( apps, '/images' ), to: 'images' },
      { from: path.join( apps, '/fonts' ), to: 'fonts' },
      { from: path.join( apps, '/sounds' ), to: 'sounds' }
    ] ),
    new webpack.HotModuleReplacementPlugin(),
    new UglifyJSPlugin()
  ]
}
