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

    .addDependency( 'utils-approx', require( './components/utils/approx' ) )
    .addDependency( 'utils-font', require( './components/utils/font' ) )
    .addDependency( 'utils-loader', require( './components/utils/loader' ) )
    .addDependency( 'utils-radians', require( './components/utils/radians' ) )
    .addDependency( 'utils-sounds', require( './components/utils/sounds' ) )

  // Start application
  app.bootstrap( document.querySelector( 'body' ), 'layout' )
}

window.addEventListener( 'load', () => {
  initialize()
} )
