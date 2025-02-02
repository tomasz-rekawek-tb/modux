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
  onStateChange ( url ) {}

  /**
   * The method gets called whenever the container is resized
   * @param {Number} width The width of the container
   * @param {Number} height The height of the container
   */
  onResize ( width, height ) {}

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
   * @param {Module} module The parent module instance
   * @param {Config} config A Config class instance
   * @param {Store} store A Store class instance
   */
  constructor ( parent, module, config, store ) {
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
     * The parent module instance
     * @type {Module}
     * @public
     */
    this.module = module
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

    /**
     * The component view
     * @type {HTMLElement}
     * @public
     */
    this.element = html( this.template )

    // Append element to the dom
    this.parent.appendChild( this.element )

    /**
     * The __stateWatcher is a handler for the router, it gets destroyed when the component gets destroyed
     * @type {String}
     * @private
     */
    this.__stateWatcher = Router.onStateChange( ( url ) => {
      this.__onStateChange( url )
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
            this.__onResize( previousParentSize.width, previousParentSize.height )
          }
          parentResizeCheck()
        }
      }, 100 )
    }
    parentResizeCheck()
  }

  /**
   * The method gets called whenever the state changes
   * @param {String} url The current url
   * @private
   */
  __onStateChange ( url ) {
    this.onStateChange( url )
  }

  /**
   * The method gets called whenever the container is resized
   * @param {Number} width The width of the container
   * @param {Number} height The height of the container
   * @private
   */
  __onResize ( width, height ) {
    this.onResize( width, height )
  }

  /**
   * The method gets called when the component is destroyed
   * @private
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
