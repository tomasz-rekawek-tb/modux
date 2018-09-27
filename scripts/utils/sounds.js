/* globals document, Audio */

'use strict'

const loop = require( './loop' )

class Sound {
  constructor ( audio ) {
    this._audio = audio
    this._enabled = false
    this._looped = false

    audio.addEventListener( 'ended', () => {
      audio.currentTime = 0
      if ( this._looped ) {
        audio.play()
      }
    } )
  }

  enabled ( enabled ) {
    this._enabled = enabled
  }

  volume ( volume ) {
    this._audio.volume = volume
  }

  play () {
    if ( !this._enabled ) {
      return Promise.resolve()
    }

    let result = this._audio.play()

    // Old browsers don't return a promise for play(), so we create one
    if ( !( result instanceof Promise ) ) {
      return Promise.resolve()
    }

    return result
  }

  pause () {
    if ( !this._audio.paused ) {
      this._audio.pause()
    }
    return Promise.resolve()
  }

  mute ( mute ) {
    this._audio.muted = mute
  }

  loop ( looped ) {
    this._looped = looped
  }
}

class Sounds {
  constructor () {
    this._collection = {}
    this._enabled = false
  }

  static create () {
    return new Sounds()
  }

  init () {
    return new Promise( ( resolve, reject ) => {
      let audio = new Audio( 'data:audio/wav;base64,UklGRjIAAABXQVZFZm10IBIAAAABAAEAQB8AAEAfAAABAAgAAABmYWN0BAAAAAAAAABkYXRhAAAAAA==' )

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
    this._enabled = enable

    loop( this._collection, ( sound ) => {
      sound.enabled( enable )
    } )
  }

  mute ( mute ) {
    loop( this._collection, ( sound ) => {
      sound.muted = mute
    } )
  }

  add ( name, audio ) {
    if ( typeof audio === 'string' ) {
      audio = new Audio( audio )
    }
    this._collection[ name ] = new Sound( audio )
    this._collection[ name ].enabled( this._enabled )
    return this._collection[ name ]
  }

  get ( name ) {
    return this._collection[ name ]
  }
}

module.exports = Sounds.create()

