const
webpack = require('webpack'),
path = require('path'),
HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
context: path.join(__dirname, '../../src'),
devtool: 'source-map',
entry: {
	bundle: './index.js'
},
output: {
	path: path.join(__dirname, '../../build'),
	publicPath: '/',
	filename: '[name].js'
},
module: {
	loaders: [
		{
			test: /\.(js|jsx)$/,
			exclude: /node_modules/,
			use: {
				loader: 'babel-loader',
				options: {
				  presets: ['env', 'react']
				}
			  }
		}
	]
},
plugins: [
	new HtmlWebpackPlugin({
		title: 'React Music Equalizer | v1.0.0',
		template: 'index.html',
		inject: false,
		minify: {
			collapseWhitespace: true,
			removeComments: true,
			removeRedundantAttributes: true,
			removeScriptTypeAttributes: true,
			removeStyleLinkTypeAttributes: true
		}
	})
],
externals: {
	React: 'react',
	ReactDom: 'react-dom'
}
};
