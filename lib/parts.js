var webpack = require('webpack'),
    CleanWebpackPlugin = require('clean-webpack-plugin'),
    ExtractTextPlugin = require('extract-text-webpack-plugin');

var parts = {};

parts.devServer = function (opts) {
    return {
        devServer: {
            historyApiFallback: true,  // good default
            hot: true,                 // unlike CLI flag, not set the HMR plugin yet
            inline: true,              // 
            stats: 'errors-only',      // only display errors
            // parse host and port from env
            host: opts.host,           // defaults to 'localhost'
            port: opts.port            // defaults to 8080
        },
        plugins: [
            // enable multi-pass compilation, good default
            new webpack.HotModuleReplacementPlugin({ multiStep: true })
        ]
    };
};

parts.setupCSS = function (paths) {
    return {
        module: {
            loaders: [
                {
                    test: /\.css$/,
                    loaders: [ 'style', 'css' ],
                    include: paths
                }
            ]
        }
    };
};

parts.extractCSS = function (paths) {
    return {
        module: {
            loaders: [
                {
                    test: /\.css$/,
                    loader: ExtractTextPlugin.extract('style', 'css'),
                    include: paths
                }
            ]
        },
        plugins: [
            new ExtractTextPlugin('[name].[hash].css')
        ]
    };
};



parts.minify = function () {
    return {
        plugins: [
            new webpack.optimize.UglifyJsPlugin({
                compress: { warnings: false }
            })
        ]
    };
};

parts.setFreeVariable = function (key, value) {
    var env = {};
    env[key] = JSON.stringify(value);

    return {
        plugins: [ new webpack.DefinePlugin(env) ]
    };
};

parts.extractBundle = function (opts) {
    var entry = {};
    entry[opts.name] = opts.entries;

    return {
        entry: entry,
        plugins: [
            new webpack.optimize.CommonsChunkPlugin({
                names: [ opts.name, 'manifest' ],
                minChunks: Infinity
            })
        ]
    };
};

parts.clean = function (path) {
    return {
        plugins: [
            new CleanWebpackPlugin([ path ], {
                // root is used to point to our project,
                // it is mandatory
                root: process.cwd()
            })
        ]
    };
};

module.exports = parts;
