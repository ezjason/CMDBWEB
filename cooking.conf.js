var path = require('path');
var cooking = require('cooking');
var packageConfig = require('./package.json');
var CompressionPlugin = require("compression-webpack-plugin");
var BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

var isProd = process.env.NODE_ENV === 'production';

cooking.set({
    entry: {
        app: ['babel-polyfill', './src/main.js']
    },
    dist: './dist',
    template:[
        {
            title: packageConfig.description,
            filename: 'index.html',
            template: './index.tpl',
            favicon:'./src/static/img/favicon.ico',
            // chunks: ['vendor', 'manifest', 'asd']
        }
    ],
    devServer: {
        port: 9090,//本地访问端口
        enable: true,
        publicPath: '/',
        hostname:'192.168.23.1',
        protocol:'http:',
        /*proxy: {
            '/': {
                 target: 'http://192.168.20.49',
            }
        }*/
    },

    // production
    clean: true,//打包清理dist目录
    hash: true,
    sourceMap: !isProd,
    minimize: true,
    chunk: true, // see https://cookingjs.github.io/zh-cn/configuration.html#chunk
    postcss: [
        // require('...')
    ],
    publicPath: '',
    assetsPath: 'static',
    urlLoaderLimit: 204800,
    extractCSS: false,//'[name].[contenthash:7].css'
    externals: {},
    alias: {
        'vue': 'vue/dist/vue.min',
    },
    extends: ['vue2', 'less', 'autoprefixer']//lint
});

var webpackConfig=cooking.resolve();

if(isProd){
    webpackConfig.plugins.push(new BundleAnalyzerPlugin());
    webpackConfig.plugins.push(
        new CompressionPlugin({
            asset: "[path].gz[query]",
            algorithm: "gzip",
            // test: /\.js$|\.html$/,
            threshold: 10240,
            minRatio: 0.8
        })
    );
}

module.exports = webpackConfig;
