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
    if ( debug ) {
      try {
        console.log.apply( this, [ id, ...arguments ] )
      } catch ( e ) {}
    }
  },

  info: function () {
    if ( debug ) {
      try {
        console.info.apply( this, [ id, ...arguments ] )
      } catch ( e ) {}
    }
  },

  warn: function () {
    if ( debug ) {
      try {
        console.warn.apply( this, [ id, ...arguments ] )
      } catch ( e ) {}
    }
  },

  error: function () {
    if ( debug ) {
      try {
        console.error.apply( this, [ id, ...arguments ] )
      } catch ( e ) {}
    }
  }
}
