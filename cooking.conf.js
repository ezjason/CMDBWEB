var path = require('path');
var cooking = require('cooking');
var packageConfig = require('./package.json');
var CompressionPlugin = require("compression-webpack-plugin");

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
        port: 8080,//本地访问端口
        publicPath: '/',
        proxy: {
            '/': {
                 target: 'http://192.168.11.60',
            }
        }
    },

    // production
    clean: true,
    hash: true,
    sourceMap: !isProd,
    minimize: true,
    chunk: false, // see https://cookingjs.github.io/zh-cn/configuration.html#chunk
    postcss: [
        // require('...')
    ],
    publicPath: '',
    assetsPath: 'static',
    urlLoaderLimit: 204800,
    extractCSS: false,//'[name].[contenthash:7].css'
    externals: {},
    alias: {
        // 'src': path.join(__dirname, 'src'),
        'vue': 'vue/dist/vue.min',
        // 'cron': 'src/components/cron/render.vue',
        // 'vue-gridster': 'vue-gridster/dist/vue-grid-layout.min.js',
    },
    extends: ['vue2', 'less', 'autoprefixer']//lint
});

var webpackConfig=cooking.resolve();

/*if(isProd){
    webpackConfig.plugins.push(
        new CompressionPlugin({
            asset: "[path].gz[query]",
            algorithm: "gzip",
            // test: /\.js$|\.html$/,
            threshold: 10240,
            minRatio: 0.8
        })
    );
}*/

module.exports = webpackConfig;
