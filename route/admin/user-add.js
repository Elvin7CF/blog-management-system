//添加 用户信息
//引入用户集合
const {User,validateUser} = require('../../model/user');
//引入bcrypt加密模块
const bcrypt = require('bcrypt');
const saltRound = 10;

module.exports = async (req,res,next) => {
    try {
        await validateUser(req.body);
    } catch (error) {
        //验证失败
        // 重定向并通过地址栏传递错误信息,es6语法`{ }`，加return才不会与后面的结束操作冲突
        // return res.redirect(`/admin/user-edit?message=${error.message}`);

        //这里向express的error处理中间件传入参数，next()只能接受字符串
        //用JSON.stringify()转换为字符串
        return next(JSON.stringify({path: '/admin/user-edit', message: error.message}));
    }

    //根据邮箱查看数据库中是否存在
    const user =await User.findOne({email: req.body.email});
    // 已存在，邮箱地址被占用
    if(user){
        //重定向，发送错误信息
        // return res.redirect(`/admin/user-edit?message=${"邮箱已经被占用"}`);
        return next(JSON.stringify({path: '/admin/user-edit',  message: "邮箱已经被占用"}));
    }
    //对密码进行加密
    req.body.password = await bcrypt.hash(req.body.password,saltRound);
    //将用户信息添加到数据库
    User.create(req.body);
    //重定向用户列表
    res.redirect('/admin/user');
    
};