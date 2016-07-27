var webpack = require('webpack');
var path = require('path');
var fs = require('fs');
var commonsPlugin = new webpack.optimize.CommonsChunkPlugin('bundle/common.min.js'); // 引入插件(公用部分)
var commonProvidePlugin = new webpack.ProvidePlugin({
    $: "jquery",
    jQuery: "jquery",
    "window.jQuery": "jquery"
});
// definePlugin 会把定义的string 变量插入到Js代码中。
var definePlugin = new webpack.DefinePlugin({
    __DEV__: JSON.stringify(JSON.parse(process.env.BUILD_DEV || 'true')),
    __PRERELEASE__: JSON.stringify(JSON.parse(process.env.BUILD_PRERELEASE || 'false'))
});
var srcDir = path.resolve(process.cwd(), 'public');  //Users/pdeng/git/zgk-node/public
var assets = 'public/';

//=========设置动态js文件入口============
var fileListEntry = [];
var entryJsListObj = {};
var jsDir = path.resolve(srcDir, 'biz/');
function genEntries(pathName, callback) {
    var names = fs.readdirSync(pathName);
    names.forEach(function (name) {
        var fileListStat = fs.statSync(pathName + '/' + name);
        if (fileListStat.isDirectory()) {
            genEntries(pathName + '/' + name, callback)
        } else {
            callback(pathName + '/' + name);
        }
    });
}
genEntries(jsDir, function (callback) {
    fileListEntry.push(callback);
    for (var i in fileListEntry) {
        var matchJson = fileListEntry[i].match(/(.+)\.js$/);
        if (matchJson) {
            var lastIndex = matchJson[0].lastIndexOf('/');
            entryJsListObj[matchJson[0].substring(lastIndex + 1, matchJson[0].length - 3)] = matchJson[0];
        }
    }
});
//========设置动态js文件入口=============

console.info('entryJsListObj',entryJsListObj)
module.exports = {
    entry: entryJsListObj,
    output: {
        path: path.resolve(assets),
        filename: 'bundle/[name].min.js',
        //filename: 'js/[chunkhash:8].[name].min.js',
        chunkFilename: 'js/[chunkhash:8].chunk.min.js',
        hotUpdateChunkFilename: 'http://www.zhigaokao.cn/js/[id].[chunkhash:8].min.js', //本地开发
        publicPath: 'http://www.zhigaokao.cn/'
    },
    plugins: [
        commonsPlugin,
        commonProvidePlugin
    ],
    module: {
        loaders: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
            },
            {
                test: /\.css$/,
                loader: 'style-loader!css-loader',
            },
            {
                test: /\.scss$/,
                loader: 'style-loader!css-loader!sass-loader',
                //loader:'style!css!sass?',
                //"-loader"其实是可以省略不写的，多个loader之间用“!”连接起来
            },
            {
                test: /\.(png|jpg)/,
                loader: 'url-loader?limit=8192',
            },
        ]
    },
    resolve: {
        root: __dirname,
        extension: ['', '.js', '.json'],  //自动扩展文件后缀名，意味着我们require模块可以省略不写后缀名
        alias: {}
    }
};
if (definePlugin.definitions.__DEV__) {
    console.info('__DEV__');
}
