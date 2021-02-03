// 评论表单接收
// 导入评论集合构造函数
const {Comment} = require('../../model/comment');

module.exports = async (req, res) => {
    const {content, userID, articleID} = req.body;

    await Comment.create({
        articleID: articleID,
        userID: userID,
        content: content,
        time: new Date()
    });
    res.redirect(`/home/article?id=${articleID}`);
}