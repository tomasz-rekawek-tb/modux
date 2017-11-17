'use strict'

const utils = require( __dirname + '/../utils' )
const Router = require( __dirname + '/router' )

class Component {
  get template () {
    return ''
  }

  stateChange ( url ) {}

  execute () {}

  terminate () {}

  constructor ( parent ) {
    this.uid = utils.uid()
    this.parent = parent
    this.element = utils.html( this.template )

    this.parent.moduxComponent = this

    // Append element to the dom
    this.parent.appendChild( this.element )

    // Manage state change
    this.__stateWatcher = Router.onStateChange( ( url ) => {
      this.stateChange( url )
    } )

    // Execute component
    this.execute()
  }

  static create ( parent ) {
    return new this( parent )
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

module.exports = Component
