'use strict'

const modux = require( './../../../../scripts' )

const Base = require( './index.js' )

class Radians extends Base {
  get name () {
    return 'Radians'
  }

  get features () {
    return [
      {
        description: '270 deg to radians',
        result: () => {
          return Promise.resolve( modux.utils.radians( 270 ) )
        }
      },
      {
        description: '180 deg to radians',
        result: () => {
          return Promise.resolve( modux.utils.radians( 180 ) )
        }
      },
      {
        description: '0 deg to radians',
        result: () => {
          return Promise.resolve( modux.utils.radians( 0 ) )
        }
      }
    ]
  }
}

module.exports = Radians
