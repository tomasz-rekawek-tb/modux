'use strict'

import { sounds } from './../../../../scripts'

import { Index as Base } from './index.js'

export class SoundsTest extends Base {
  get name () {
    return 'Sounds'
  }

  get features () {
    return [
      {
        description: 'Play a sound after user interaction',
        result: () => {
          return sounds.init()
            .then( () => {
              return sounds
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
