'use strict'

const isObject = require( __dirname + '/isobject' )

module.exports = ( collection, cb ) => {
  if ( isObject( collection ) ) {
    for ( let i = 0, k = Object.keys( collection ), l = k.length; i < l; i++ ) {
      cb( collection[ k[ i ] ], k[ i ] )
    }
    return
  }
  if ( Array.isArray( collection ) ) {
    for ( let i = 0, l = collection.length; i < l; i++ ) {
      cb( collection[ i ], i )
    }
    return
  }
}
