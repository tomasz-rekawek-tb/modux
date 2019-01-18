'use strict'

import { getter } from './../utils/getter.js'
import { setter } from './../utils/setter.js'

class Config {
  constructor () {
    this.configuration = {}
  }

  set ( key, value ) {
    setter( key, value, this.configuration )
    return this
  }
  get ( key ) {
    return getter( key || '', this.configuration )
  }

  create () {
    return new Config()
  }
}

export let config = new Config()
