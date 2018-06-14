'use strict'

const utils = require( __dirname + '/../utils' )

class Store {
  constructor () {
    this.__listeners = {}
    this.__data = {}
  }

  on ( eventname, listener, showPreviousData ) {
    let id = utils.uid()
    this.__listeners[ id ] = {
      eventname: eventname,
      handler: listener
    }
    if ( showPreviousData && this.__data && this.__data[ eventname ] ) {
      listener( this.__data[ eventname ] )
    }
    return () => {
      delete this.__listeners[ id ]
    }
  }

  emit ( eventname, value ) {
    this.__data[ eventname ] = value
    utils.loop( this.__listeners, ( data ) => {
      if ( data.eventname === eventname ) {
        data.handler( value )
      }
    } )
  }

  create () {
    return new Store()
  }
}

let store = new Store()
module.exports = store
