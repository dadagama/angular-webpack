
/*global module,localStorage*/
console.info('app.config -start');
module.exports = function(app) {
    'use strict';
    app.config([
        '$routeProvider',
        '$httpProvider',
        'jwtInterceptorProvider',
        function ($routeProvider, $httpProvider, jwtInterceptorProvider) {
            console.info('app.config() -start');
            $routeProvider.when('/home', {
                controller: function () {
                    console.log('home controller!');
                },
                template: '<div>template</div>'
                /*templateUrl: require('html!./index.html')*/
            });

            $routeProvider.otherwise('/home');

            var id_token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczovL3NhbXBsZXMuYXV0aDAuY29tLyIsInN1YiI6ImZhY2Vib29rfDEwMTU0Mjg3MDI3NTEwMzAyIiwiYXVkIjoiQlVJSlNXOXg2MHNJSEJ3OEtkOUVtQ2JqOGVESUZ4REMiLCJleHAiOjE0MTIyMzQ3MzAsImlhdCI6MTQxMjE5ODczMH0.7M5sAV50fF1-_h9qVbdSgqAnXVF7mz3I6RjS6JiH0H8';
            localStorage.setItem('id_token', id_token);

            jwtInterceptorProvider.tokenGetter = [
                'config', 'jwtHelper', '$http',
                function (
                    config, jwtHelper, $http
                ) {
                    console.log('tokenGetter');
                    // Skip authentication for any requests ending in .html
                    if (config.url.substr(config.url.length - 5) == '.html') {
                        console.log('tokenGetter html, skip!');
                        return null;
                    }

                    var idToken = localStorage.getItem('id_token');
                    var refreshToken = localStorage.getItem('refresh_token');

                    if (jwtHelper.isTokenExpired(idToken)) {
                        // This is a promise of a JWT id_token
                        return $http({
                            url: '/delegation',
                            // This makes it so that this request doesn't send the JWT
                            skipAuthorization: true,
                            method: 'POST',
                            data: {
                                grant_type: 'refresh_token',
                                refresh_token: refreshToken
                            }
                        }).then(function (response) {
                            var id_token = response.data.id_token;
                            localStorage.setItem('id_token', id_token);
                            return id_token;
                        });
                    } else {
                        return idToken;
                    }
                }
            ];


            $httpProvider.interceptors.push('jwtInterceptor');

            console.info('app.config() -end');
        }
    ]);
    return app;
};
console.info('app.config -end');
