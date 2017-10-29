/*
* @Author: suwei
* @Date:   2017-10-16 22:08:45
* @Last Modified by:   suwei
* @Last Modified time: 2017-10-17 13:38:06
*/
var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var HtmlWebpackPlugin = require('html-webpack-plugin');

//环境变量的配置, dev / online
var WEBPACK_ENV = process.env.WEBPACK_ENV || 'dev';

//获取html-webpack-plugin参数的方法
var getHtmlConfig = function(name,title){
    return{
        template : './src/view/'+name+'.html',
        filename : 'view/'+name+'.html',
        favicon  : './favicon.ico',
        title    : title,
        inject   : true,
        hash     : true,
        chunks   : ['common',name]
    };
};
var config = {
	entry: {
        'common' : ['./src/page/common/index.js'],
        'index' : ['./src/page/index/index.js'],
        'login' : ['./src/page/login/index.js'],
    },
	output: {
 		path      : __dirname + '/dist/',
        publicPath: '/dist/',
        filename  : 'js/[name].js'
	},
	module: {  
        // 加载器配置  
        loaders: [ 
            { test: /\.css$/,loader: ExtractTextPlugin.extract({ fallback: 'style-loader', use: 'css-loader' })}, 
            { test: /\.(gif|png|jpg|woff|svg|eot|ttf)\??.*$/,loader: 'url-loader?limit=100&name=resource/[name].[ext]'},  
        ]          
    }, 
    resolve:{
        alias : {
            node_modules : __dirname + '/node_modules',
            util : __dirname + '/src/util',
            page : __dirname + '/src/page',
            img : __dirname + '/src/img',
            service : __dirname + '/src/service',
        }
    },
    plugins:[
        new webpack.ProvidePlugin({
        　　$: "jquery",
        　　jQuery: "jquery"
        }),
        //独立通用模块到js/base.js
        new webpack.optimize.CommonsChunkPlugin({
            name: "common",
            filename: "js/base.js",
        }),
        //把css单独打包到文件
        new ExtractTextPlugin("css/[name].css"),
        //html模板的处理
       new HtmlWebpackPlugin(getHtmlConfig('index','首页')),
       new HtmlWebpackPlugin(getHtmlConfig('login','登录页')),
    ] 
};
 if('dev' === WEBPACK_ENV){
    config.entry.common.push('webpack-dev-server/client?http://localhost:8088');
 }

module.exports = config;