'use strict'

/**
 * An extenion of Date to DateTime
 */
export class DateTime extends Date {
  /**
   * Return the date and time in the YYYY-mm-DD HH:MM:ss format
   * @return {String}
   */
  toString () {
    return this.toISOString().slice( 0, 19 ).replace( 'T', ' ' )
  }

  /**
   * Returns the date and time in the HH:MM:ss format
   * @return {String}
   */
  toTime () {
    return this.toISOString().slice( 11, 23 )
  }

  /**
   * Returns the date and time in the YYYY-mm-DD format
   * @return {String}
   */
  toDate () {
    return this.toISOString().slice( 0, 10 )
  }

  /**
   * Returns the duration since the start in the XX days HH:MM:ss format
   * @param {Date} start The start date
   * @return {String}
   */
  duration ( start ) {
    let timePassed = this.getTime() - start.getTime()
    let days = Math.floor( timePassed / ( 24 * 60 * 60 * 1000 ) )
    let time = timePassed % ( 24 * 60 * 60 * 1000 )
    return days + ' days ' + ( new DateTime( time ) ).toTime()
  }

  /**
   * Returns the milliseconds since the date was created to now
   * @return {String}
   */
  elapsedTime () {
    return Date.now() - this.getTime()
  }
}
