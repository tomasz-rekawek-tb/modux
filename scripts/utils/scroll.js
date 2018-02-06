/* globals window, document, requestAnimationFrame */

'use strict'

let scrollToTop = ( position, speed ) => {
  position = position || window.scrollY
  speed = speed || 100
  let scroll = () => {
    let limit = Math.max( document.body.scrollHeight, document.body.offsetHeight, document.documentElement.clientHeight, document.documentElement.scrollHeight, document.documentElement.offsetHeight )
    if ( position > 0 ) {
      position -= limit * speed / 100
      window.scrollTo( 0, position )
      requestAnimationFrame( scroll )
    }
  }
  scroll()
}

module.exports = {
  scrollToTop: scrollToTop
}
