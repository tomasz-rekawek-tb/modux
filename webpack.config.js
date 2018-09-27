'use strict'

const path = require( 'path' )
const webpack = require( 'webpack' )
const HtmlWebpackPlugin = require( 'html-webpack-plugin' )
const CopyWebpackPlugin = require( 'copy-webpack-plugin' )
const UglifyJSPlugin = require( 'uglifyjs-webpack-plugin' )
const MiniCssExtractPlugin = require( 'mini-css-extract-plugin' )

module.exports = () => {
  let prod = false
  if ( process.env.NODE_ENV === 'production' ) {
    prod = true
  }
  prod = true

  let apps = process.cwd()
  let build = path.join( process.cwd(), 'build' )

  console.log( 'LOADING APPLICATION - ' + ( ( prod ) ? 'PRODUCTION' : 'DEVELOPMENT' ) )

  let plugins = [
    new MiniCssExtractPlugin( { filename: '[name].css' } ),
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
      historyApiFallback: true,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': 'true',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization, Content-Length, X-Requested-With',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS'
      },
      before: ( app ) => {
        // Allow all requests
        app.post( '*', ( req, res ) => {
          res.redirect( req.originalUrl )
        } )
        app.put( '*', ( req, res ) => {
          res.redirect( req.originalUrl )
        } )
        app.delete( '*', ( req, res ) => {
          res.redirect( req.originalUrl )
        } )
        app.options( '*', ( req, res ) => {
          res.redirect( req.originalUrl )
        } )
      }
    },
    resolve: {
      symlinks: false
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          use: [
            {
              loader: 'babel-loader',
              options: {
                presets: [
                  '@babel/preset-env'
                ]
              }
            }
          ]
        },
        {
          test: /\.inline\.scss$/,
          use: [
            {
              loader: 'style-loader/useable'
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
          use: [
            {
              loader: MiniCssExtractPlugin.loader
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
          test: /\.(html)$/i,
          loader: 'raw-loader'
        },
        {
          test: /\.(frag)$/i,
          loader: 'raw-loader'
        }
      ]
    },
    plugins: plugins,
    performance: {
      hints: ( prod ) ? false : 'warning'
    }
  }
}
