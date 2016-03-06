//load vendors
require('./vendors')();
// load the main app file
var appModule = require('../index');
// replaces ng-app="appName"
angular.element(document).ready(function () {
    'use strict';
    console.log('ready', appModule);
    angular.bootstrap(document, [appModule.name], {
        //strictDi: true
    });
});
