'use strict'

import { Component, loop } from './../../../../scripts'

import Approx from './../utils/approx'
import Cookie from './../utils/cookie'
import DateTime from './../utils/datetime'
import Extend from './../utils/extend'
import Font from './../utils/font'
import Getter from './../utils/getter'
import Html from './../utils/html'
import Isnumber from './../utils/isnumber'
import Isobject from './../utils/isobject'
import Loader from './../utils/loader'

const dependencies = {
  approx: Approx,
  cookie: Cookie,
  datetime: DateTime,
  extend: Extend,
  font: Font,
  getter: Getter,
  html: Html,
  isnumber: Isnumber,
  isobject: Isobject,
  loader: Loader
}

const template = require( './template.html' )

export class Layout extends Component {
  get template () {
    return template
  }

  loadComponent ( name ) {
    if ( !dependencies[ name ] ) {
      return
    }

    let container = this.element.querySelector( '.container' )

    this.config.get( 'app' ).addDependency( name, dependencies[ name ] )
    container.innerHTML = '<section data-modux-component="' + name + '"></section>'
    setTimeout( () => {
      this.config.get( 'app' ).removeDependency( name )
    } )
  }

  stateChange ( url ) {
    // Update active menu
    loop( this.element.querySelectorAll( 'nav .menu-item' ), ( item ) => {
      if ( url === item.getAttribute( 'href' ) ) {
        item.classList.add( 'active' )
      } else {
        item.classList.remove( 'active' )
      }
    } )
    this.loadComponent( url.substr( 1 ) )
  }
}
