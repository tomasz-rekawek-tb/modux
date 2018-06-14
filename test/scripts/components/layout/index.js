'use strict'

const modux = require( './../../../../scripts' )

const template = require( './template.html' )

class Layout extends modux.Component {
  get template () {
    return template
  }
}

module.exports = Layout
