'use strict'

const path = require( 'path' )
const webpack = require( 'webpack' )
const HtmlWebpackPlugin = require( 'html-webpack-plugin' )
const CopyWebpackPlugin = require( 'copy-webpack-plugin' )
const UglifyJSPlugin = require( 'uglifyjs-webpack-plugin' )
const ExtractTextPlugin = require( 'extract-text-webpack-plugin' )

module.exports = () => {
  let prod = false
  if ( process.env.NODE_ENV === 'production' ) {
    prod = true
  }

  let apps = process.cwd()
  let build = path.join( process.cwd(), 'build' )

  console.log( 'LOADING APPLICATION - ' + ( ( prod ) ? 'PRODUCTION' : 'DEVELOPMENT' ) )

  let plugins = [
    new ExtractTextPlugin( '[name].css' ),
    new HtmlWebpackPlugin( {
      template: path.join( apps, 'app.html' ),
      inject: false,
      hash: false // Set to true in order to prevent css and js caching
    } ),
    new CopyWebpackPlugin( [
      { context: path.join( apps, 'public' ), from: '**/*', to: build }
    ] ),
    new webpack.DefinePlugin( { 'PRODUCTION': prod } ),
    new webpack.HotModuleReplacementPlugin()
  ]

  if ( prod ) {
    plugins.push( new UglifyJSPlugin() )
  }

  return {
    mode: ( prod ) ? 'production' : 'development',

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
      rules: [
        {
          test: /\.js$/,
          // exclude: [ /node_modules/ ],
          use: [
            {
              loader: 'babel-loader',
              options: {
                presets: [
                  'env'
                ],
                'plugins': [
                  [ 'transform-es2015-classes', { 'loose': true } ]
                ]
              }
            }
          ]
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
                minimize: !!( prod )
              }
            },
            {
              loader: 'sass-loader',
              options: {
                data: '@import "' + path.join( __dirname, 'styles', 'index.scss' ) + '";'
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
                  minimize: !!( prod )
                }
              },
              {
                loader: 'sass-loader',
                options: {
                  data: '@import "' + path.join( __dirname, 'styles', 'index.scss' ) + '";'
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
    plugins: plugins
  }
}
