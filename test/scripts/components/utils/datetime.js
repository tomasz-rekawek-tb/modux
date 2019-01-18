'use strict'

import { DateTime } from './../../../../scripts'

import { Index as Base } from './index.js'

export class DateTimeTest extends Base {
  get name () {
    return 'DateTime'
  }

  get features () {
    let now = new DateTime()
    return [
      {
        description: 'DateTime current date toString()',
        result: () => {
          return Promise.resolve( now.toString() )
        }
      },
      {
        description: 'DateTime current date toTime()',
        result: () => {
          return Promise.resolve( now.toTime() )
        }
      },
      {
        description: 'DateTime current date toDate()',
        result: () => {
          return Promise.resolve( now.toDate() )
        }
      },
      {
        description: 'DateTime current date duration( start ) after one second',
        result: () => {
          return new Promise( ( resolve ) => {
            setTimeout( () => {
              let datetime = new DateTime()
              resolve( datetime.duration( now ) )
            }, 1000 )
          } )
        }
      },
      {
        description: 'DateTime current date elapsedTime() since the datetime class was instanced',
        result: () => {
          return new Promise( ( resolve ) => {
            setTimeout( () => {
              resolve( now.elapsedTime() )
            }, 1000 )
          } )
        }
      }
    ]
  }
}
