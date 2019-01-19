'use strict'

/**
 * Loop through a collection Object or Array. Return false from callback to cancel the loop
 * @param {Object|Array} collection The collection to loop through
 * @param {Function} cb The callback which is called for every element in collection
 */
export let loop = ( collection, cb ) => {
  if ( collection ) {
    for ( let i = 0, k = Object.keys( collection ), l = k.length; i < l; i++ ) {
      let result = cb( collection[ k[ i ] ], Array.isArray( collection ) ? parseInt( k[ i ] ) : k[ i ] )
      if ( result === false ) {
        break
      }
    }
    return
  }
}
