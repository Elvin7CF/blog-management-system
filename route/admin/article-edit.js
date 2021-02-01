//文章编辑页面处理
module.exports = (req, res)=> {
    //标识当前访问的是文章管理页面
    req.app.locals.currentLink = 'article';

    //渲染文章编辑页面模版
    res.render('admin/article-edit');
}