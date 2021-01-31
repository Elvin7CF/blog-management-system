//引用express框架
const express = require('express');
//引入bcrypt模块
const bcrypt = require('bcrypt');
//传入User集合
const {User} = require('../model/user');

//创建博客展示页面路由对象
const admin = express.Router();

admin.get('/login', (req, res) => {
    res.render('admin/login');
});

//实现登录功能
admin.post('/login', async (req,res) => {
    //二次验证
    const {email, password} = req.body;
    //如果用户没有输入邮箱或者密码
    if( email.trim().length === 0 || password.trim().length === 0){
        return res.status(400).render('admin/error', { msg: "邮箱地址或者密码输入错误"});
    }
    //根据邮箱查询用户信息
    //如果查询成功，user为一个用户信息对象
    //如果没有查询到用户，user变量为空
    //这里要用异步函数，避免还搜索完全就先执行下行代码
    let user = await User.findOne({email});
    if(user){
        let isValid = await bcrypt.compare(password, user.password);
        //找到输入的邮箱,进行密码验证
        if(isValid){
            res.send('登陆成功');
        }else{
            res.status(400).render('admin/error', { msg: "邮箱地址或者密码输入错误"});
        }
    }else{
        //如果数据库中找不到输入的邮箱
        res.status(400).render('admin/error', { msg: "邮箱地址或者密码输入错误"});
    }

})

//创建用户列表路由
admin.get('/user', (req,res) => {
    res.render('admin/user');
})



//将admin模块作为一个admin路由对象暴露
module.exports = admin;
