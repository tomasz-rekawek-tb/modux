/* globals window, document */

'use strict'

import { Module, config, logger } from './../../scripts'

import { Layout } from './components/layout'

import { ApproxTest } from './components/utils/approx'
import { FontTest } from './components/utils/font'
import { LoaderTest } from './components/utils/loader'
import { RadiansTest } from './components/utils/radians'
// import { SoundsTest } from './components/utils/sounds'
import { DateTimeTest } from './components/utils/datetime'

let initialize = () => {
  config.set( 'core', window.config )

  logger.enabled( config.get( 'core.debug' ) )

  logger.info( 'Application start' )

  // Create application
  let app = new Module( 'app' )
  app
    .addDependency( 'layout', Layout )

    .addDependency( 'utils-approx', ApproxTest )
    .addDependency( 'utils-font', FontTest )
    .addDependency( 'utils-loader', LoaderTest )
    .addDependency( 'utils-radians', RadiansTest )
    // .addDependency( 'utils-sounds', SoundsTest )
    .addDependency( 'utils-datetime', DateTimeTest )

  // Start application
  app.bootstrap( document.querySelector( 'body' ), 'layout' )
}

window.addEventListener( 'load', () => {
  initialize()
} )
