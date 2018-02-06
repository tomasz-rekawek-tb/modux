'use strict'

const config = require( __dirname + '/libs/config' )
const router = require( __dirname + '/libs/router' )
const store = require( __dirname + '/libs/store' )

const Communication = require( __dirname + '/libs/communication' )
const Component = require( __dirname + '/libs/component' )

const Module = require( __dirname + '/libs/module' )

const utils = require( __dirname + '/utils' )

module.exports = {
  Communication: Communication,
  Component: Component,

  config: config,
  router: router,
  store: store,
  utils: utils,

  Module: Module,

  WEBPACK_CONFIG: require( __dirname + '/../webpack.config.js' )
}
