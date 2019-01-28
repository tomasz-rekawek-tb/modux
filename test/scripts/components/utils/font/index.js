'use strict'

import { font } from './../../../../../scripts'

import { Utils } from './../index.js'

export default class Index extends Utils {
  article1 () {
    let test = this._createTestElement( '<b>font</b> - A function used to load custom fonts' )

    // Step 1
    test.querySelector( '.steps' ).appendChild(
      this._createStep(
        `
          document.head.appendChild( html( '&lt;style&gt;@import url('https://fonts.googleapis.com/css?family=Indie+Flower');&lt;/style&gt;' ) )<br/><br/>
          font( 'Indie Flower' )<br/>
          &nbsp;&nbsp;.then( () => {<br/>
          &nbsp;&nbsp;&nbsp;&nbsp;resolve( 'Font loaded' )<br/>
          &nbsp;&nbsp;} )
        `,
        ( element ) => {
          return new Promise( ( resolve ) => {
            element.innerHTML = `<style>@import url('https://fonts.googleapis.com/css?family=Indie+Flower');</style>`
            font( 'Indie Flower' )
              .then( () => {
                resolve( 'Font loaded' )
              } )
          } )
        },
        () => Promise.resolve( 'Font loaded' )
      )
    )

    // Step 2
    test.querySelector( '.steps' ).appendChild(
      this._createStep(
        `
          font( 'No font', null, null, 10 )<br/>
          &nbsp;&nbsp;.then( () => {<br/>
          &nbsp;&nbsp;&nbsp;&nbsp;resolve( 'Font loaded' )<br/>
          &nbsp;&nbsp;} )<br/>
          &nbsp;&nbsp;.catch( () => {<br/>
          &nbsp;&nbsp;&nbsp;&nbsp;resolve( 'Font not found' )<br/>
          &nbsp;&nbsp;} )
        `,
        () => {
          return new Promise( ( resolve ) => {
            font( 'No font', null, null, 10 )
              .then( () => {
                console.log( 'xxx' )
                resolve( 'Font loaded' )
              } )
              .catch( () => {
                resolve( 'Font not found' )
              } )
          } )
        },
        () => Promise.resolve( 'Font not found' )
      )
    )

    return test
  }

  execute () {
    this.element.appendChild( this.article1() )
  }
}
