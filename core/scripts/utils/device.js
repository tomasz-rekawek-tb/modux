/* globals navigator, window */

'use strict'

module.exports = () => {
  const ua = navigator.userAgent || navigator.vendor || window.opera
  let device

  // get device
  if ( ua.match( /(iPhone)/ ) ) {
    device = 'iPhone'
  } else if ( ua.match( /(iPad)/ ) ) {
    device = 'iPad'
  } else if ( ua.match( /(iPod)/ ) ) {
    device = 'iPod'
  } else if ( ua.match( /(BlackBerry|BB10)/ ) ) {
    device = 'BlackBerry'
  } else if ( ua.match( /(IEMobile|windows phone)/ ) ) {
    device = 'WindowsMobile'
  } else if ( ua.match( /(Android)/ ) ) {
    device = 'Android'
  } else if ( ua.match( /(Macintosh)/ ) ) {
    device = 'Macintosh'
  } else if ( ua.match( /(Windows)/ ) ) {
    device = 'Windows'
  } else if ( ua.match( /(Linux)/ ) ) {
    device = 'Linux'
  } else {
    device = 'other'
  }

  return {
    type: () => device,
    isDesktop: () => [ 'Windows', 'Linux', 'Macintosh', 'other' ].indexOf( device ) !== -1,
    isMobile: () => [ 'Windows', 'Linux', 'Macintosh', 'other' ].indexOf( device ) === -1
  }
}
