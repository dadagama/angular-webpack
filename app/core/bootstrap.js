/*global require,angular,document*/
console.info('bootstrap.js -start');

//load vendors
require('./vendors')();
// load the main app file
var appModule = require('../app');
// set the document as an entire Angular app
angular.element(document).ready(function () {
    'use strict';
    angular.bootstrap(document, [appModule.name], {
        //strictDi: true
    });
});

console.info('bootstrap.js -end');
