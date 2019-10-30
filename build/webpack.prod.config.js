const path = require("path");
const webpack = require("webpack");
const merge = require('webpack-merge')
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const commonConfig = require('./webpack.base.config.js')
const PurifyCSS = require('purifycss-webpack')
const glob = require('glob-all')
const WorkboxPlugin = require('workbox-webpack-plugin') // 引入 PWA 插件

module.exports = merge(commonConfig, {
    mode: "production", //webpack 4.0 要申明这个
    output: {
        // 输出目录
        path: path.resolve(__dirname, "../dist"),
        // 文件名称
        filename: '[name].[contenthash:5].js',
        chunkFilename: '[name].[contenthash:5].js'
    },
    devtool: 'cheap-module-source-map',
    optimization: {
        usedExports: true,   //js Tree Shaking 清除到代码中无用的js代码，只支持import方式引入，不支持commonjs的方式引入
        splitChunks: {
            chunks: "all", // 所有的 chunks 代码公共的部分分离出来成为一个单独的文件
            cacheGroups: {
                vendors: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendors'
                }
            }
        },
    },
    plugins: [
        new CleanWebpackPlugin(),// 打包时删除之前的文件
        // 清除无用 css---生产环境---csstree-shaking
        new PurifyCSS({
            paths: glob.sync([
                // 清除无用 css---生产环境-- 对于 css的tree shaking 使用 purifycss-webpack 配合 glob-all来实现 。
                path.resolve(__dirname, '..', 'src/*.html'),
                path.resolve(__dirname, '..', 'src/*.js'),
                path.resolve(__dirname, '..', 'src/**/*.jsx'),
            ])
        }),
        // PWA配置，生产环境才需要,PWA优化策略,在你第一次访问一个网站的时候，如果成功，做一个缓存，当服务器挂了之后，你依然能够访问这个网页 ，这就是PWA。那相信你也已经知道了，这个只需要在生产环境，才需要做PWA的处理，以防不测。
        new WorkboxPlugin.GenerateSW({
            clientsClaim: true,
            skipWaiting: true
        }),
    ]
});
