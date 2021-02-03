//文章编辑页面处理
//导入Article集合构造函数
const {Article} = require('../../model/article');

module.exports = async (req, res)=> {
    //标识当前访问的是文章管理页面
    req.app.locals.currentLink = 'article';

    let {message,id} = req.query;

    if(id){
        //如果当前传递了id参数，则为修改操作
        //修改操作
        let article = await Article.findOne({_id: id});
        //渲染用户修改页面
        res.render('admin/article-edit', {
            errMsg: message,
            article: article,
            //根据用户提交id，在该路由上提供修改操作
            link: '/admin/article-modify?id=' + id,
            btn: "修改"
        });

    }else{
        // 否则为添加操作
        res.render('admin/article-edit', {
            errMsg: message,
            link: '/admin/article-add',
            btn: "添加"
        });
    }
}