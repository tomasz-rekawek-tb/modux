/* global window, document */

'use strict'

const modux = require( './../../index.js' )

const routes = require( './routes' )

const Page = require( './components/page' )

let initialize = () => {
  modux.Config.set( 'core', window.config || {} )

  modux.utils.logger.enabled( modux.Config.get( 'core.debug' ) )

  modux.utils.logger.info( 'Application start' )

  modux.Router.states( routes )
  let page = new Page( document.querySelector( 'body' ) )
  page.render()
    .then( () => {
      return modux.Router.redirect( window.location.pathname + window.location.search + window.location.hash )
    } )
    .catch( ( err ) => {
      throw err
    } )
}

window.onpageshow = ( event ) => {
  if ( event.persisted ) {
    modux.utils.logger.warn( 'Reloading...' )
    window.location.reload()
  }
}

window.addEventListener( 'load', () => {
  initialize()
} )
