console.info('资讯页面');


var promise = $.ajax({
    url:'http://zj.zhigaokao.cn/gkhot/getGkHotList.do?userKey=zj&req=ajax&type=1'
});
promise
    .then(function(res){
    });
