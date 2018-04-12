/* globals MutationObserver, HTMLElement */

'use strict'

const utils = require( __dirname + '/../utils' )
const Router = require( __dirname + '/router' )

const _attrComponent = 'data-modux-component'
const _attrLink = 'data-modux-link'

const linkHandler = function ( e ) {
  let url = this.getAttribute( 'href' )
  if ( url ) {
    Router.redirect( url )
    e.preventDefault()
  }
}

let modules = {}

class Module {
  addDependency ( name, dependency ) {
    this.__dependencies[ name ] = dependency
    return this
  }
  removeDependency ( name ) {
    if ( this.__dependencies[ name ] ) {
      delete this.__dependencies[ name ]
    }
    return this
  }

  constructor ( name ) {
    this.__name = name
    this.__dependencies = {}
  }

  __createComponent ( element, Component ) {
    if ( !element.moduxComponent ) {
      ( new Component( element ) )()
    }
  }

  __removeComponent ( element ) {
    if ( element.moduxComponent ) {
      element.moduxComponent.destroy()
    }
  }

  __createComponentLink ( element ) {
    if ( !element.moduxLink ) {
      element.addEventListener( 'click', linkHandler )
      element.moduxLink = true
    }
  }
  __removeComponentLink ( element ) {
    if ( element.moduxLink ) {
      element.removeEventListener( 'click', linkHandler )
      delete element.moduxLink
    }
  }

  __loopOnElements ( node, attr, handler ) {
    if ( !( node instanceof HTMLElement ) ) {
      return
    }
    let name = node.getAttribute( attr )
    if ( name ) {
      handler( node, name )
    }
    utils.loop( node.querySelectorAll( '*[' + attr + ']' ), ( element ) => {
      handler( element, element.getAttribute( attr ) )
    } )
  }

  bootstrap ( element, component ) {
    // Manage dom modifications
    this.__htmlWatcher = new MutationObserver( ( mutations ) => {
      mutations.forEach( ( mutation ) => {
        if ( mutation.type === 'attributes' ) {
          if ( mutation.attributeName === _attrComponent ) {
            this.__removeComponent( mutation.target )
            this.__createComponent( mutation.target, this.__dependencies[ mutation.target.getAttribute( _attrComponent ) ] )
          }
          if ( mutation.attributeName === _attrLink ) {
            this.__removeComponentLink( mutation.target )
            this.__createComponentLink( mutation.target )
          }
        }
        if ( mutation.type === 'childList' ) {
          if ( mutation.addedNodes.length > 0 ) {
            // Nodes that were added
            utils.loop( mutation.addedNodes, ( node ) => {
              this.__loopOnElements( node, _attrComponent, ( e, attr ) => {
                if ( this.__dependencies[ attr ] ) {
                  this.__createComponent( e, this.__dependencies[ attr ] )
                }
              } )
              this.__loopOnElements( node, _attrLink, ( e ) => {
                this.__createComponentLink( e )
              } )
            } )
          }
          if ( mutation.removedNodes.length > 0 ) {
            // Nodes that were removed
            utils.loop( mutation.removedNodes, ( node ) => {
              this.__loopOnElements( node, _attrComponent, ( e ) => {
                this.__removeComponent( e )
              } )
              this.__loopOnElements( node, _attrLink, ( e ) => {
                this.__removeComponentLink( e )
              } )
            } )
          }
        }
      } )
    } )
    this.__htmlWatcher.observe( element, { attributes: true, childList: true, characterData: false, subtree: true } )

    if ( !this.__dependencies[ component ] ) {
      throw new Error( 'Initial component cannot be found in dependency list' )
    }
    this.component = new this.__dependencies[ component ]( element )
  }

  destroy () {
    this.component.destroy()
    this.__htmlWatcher.disconnect()
    delete modules[ this.__name ]
  }

  static create ( name ) {
    modules[ name ] = new this( name )
    return modules[ name ]
  }
  static get ( name ) {
    return modules[ name ]
  }
  static remove ( name ) {
    if ( modules[ name ] ) {
      modules[ name ].destroy()
    }
  }
}

module.exports = Module
