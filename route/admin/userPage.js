//导入用户集合构造函数
const {User} = require('../../model/user')
//渲染用户管理页面
module.exports = async (req,res) => {
    //标识当前访问的是用户管理页面
    req.app.locals.currentLink = 'user';
    
    //接收客户端传递过来的当前页参数
    const page = req.query.page || 1;
    //每页显示的数据条数
    const pageSize = 5;
    //查询用户总数
    const count = await User.countDocuments({});
    //总页数,ceil向上取整
    const pageTotal = Math.ceil(count/pageSize);
    //页码对应开始位置
    const start =  (page-1)*pageSize;
    //将用户信息从数据库中查询出来,limit()限制查询数量，skip()为开始查询位置
    const users = await User.find().limit(pageSize).skip(start);
    //渲染用户列表模块
    res.render('admin/user', {
        users: users,
        page: page,
        pageTotal: pageTotal,
        count: count
    });
};