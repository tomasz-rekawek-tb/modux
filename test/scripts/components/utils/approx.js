'use strict'

import { approx, radians } from './../../../../scripts'

import { Index as Base } from './index.js'

export class ApproxTest extends Base {
  get name () {
    return 'Approx'
  }

  get features () {
    return [
      {
        description: 'Approx Math.PI with 8 decimals',
        result: () => {
          return Promise.resolve( approx( Math.PI, 8 ) )
        }
      },
      {
        description: 'Approx Math.cos( 34 deg ) with 4 decimals',
        result: () => {
          return Promise.resolve( approx( Math.cos( radians( 34 ) ), 4 ) )
        }
      },
      {
        description: 'Approx Math.sin( 231 deg ) with 2 decimals',
        result: () => {
          return Promise.resolve( approx( Math.cos( radians( 231 ) ), 2 ) )
        }
      }
    ]
  }
}
