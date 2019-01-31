'use strict'

import { setter, html } from './../../../../../scripts'

import { Utils } from './../index.js'

export default class Index extends Utils {
  article1 () {
    let test = this._createTestElement( '<b>setter</b> - Used to set deep properties from an object' )

    // Step 1
    test.querySelector( '.steps' ).appendChild(
      this._createStep(
        `
        let o = {<br/>
        &nbsp;&nbsp;a: 'a',<br/>
        &nbsp;&nbsp;b: 'b',<br/>
        &nbsp;&nbsp;c: {<br/>
        &nbsp;&nbsp;&nbsp;&nbsp;a: 'Incorrect output',<br/>
        &nbsp;&nbsp;&nbsp;&nbsp;b: 'b'<br/>
        &nbsp;&nbsp;}<br/>
        }<br/>
        setter( 'c.a', 'Correct output', o )<br/>
        resolve( o.c.a )
      `,
        () => new Promise( ( resolve ) => {
          let o = {
            a: 'a',
            b: 'b',
            c: {
              a: 'Incorrect output',
              b: 'b'
            }
          }
          setter( 'c.a', 'Correct output', o )
          resolve( o.c.a )
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
        &nbsp;&nbsp;&nbsp;&nbsp;a: 'Incorrect output',<br/>
        &nbsp;&nbsp;&nbsp;&nbsp;b: 'b'<br/>
        &nbsp;&nbsp;}<br/>
        }<br/>
        setter( 'c', 'Correct output', o )<br/>
        resolve( o.c )
      `,
        () => new Promise( ( resolve ) => {
          let o = {
            a: 'a',
            b: 'b',
            c: {
              a: 'Incorrect output',
              b: 'b'
            }
          }
          setter( 'c', 'Correct output', o )
          resolve( o.c )
        } ),
        () => Promise.resolve( 'Correct output' )
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
        &nbsp;&nbsp;&nbsp;&nbsp;a: 'Incorrect output',<br/>
        &nbsp;&nbsp;&nbsp;&nbsp;b: 'b'<br/>
        &nbsp;&nbsp;}<br/>
        }<br/>
        setter( 'd.a', 'Correct output', o )<br/>
        resolve( o.d.a )
      `,
        () => new Promise( ( resolve ) => {
          let o = {
            a: 'a',
            b: 'b',
            c: {
              a: 'Incorrect output',
              b: 'b'
            }
          }
          setter( 'd.a', 'Correct output', o )
          resolve( o.d.a )
        } ),
        () => Promise.resolve( 'Correct output' )
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
      let value = input.querySelector( '.input-test-value' ).value
      try {
        let o = JSON.parse( object )
        setter( query, value, o )
        output.innerHTML = JSON.stringify( o )
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
