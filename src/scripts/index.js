'use strict'

module.exports = {
  utils: require( __dirname + '/utils' ),
  Router: require( __dirname + '/libs/router' ),
  Config: require( __dirname + '/libs/config' ),
  Store: require( __dirname + '/libs/store' ),
  Component: require( __dirname + '/libs/component' ),
  Communication: require( __dirname + '/libs/communication' ),
  webpack: require( __dirname + '/../../webpack.config' )
}
