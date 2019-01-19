/* globals document, Audio */

'use strict'

import { loop } from './loop.js'

class Sound {
  constructor ( audio ) {
    this.__audio = audio
    this.__enabled = false
    this.__looped = false

    audio.addEventListener( 'ended', () => {
      audio.currentTime = 0
      if ( this.__looped ) {
        audio.play()
      }
    } )
  }

  enabled ( enabled ) {
    this.__enabled = enabled
  }

  volume ( volume ) {
    this.__audio.volume = volume
  }

  play () {
    if ( !this.__enabled ) {
      return Promise.resolve()
    }

    let result = this.__audio.play()

    // Old browsers don't return a promise for play(), so we create one
    if ( !( result instanceof Promise ) ) {
      return Promise.resolve()
    }

    return result
  }

  pause () {
    if ( !this.__audio.paused ) {
      this.__audio.pause()
    }
    return Promise.resolve()
  }

  mute ( mute ) {
    this.__audio.muted = mute
  }

  loop ( looped ) {
    this.__looped = looped
  }
}

class Sounds {
  constructor () {
    this.__collection = {}
    this.__enabled = false
  }

  create () {
    return new Sounds()
  }

  init () {
    return new Promise( ( resolve, reject ) => {
      let audio = new Audio( 'data:audio/mp3;base64,SUQzBAAAAAAAI1RTU0UAAAAPAAADTGF2ZjU2LjM2LjEwMAAAAAAAAAAAAAAA//OEAAAAAAAAAAAAAAAAAAAAAAAASW5mbwAAAA8AAAAEAAABIADAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV6urq6urq6urq6urq6urq6urq6urq6urq6v////////////////////////////////8AAAAATGF2YzU2LjQxAAAAAAAAAAAAAAAAJAAAAAAAAAAAASDs90hvAAAAAAAAAAAAAAAAAAAA//MUZAAAAAGkAAAAAAAAA0gAAAAATEFN//MUZAMAAAGkAAAAAAAAA0gAAAAARTMu//MUZAYAAAGkAAAAAAAAA0gAAAAAOTku//MUZAkAAAGkAAAAAAAAA0gAAAAANVVV' )

      let result = audio.play()
      if ( !( result instanceof Promise ) ) {
        resolve( false )
        return
      }

      let unlock = () => {
        audio.play()
          .then( () => {
            document.body.removeEventListener( 'click', unlock )
            // Enabled
            this.enable( true )
            resolve( this )
          } )
          .catch( ( reason ) => {
            reject( reason )
          } )
      }

      result
        .then( () => {
          // Enabled
          this.enable( true )
          resolve( this )
        } )
        .catch( () => {
          document.body.addEventListener( 'click', unlock, false )
          // Disabled
          this.enable( false )
        } )
    } )
  }

  enable ( enable ) {
    this.__enabled = enable

    loop( this.__collection, ( sound ) => {
      sound.enabled( enable )
    } )
  }

  mute ( mute ) {
    loop( this.__collection, ( sound ) => {
      sound.muted = mute
    } )
  }

  add ( name, audio ) {
    if ( typeof audio === 'string' ) {
      audio = new Audio( audio )
    }
    this.__collection[ name ] = new Sound( audio )
    this.__collection[ name ].enabled( this.__enabled )
    return this.__collection[ name ]
  }

  get ( name ) {
    return this.__collection[ name ]
  }
}

export let sounds = new Sounds()

