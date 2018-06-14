/* globals window, document */

'use strict'

const modux = require( './../../scripts' )

let initialize = () => {
  modux.config.set( 'core', window.config )

  modux.utils.logger.enabled( modux.config.get( 'core.debug' ) )

  modux.utils.logger.info( 'Application start' )

  // Create application
  let app = new modux.Module( 'app' )
  app
    .addDependency( 'layout', require( './components/layout' ) )

    // Start application
  app.bootstrap( document.querySelector( 'body' ), 'layout' )
}

window.addEventListener( 'load', () => {
  // modux.utils.polyfill().then( () => {
  initialize()
  // } )
} )
