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
      listener.apply( listener, this.__data[ eventname ] )
    }
    return () => {
      delete this.__listeners[ id ]
    }
  }

  emit () {
    let values = Array.prototype.slice.call( arguments )
    let eventname = values.shift()

    this.__data[ eventname ] = values
    utils.loop( this.__listeners, ( data ) => {
      if ( data.eventname === eventname ) {
        data.handler.apply( data.handler, values )
      }
    } )
  }

  create () {
    return new Store()
  }
}

let store = new Store()
module.exports = store
