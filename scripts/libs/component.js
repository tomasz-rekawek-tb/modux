'use strict'

import { html } from './../utils/html.js'
import { uid } from './../utils/uid.js'
import { Router } from './router.js'

/**
 * This class is used to create web components
 */
export class Component {
  /**
   * The html string that becomes the view for this component
   */
  get template () {
    return ''
  }

  /**
   * The method gets called whenever the state changes
   * @param {String} url The current url
   */
  stateChange ( url ) {}

  /**
   * The method gets called when the component gets created in the page. It is the main method of the class
   */
  execute () {}

  /**
   * The method gets called when the component calls destroy(). It can be used to remove handlers or clear timeouts
   */
  terminate () {}

  /**
   * Creates an instance of Component
   * @param {HTMLElement} parent The parent wrapper
   * @param {Config} config A config class instance
   * @param {Store} store A store class instance
   */
  constructor ( parent, config, store ) {
    /**
     * A unique identifier
     * @type {String}
     * @public
     */
    this.uid = uid()
    /**
     * The parent wrapper
     * @type {HTMLElement}
     * @public
     */
    this.parent = parent
    /**
     * The component view
     * @type {HTMLElement}
     * @public
     */
    this.element = html( this.template )

    /**
     * The config class of the module parent
     * @type {Config}
     * @public
     */
    this.config = config
    /**
     * The store class of the module parent
     * @type {Store}
     * @public
     */
    this.store = store

    // Append element to the dom
    this.parent.appendChild( this.element )

    // Manage state change
    /**
     * The __stateWatcher is a handler for the router, it gets destroyed when the component gets destroyed
     * @type {String}
     * @private
     */
    this.__stateWatcher = Router.onStateChange( ( url ) => {
      this.stateChange( url )
    } )

    // Execute component
    this.execute()
  }

  /**
   * The method gets called when the component is destroyed
   */
  __destroy () {
    this.__stateWatcher()
    this.terminate()
    try {
      this.element.remove()
    } catch ( e ) {}
    delete this.parent.moduxComponent
  }
}
