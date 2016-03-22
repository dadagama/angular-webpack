/*global define*/
console.info('demo.js -start');
define([], function () {
    "use strict";

    var demoDirective = function () {

        return {
            template: '<h1>demo  template [{{::demoController.myVar}}]</h1>',
            restrict: 'E',
            controller: ['jwtHelper', '$http', function(jwtHelper, $http){
                console.info('demo.controller');
                var demoController = this;
                demoController.myVar = 'myValue';
                /*console.log('decodeToken',jwtHelper.decodeToken(expToken));
                console.log('getTokenExpirationDate',jwtHelper.getTokenExpirationDate(expToken));
                console.log('isTokenExpired',jwtHelper.isTokenExpired(expToken));
                */
                // If localStorage contains the id_token it will be sent in the request
                // Authorization: Bearer [yourToken] will be sent
                $http({
                    url: '/hola',
                    method: 'GET'
                });
            }],
            controllerAs: 'demoController'
        };

    };

    demoDirective.$inject = [];

    return demoDirective;

});
console.info('demo.js -end');
