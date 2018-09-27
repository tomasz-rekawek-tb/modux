'use strict'

const modux = require( './../../../../scripts' )

const Base = require( './index.js' )

class Approx extends Base {
  get name () {
    return 'Approx'
  }

  get features () {
    return [
      {
        description: 'Approx Math.PI with 8 decimals',
        result: () => {
          return Promise.resolve( modux.utils.approx( Math.PI, 8 ) )
        }
      },
      {
        description: 'Approx Math.cos( 34 deg ) with 4 decimals',
        result: () => {
          return Promise.resolve( modux.utils.approx( Math.cos( modux.utils.radians( 34 ) ), 4 ) )
        }
      },
      {
        description: 'Approx Math.sin( 231 deg ) with 2 decimals',
        result: () => {
          return Promise.resolve( modux.utils.approx( Math.cos( modux.utils.radians( 231 ) ), 2 ) )
        }
      }
    ]
  }
}

module.exports = Approx
