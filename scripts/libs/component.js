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
   * The method gets called whenever the container is resized
   * @param {String} orientation The device orientation
   */
  onResize ( orientation ) {}

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
   * @param {Config} config A Config class instance
   * @param {Store} store A Store class instance
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

    /**
     * The __stateWatcher is a handler for the router, it gets destroyed when the component gets destroyed
     * @type {String}
     * @private
     */
    this.__stateWatcher = Router.onStateChange( ( url ) => {
      this.stateChange( url )
    } )

    /**
     * Holds the previous width and height of the parent container
     * @type {Object}
     * @private
     */
    let previousParentSize = {}
    /**
     * Determines if the component watches for resize changes in parent dimensions
     * @type {Boolean}
     * @private
     */
    this.__resizeWatcher = true
    /**
     * This function checks for parent size changes every 100ms as long as the component exists
     * @type {Function}
     * @private
     */
    const parentResizeCheck = () => {
      setTimeout( () => {
        if ( this.__resizeWatcher ) {
          if ( previousParentSize.width !== this.parent.clientWidth || previousParentSize.height !== this.parent.clientHeight ) {
            previousParentSize.width = this.parent.clientWidth
            previousParentSize.height = this.parent.clientHeight
            this.onResize( previousParentSize.width, previousParentSize.height )
          }
          parentResizeCheck()
        }
      }, 100 )
    }
    parentResizeCheck()

    // Execute component
    this.execute()
  }

  /**
   * The method gets called when the component is destroyed
   */
  __destroy () {
    this.__stateWatcher()
    this.__resizeWatcher = false
    this.terminate()
    try {
      this.element.remove()
    } catch ( e ) {}
    delete this.parent.moduxComponent
  }
}
