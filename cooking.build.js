var path = require('path');
var cooking = require('cooking');
var nodeExternals = require('webpack-node-externals');
var BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

cooking.set({
    entry: {
        'frame.min.js':['babel-polyfill', './src/index.js'],
    },
    dist: './build',
    // production
    clean: true,
    format: 'cjs',
    minimize: true,
    chunk: false, // see https://cookingjs.github.io/zh-cn/configuration.html#chunk
    urlLoaderLimit: 204800,
    postcss: [
        // require('...')
    ],
    extractCSS: false,//'[name].[contenthash:7].css'
    externals: [nodeExternals()],
    extends: ['vue2','less']//lint
});


cooking.add('output.filename', 'frame.min.js');
cooking.add('loader.js.exclude', /node_modules/);
cooking.add('vue.preserveWhitespace', false);

var config=cooking.resolve();

// config.plugins.push(new BundleAnalyzerPlugin());

module.exports = config;
