var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');

var PATHS = {
	app: path.join(__dirname, 'app'),
	build: path.join(__dirname, 'build')
};

module.exports = {
	entry: {
		app: PATHS.app
	},
	output: {
		path: PATHS.build,
		filename: '[name],js'
	},
	plugins: [
		new HtmlWebpackPlugin({ title: 'webpack demo' })
	]
};