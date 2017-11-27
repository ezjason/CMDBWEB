var config=require('./cooking.conf.js');
// var BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;


config.plugins.shift();//去除模版渲染
// config.plugins.push(new BundleAnalyzerPlugin());


config.entry= {
    'frame': './src/index.js',
};

config.output= {
    filename: './build/[name].js',
    library: 'atm',
    libraryTarget: 'umd',
};

module.exports = config;
