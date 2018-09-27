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

## Polyfill

In order to support older versions of browsers, you can use polyfills:

```
    <script src="https://cdn.polyfill.io/v2/polyfill.min.js?features=default,MutationObserver,console.info,es5,es6,Audio"></script>
```

### Modux classes

  1. `Communication` - A class used to make requests to the server
  2. `Component` - The base class of each custom component you build
  3. `Config` - A configuration instance for storing data
  4. `Module` - A class used to create applications
  5. `Router` - The router class
  6. `Store` - A class used to communicate between components
  
  7. `utils` - A utility class

### Utils library

  |Name|Usage|Description|
  |:---:|---|---|
  |approx|approx( number, decimals ) `return` Number|Approximate a number to a specific number of decimals|
  |cookie|get ( name ) `return` String<br/>set ( name, value, path, seconds ) `return` undefined|Cookie manipulation|
  |DateTime|new DateTime() `return` DateTime|DateTime class|
  |device()|type() `return` String<br/>isDesktop() `return` Boolean<br/>isMobile() `return` Boolean|Function which checks the device type|
  |extend|extend( object1, object2 ) `return` object1|Extends an object with another object|
  |font|font( font, interval ) `return` Promise|Font loader|
  |getter|getter( key, collection ) `return` mixed|Gets a value from an object|
  |html|html( string ) `return` Element|Converts a string to html element|
  |isObject|isObject( object ) `return` Boolean|Checks if variable is an object|
  |loader|loader.create() `return` Loader<br/><br/>preload( files, progress ) `return` Promise<br/>preloadImage( url ) `return` Promise<br/>preloadAudio( url ) `return` Promise<br/>preloadFile( url ) `return` Promise|Preloading library|
  |logger|setId( value ) `return` undefined<br/>enabled( enabled ) `return` undefined<br/>log( arguments ) `return` undefined<br/>info( arguments ) `return` undefined<br/>warn( arguments ) `return` undefined<br/>error( arguments ) `return` undefined|Logging to Console|
  |loop|loop( list, ( value, key ) => {} ) `return` undefined|Loop over array or object properties|
  |radians|radians( angle ) `return` Number|Convert angle to radians|
  |rnd|rnd( min, max ) `return` Number|Generates a random number between min and max|
  |scroll|scrollToTop( speed ) `return` undefined<br/>elementScrollTo( element, x, y, speed ) `return` undefined<br/>scrollTo( x, y, speed ) `return` undefined|Scroll helper|
  |setter|setter( key, value, collection ) `return` undefined|Sets a value for an object property|
  |Sounds|||
  |uid|uid() `return` String|Generates a unique indentifier|