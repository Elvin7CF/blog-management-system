// 博客前台首页请求处理函数
// 导入文章集合
const {Article} = require('../../model/article');
// 导入分页模块
const pagination = require('mongoose-sex-page');

module.exports = async (req, res) => {

    // 用分页查询查找文章集合数据,pupulate是多级查询
    let articles = await pagination(Article).page(req.query.page).size(4).display(5).find().populate('author').exec();
    articles = JSON.parse(JSON.stringify(articles));
    // res.send(articles);

    //渲染模版，并传递数据
    res.render('home/default', {articles: articles});
}