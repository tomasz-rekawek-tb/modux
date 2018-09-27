'use strict'

const modux = require( './../../../../scripts' )

const Base = require( './index.js' )

class Font extends Base {
  get name () {
    return 'Font'
  }

  get features () {
    return [
      {
        description: 'Load a specific font',
        result: () => {
          this.element.appendChild( modux.utils.html(
            `
            <style>
            @import url('https://fonts.googleapis.com/css?family=Spirax');
            </style>
            `
          ) )

          return modux.utils.font( 'Spirax' )
            .then( () => {
              return Promise.resolve( 'Demo font Spirax from google fonts, was loaded.' )
            } )
        }
      }
    ]
  }
}

module.exports = Font
