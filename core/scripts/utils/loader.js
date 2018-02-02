/* globals Image */

'use strict'

function Loader () {
  let cache = {}

  this.preloadImage = ( url ) => {
    let img = new Image()
    return new Promise( ( resolve, reject ) => {
      img.onload = () => {
        cache[ url ] = img
        resolve( cache[ url ] )
      }
      img.onerror = ( err ) => {
        reject( err )
      }
      img.src = url
    } )
  }

  this.preload = ( files, progress, cb ) => {
    let total = Object.keys( files ).length
    let loaded = 0
    let index = 0

    let process = ( err, id, data, loaded, total ) => {
      if ( typeof progress === 'function' ) {
        progress( err, id, data, loaded, total )
      }
      index++
      if ( total === index ) {
        cb( loaded, total )
      }
    }

    if ( total === 0 ) {
      return cb( 0, 0 )
    }

    Object.keys( files ).forEach( ( id ) => {
      let file = files[ id ]
      let loader = this[ 'preload' + file.type.charAt( 0 ).toUpperCase() + file.type.slice( 1 ).toLowerCase() ]
      loader( file.url )
        .then( ( data ) => {
          loaded++
          process( null, id, data, loaded, total )
        } )
        .catch( ( err ) => {
          process( err, id, null, loaded, total )
        } )
    } )
  }
}

module.exports = new Loader()
