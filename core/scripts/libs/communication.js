/* globals XMLHttpRequest, FormData, document */

const utils = require( __dirname + '/../utils' )

class Communication {
  constructor ( form ) {
    this.__form = new FormData( form )
    this.__request = new XMLHttpRequest()
    this.__headers = {}
  }

  addField ( key, value ) {
    this.__form.append( key, value )
  }

  addFields ( fields ) {
    utils.loop( fields, ( value, key ) => {
      this.__form.append( key, value )
    } )
  }

  setHeader ( name, value ) {
    this.__headers[ name ] = value
  }

  listener ( progress, end ) {
    const self = this
    this.__request.onloadend = function ( ev ) {
      if ( self.__request.status === 200 ) {
        end( null, ev.target.responseText )
      } else {
        end( self.__request.status )
      }
    }
    if ( progress ) {
      this.__request.onprogress = function ( ev ) {
        if ( ev.lengthComputable ) {
          progress( ev.loaded / ev.total )
        } else {
          progress()
        }
      }
    }
  }

  parseUrl ( url ) {
    let div = document.createElement( 'div' )
    div.innerHTML = '<a></a>'
    div.firstChild.href = url // Ensures that the href is properly escaped
    div.innerHTML = div.innerHTML // Run the current innerHTML back through the parser
    return div.firstChild.href
  }

  cancel () {
    this.__request.abort()
  }

  send ( url, method ) {
    url = this.parseUrl( url )
    this.__request.open( method.toUpperCase(), url )
    for ( let i = 0, k = Object.keys( this.__headers ), l = k.length; i < l; i++ ) {
      this.__request.setRequestHeader( k[ i ], this.__headers[ k[ i ] ] )
    }
    this.__request.send( this.__form )
  }

  post ( url ) {
    this.send( url, 'GET' )
  }

  get ( url ) {
    this.send( url, 'GET' )
  }
}

module.exports = Communication
