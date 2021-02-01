//登出功能
module.exports = (req, res) => {
    //删除session保存的数据
    req.session.destroy((err)=>{
        if(!err){
            //删除cookie
            res.clearCookie('connect.sid');
            //重定向到用户登录界面
            res.redirect('/admin/login');
            //清除模版中的用户信息
            req.app.locals.userInfo = null;
        }
    })
};