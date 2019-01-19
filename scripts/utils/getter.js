'use strict'

import { isObject } from './isobject.js'

/**
 * Used to return a deep value from an Object. Without any checks.
 */
let getValueFromObject = ( keys, collection ) => {
  let key = keys.shift()

  if ( keys.length === 0 ) {
    return collection[ key ]
  } else {
    if ( isObject( collection[ key ] ) ) {
      return getValueFromObject( keys, collection[ key ] )
    }
  }
}

/**
 * Used to return a deep value from an Object. Use the "." separator to check subobjects
 * @param {String} key The key to check the value for
 * @param {Object} collection The collection to be checked
 * @return {String} Returns the value for the key in the collection
 */
export let getter = ( key, collection ) => {
  if ( typeof key === 'string' && isObject( collection ) ) {
    if ( key === '' ) {
      return collection
    }
    return getValueFromObject( key.split( '.' ), collection )
  }
}
