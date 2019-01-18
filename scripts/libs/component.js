'use strict'

import { html } from './../utils/html.js'
import { uid } from './../utils/uid.js'
import { Router } from './router.js'

export class Component {
  get template () {
    return ''
  }

  stateChange () {}

  execute () {}

  terminate () {}

  constructor ( parent, config, store ) {
    this.uid = uid()
    this.parent = parent
    this.element = html( this.template )

    this.config = config
    this.store = store

    // Append element to the dom
    this.parent.appendChild( this.element )

    // Manage state change
    this.__stateWatcher = Router.onStateChange( ( url ) => {
      this.stateChange( url )
    } )

    // Execute component
    this.execute()
  }

  destroy () {
    this.__stateWatcher()
    this.terminate()
    try {
      this.element.remove()
    } catch ( e ) {}
    delete this.parent.moduxComponent
  }
}
