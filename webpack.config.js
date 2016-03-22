/*global module,require*/

//load config variables
var options = require("./config");
//load additional webpack plugins
var webpack = require("webpack");
var HtmlWebpackPlugin = require("html-webpack-plugin");
var ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
    context: options.app.path,
    entry: {
        app: options.app.entry,
        vendors: options.vendorModules
    },
    output: {
        path: options.app.path,
        filename: "[name]-[id]-bundle.js"
    },
    module: {
        loaders: [
            {
                test: /\.scss$/,
                loader: ExtractTextPlugin.extract("style-loader", "css!sass")
            },
            {
                test: /\.html$/,
                loader: "html"
            }
        ],
        preLoaders: [
            {
                test: /\.js$/, // include .js files
                exclude: /node_modules/, // exclude any and all files in the node_modules folder
                loader: "jshint-loader"
            }
        ],
        noParse: options.noParseModules
    },
    resolve: {
        alias: options.resolveModules
    },
    plugins: [
        new HtmlWebpackPlugin(options.HtmlWebpackPlugin),
        new ExtractTextPlugin("[name]-[id]-styles.css"),
        new webpack.optimize.CommonsChunkPlugin({
            "name": "vendors",
            "filename": "[name]-[id]-bundle.js"
        }),
        new webpack.optimize.UglifyJsPlugin()
    ]
};
//
//'use strict';
//var path = require('path');
//
//var PATHS = {
//  app: __dirname + '/src/main',
//  vendor: __dirname + '/src/main/vendor',
//  npm: __dirname + '/node_modules',
//  src: __dirname + '/src'
//};
//
//var fs = require('fs');
//var webpack = require('webpack');
//var HtmlWebpackPlugin = require('html-webpack-plugin');
//var ExtractTextPlugin = require("extract-text-webpack-plugin");
//var test_env = process.env.NODE_ENV === 'test';
//
////jsons dont support comments, so the comments break the json parser, regexing them away
//var jshintconfig = JSON.parse(fs.readFileSync('./.jshintrc', 'utf8').replace(/\/\/.*/g,''));
//
//jshintconfig.failOnHint = true;
//jshintconfig.emitErrors = true;
//
//
//
//var config = {
//  context: PATHS.app, // entry: ['webpack/hot/dev-server', path.resolve(__dirname, 'src/main.js')],
//  entry: {
//    app: './main.js',
//    noc: './noc/main.js'
//  },
//
//  output: {
//    path: process.env.NODE_ENV === 'production' ? './dist' : './build',
//    filename: '[hash].[name].bundle.js',
//    chunkFilename: '[id].commons.js',
//    hash: true
//      //  Make sure to use [name] or [id] in output.filename
//      //  when using multiple entry points
//      //  filename: "[name].bundle.js",
//  },
//
//  resolve: {
//    root: [PATHS.npm, PATHS.vendor, PATHS.app],
//    alias: {}
//  },
//  //Comment above and uncomment below for quicker development builds
//  //https://webpack.github.io/docs/configuration.html#devtool
////  devtool: 'cheap-source-map',
//  devtool: 'eval',
//  module: {
//    noParse: [],
//    preLoaders: [
//      {
//        test: /\.js$/, // include .js files
//        exclude: /node_modules/, // exclude any and all files in the node_modules folder
//        loader: "jshint-loader"
//      }
//    ], postLoaders: [ { // << add subject as webpack's postloader
//      test: /\.js$/,
//      exclude: /(test|node_modules|bower_components)\//,
//      loader: 'istanbul-instrumenter'
//    } ],
//    loaders: [{
//        // needed for twetter bootstrap
//        test: /\.woff(2)?(\?v=\d+\.\d+\.\d+)?(\?\-fvbane)?$/,
//        loader: "url?name=[name].[ext]&limit=10000&minetype=application/font-woff"
//      }, {
//        test: /\.ttf(\?v=\d+\.\d+\.\d+)?(\?\-fvbane)?$/,
//        loader: "url?name=[name].[ext]&limit=10000&minetype=application/octet-stream"
//      }, {
//        test: /\.eot(\?v=\d+\.\d+\.\d+)?(\?\-fvbane)?$/,
//        loader: "file"
//      }, {
//        test: /\.svg(\?v=\d+\.\d+\.\d+)?(\?\-fvbane)?$/,
//        loader: "url?name=[name].[ext]&limit=10000&minetype=image/svg+xml"
//      }, { // end twetter bootstrap
//        test: /\.css$/,
//        loader: ExtractTextPlugin.extract("style-loader", "css-loader?sourceMap")
//      }, {
//          test: /\.less$/,
//          loader: ExtractTextPlugin.extract("style-loader", "css-loader?sourceMap!less-loader")
//      },
//      {
//        test: /\.scss$/,
//        loader: ExtractTextPlugin.extract("style-loader", "css-loader!sass-loader")
//      },
//      {
//        //  images that are 25KB or smaller in size will be converted to a BASE64 string and
//        //  included in the CSS file where it is defined
//        test: /\.jpg$/,
//        loader: 'url?name=img/[name].[ext]&mimetype=image/jpg&limit=25000'
//
//      }, {
//        test: /\.png$/,
//        loader: 'url?name=img/[name].[ext]&mimetype=image/png&limit=25000'
//      }, {
//        test: /\.gif$/,
//        loader: 'url?name=img/[name].[ext]&mimetype=image/gif&limit=25000'
//      } , {
//        test: require.resolve("angular-moment"),
//        loader: 'imports?define=>false'
//      }
//      // html loader is used to defined routes. option 'template' for $routeProvider.when function
//      // {test: /\.html$/, loader: 'html'}
//
//      // ng-cache loader is used to build ng-include partial. The html is required inside the
//      // controller via require(ng-cache!my_partial_template.html)
//      // {test: /\.html$/, loader: "ng-cache"}
//
//    ]
//  },
//  plugins: [
//    new ExtractTextPlugin("[name].[id].css"),
//    new webpack.optimize.CommonsChunkPlugin({
//      name: 'commons',
//      filename: 'commons.js',
//      children: test_env, // if test then true else false
//      minChunks: 2
//    }),
//
//    new webpack.DefinePlugin({
//      ON_TEST: process.env.NODE_ENV === 'test'
//    })
//  ],
//  jshint: jshintconfig
//};
//
///**
// * these plugins are not necessary in mode test
// */
//if (test_env === false) {
//  var development_plugins = [
//    new webpack.optimize.OccurenceOrderPlugin(true),
//    new HtmlWebpackPlugin(),
//    new HtmlWebpackPlugin({
//      title: 'Heimdall',
//      template: PATHS.src + '/html_webpack_tpl/index.html',
//      filename: 'index.html',
//      protected_content: false,
//      chunks: ['app', 'commons']
//    }),
//    new HtmlWebpackPlugin({
//      title: 'Heimdall',
//      template: PATHS.src + '/html_webpack_tpl/index.html',
//      prefix: '../',
//      filename: 'noc/index.html',
//      protected_content: true,
//      chunks: ['noc', 'commons']
//    }),
//    new webpack.optimize.UglifyJsPlugin({
//      compress: {
//        warnings: false
//      },
//      minimize: true
//    }),
//    new webpack.ResolverPlugin(
//        new webpack.ResolverPlugin.DirectoryDescriptionFilePlugin("bower.json", ["main"])
//    )
//  ];
//
//  Array.prototype.push.apply(config.plugins, development_plugins);
//
//}
//
///**
// * Use the minified versions of our dependencies
// */
//
//var deps = {
//  angular: 'angular/angular.min.js',
//  ngRoute: 'angular-route/angular-route.min.js',
//  ngResource: 'angular-resource/angular-resource.min.js',
//  ngSanitize: 'angular-sanitize/angular-sanitize.min.js',
//  ngAnimate: 'angular-animate/angular-animate.min.js',
//  uiBootstrap: 'angular-ui-bootstrap/ui-bootstrap-tpls.min.js',
//  jquery: 'jquery/dist/jquery.min.js',
//  d3: 'd3/d3.min.js',
//  ngLodash: 'ng-lodash/build/ng-lodash.min.js',
//  moment: 'moment/min/moment.min.js',
//  animate: 'animate.css/animate.min.css',
//  LocalStorageModule: 'angular-local-storage/dist/angular-local-storage.min.js',
//  bootstrapMultiselect: 'bootstrap-multiselect/dist/js/bootstrap-multiselect.js',
//  bootstrapJS: 'bootstrap/dist/js/bootstrap.min.js',
//  nv: 'nvd3/build/nv.d3.min.js',
//  ngGrid: 'angular-ui-grid/ui-grid.min.js',
//  'angular-nvd3': 'angular-nvd3/dist/angular-nvd3.min.js',
//  'animated-button': 'ng-bs-animated-button/ng-bs-animated-button.js'
//};
//
//var module_path;
//Object.keys(deps).forEach(function(alias) {
//  module_path = path.resolve(PATHS.npm, deps[alias]);
//  config.resolve.alias[alias] = module_path;
//  config.module.noParse.push(module_path);
//});
//
//
///**
// * Export configuration as a module
// */
//
//module.exports = config;
