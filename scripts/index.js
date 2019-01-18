'use strict'

import { config } from './libs/config.js'
import { store } from './libs/store.js'

import { Device } from './libs/device.js'

import { Router } from './libs/router.js'

import { Communication } from './libs/communication'
import { Component } from './libs/component'
import { Module } from './libs/module.js'

import { approx } from './utils/approx.js'
import { cookie } from './utils/cookie.js'
import { DateTime } from './utils/datetime.js'
import { extend } from './utils/extend.js'
import { font } from './utils/font.js'
import { getter } from './utils/getter.js'
import { html } from './utils/html.js'
import { isNumber } from './utils/isnumber.js'
import { isObject } from './utils/isobject.js'
import { loader } from './utils/loader.js'
import { logger } from './utils/logger.js'
import { loop } from './utils/loop.js'
import { radians } from './utils/radians.js'
import { rnd } from './utils/rnd.js'
import { scroll } from './utils/scroll.js'
import { setter } from './utils/setter.js'
import { sounds } from './utils/sounds.js'
import { uid } from './utils/uid.js'

export {
  config,
  store,

  Device,

  Router,

  Communication,
  Component,
  Module,

  approx, cookie, DateTime, extend, font, getter, html, isNumber, isObject, loader, logger, loop, radians, rnd, scroll, setter, sounds, uid
}
