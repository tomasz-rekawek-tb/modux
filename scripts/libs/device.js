/* globals navigator, window */
'use strict'

import { loop } from './../utils/loop.js'
import { uid } from './../utils/uid.js'

export class Device {
  constructor () {
    const ua = navigator.userAgent || navigator.vendor || window.opera

    let device = 'other'

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
    }

    this._handlerListener = ( handler ) => {
      let orientation = ( window.innerHeight > window.innerWidth ) ? 'portrait' : 'landscape'
      handler( orientation )
    }

    this._handlerResize = () => {
      loop( this._listeners, ( handler ) => {
        this._handlerListener( handler )
      } )
    }
    this._handlerBound = false

    this._device = device
    this._listeners = {}
  }

  onResize ( listener ) {
    let id = uid()
    this._listeners[ id ] = listener
    if ( !this._handlerBound ) {
      window.addEventListener( 'resize', this._handlerResize )
      this._handlerBound = true
    }

    this._handlerListener( listener )

    return () => {
      delete this._listeners[ id ]
      if ( Object.keys( this._listeners ).length === 0 && this._handlerBound ) {
        window.removeEventListener( 'resize', this._handlerResize )
      }
    }
  }

  type () {
    return this._device
  }

  isDesktop () {
    return [ 'Windows', 'Linux', 'Macintosh', 'other' ].indexOf( this._device ) !== -1
  }
  isMobile () {
    [ 'Windows', 'Linux', 'Macintosh', 'other' ].indexOf( this._device ) === -1
  }
}
