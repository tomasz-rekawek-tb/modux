'use strict'

import { loop } from './../utils/loop.js'
import { uid } from './../utils/uid.js'

class Store {
  constructor () {
    this.__listeners = {}
    this.__data = {}
  }

  on ( eventname, listener, showPreviousData ) {
    let id = uid()
    this.__listeners[ id ] = {
      eventname: eventname,
      handler: listener
    }
    if ( showPreviousData && this.__data && this.__data[ eventname ] !== undefined ) {
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
    loop( this.__listeners, ( data ) => {
      if ( data.eventname === eventname ) {
        data.handler.apply( data.handler, values )
      }
    } )
  }

  create () {
    return new Store()
  }
}

export let store = new Store()
