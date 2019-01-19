# modux
A framework used in front end application creation

## Installation

```
npm install CrispCode/modux#v2 --save-dev
```

## How to use

Add to your package.json scripts:
```
  "scripts": {
    "test": "NODE_ENV=development ./node_modules/.bin/webpack-dev-server --open --config ./node_modules/modux/webpack.config.js",
    "build": "NODE_ENV=production ./node_modules/.bin/webpack --config ./node_modules/modux/webpack.config.js"
  }
```

To run use: `npm test` or `npm run build`

## Polyfill

In order to support older versions of browsers, you can use polyfills:

```
    <script src="https://cdn.polyfill.io/v2/polyfill.min.js?features=default,MutationObserver,console.info,es5,es6,Audio"></script>
```

## Modux classes

  |Name|Usage|Description|
  |:---:|---|---|
  | config | `import { config } from 'modux'` | The config class instance |
  | store | `import { store } from 'modux'` | The store class instance |
  | Device | `import { Device } from 'modux'` | The device class |
  | Router | `import { Router } from 'modux'` | The static Router class |
  | Communication | `import { Communication } from 'modux'` | The Communication class |
  | Component | `import { Component } from 'modux'` | The Component class |
  | Module | `import { Module } from 'modux'` | The Module class |

## Utils classes

  |Name|Usage|Description|
  |:---:|---|---|
  | approx | `import { approx } from 'modux'` | The approx function |
  | cookie | `import { cookie } from 'modux'` | cookie is an object containing two properties `set( name, value, path, seconds )` and `get( name )` |
  | DateTime | `import { DateTime } from 'modux'` | The DateTime class |
  | extend | `import { extend } from 'modux'` | The extend function |
  | font | `import { font } from 'modux'` | The font function |
  | getter | `import { getter } from 'modux'` | The getter function |
  | html | `import { html } from 'modux'` | The html function |
  | isNumber | `import { isNumber } from 'modux'` | The isNumber function |
  | isObject | `import { isObject } from 'modux'` | The isObject function |
  | loader | `import { loader } from 'modux'` | The loader class |
  | logger | `import { logger } from 'modux'` | logger is an object containing a mirror of `console` object |
  | loop | `import { loop } from 'modux'` | The loop function |
  | radians | `import { radians } from 'modux'` | The radians function |
  | rnd | `import { rnd } from 'modux'` | The rnd function |
  | scroll | `import { scroll } from 'modux'` | scroll is an object containing three properties `scrollToTop( speed )`, `elementScrollTo( element, x, y, speed )`, `scrollTo( x, y, speed )` |
  | setter | `import { setter } from 'modux'` | The setter function |
  | Sounds | `import { sonds } from 'modux'` | The sounds class instance |
  | uid | `import { uid } from 'modux'` | The uid function |