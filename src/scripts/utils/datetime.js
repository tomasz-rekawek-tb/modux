'use strict'

class DateTime extends Date {
  toString () {
    return this.toISOString().slice( 0, 19 ).replace( 'T', ' ' )
  }

  toTime () {
    return this.toISOString().slice( 11, 23 )
  }

  toDate () {
    return this.toISOString().slice( 0, 10 )
  }
}

module.exports = DateTime
