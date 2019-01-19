'use strict'

/**
 * The debug variable
 * @type {Boolean=false}
 * @private
 */
let debug = false
/**
 * The id variable
 * @type {id=[ APP ]}
 * @private
 */
let id = '[ APP ]'

/**
 * A wrapper for window.console
 */
export let logger = {

  /**
   * Used to give an identifier to the output
   * @param {String} value The identifier to appear before every output
   */
  setId: ( value ) => {
    id = value
  },

  /**
   * Enable or disable the console output
   * @param {Boolean=false} [enabled] Use true if you want the output to appear
   */
  enabled: ( enabled ) => {
    debug = enabled
  },

  /**
   * Wrapper for console.log
   */
  log: function () {
    if ( debug ) {
      try {
        console.log.apply( this, [ id, ...arguments ] )
      } catch ( e ) {}
    }
  },

  /**
   * Wrapper for console.info
   */
  info: function () {
    if ( debug ) {
      try {
        console.info.apply( this, [ id, ...arguments ] )
      } catch ( e ) {}
    }
  },

  /**
   * Wrapper for console.warn
   */
  warn: function () {
    if ( debug ) {
      try {
        console.warn.apply( this, [ id, ...arguments ] )
      } catch ( e ) {}
    }
  },

  /**
   * Wrapper for console.error
   */
  error: function () {
    if ( debug ) {
      try {
        console.error.apply( this, [ id, ...arguments ] )
      } catch ( e ) {}
    }
  }
}
