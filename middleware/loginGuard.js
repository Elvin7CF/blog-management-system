//express中间件函数
//拦截函数
const guard = (req,res,next) => {
    //如果访问的不是登录页面且没有登陆
    if( req.url != '/login' && !req.session.username){
        res.redirect('/admin/login');
    }else{
        // 如果用户是登录状态，且为普通用户
        if(req.session.role == 'normal'){
            // 跳转到博客首页 阻止程序向下执行
            return res.redirect('/home');
        }
        //用户是登录状态且是超级管理员 允许放行
        next();

    }
}

module.exports = guard;