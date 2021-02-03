//引用express框架
const express = require('express');

//创建博客展示页面路由对象
const admin = express.Router();

//渲染登录页面
admin.get('/login', require('./admin/loginPage'));

//实现登录功能
admin.post('/login', require('./admin/login'));

//登出功能
admin.get('/logout', require('./admin/logout'));

//渲染用户列表
admin.get('/user', require('./admin/userPage'));

//用户编辑页面
admin.get('/user-edit', require('./admin/user-edit'));

//用户添加功能
admin.post('/user-add', require('./admin/user-add'));

//用户修改功能
admin.post('/user-modify', require('./admin/user-modify'));

//用户删除功能
admin.get('/user-delete', require('./admin/user-delete'));

//渲染文章列表
admin.get('/article', require('./admin/article'));

//文章编辑页面
admin.get('/article-edit', require('./admin/article-edit'));

//文章添加页面
admin.post('/article-add', require('./admin/article-add'));

//文章修改页面
admin.post('/article-modify', require('./admin/article-modify'));

//文章删除页面
admin.get('/article-delete', require('./admin/article-delete'));

//将admin模块作为一个admin路由对象暴露
module.exports = admin;
