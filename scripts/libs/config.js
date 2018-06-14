'use strict'

const utils = require( __dirname + '/../utils' )

class Config {
  constructor () {
    this.configuration = {}
  }

  set ( key, value ) {
    utils.setter( key, value, this.configuration )
    return this
  }
  get ( key ) {
    return utils.getter( key || '', this.configuration )
  }

  create () {
    return new Config()
  }
}

let config = new Config()
module.exports = config
