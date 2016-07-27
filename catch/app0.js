var express = require('express');
var exphbs = require('express-handlebars');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var route = require("./routes/route");
var log4js = require('log4js');
var log = require('./log');
var router = express.Router();
var compression = require('compression'); //Gzip压缩

var app = express();
var zgkNode = express();


// 设置模板引擎，模板渲染文件夹
app.engine('.hbs', exphbs({
    extname: '.hbs',
    defaultLayout: 'layout',
    layoutsDir: path.join(__dirname, '/views/layouts'),
    partialsDir: path.join(__dirname, '/views/common')
    // helpers: hbsHelpers
}));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// 设置网站icon
app.use(favicon(path.join(__dirname, '/', 'favicon.ico')));
app.use(logger('dev'));
app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(cookieParser());

// 设置sass编译
//app.use(require('node-sass-middleware')({
//    src: path.join(__dirname, 'public'),
//    dest: path.join(__dirname, 'public'),
//    indentedSyntax: true,
//    sourceMap: true
//}));


//===========
//////设置项目名称
////app.locals.appName = "zgk-node";
////app.use("/" + app.locals.appName, zgkNode);
//
//
//// 设置静态资源目录
//app.use("/" + app.locals.appName, express.static("public"));
//zgkNode.use(function (req, res, next) {
//    //项目名称
//    res.locals.rootPath = "/" + app.locals.appName;
//    //res.locals.rootView = path.join(__dirname, app.locals.appName);
//    //项目views绝对路径
//    res.locals.rootView = __dirname + "/views";
//    //res.locals.rootView = path.join(__dirname, 'views');
//    next();
//});
//==============
//配置静态资源目录
//app.use(express.static("/" + app.locals.appName, express.static("public")));
app.use(express.static(path.join(__dirname, 'public')));

app.locals.appName = "zgk-node";
app.use("/" + app.locals.appName, zgkNode);
//项目名称
app.locals.rootPath = "/" + app.locals.appName;
//项目views绝对路径
app.locals.rootView = __dirname + "/views";

//设置跨域访问
app.all('*', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By", ' 3.2.1');
    next();
});

// 日志记录
log.use(app);

// 路由配置
//route.init(zgkNode);
var dataChunck = require("fs").readFileSync('./stats.json');
var chunckName = JSON.parse(dataChunck.toString()).assetsByChunkName;
var chunckJs = chunckName.index.substring(1,chunckName.index.length);


app.get('/', function (req, res, next) {
    res.render('partials/app/index', {
        css: './biz/app/scss/index.css',
        js:'./biz/app/js'+chunckJs,
        // js:'./biz/app/js/index.js',
        title: 'pdeng',
        //layout: false //不加载公共部分
    });
});

// 404错误处理
app.use(function (req, res, next) {
    var err = new Error('404: Not Found ' + req.originalUrl);
    err.status = 404;
    next(err);
});

// 500错误
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    console.error(err.message);
    res.render('error', {
        message: err.message,
        error: err
    });
});


module.exports = app;
