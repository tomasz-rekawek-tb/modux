'use strict'

import { font, html } from './../../../../scripts'

import { Index as Base } from './index.js'

export class FontTest extends Base {
  get name () {
    return 'Font'
  }

  get features () {
    return [
      {
        description: 'Load a specific font',
        result: () => {
          this.element.appendChild( html(
            `
            <style>
            @import url('https://fonts.googleapis.com/css?family=Spirax');
            </style>
            `
          ) )

          return font( 'Spirax' )
            .then( () => {
              return Promise.resolve( 'Demo font Spirax from google fonts, was loaded.' )
            } )
        }
      }
    ]
  }
}
