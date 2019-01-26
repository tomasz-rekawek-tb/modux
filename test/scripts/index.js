/* globals window, document */

'use strict'

import { Module, config, logger } from './../../scripts'

import { Layout } from './components/layout'

let initialize = () => {
  config.set( 'core', window.config )

  logger.enabled( config.get( 'core.debug' ) )

  logger.info( 'Application start' )

  // Create application
  let app = new Module( 'app' )
  app
    .addDependency( 'layout', Layout )

  app.__config.set( 'app', app )

  // Start application
  app.bootstrap( document.querySelector( 'body' ), 'layout' )
}

window.addEventListener( 'load', () => {
  initialize()
} )
