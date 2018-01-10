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
          test: /\.inline\.scss$/,
          use: [
            {
              loader: 'style-loader/useable',
              options: {
                attrs: {
                  id: '[name]'
                }
              }
            },
            {
              loader: 'css-loader',
              options: {
                url: false,
                minimize: true
              }
            },
            {
              loader: 'sass-loader',
              options: {
                data: '@import "' + path.join( __dirname, 'core', 'styles', 'index.scss' ) + '";'
              }
            }
          ]
        },
        {
          test: /^((?!\.inline).)*\.scss$/,
          use: ExtractTextPlugin.extract( {
            use: [
              {
                loader: 'css-loader',
                options: {
                  url: false,
                  minimize: true
                }
              },
              {
                loader: 'sass-loader',
                options: {
                  data: '@import "' + path.join( __dirname, 'core', 'styles', 'index.scss' ) + '";'
                }
              }
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
      new webpack.DefinePlugin( {
        'MODUX': '\'' + path.join( __dirname, 'core', 'scripts' ) + '\''
      } ),
      new ExtractTextPlugin( '[name].css' ),
      new HtmlWebpackPlugin( {
        template: path.join( apps, 'app.html' ),
        inject: false,
        hash: false // Set to true in order to prevent css and js caching
      } ),
      new CopyWebpackPlugin( [
        { context: path.join( apps, 'public' ), from: '**/*', to: build }
      ] ),
      new webpack.HotModuleReplacementPlugin(),
      new UglifyJSPlugin()
    ]
  }
}
