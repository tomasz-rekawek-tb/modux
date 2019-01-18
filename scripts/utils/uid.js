'use strict'

let cache = 0
let lastReset = Date.now()

export const uid = () => {
  if ( lastReset !== Date.now() ) {
    cache = 0
    lastReset = Date.now()
  }
  cache++
  return Date.now() + '' + cache
}
