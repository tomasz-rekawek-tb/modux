/* globals document */
'use strict'

export let html = ( text ) => {
  let container = document.createElement( 'section' )
  container.innerHTML = text.trim()
  return container.firstChild
}
