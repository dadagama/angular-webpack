/*global define,angular,require*/
console.info('app.js -start');
define([
    './app.directives'
],
function () {
    'use strict';
    require('./index.scss');
    //initialize Angular App with its dependecies
    var app = angular.module("app", [
        'ngRoute',
        'angular-jwt',
        'app.directives'
    ]);
    //configure the Angular app
    require('./app.config')(app);

    return app;
});
console.info('app.js -end');
