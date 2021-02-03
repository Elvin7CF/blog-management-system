// 登录功能
//引入bcrypt模块
const bcrypt = require('bcrypt');
//传入User集合
const {User} = require('../../model/user');

//登录验证
module.exports = async (req,res) => {
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
            //用户登录成功，将用户名存储在session对象中
            req.session.username = user.username;
            // 用户登录成功，将用户角色存储在session对象中
            req.session.role = user.role;
            //将用户信息保存在app.locals对象下面，这个数据在所有的模板中都可以获取到
            req.app.locals.userInfo = user;
            // 对用户角色进行判断
            if(user.role == 'admin'){
                // 用户角色为超级管理员，重定向到用户管理页面
                res.redirect('/admin/user');
            }else{
                // 用户角色为普通用户，重定向到文章首页
                res.redirect('/home');
            }

            //重定向到user页面
        }else{
            res.status(400).render('admin/error', { msg: "邮箱地址或者密码输入错误"});
        }
    }else{
        //如果数据库中找不到输入的邮箱
        res.status(400).render('admin/error', { msg: "邮箱地址或者密码输入错误"});
    }

}