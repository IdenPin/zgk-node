var express = require('express');
var router = express.Router();

router.get('/', function (req, res, next) {
    res.render('partials/news/news', {
        css: ['./biz/news/scss/news.css'],
        js: ['./bundle/news.min.js?postVersion=' + Math.random()],
        title: '资讯',
        //layout: false //不加载公共部分
    });
});

router.get('/news-detail', function (req, res, next) {
    res.render('partials/news/news-detail', {
        css: ['./biz/news/scss/news-detail.css'],
        js: ['./bundle/news.min.js?postVersion=' + Math.random()],
        title: '咨询详情',
        layout: false //不加载公共部分
    });
});

module.exports = router;
