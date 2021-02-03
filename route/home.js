const express = require('express');

//创建博客展示页面路由对象
const home = express.Router();

// 博客文章前台首页
home.get('/', require('./home/index'));

// 博客前台文章详情
home.get('/article', require('./home/article'));

// 评论表单接收处理
home.post('/comment', require('./home/comment'));


//将home模块作为一个home路由对象暴露
module.exports = home;
