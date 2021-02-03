//jshint esversion:6
const express = require('express');
//处理路径
const path = require('path');
//引入body-parser模块
const bodyParser = require('body-parser');
//引入express-session模块
const session = require('express-session');
// 导入art-template模块
const template = require('art-template');
//引入dateformat模块
const dateFormat = require('dateformat');
//导入morgan模块
// const morgan = require('morgan');
//导入config模块
// const config = require('config');


//创建网站服务器
const app = express();
//数据库连接
require('./model/connect');
//处理post请求参数,false为用系统模块处理post请求，true为用第三方模块处理
app.use(bodyParser.urlencoded({extended: false}));
//配置session, secret为密钥
app.use(session({
    secret: "Our little secret.",
    resave: false,
    // 未登陆不保存cookie
    saveUninitialized: false,
    // 若不指定cookie过期时间，则关闭浏览器后会删除cookie
    // 手动设置cookie过期时间,maxAge单位为毫秒，这里设置为一天
    cookie: {
        maxAge: 24 * 60 * 60 * 1000 
    }
}));

//配置art模版引擎
//告诉express，模版所在位置
app.set('views', path.join(__dirname, 'views'));
//告诉express，模版的默认后缀
app.set('view engine', 'art');
//因为express允许使用多个模版，这个有必要告诉express，当渲染art模版时，所使用的模版引擎
app.engine('art', require('express-art-template'));
//向模版内部导入dateFormat变量
template.defaults.imports.dateFormat = dateFormat;

//开放静态资源文件
app.use(express.static(path.join(__dirname, 'public')));

// 查看当前环境是生产环境还是开发环境
// development 开发环境
// production 生产环节
// if(process.env.NODE_ENV == "development") {
//     console.log("当前是开发环境");
//     // 开发环境 将客户端的请求信息打印到控制台
//     app.use(morgan('dev'));
// }else{
//     console.log("当前是生产环境");
// }

//引入home路由模块
const home = require('./route/home');
const admin = require('./route/admin');

//拦截请求，判断用户登录状态，一定要写在路由匹配之前
//拦截作用在/admin，是指拦截所以包含/admin的子路由
app.use('/admin', require('./middleware/loginGuard'));

//为路由匹配请求路径
app.use('/home', home);
app.use('/admin', admin);

// express错误处理中间件，next()接收的参数传进err
app.use((err, req, res, next) => {
    //先显示错误内容
    console.log(err);
    //把JSON字符串转换为对象
    const result = JSON.parse(err);
    let params = [];
    //把除去path参数，其余属性放进一个数组
    for(let attr in result){
        if(attr != 'path'){
            params.push(attr + '=' + result[attr]);
        }
    }
    //传入错误信息并重定向,用&分隔params里的参数
    res.redirect(`${result.path}?${params.join('&')}`);
})


//80为路由器localhost默认端口
app.listen(3000, function(){
    console.log("Server started on port 3000.");
});