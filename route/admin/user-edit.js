//添加用户信息功能
//引入User集合
const {User} = require('../../model/user');

module.exports = async(req,res) => {
    //标识当前访问的是用户管理页面
    req.app.locals.currentLink = 'user';
    
    //用es6的解构，获取地址栏的message, 和id
    let {message,id} = req.query;
    if(id){
        //如果当前传递了id参数，则为修改操作
        //修改操作
        let user = await User.findOne({_id: id});
        //渲染用户修改页面
        res.render('admin/user-edit', {
            errMsg: message,
            user: user,
            //根据用户提交id，在该路由上提供修改操作
            link: '/admin/user-modify?id=' + id,
            btn: "修改"
        });

    }else{
        // 否则为添加操作
        res.render('admin/user-edit', {
            errMsg: message,
            link: '/admin/user-edit',
            btn: "添加"
        });
    }
}