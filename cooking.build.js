var path = require('path');
var cooking = require('cooking');
var nodeExternals = require('webpack-node-externals');
var BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

cooking.set({
    entry: {
        'frame': './src/index.js',
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
    externals: [{
        vue: 'vue',
        jquery:'jquery',
        underscore:'underscore',
        'element-ui':'element-ui',
    }, nodeExternals()],
    alias: {
        'vue': 'vue/dist/vue.min',
    },
    extends: ['vue2','less']//lint
});


cooking.add('output.filename', '[name].min.js');
cooking.add('loader.js.exclude', /node_modules/);
cooking.add('vue.preserveWhitespace', false);

var config=cooking.resolve();

config.plugins.push(new BundleAnalyzerPlugin());

module.exports = config;
