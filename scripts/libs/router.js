/* globals window, history, location */

'use strict'

const utils = require( __dirname + '/../utils' )

let listeners = {}

const handler = function () {
  const url = location.pathname + location.search + location.hash
  utils.logger.info( 'redirecting to', url )

  utils.loop( listeners, ( listener ) => {
    listener( url )
  } )
}

window.addEventListener( 'pageshow', () => { handler() } )
window.addEventListener( 'hashchage', () => { handler() } )
window.addEventListener( 'popstate', () => { handler() } )
history.onpushstate = () => { handler() }

// Create the `pushstate` event
let pushState = history.pushState
history.pushState = function () {
  let next = pushState.apply( history, arguments )
  if ( typeof history.onpushstate === 'function' ) {
    history.onpushstate()
  }
  return next
}

class Router {
  static redirect ( url ) {
    history.pushState( { url: url }, '', url )
  }

  static onStateChange ( listener ) {
    let id = utils.uid()
    listeners[ id ] = listener
    return () => {
      delete listeners[ id ]
    }
  }
}

module.exports = Router
