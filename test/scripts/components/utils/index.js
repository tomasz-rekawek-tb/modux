'use strict'

import { Component, html } from './../../../../scripts'

const template = require( './template.html' )

const test = require( './test.html' )
const step = require( './step.html' )

export class Utils extends Component {
  get template () {
    return template
  }

  _createStep ( input, promiseExec, promiseResult ) {
    let step = this._createStepElement( html( '<span>' + input + '</span>' ), html( 'running...' ) )
    Promise.all( [ promiseExec(), promiseResult() ] )
      .then( ( values ) => {
        step.querySelector( '.output' ).innerHTML = values[ 0 ]
        if ( values[ 0 ] === values[ 1 ] ) {
          step.querySelector( '.output' ).className = 'output true'
        } else {
          step.querySelector( '.output' ).className = 'output false'
        }
      } )
      .catch( ( err ) => {
        step.querySelector( '.output' ).innerHTML = err.message
        step.querySelector( '.output' ).className = 'output false'
      } )
    return step
  }

  _createStepElement ( htmlTest, htmlOutput ) {
    let tmpl = html( step )
    tmpl.querySelector( '.test' ).appendChild( htmlTest )
    tmpl.querySelector( '.output' ).appendChild( htmlOutput )
    return tmpl
  }

  _createTestElement ( description ) {
    let tmpl = html( test )
    tmpl.querySelector( '.description' ).innerHTML = description
    return tmpl
  }
}
