/* globals window, requestAnimationFrame */

'use strict'

import { approx } from './approx.js'

let scrollTo = ( x, y, speed ) => {
  let positionX = window.scrollX
  let positionY = window.scrollY
  speed = speed || 100
  let scroll = () => {
    let limitX = Math.abs( positionX - x )
    let limitY = Math.abs( positionY - y )
    positionX = approx( positionX + ( ( x - positionX ) / Math.abs( x - positionX ) ) * ( limitX * speed / 100 ), 2 )
    positionY = approx( positionY + ( ( y - positionY ) / Math.abs( y - positionY ) ) * ( limitY * speed / 100 ), 2 )

    if ( Math.abs( parseInt( positionX ) - parseInt( x ) ) > 1 || Math.abs( parseInt( positionY ) - parseInt( y ) ) > 1 ) {
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
    positionX = approx( positionX + ( ( x - positionX ) / Math.abs( x - positionX ) ) * ( limitX * speed / 100 ), 2 )
    positionY = approx( positionY + ( ( y - positionY ) / Math.abs( y - positionY ) ) * ( limitY * speed / 100 ), 2 )

    if ( Math.abs( parseInt( positionX ) - parseInt( x ) ) > 1 || Math.abs( parseInt( positionY ) - parseInt( y ) ) > 1 ) {
      element.scrollLeft = positionX
      element.scrollTop = positionY
      requestAnimationFrame( scroll )
    }
  }
  scroll()
}

export let scroll = {
  scrollToTop: ( speed ) => {
    scrollTo( 0, 0, speed )
  },
  elementScrollTo: elementScrollTo,
  scrollTo: scrollTo
}
