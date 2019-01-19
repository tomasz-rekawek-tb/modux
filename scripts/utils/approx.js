'use strict'

/**
 * Used to approximate a number to a certain number of decimals
 * @param {Numeric} num The number to be approximated
 * @param {Numeric} decimals The number of decimals to approximate to
 * @return {String} A new number
 */
export let approx = ( num, decimals ) => {
  return Number.parseFloat( num ).toFixed( decimals )
}
