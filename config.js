/*global module,require,__dirname*/
var path = require('path');

module.exports = {
    "app": {
        "path": path.join(__dirname, path.sep, 'app'), //your app directory
        "entry": "./core/bootstrap.js" //file that initializes your app
    },
    //modules that are going to be packaged in the vendor bundle
    "vendorModules": [
        "angular",
        "angular-jwt",
        "angular-route"
    ],
    //modules that does not need to be parsed by webpack loaders
    "noParseModules": [
        "angular",
        "angular-jwt",
        "angular-route"
    ],
    //modules that are packaged/minified already.
    //usually all vendors modules has this file
    "resolveModules": {
        "angular": "angular/angular.min.js",
        "angular-jwt": "angular-jwt/dist/angular-jwt.min.js",
        "angular-route": "angular-route/angular-route.min.js"
    },
    "HtmlWebpackPlugin": {
        "title": "My App Title",
        "filename": "index.html",
        "template": path.join(__dirname, path.sep, 'app', path.sep, 'index-template.ejs'),
        "inject": true,
        "favicon": false,
        "minify": {
            "removeComments":true
        },
        "hash": true
    }
};
