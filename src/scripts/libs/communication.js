/* globals XMLHttpRequest, FormData, document */

const utils = require( __dirname + '/../utils' )

class Communication {
  constructor ( form ) {
    this.__form = new FormData( form )
    this.__request = new XMLHttpRequest()
  }

  addField ( key, value ) {
    this.__form.append( key, value )
  }

  addFields ( fields ) {
    utils.loop( fields, ( value, key ) => {
      this.__form.append( key, value )
    } )
  }

  listener ( progress, end ) {
    this.__request.onloadend = function ( ev ) {
      if ( this.__request.status === 200 ) {
        end( null, ev.target.responseText )
      } else {
        end( this._request.status )
      }
    }
    this.__request.onprogress = function ( ev ) {
      if ( ev.lengthComputable ) {
        progress( ev.loaded / ev.total )
      } else {
        progress()
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

  send ( url, method ) {
    url = this.parseUrl( url )
    this.__request.open( method.toUpperCase(), url )
    this.__request.send( this.__form )
  }

  post ( url ) {
    this.send( url, 'POST' )
  }

  get ( url ) {
    this.send( url, 'GET' )
  }
}

module.exports = Communication
