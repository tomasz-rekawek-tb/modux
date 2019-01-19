/* globals window, requestAnimationFrame */

'use strict'

import { approx } from './approx.js'

/**
 * Scroll window to position
 * @param {Number} x The x position
 * @param {Number} y The y position
 * @param {Number} speed The scroll speed
 */
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

/**
 * Scrolls an element to position
 * @param {HTMLElement} element
 * @param {Number} x The x position
 * @param {Number} y The y position
 * @param {Number} speed The scroll speed
 */
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

/**
 * A library used for scrolling window or an element
 */
export let scroll = {
  scrollToTop: ( speed ) => {
    scrollTo( 0, 0, speed )
  },
  elementScrollTo: elementScrollTo,
  scrollTo: scrollTo
}
