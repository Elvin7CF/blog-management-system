const express = require('express');

//创建博客展示页面路由对象
const home = express.Router();

home.get('/', (req, res) => {
    res.send("欢迎来到博客首页");
});

//将home模块作为一个home路由对象暴露
module.exports = home;
