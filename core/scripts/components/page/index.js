'use strict'

const modux = require( './../../../../index.js' )
const template = require( './template.html' )

class Page extends modux.Component {
  get template () {
    return template
  }
}

module.exports = Page
