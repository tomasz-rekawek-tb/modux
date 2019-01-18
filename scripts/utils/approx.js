'use strict'

export let approx = ( num, decimals ) => {
  return Number.parseFloat( num ).toFixed( decimals )
}
