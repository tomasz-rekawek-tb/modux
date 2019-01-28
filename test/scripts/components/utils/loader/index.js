'use strict'

import { loader } from './../../../../../scripts'

import { Utils } from './../index.js'

export default class Index extends Utils {
  article1 () {
    let test = this._createTestElement( '<b>loader</b> - Loader class, used to preload files' )

    // Step 1
    test.querySelector( '.steps' ).appendChild(
      this._createStep(
        `
        const resources = loader.create()<br/>
        resources.preload( {<br/>
        &nbsp;&nbsp;image: {<br/>
        &nbsp;&nbsp;&nbsp;&nbsp;type: 'image',<br/>
        &nbsp;&nbsp;&nbsp;&nbsp;url: '/image1.png'<br/>
        &nbsp;&nbsp;}<br/>
        } )<br/>
        &nbsp;&nbsp;.then( () => {<br/>
        &nbsp;&nbsp;&nbsp;&nbsp;resolve( 'File loaded "/image.png"' )<br/>
        &nbsp;&nbsp;} )
        `,
        () => {
          const resources = loader.create()
          return new Promise( ( resolve ) => {
            resources.preload( {
              image: {
                type: 'image',
                url: '/image1.png'
              }
            } )
              .then( () => {
                resolve( 'File loaded "/image1.png"' )
              } )
          } )
        },
        () => Promise.resolve( 'File loaded "/image1.png"' )
      )
    )

    // Step 2
    test.querySelector( '.steps' ).appendChild(
      this._createStep(
        `
        const resources = loader.create()<br/>
        resources.preload( {<br/>
        &nbsp;&nbsp;image2: { type: 'image', url: '/image2.png' },<br/>
        &nbsp;&nbsp;audio: { type: 'audio', url: '/audio.wav' }<br/>
        } )<br/>
        &nbsp;&nbsp;.then( () => {<br/>
        &nbsp;&nbsp;&nbsp;&nbsp;resolve( 'Files loaded.' )<br/>
        &nbsp;&nbsp;} )
        `,
        () => {
          const resources = loader.create()
          return new Promise( ( resolve ) => {
            resources.preload( {
              image2: { type: 'image', url: '/image2.png' },
              audio: { type: 'audio', url: '/audio.wav' }
            } )
              .then( () => {
                resolve( 'Files loaded.' )
              } )
          } )
        },
        () => Promise.resolve( 'Files loaded.' )
      )
    )

    // Step 3
    test.querySelector( '.steps' ).appendChild(
      this._createStep(
        `
        const resources = loader.create()<br/>
        let output = []<br/>
        resources.preload( {<br/>
        &nbsp;&nbsp;image2: { type: 'image', url: '/image2.png' },<br/>
        &nbsp;&nbsp;image3: { type: 'image', url: '/image3.png' },<br/>
        &nbsp;&nbsp;audio: { type: 'audio', url: '/audio.wav' }<br/>
        }, ( err, id, data, loaded, total ) => {<br/>
        &nbsp;&nbsp;output.push( { err: err, id: id, loaded: loaded, total: total } )<br/>
        } )<br/>
        &nbsp;&nbsp;.then( () => {<br/>
        &nbsp;&nbsp;&nbsp;&nbsp;resolve( JSON.stringify( output, null, 4 ) )<br/>
        &nbsp;&nbsp;} )
        `,
        () => {
          const resources = loader.create()
          return new Promise( ( resolve ) => {
            let output = []
            resources.preload( {
              image2: { type: 'image', url: '/image2.png' },
              image3: { type: 'image', url: '/image3.png' },
              audio: { type: 'audio', url: '/audio.wav' }
            }, ( err, id, data, loaded, total ) => {
              output.push( { err: err, id: id, loaded: loaded, total: total } )
            } )
              .then( () => {
                resolve( JSON.stringify( output, null, 4 ) )
              } )
          } )
        },
        () => Promise.resolve( JSON.stringify( [
          { err: null, id: 'image2', loaded: 1, total: 3 },
          { err: null, id: 'image3', loaded: 2, total: 3 },
          { err: null, id: 'audio', loaded: 3, total: 3 }
        ], null, 4 ) )
      )
    )

    return test
  }

  // article2 () {
  //   let test = this._createTestElement( 'Test for yourself in the section below' )

  //   // Step 1
  //   let input = html( require( './test.html' ) )
  //   let output = html( '<span></span>' )

  //   input.querySelector( '.button-test' ).addEventListener( 'click', () => {
  //     let value = input.querySelector( '.input-test-value' ).value
  //     try {
  //       output.innerHTML = isObject( JSON.parse( value ) )
  //     } catch ( e ) {
  //       output.innerHTML = e.message
  //     }
  //   } )

  //   let step = this._createStepElement( input, output )
  //   test.querySelector( '.steps' ).appendChild( step )

  //   return test
  // }

  execute () {
    this.element.appendChild( this.article1() )
    // this.element.appendChild( this.article2() )
  }
}
