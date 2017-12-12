'use strict'

const path = require( 'path' )
const webpack = require( 'webpack' )
const HtmlWebpackPlugin = require( 'html-webpack-plugin' )
const CopyWebpackPlugin = require( 'copy-webpack-plugin' )
const UglifyJSPlugin = require( 'uglifyjs-webpack-plugin' )
const ExtractTextPlugin = require( 'extract-text-webpack-plugin' )

module.exports = ( env ) => {
  console.log( 'LOADING APPLICATION: ', env.app )

  let apps = path.join( __dirname, 'apps', env.app )
  let build = path.join( __dirname, 'build', env.app )

  return {
    entry: {
      app: [
        path.join( apps, 'app.js' )
      ]
    },
    output: {
      path: build,
      filename: '[name].min.js'
    },
    devServer: {
      publicPath: '/',
      hot: true,
      inline: true,
      host: '0.0.0.0',
      port: 8080,
      contentBase: build,
      historyApiFallback: true
    },
    resolve: {
      symlinks: false
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
        { context: path.join( apps, '/public' ), from: '**/*', to: build }
      ] ),
      new webpack.HotModuleReplacementPlugin(),
      new UglifyJSPlugin()
    ]
  }
}
