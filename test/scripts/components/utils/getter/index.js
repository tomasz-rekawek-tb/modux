'use strict'

import { getter, html } from './../../../../../scripts'

import { Utils } from './../index.js'

export default class Index extends Utils {
  article1 () {
    let test = this._createTestElement( '<b>getter</b> - Used to retrieve deep properties from an object' )

    // Step 1
    test.querySelector( '.steps' ).appendChild(
      this._createStep(
        `
        let o = {<br/>
        &nbsp;&nbsp;a: 'a',<br/>
        &nbsp;&nbsp;b: 'b',<br/>
        &nbsp;&nbsp;c: {<br/>
        &nbsp;&nbsp;&nbsp;&nbsp;a: 'Correct output',<br/>
        &nbsp;&nbsp;&nbsp;&nbsp;b: 'b'<br/>
        &nbsp;&nbsp;}<br/>
        }<br/>
        return getter( 'c.a', o )
        `,
        () => new Promise( ( resolve ) => {
          let o = {
            a: 'a',
            b: 'b',
            c: {
              a: 'Correct output',
              b: 'b'
            }
          }
          resolve( getter( 'c.a', o ) )
        } ),
        () => Promise.resolve( 'Correct output' )
      )
    )

    // Step 2
    test.querySelector( '.steps' ).appendChild(
      this._createStep(
        `
        let o = {<br/>
        &nbsp;&nbsp;a: 'a',<br/>
        &nbsp;&nbsp;b: 'b',<br/>
        &nbsp;&nbsp;c: {<br/>
        &nbsp;&nbsp;&nbsp;&nbsp;a: 'Correct output',<br/>
        &nbsp;&nbsp;&nbsp;&nbsp;b: 'b'<br/>
        &nbsp;&nbsp;}<br/>
        }<br/>
        return JSON.stringify( getter( 'c', o ) )
        `,
        () => new Promise( ( resolve ) => {
          let o = {
            a: 'a',
            b: 'b',
            c: {
              a: 'Correct output',
              b: 'b'
            }
          }
          resolve( JSON.stringify( getter( 'c', o ) ) )
        } ),
        () => Promise.resolve( JSON.stringify( { 'a': 'Correct output', 'b': 'b' } ) )
      )
    )

    // Step 3
    test.querySelector( '.steps' ).appendChild(
      this._createStep(
        `
        let o = {<br/>
        &nbsp;&nbsp;a: 'a',<br/>
        &nbsp;&nbsp;b: 'b',<br/>
        &nbsp;&nbsp;c: {<br/>
        &nbsp;&nbsp;&nbsp;&nbsp;a: 'Correct output',<br/>
        &nbsp;&nbsp;&nbsp;&nbsp;b: 'b'<br/>
        &nbsp;&nbsp;}<br/>
        }<br/>
        return JSON.stringify( getter( '', o ) )
        `,
        () => new Promise( ( resolve ) => {
          let o = {
            a: 'a',
            b: 'b',
            c: {
              a: 'Correct output',
              b: 'b'
            }
          }
          resolve( JSON.stringify( getter( '', o ) ) )
        } ),
        () => Promise.resolve( JSON.stringify( {
          a: 'a',
          b: 'b',
          c: {
            a: 'Correct output',
            b: 'b'
          }
        } ) )
      )
    )

    return test
  }

  article2 () {
    let test = this._createTestElement( 'Test for yourself in the section below' )

    // Step 1
    let input = html( require( './test.html' ) )
    let output = html( '<span></span>' )

    input.querySelector( '.button-test' ).addEventListener( 'click', () => {
      let object = input.querySelector( '.input-test-object' ).value
      let query = input.querySelector( '.input-test-query' ).value
      try {
        output.innerHTML = JSON.stringify( getter( query, JSON.parse( object ) ) )
      } catch ( e ) {
        output.innerHTML = e.message
      }
    } )

    let step = this._createStepElement( input, output )
    test.querySelector( '.steps' ).appendChild( step )

    return test
  }

  execute () {
    this.element.appendChild( this.article1() )
    this.element.appendChild( this.article2() )
  }
}
