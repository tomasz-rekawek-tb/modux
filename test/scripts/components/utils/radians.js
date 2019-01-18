'use strict'

import { radians } from './../../../../scripts'

import { Index as Base } from './index.js'

export class RadiansTest extends Base {
  get name () {
    return 'Radians'
  }

  get features () {
    return [
      {
        description: '270 deg to radians',
        result: () => {
          return Promise.resolve( radians( 270 ) )
        }
      },
      {
        description: '180 deg to radians',
        result: () => {
          return Promise.resolve( radians( 180 ) )
        }
      },
      {
        description: '0 deg to radians',
        result: () => {
          return Promise.resolve( radians( 0 ) )
        }
      }
    ]
  }
}
