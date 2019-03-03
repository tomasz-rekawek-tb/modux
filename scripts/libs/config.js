'use strict'

import { getter } from './../utils/getter.js'
import { setter } from './../utils/setter.js'

/**
 * Class holding static configuration
 */
class Config {
  /**
   * Creates an instance of Config
   * @param {Object} defaults The default configuration for the current instance
   */
  constructor ( defaults ) {
    /**
     * Contains all the configuration data
     * @type {Object}
     * @private
     */
    this.__configuration = defaults || {}
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
   * @param {Object} defaults The default configuration for the current instance
   * @return { Config }
   */
  create ( defaults ) {
    return new Config( defaults )
  }
}

/**
 * Instance of Config to be used as singleton
 */
export let config = new Config()
