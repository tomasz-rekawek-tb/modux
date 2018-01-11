/* globals Image */

'use strict'

function Loader () {
  let cache = {}

  this.preloadImage = ( url ) => {
    let img = new Image()
    return new Promise( ( resolve, reject ) => {
      img.onload = function () {
        cache[ url ] = { image: img, width: this.width, height: this.height }
        resolve( cache[ url ] )
      }
      img.onerror = function ( err ) {
        reject( err )
      }
      img.src = url
    } )
  }

  this.preload = ( files, progress, cb ) => {
    let total = Object.keys( files ).length
    let loaded = 0
    let index = 0

    let process = ( err, data, loaded, total ) => {
      if ( typeof progress === 'function' ) {
        progress( err, data, loaded, total )
      }
      index++
      if ( total === index ) {
        cb( loaded, total )
      }
    }

    if ( total === 0 ) {
      return cb( 0, 0 )
    }

    Object.keys( files ).forEach( ( url ) => {
      let type = files[ url ]
      let loader = this['preload' + type.charAt( 0 ).toUpperCase() + type.slice( 1 ).toLowerCase() ]
      loader( url )
        .then( ( data ) => {
          loaded++
          process( null, data, loaded, total )
        } )
        .catch( ( err ) => {
          process( err, null, loaded, total )
        } )
    } )
  }
}

module.exports = new Loader()
