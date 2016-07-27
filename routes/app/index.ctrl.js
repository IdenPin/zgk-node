var express = require('express');
var router = express.Router();
var nowVersion = '?nowVersion=' + new Date().getTime();
var staticPath = '';
router.get('/', function (req, res, next) {
    res.render('partials/app/index', {
        css: [
            'bundle/biz/app/scss/index.css' + nowVersion
        ],
        js: [
            'bundle/index.min.js' + nowVersion,
            'bundle/common.min.js' + nowVersion
        ],
        title: '首页',
        //layout: false //不加载公共部分
    });
});

module.exports = router;
