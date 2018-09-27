/* globals document */
'use strict'

module.exports = ( text ) => {
  let container = document.createElement( 'section' )
  container.innerHTML = text.trim()
  return container.firstChild
}
