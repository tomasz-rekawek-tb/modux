/* globals HTMLElement */

'use strict'

const utils = require( __dirname + '/../utils' )

class Component {
  get template () {
    return ''
  }

  get dependencies () {
    return {}
  }

  init () {
    return Promise.resolve()
  }

  execute () {
    return Promise.resolve()
  }

  terminate () {
    return Promise.resolve()
  }

  render () {
    return this.init()
      .then( () => {
        return this.__renderComponents()
      } )
      .then( () => {
        try {
          this.parent.appendChild( this.html )
        } catch ( e ) {}
      } )
      .then( () => {
        return this.execute()
      } )
  }

  __renderComponents () {
    return this.__componentsWalk( ( element ) => {
      return this.__renderComponent( element )
    } )
  }

  __renderComponent ( element ) {
    let name = element.getAttribute( 'data-component' )
    // Check if the needed component exists in dependency list and not loaded
    if ( !element.controller && ( name in this.dependencies ) ) {
      element.controller = new this.dependencies[ name ]( element )
      return element.controller.render()
    }
    return Promise.resolve()
  }

  destroy () {
    return this.terminate()
      .then( () => {
        return this.__destroyComponents()
      } )
      .then( () => {
        try {
          delete this.parent.controller
          this.html.remove()
        } catch ( e ) {}
      } )
  }

  __destroyComponents () {
    return this.__componentsWalk( ( element ) => {
      return this.__destroyComponent( element )
    } )
  }

  __destroyComponent ( element ) {
    if ( element.controller ) {
      return element.controller.destroy()
    }
    return Promise.resolve()
  }

  __componentsWalk ( parser ) {
    let iterations = []
    if ( this.html instanceof HTMLElement ) {
      utils.loop( this.html.querySelectorAll( '*[data-component]' ), ( container ) => {
        iterations.push( parser( container ) )
      } )
    }
    return Promise.all( iterations )
  }

  constructor ( parent ) {
    this.parent = parent
    this.html = utils.html( this.template )
  }
}

module.exports = Component
