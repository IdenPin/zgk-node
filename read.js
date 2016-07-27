//var fs = require('fs'),
//    stdin = process.stdin,
//    stdout = process.stdout;
//var stats = [];
//
//fs.readdir(process.cwd(), function(err, files) {
//    console.log(' ');
//
//    if (!files.length) {
//        return console.log(' \033[31m No files to show!\033[39m\n');
//    }
//
//    function file(i) {
//
//        var filename = files[i];
//
//
//        fs.stat(__dirname + '/' + filename, function(err, stat) {
//            stats[i] = stat;
//            if (stat.isDirectory()) {
//                console.log(' ' + i + ' \033[36m' + filename + '/\033[39m');
//            } else {
//                console.log(' ' + i + ' \033[90m' + filename + '\033[39m');
//            }
//
//            i++;
//
//            if (i == files.length) {
//                read();
//            } else {
//                file(i);
//            }
//        });
//    }
//
//    function read() {
//        console.log(' ');
//        stdout.write(' \033[33mEnter your choice : \033[39m');
//        stdin.resume();
//        stdin.setEncoding('utf8');
//        stdin.on('data', option);
//    }
//
//    function option(data) {
//        var filename = files[Number(data)];
//        if (!files[Number(data)]) {
//            stdout.write(' \033[mEnter your choice : \033[39m');
//        } else if (stats[Number(data)].isDirectory()) {
//            fs.readdir(__dirname + '/' + filename, function(err, files) {
//                console.log(' ');
//                console.log(' (' + files.length + 'files)');
//                files.forEach(function(file) {
//                    console.log(' - ' + file);
//                });
//                console.log(' ');
//            });
//        } else {
//            stdin.pause();
//            fs.readFile(__dirname + '/' + filename, 'utf8', function(err, data) {
//                console.log(' ');
//                console.log('\033[90m' + data.replace(/(.*) /g, ' $1') + '\033[39m');
//            });
//        }
//    }
//
//    file(0);
//});
var webpack = require('webpack');
var path = require('path');
var fs = require('fs');
//function explorer(path) {
//    fs.readdir(path, function (err, files) {
//        //err 为错误 , files 文件名列表包含文件夹与文件
//        if (err) {
//            console.log('error:\n' + err);
//            return;
//        }
//        files.forEach(function (file) {
//            fs.stat(path + '/' + file, function (err, stat) {
//                if (err) {
//                    console.log(err);
//                    return;
//                }
//                if (stat.isDirectory()) {
//                    // 如果是文件夹遍历
//                    explorer(path + '/' + file);
//                } else {
//                    // 读出所有的文件
//                    console.log('文件名:' + path + '/' + file);
//                }
//            });
//
//        });
//
//    });
//}
//explorer(path);

var fileListEntry = [];
var entryJsListObj = {};
function getEntry(pathName, callback) {
    var names = fs.readdirSync(pathName);
    names.forEach(function (name) {
        var fileListStat = fs.statSync(pathName + '/' + name);
        if (fileListStat.isDirectory()) {
            // 如果是文件夹遍历
            getEntry(pathName + '/' + name, callback)
        } else {
            // 读出所有的文件
            callback(pathName + '/' + name);
        }
    });
}
getEntry('/Users/pdeng/git/zgk-node/public/biz', function (callback) {
    fileListEntry.push(callback);
    for (var i in fileListEntry) {
        if (fileListEntry[i].match(/(.+)\.js$/)) {
            var lastIndex = matchJson[0].lastIndexOf('/');
            entryJsListObj[matchJson[0].substring(lastIndex + 1, matchJson[0].length - 3)] = matchJson[0];
        }
    }
});
console.info('entryJsListObj',entryJsListObj)





