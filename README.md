# modux
A framework used in front end application creation

## Installation

```
npm install CrispCode/modux#master --save-dev
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

### Modux classes

```
    Communication - A class used to make requests to the server
    Component - The base class of each custom component you build
    Config - A configuration instance for storing data
    Module - A class used to create applications
    Router - The router class
    Store - A class used to communicate between components
    
    utils - A utility class
```

### TODO

1. Add wrapped modules
2. Add Store and Config instances for module
3. Add Store and Config instance ref to each component
4. Update webpack and dependencies
5. Add css selector shorthand
6. Add polyfill incorporation
7. Add documentation
8. Publish to NPM
9. Add boilerplate command line
10. Update scroll to support overflow containers