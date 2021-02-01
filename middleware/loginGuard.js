//express中间件函数
//拦截函数
const guard = (req,res,next) => {
    //如果访问的不是登录页面且没有登陆
    if( req.url != '/login' && !req.session.username){
        res.redirect('/admin/login');
    }else{
        next();
    }
}

module.exports = guard;