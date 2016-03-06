/*global module,__dirname*/
module.exports = {
    context: __dirname + '/app',
    entry: './core/bootstrap.js',
    output: {
        path: __dirname + '/app',
        filename: 'bundle.js'
    },
    module: {
        loaders: [
            {
                test: /\.scss$/,
                loader: 'style!css!sass'
            }
        ]
    }
};
