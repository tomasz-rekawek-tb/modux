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

  duration ( start ) {
    let timePassed = this.getTime() - start.getTime()
    let days = Math.floor( timePassed / ( 24 * 60 * 60 * 1000 ) )
    let time = timePassed % ( 24 * 60 * 60 * 1000 )
    return days + ' days ' + ( new DateTime( time ) ).toTime()
  }
}

module.exports = DateTime
