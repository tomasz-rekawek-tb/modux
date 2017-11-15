# modux
A framework used in front end application creation

## Running

Testing an application
```
npm test -- --env.app=APPLICATION_NAME
```

Building an application
```
npm run build -- --env.app=APPLICATION_NAME
```

## How to use

Clone the `modux` repository:
```
git clone https://github.com/CrispCode/modux.git
```

Add your application to the `apps` folder, using a symlink. The application needs to have the following directory structure
```
    app/
        /api
        /fonts
        /images
        /scripts
        /sounds
        /styles
        app.html
        app.js
        app.scss
        modux.js
        modux.scss
```

`modux.js` and `modux.scss` need to load the core js and scss files so that everything you use internally will reference these files instead of external core directory

### Modux classes

```
    Communication - A class used to make requests to the server
    Component - The base class of each custom component you build
    Config - A configuration instance for storing data
    Router - The router class
    Store - A class used to communicate between components
```
