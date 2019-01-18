'use strict'

import { isObject } from './isobject.js'

export let extend = ( o1, o2 ) => {
  if ( isObject( o1 ) && isObject( o2 ) ) {
    let keys = Object.keys( Object.assign( {}, o1, o2 ) )
    for ( let i = 0; i < keys.length; i++ ) {
      o1[ keys[i] ] = extend( o1[ keys[ i ] ], o2[ keys[ i ] ] )
    }
  } else if ( o2 !== undefined ) {
    return o2
  }
  return o1
}
