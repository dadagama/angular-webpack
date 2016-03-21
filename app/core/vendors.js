/*global module,require*/
console.info('vendors.js -start');
module.exports = function () {
    'use strict';
    /* Load Vendor Styles */

    /* Load Vendor plugins */
    require('angular');
    require('angular-jwt');
    require('angular-route');
};

console.info('vendors.js -end');
