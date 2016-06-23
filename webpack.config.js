var path = require('path'),
    HtmlWebpackPlugin = require('html-webpack-plugin'),
    merge = require('webpack-merge'),
    validate = require('webpack-validator');

var parts = require('./lib/parts');

var PATHS = {
    app: path.join(__dirname, 'app'),
    style: [
        path.join(__dirname, 'node_modules', 'purecss'),
        path.join(__dirname, 'app', 'main.css'),
    ],
    build: path.join(__dirname, 'build')
};

var config = {};
var common = {
    entry: {
        style: PATHS.style,
        app: PATHS.app
    },
    output: {
        path: PATHS.build,
        filename: '[name].[hash].js',
        chunkFilename: '[hash].js'
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'Custom template',
            template: 'index.ejs'
        })
    ],
    module: {
        loaders: [
            {
                test: /\.js?$/,
                include: PATHS.app,
                loader: 'react-hot',
            },
            {
                test: /\.js?$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel',
                query: {
                    presets: [ 'react', 'es2015' ]
                }
            }
        ]
    }

};

switch (process.env.npm_lifecycle_event) {
    case 'build':
        config = merge(
            common, 
            { 
                devtool: 'source-map',
                output: {
                    path: PATHS.build,
                    filename: '[name].[hash].js',
                    chunkFilename: '[hash].js'
                } 
            },
            parts.clean(PATHS.build),
            parts.setFreeVariable('process.env.NODE_ENV', 'production'),
            parts.extractBundle({ name: 'vendor', entries: ['react'] }),
            parts.minify(),
            parts.extractCSS(PATHS.style)  // change PATHS.app
            // parts.purifyCSS([ PATHS.app ])
            );
        break;
    default:
        config = merge(
            common, 
            { devtool: 'eval-source-map' },
            parts.setupCSS(PATHS.style),
            parts.devServer({
                // customize host/port here if needed
                host: process.env.HOST,
                port: process.env.PORT
            })
        );

}

module.exports = validate(config);
