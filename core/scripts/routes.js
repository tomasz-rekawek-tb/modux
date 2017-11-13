'use strict'

const Page = require( './components/page' )

module.exports = [
  {
    name: 'home',
    pattern: '^.*$',
    views: {
      default: Page
    }
  }
]
