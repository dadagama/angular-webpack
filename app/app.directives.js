/*global define,angular*/
console.info('app.directives.js -start');
define([
    './demo/demo'
  ],
       function (demo) {
        'use strict';
        var appDirectives = angular.module("app.directives", []);

        appDirectives.directive('demo', demo);

        return appDirectives;
});

console.info('app.directives.js -end');
