'use strict'

const utils = require( __dirname + '/../utils' )

class Store {
  static on ( eventname, listener, showPreviousData ) {
    this.__listeners = this.__listeners || {}
    let id = utils.uid()
    this.__listeners[ id ] = {
      eventname: eventname,
      handler: listener
    }
    if ( showPreviousData && this.__data && this.__data[ eventname ] ) {
      listener( this.__data )
    }
    return () => {
      delete this.__listeners[ id ]
    }
  }

  static emit ( eventname, value ) {
    this.__data = this.__data || {}
    this.__data[ eventname ] = value
    utils.loop( this.__listeners, ( data ) => {
      if ( data.eventname === eventname ) {
        data.handler( value )
      }
    } )
  }
}

module.exports = Store
