//文章列表页面处理
//引入文章集合构造函数
const {Article} = require('../../model/article');
//导入mongoose-sex-page模块实现分页
const pagination = require('mongoose-sex-page');

module.exports = async (req, res) => {
    //标识当前访问的是文章管理页面
    req.app.locals.currentLink = 'article';
    //接收客户端传递过来的页码
    let page = req.query.page;

    //查询所有文档
    //RangeError: Maximum call stack size exceeded
    //直接查找返回的是mongoose文档对象！超出栈内存，链式调用lean()，返回普通对象
    //模块实现分页
    //page 指定当前页
    //size 每页显示数据条数
    //display 显示页码数
    //exec 像数据库发送查询请求
    let articles = await pagination(Article).find().page(page).size(6).display(3).populate('author').exec();
    
    //在引入pagination后无法继续链式调用lean方法，这里把articles转变为普通JSON对象
    articles = JSON.parse(JSON.stringify(articles));
    // res.send(articles);

    // 渲染文章列表模版
    res.render('admin/article', {
        articles: articles
    });
}