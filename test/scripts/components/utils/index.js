'use strict'

import { Component, loop, html } from './../../../../scripts'

const template = require( './template.html' )

export class Index extends Component {
  get template () {
    return template
  }

  get name () {
    return 'Utils'
  }

  get features () {
    return []
  }

  createFeature ( description, index ) {
    return html( '<li><b>Step ' + index + ':</b> ' + description + '<div class="output"></div></li>' )
  }

  execute () {
    let title = this.element.querySelector( '.title' )
    let details = this.element.querySelector( '.details' )

    details.style.display = 'none'

    title.addEventListener( 'click', () => {
      if ( details.style.display === 'none' ) {
        details.style.display = 'block'
      } else {
        details.style.display = 'none'
      }
    } )

    title.querySelector( '.text' ).innerHTML = this.name

    let features = this.element.querySelector( '.features' )

    let processed = 0
    let allGood = true
    let checkStatus = () => {
      if ( processed === this.features.length ) {
        if ( allGood ) {
          title.querySelector( '.status' ).classList.add( 'success' )
        } else {
          title.querySelector( '.status' ).classList.add( 'error' )
        }
      }
    }

    loop( this.features, ( feature, index ) => {
      let e = this.createFeature( feature.description, index + 1 )
      features.appendChild( e )

      feature.result()
        .then( ( success ) => {
          e.classList.add( 'success' )
          e.classList.remove( 'error' )
          e.querySelector( '.output' ).innerHTML = '' + success || ''
          processed++
          checkStatus()
        } )
        .catch( ( err ) => {
          e.classList.add( 'error' )
          e.classList.remove( 'success' )
          e.querySelector( '.output' ).innerHTML = '' + err || ''
          allGood = false
          processed++
          checkStatus()
        } )
    } )
  }
}
