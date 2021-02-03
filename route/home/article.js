// 文章详情页面请求处理函数
//导入Article集合构造函数
const {Article} = require('../../model/article');
// 导入comment集合构造函数
const {Comment} = require('../../model/comment');

module.exports = async (req ,res) => {
    const {id} = req.query;
    // 通过id，查找数据库的文章
    const article = await Article.findOne({_id: id}).populate('author').lean();
    const comments = await Comment.find({articleID: id}).populate('userID').lean();
    // res.send(article);

    // res.send(comments);

    // 渲染文章详情页面
    res.render('home/article',{ article, comments});
}