'use strict'

import { logger } from './../../../../../scripts'

import { Utils } from './../index.js'

export default class Index extends Utils {
  article1 () {
    let test = this._createTestElement( '<b>logger</b> - A console wrapper to customize output to console' )

    // Step 1
    test.querySelector( '.steps' ).appendChild(
      this._createStep(
        `
          logger.enabled( true )<br/>
          logger.setId( '[ TEST ]' )<br/>
          logger.log( 'output' )
        `,
        () => {
          return new Promise( ( resolve ) => {
            logger.enabled( true )
            logger.setId( '[ TEST ]' )
            logger.log( 'output' )
            resolve( '[ TEST ] output' )
          } )
        },
        () => Promise.resolve( '[ TEST ] output' )
      )
    )

    // Step 2
    test.querySelector( '.steps' ).appendChild(
      this._createStep(
        `
          logger.enabled( true )<br/>
          logger.setId( '[ TEST ]' )<br/>
          logger.warn( 'output' )
        `,
        () => {
          return new Promise( ( resolve ) => {
            logger.enabled( true )
            logger.setId( '[ TEST ]' )
            logger.warn( 'output' )
            resolve( '[ TEST ] output' )
          } )
        },
        () => Promise.resolve( '[ TEST ] output' )
      )
    )

    // Step 3
    test.querySelector( '.steps' ).appendChild(
      this._createStep(
        `
          logger.enabled( true )<br/>
          logger.setId( '[ TEST ]' )<br/>
          logger.error( 'output' )
        `,
        () => {
          return new Promise( ( resolve ) => {
            logger.enabled( true )
            logger.setId( '[ TEST ]' )
            logger.error( 'output' )
            resolve( '[ TEST ] output' )
          } )
        },
        () => Promise.resolve( '[ TEST ] output' )
      )
    )

    // Step 4
    test.querySelector( '.steps' ).appendChild(
      this._createStep(
        `
          logger.enabled( false )<br/>
          logger.log( 'output' )
        `,
        () => {
          return new Promise( ( resolve ) => {
            logger.enabled( false )
            logger.log( 'output' )
            resolve( 'nothing should be displayed' )
          } )
        },
        () => Promise.resolve( 'nothing should be displayed' )
      )
    )

    return test
  }

  execute () {
    this.element.appendChild( this.article1() )
  }
}
