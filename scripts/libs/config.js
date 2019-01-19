'use strict'

import { getter } from './../utils/getter.js'
import { setter } from './../utils/setter.js'

/**
 * Class holding static configuration
 */
class Config {
  /**
   * Creates an instance of Config
   */
  constructor () {
    /**
     * Contains all the configuration data
     * @type {Object}
     * @private
     */
    this.__configuration = {}
  }

  /**
   * Sets data in configuration
   * @param {String} key You can use sub data by concatenating strings with '.', eg: employee.name.firstname
   * @param {*} value The value of the property
   * @return { this }
   */
  set ( key, value ) {
    setter( key, value, this.__configuration )
    return this
  }

  /**
   * Gets data from configuration
   * @param {*} key You can use sub data by concatenating strings with '.', eg: employee.name.firstname
   */
  get ( key ) {
    return getter( key || '', this.__configuration )
  }

  /**
   * Returns an instance of Config
   * @return { Config }
   */
  create () {
    return new Config()
  }
}

/**
 * Instance of Config to be used as singleton
 */
export let config = new Config()
