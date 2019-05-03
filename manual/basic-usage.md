# Basic usage

#### /components/layout/template.html

```html
<section class="layout"></section>
```

#### /components/layout/index.js

```js

'use strict'

import { Component } from 'modux'

import template from './template.html'

export class Layout extends Component {
  get template () {
    return template
  }

  execute() {
    this.element.innerHTML = "Layout loaded"
  }
}

```

#### /app.js

```js

/* globals window, document */

'use strict'

import { Module, logger } from 'modux'

import { Layout } from './components/layout'

let initialize = () => {
  // Configure logger
  logger.enabled( true )

  logger.info( 'Application start' )

  // Create application
  let app = new Module( 'app' )
  app
    .addDependency( 'layout', Layout )

  // Start application
  app.bootstrap( document.querySelector( 'body' ), 'layout' )
}

window.addEventListener( 'load', () => {
  initialize()
} )

```