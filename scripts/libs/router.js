/* globals window, history, location */

'use strict'

import { logger } from './../utils/logger.js'
import { loop } from './../utils/loop.js'
import { uid } from './../utils/uid.js'

let listeners = {}

const handler = function () {
  const url = location.pathname + location.search + location.hash
  logger.info( 'redirecting to', url )

  loop( listeners, ( listener ) => {
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

export class Router {
  static redirect ( url ) {
    history.pushState( { url: url }, '', url )
  }

  static onStateChange ( listener ) {
    let id = uid()
    listeners[ id ] = listener
    return () => {
      delete listeners[ id ]
    }
  }
}
