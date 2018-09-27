'use strict'

const modux = require( './../../../../scripts' )

const Base = require( './index.js' )

class Sounds extends Base {
  get name () {
    return 'Sounds'
  }

  get features () {
    return [
      {
        description: 'Play a sound after user interaction',
        result: () => {
          return modux.utils.sounds.init()
            .then( () => {
              return modux.utils.sounds
                .add( 'sound1', '/cheer_large.wav' )
                .play()
                .then( () => {
                  return Promise.resolve( 'Sound was played.' )
                } )
            } )
        }
      }
    ]
  }
}

module.exports = Sounds
