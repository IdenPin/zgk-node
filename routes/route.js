/**
 * 路由配置列表
 * pdeng
 * @type {*|exports}
 */

//路由控制器
var routes = {
    "/": require("./app/index.ctrl"),
    "/news": require("./news/news.ctrl"),
};
var init = function (app) {
    console.log("初始化路由!");
    for (var r in routes) {
        app.use(r, routes[r]);
    }
};
exports.init = init;
