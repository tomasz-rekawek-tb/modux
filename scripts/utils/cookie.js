/* globals document */

'use strict'

let setCookie = ( name, value, path, seconds ) => {
  let expires
  if ( seconds ) {
    let date = new Date()
    date.setTime( date.getTime() + ( seconds * 1000 ) )
    expires = '; expires=' + date.toGMTString()
  } else {
    expires = ''
  }
  document.cookie = name + '=' + value + expires + '; path=' + ( path || '/' )
}

let getCookie = ( name ) => {
  name = name + '='
  var decodedCookie = decodeURIComponent( document.cookie )
  var cookies = decodedCookie.split( ';' )
  for ( var i = 0; i < cookies.length; i++ ) {
    var cookie = cookies[ i ]
    while ( cookie.charAt( 0 ) === ' ' ) {
      cookie = cookie.substring( 1 )
    }
    if ( cookie.indexOf( name ) === 0 ) {
      return cookie.substring( name.length, cookie.length )
    }
  }
  return ''
}

module.exports = {
  set: setCookie,
  get: getCookie
}
