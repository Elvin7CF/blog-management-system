//文章列表页面处理
module.exports = (req, res)=> {
    //标识当前访问的是文章管理页面
    req.app.locals.currentLink = 'article';

    //渲染文章列表模版
    res.render('admin/article');
}