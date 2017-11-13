/* globals Image */
'use strict'

class Loader {
  preloadImage ( url ) {
    let img = new Image()
    return new Promise( ( resolve, reject ) => {
      img.onload = function () {
        resolve( { obj: img, size: { width: this.width, height: this.height } } )
      }
      img.onerror = function () {
        reject()
      }
      img.src = url
    } )
  }

  preloadImages ( files, cb ) {
    let loaded = {}
    let nototal = Object.keys( files ).length
    if ( nototal === 0 ) {
      cb( nototal, nototal, null, null, null, true, {} )
      return
    }
    let respond = ( key, img, url, result, size ) => {
      loaded[ key ] = { url: url, loaded: result }
      if ( typeof cb === 'function' ) {
        cb( nototal, Object.keys( loaded ).length, key, img, url, result, size )
      }
    }
    Object.keys( files ).forEach( ( key ) => {
      this.preloadImage( files[ key ] )
        .then( ( data ) => {
          respond( key, data.obj, files[ key ], true, data.size )
        } )
        .catch( () => {
          respond( key, null, files[ key ], false, {} )
        } )
    } )
  }
}

module.exports = Loader
