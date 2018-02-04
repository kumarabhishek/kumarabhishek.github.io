const
	webpack = require('webpack'),
	path = require('path'),
	HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	context: path.join(__dirname, '../../'),
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
				use: [
					'babel-loader',
				],
			}
		]
	},
	resolve: {
		extensions: ['.webpack-loader.js', '.web-loader.js', '.loader.js', '.js', '.jsx', '.css', '.png', '.svg'],
		modules: [
			//path.resolve(__dirname, '../../components'),
			//path.resolve(__dirname, 'node_modules')
		],
	},
	plugins: [
		new HtmlWebpackPlugin({
			title: 'All About U | v1.0.0',
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
	]
};
