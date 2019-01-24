'use strict'

import { Component } from './../../../../scripts'

const template = require( './template.html' )

export class Layout extends Component {
  get template () {
    return template
  }

  onResize ( width, height ) {
    console.log( 'Layout size: ', width, ' x ', height )
  }

  stateChange ( url ) {
    let container = this.element.querySelector( '.container' )

    switch ( url ) {
      case '/approx':
        container.innerHTML = '<div>approx</div>'
        break
      case '/cookie':
        container.innerHTML = '<div>cookie</div>'
        break
    }
  }
}
