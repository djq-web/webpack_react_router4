const path = require("path");
const merge = require('webpack-merge')
const commonConfig = require('./webpack.base.config.js')
const webpack = require("webpack");
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');
module.exports = merge(commonConfig, {
    mode: "development", //webpack 4.0 要申明这个
    devtool: 'cheap-module-eval-soure-map',
    output: {
        // 输出目录
        path: path.resolve(__dirname, "../dist"),
        // 文件名称
        filename: "bundle.js",
        chunkFilename: '[name].js'
    },
    plugins: [
        //开启HMR(热替换功能,替换更新部分,不重载页面！) 相当于在命令行加 --hot
        new webpack.HotModuleReplacementPlugin(),
        new webpack.DefinePlugin({
            'ENV': JSON.stringify("development"),
            'process.env': {
                VUEP_BASE_URL: '/'
            }
        }),
        //识别某些类别的webpack错误
        new FriendlyErrorsPlugin({
            // 运行成功
            compilationSuccessInfo: {
                message: ['你的应用程序在这里运行http://localhost:8001'],
                notes: ['有些附加说明要在成功编辑时显示']
            },
            // 运行错误
            onErrors: function (severity, errors) {
                //您可以收听插件转换和优先级的错误, 严重性可以是'错误'或'警告'
            },
            //是否每次编译之间清除控制台,默认为true
            clearConsole: true,
            //添加格式化程序和变换器（见下文）
            additionalFormatters: [],
            additionalTransformers: []
        })
    ],
    devServer: {
        contentBase: path.resolve(__dirname, "../dist"), //  指定访问资源目录
        historyApiFallback: true, //  该选项的作用所有的404都连接到index.html
        disableHostCheck: true,   //  绕过主机检查
        inline: true,             //  改动后是否自动刷新
        host: 'localhost',        //  访问地址
        port: 8001,               // 访问端口
        overlay: true,         //  出现编译器错误或警告时在浏览器中显示全屏覆盖
        stats: "errors-only",     // 显示捆绑软件中的错误
        compress: true,           // 对所有服务启用gzip压缩
        open: true,               // 自动打开浏览器
        progress: true,            // 显示编译进度
        proxy: {
            // 代理到后端的服务地址
            "/api": "http://localhost:8000"
        }
    }
});
