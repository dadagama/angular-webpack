/*global module,require,__dirname*/
var path = require('path');

module.exports = {
    "paths": {
        "app": path.join(__dirname, path.sep, 'app')
    },
    "HtmlWebpackPlugin": {
        "title": "My App Title",
        "filename": "index.html",
        "template": path.join(__dirname, path.sep ,'app', path.sep, 'index-template.ejs')
    }
};
