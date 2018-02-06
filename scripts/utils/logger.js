'use strict'

let debug = false
let id = '[ APP ]'

module.exports = {

  setId: ( value ) => {
    id = value
  },

  enabled: ( enabled ) => {
    debug = enabled
  },

  log: function () {
    if ( debug && console ) {
      console.log.apply( this, [ id, ...arguments ] )
    }
  },

  info: function () {
    if ( debug && console ) {
      console.info.apply( this, [ id, ...arguments ] )
    }
  },

  warn: function () {
    if ( debug && console ) {
      console.warn.apply( this, [ id, ...arguments ] )
    }
  },

  error: function () {
    if ( debug && console ) {
      console.error.apply( this, [ id, ...arguments ] )
    }
  }
}
