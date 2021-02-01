//用户修改信息功能
//导入User集合构造函数
const {User} = require('../../model/user');
//导入bcrypt模块
const bcrypt = require('bcrypt');

module.exports = async (req,res,next) => {
    //接收用户传递过来的请求参数
    let {username, email, role, state ,password} = req.body;
    //要修改的id
    let {id} = req.query;
    //根据提交id查找数据库
    let user = await User.findOne({_id: id});
    //验证密码正确性
    let isValid = await bcrypt.compare(password, user.password);
    if(isValid){
        //密码验证成功
        // res.send("Success")
        //将用户信息更新
        await User.updateOne({_id:id}, {
            username: username,
            email: email,
            role: role,
            state: state
        });
        //重定向页面
        res.redirect('/admin/user');
    }else{
        //密码验证失败
        next(JSON.stringify({path:'/admin/user-edit', message: '密码验证失败，请重新输入', id: id}));
    }
};