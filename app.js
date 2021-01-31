//jshint esversion:6
const express = require('express');
//处理路径
const path = require('path');
//引入body-parser模块
const bodyParser = require('body-parser');
//创建网站服务器
const app = express();
//数据库连接
require('./model/connect');
//处理post请求参数,false为用系统模块处理post请求，true为用第三方模块处理
app.use(bodyParser.urlencoded({extended: false}));

//配置art模版引擎
//告诉express，模版所在位置
app.set('views', path.join(__dirname, 'views'));
//告诉express，模版的默认后缀
app.set('view engine', 'art');
//因为express允许使用多个模版，这个有必要告诉express，当渲染art模版时，所使用的模版引擎
app.engine('art', require('express-art-template'));

//开放静态资源文件
app.use(express.static(path.join(__dirname, 'public')));

//引入home路由模块
const home = require('./route/home');
const admin = require('./route/admin');

//为路由匹配请求路径
app.use('/home', home);
app.use('/admin', admin);


//80为路由器localhost默认端口
app.listen(3000, function(){
    console.log("Server started on port 3000.");
});