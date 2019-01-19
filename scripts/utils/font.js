/* globals document */
'use strict'

import { html } from './html.js'
import { loop } from './loop.js'

/**
 * Creates a font test container
 * @param {String} name The name of the container
 * @return {HTMLElement} The html tag containing the test text
 */
let createContainer = ( name ) => {
  let e = html( `
    <span id="modux-font-` + name + `" style="position: absolute; top: -500px">
      abcdefghijklmnopqrstuvwxyz
      1234567890
      ABCDEFGHIGKLMNOPQRSTUVWXYZ
      !? -_
    </span>
  ` )
  return e
}

/**
 * Create an empty style tag containing the font to be used in testing
 * @return {HTMLElement} The style tag which contains the font name
 */
let createBlankFont = () => {
  let e = html( `
  <style>
    @font-face {
      font-family: "Adobe Blank";
      src: url("data:application/font-woff;base64,d09GRgABAAAAAARIABEAAAAABdwAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAABGRlRNAAABgAAAABsAAAAcaLMRlEdERUYAAAGcAAAAHQAAACAAMAAET1MvMgAAAbwAAABJAAAAVlXgZ5BjbWFwAAACCAAAAEIAAAFKAC0DsGN2dCAAAAJMAAAABAAAAAQAIQJ5Z2FzcAAAAlAAAAAIAAAACP//AANnbHlmAAACWAAAAFQAAABUPaWWPmhlYWQAAAKsAAAAMAAAADb9ErJRaGhlYQAAAtwAAAAeAAAAJAT2A3RobXR4AAAC/AAAAAwAAAAMC7gAIWxvY2EAAAMIAAAACAAAAAgAKgBUbWF4cAAAAxAAAAAfAAAAIABHADluYW1lAAADMAAAALoAAAGEGgY1yXBvc3QAAAPsAAAAKgAAADcc+EvmdmhlYQAABBgAAAAgAAAAJAItE0N2bXR4AAAEOAAAAAgAAAAIA+gCmndlYmYAAARAAAAABgAAAAYG6lIVeNpjYGBgZACCM7aLzoPoc1bbE6B0CgBKMwa+AHjaY2BkYGDgA2IJBhBgYmAEQhDJAuYxAAAEYAA1AAAAeNpjYGR+wTiBgZWBhamLaQ8DA0MPhGZ8wGDIyMTAwMTAyswAB0ABBhYoOyDNNYXBgYGXgZdZ4b8FQxRzAUMFUJgRJAcA60YKJQAAAHjaY2BgYGaAYBkGRgYQcAHyGMF8FgYNIM0GpBkZmIAs3v//wSpANOP/r1D1QMDIxgDnMIJUMjGgAkaGYQ8AgK0G2wAAACECeQAAAAH//wACAAIAIQAAASoCmgADAAcALrEBAC88sgcEAO0ysQYF3DyyAwIA7TIAsQMALzyyBQQA7TKyBwYB/DyyAQIA7TIzESERJzMRIyEBCejHxwKa/WYhAlgAeNpjYGRgYABib3UXqXh+m68M9swvgCIM56y2Z8JpRaASLaZZQC4HAxNIFAAEsAjeeNpjYGRgYC7438EQxfyCAQgYtRgYGVABMwBfOwNwAAAD6AAhA+gAAAPoAAAAAAAqACoAKnjaY2BkYGBgZuBgYGIAARDJyAASc2DQAwkAAARmAIEAeNqFkE0OwVAUhb9SwgYMm47EhGgRdMbAEhhriggh8TOzHKuwAnZgFdbgtL0MGbzck/Pz7nkPqLCkiONWcfDAcEG8Z7jIlLphlwYXwyVqXA2X5b4Zvot/Gn7Q5sWIhD0xC8ZsmbNjQ5NQWpfhd07k2XHK5oGV3L60llSfSOf3LbknJBA3MD6g8zf1QVM5DhxZZy18ZdPNv9Mz8bH+L+/9yaRskvU96xV5p1TrqmGobhE9+rZZDd+rAy/wAAB42mNgYgCD/80MRkCKkQEdMAMFmRiZ2dJzKgsyDNlL8zINDAxcAHY1BkQAAHjaY2AUYPhv9o+HIYr5BQMDox/TLAYgxYAMGAF6hwSDA+gCmgAAAAAAAVIVBukAAA==") format("woff");
    }
  </style>
  ` )
  return e
}

/**
 * A font loader
 * @param {String} font The font name to be loaded
 * @param {Object} styles The styles to load, bold, italic, etc...
 * @param {Number} interval The time in milliseconds it takes to retry the load
 * @return {Promise} A promise that is resolved when the font is loaded
 */
export let font = ( font, styles, interval ) => {
  let blank = createBlankFont()
  document.getElementsByTagName( 'head' )[0].appendChild( blank )

  let container = createContainer( font )
  document.body.appendChild( container )

  container.style.fontFamily = '"' + font + '", "Adobe Blank"'

  loop( styles, ( value, key ) => {
    container.style[ key ] = value
  } )

  return new Promise( ( resolve ) => {
    let timer = () => {
      if ( container.offsetWidth > 0 ) {
        container.parentNode.removeChild( container )
        resolve()
      } else {
        setTimeout( timer, interval || 100 )
      }
    }
    timer()
  } )
}
