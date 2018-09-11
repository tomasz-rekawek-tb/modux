'use strict'

module.exports = ( num, decimals ) => {
  let power = Math.pow( 10, decimals )
  return Math.floor( num * power ) / power
}
