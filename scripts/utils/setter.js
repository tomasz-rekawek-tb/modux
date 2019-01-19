'use strict'

import { isObject } from './isobject.js'

/**
 * Used to set a deep value from an Object. Without any checks.
 */
let setValueForObject = ( keys, value, collection ) => {
  let key = keys.shift()

  if ( keys.length === 0 ) {
    collection[ key ] = value
  } else {
    if ( !isObject( collection[ key ] ) ) {
      collection[ key ] = {}
    }
    setValueForObject( keys, value, collection[ key ] )
  }
}

/**
 * Used to set a deep value from an Object
 * @param {String} key The key to set the value for
 * @param {String} value The values to be set
 * @param {Object} collection The collection to be added to
 */
export let setter = ( key, value, collection ) => {
  if ( typeof key === 'string' && isObject( collection ) ) {
    if ( key === '' ) {
      collection = value
      return
    }
    setValueForObject( key.split( '.' ), value, collection )
  }
}
