/* globals window, requestAnimationFrame */

'use strict'

let scrollTo = ( x, y, speed ) => {
  let positionX = window.scrollX
  let positionY = window.scrollY
  speed = speed || 100
  let scroll = () => {
    let limitX = Math.abs( positionX - x )
    let limitY = Math.abs( positionY - y )
    positionX = positionX + ( ( x - positionX ) / Math.abs( x - positionX ) ) * ( limitX * speed / 100 )
    positionY = positionY + ( ( y - positionY ) / Math.abs( y - positionY ) ) * ( limitY * speed / 100 )

    if ( parseInt( positionX ) !== parseInt( x ) && parseInt( positionY ) !== parseInt( y ) ) {
      window.scrollTo( positionX, positionY )
      requestAnimationFrame( scroll )
    }
  }
  scroll()
}

let elementScrollTo = ( element, x, y, speed ) => {
  let positionX = element.scrollLeft
  let positionY = element.scrollTop
  speed = speed || 100
  let scroll = () => {
    let limitX = Math.abs( positionX - x )
    let limitY = Math.abs( positionY - y )
    positionX = positionX + ( ( x - positionX ) / Math.abs( x - positionX ) ) * ( limitX * speed / 100 )
    positionY = positionY + ( ( y - positionY ) / Math.abs( y - positionY ) ) * ( limitY * speed / 100 )

    if ( parseInt( positionX ) !== parseInt( x ) && parseInt( positionY ) !== parseInt( y ) ) {
      element.scrollLeft = positionX
      element.scrollTop = positionY
      requestAnimationFrame( scroll )
    }
  }
  scroll()
}

module.exports = {
  scrollToTop: ( speed ) => {
    scrollTo( 0, 0, speed )
  },
  elementScrollTo: elementScrollTo,
  scrollTo: scrollTo
}
