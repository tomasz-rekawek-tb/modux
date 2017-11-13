/* globals window, document */

'use strict'

const utils = require( __dirname + '/../utils' )

class State {
  constructor ( pattern, parts, views ) {
    this.__pattern = new RegExp( pattern, 'i' )
    this.__parts = parts
    this.__views = views

    this.__components = {}
    this.__loaded = false

    this.params = {}
  }

  destroy () {
    let promises = []
    this.params = {}
    utils.loop( this.__components, ( component ) => {
      promises.push( component.destroy() )
    } )
    this.__components = {}
    return Promise.all( promises )
      .then( () => {
        this.__loaded = false
      } )
  }

  isValid ( url ) {
    if ( url.match( this.__pattern ) ) {
      return true
    }
    return false
  }

  parseParams ( url ) {
    // Create parameters
    this.params = {}
    utils.loop( this.__parts, ( param, index ) => {
      this.params[ param ] = url.replace( this.__pattern, '$' + index + 1 )
    } )
  }

  load ( url ) {
    let promises = []
    if ( !this.isLoaded() && this.isValid( url ) ) {
      // Create components for all views
      utils.loop( this.__views, ( Component, name ) => {
        let html = document.querySelector( '*[data-view-' + name + ']' )
        if ( html ) {
          this.__components[ name ] = new Component( html )
          promises.push( this.__components[ name ].render() )
        }
      } )
    }
    return Promise.all( promises )
      .then( () => {
        this.__loaded = true
      } )
  }

  isLoaded () {
    return this.__loaded
  }
}

class StatesFactory {
  constructor ( states ) {
    this.__states = []
    utils.loop( states, ( state ) => {
      this.__states.push( new State( state.pattern || '', state.parts || {}, state.views || {} ) )
    } )
  }

  destroy () {
    let promises = []
    utils.loop( this.__states, ( state ) => {
      promises.push( state.destroy() )
    } )
    return Promise.all( promises )
  }

  loadStates ( url ) {
    let load = []
    let states = []
    let unload = []
    for ( let i = 0; i < this.__states.length; i++ ) {
      let state = this.__states[ i ]
      if ( state.isValid( url ) ) {
        if ( !state.isLoaded() ) {
          load.push( state.load( url ) )
        }
        state.parseParams( url )
        states.push( state )
      } else if ( !state.isValid( url ) && state.isLoaded() ) {
        unload.push( state.destroy() )
      }
    }
    return Promise.all( unload )
      .then( () => {
        return Promise.all( load )
      } )
      .then( () => {
        return states
      } )
  }
}

class Router {
  static onStateChange ( listener ) {
    this.__listeners = this.__listeners || {}
    let id = utils.uid()
    this.__listeners[ id ] = listener
    return () => {
      delete this.__listeners[ id ]
    }
  }

  static states ( states ) {
    let unload = new Promise( ( resolve, reject ) => {
      if ( this.__states ) {
        this.__states.destroy()
          .then( resolve )
          .catch( reject )
      } else {
        resolve()
      }
    } )
    return unload.then( () => {
      this.__states = new StatesFactory( states )
    } )
  }

  static redirect ( url ) {
    return new Promise( ( resolve, reject ) => {
      this.__states.loadStates( url )
        .then( ( states ) => {
          utils.logger.info( 'redirecting to', url )
          if ( states.length > 0 ) {
            window.history.pushState( { url: url }, '', url )
            utils.loop( this.__listeners, ( listener ) => {
              listener( states )
            } )
            resolve( true )
          } else {
            resolve( false )
          }
        } )
        .catch( reject )
    } )
  }
}

// Capture all redirects
document.addEventListener( 'click', ( e ) => {
  let url = e.target.getAttribute( 'href' )
  if ( e.target && url ) {
    Router.redirect( url )
      .then( ( internal ) => {
        if ( !internal ) {
          window.location = url
        }
      } )
      .catch( ( err ) => {
        throw err
      } )
    e.preventDefault()
  }
} )

module.exports = Router
