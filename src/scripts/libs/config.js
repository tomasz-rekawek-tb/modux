'use strict'

const utils = require( __dirname + '/../utils' )

let configuration = {}

module.exports = {
  set: ( key, value ) => {
    utils.setter( key, value, configuration )
    return this
  },
  get: ( key ) => {
    return utils.getter( key, configuration )
  }
}
