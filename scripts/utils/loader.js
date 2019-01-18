/* globals XMLHttpRequest, Image, Audio */

'use strict'

import { loop } from './loop.js'
import { isObject } from './isobject.js'

class Loader {
  constructor () {
    this._cache = {}
  }

  create () {
    return new Loader()
  }

  preloadImage ( url ) {
    let img = new Image()
    return new Promise( ( resolve, reject ) => {
      img.onload = () => {
        this._cache[ url ] = img
        resolve( this._cache[ url ] )
      }
      img.onerror = ( err ) => {
        reject( err )
      }
      img.src = url
    } )
  }

  preloadAudio ( url ) {
    let audio = new Audio()
    return new Promise( ( resolve, reject ) => {
      audio.addEventListener( 'canplay', () => {
        this._cache[ url ] = audio
        resolve( this._cache[ url ] )
      } )
      audio.onerror = ( err ) => {
        reject( err )
      }
      audio.src = url
    } )
  }

  preloadFile ( url ) {
    let xhr = new XMLHttpRequest()
    return new Promise( ( resolve, reject ) => {
      xhr.open( 'GET', url )
      xhr.onload = () => {
        this._cache[ url ] = url
        resolve( this._cache[ url ] )
      }
      xhr.onerror = ( err ) => {
        reject( err )
      }
      xhr.send()
    } )
  }

  preload ( files, progress ) {
    return new Promise( ( resolve ) => {
      let total = Object.keys( files ).length
      let loaded = 0
      let index = 0

      let process = ( err, id, data, loaded, total ) => {
        if ( typeof progress === 'function' ) {
          progress( err, id, data, loaded, total )
        }
        index++
        if ( total === index ) {
          resolve( total - loaded )
        }
      }

      if ( total === 0 ) {
        return resolve( 0 )
      }

      loop( files, ( file, id ) => {
        let type = 'file'
        let url = file
        if ( isObject( file ) ) {
          type = file.type
          url = file.url
        }
        let loader = this[ 'preload' + type.charAt( 0 ).toUpperCase() + type.slice( 1 ).toLowerCase() ]
        loader.call( this, url )
          .then( ( data ) => {
            loaded++
            process( null, id, data, loaded, total )
          } )
          .catch( ( err ) => {
            process( err, id, null, loaded, total )
          } )
      } )
    } )
  }
}

export let loader = new Loader()
