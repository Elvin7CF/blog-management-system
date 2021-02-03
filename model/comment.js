// 评论集合
// 导入mongoose模块
const mongoose = require('mongoose');
// 创建评论集合规则
const commentSchema = new mongoose.Schema({
    // 文章id
    articleID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Article'
    },
    // 用户id
    userID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    // 发表时间
    time: {
        type: Date
    },
    // 评论内容
    content: {
        type: String
    }
})
// 创建评论集合
const Comment = mongoose.model('Comment', commentSchema);

// 将评论集合构造函数作为模块成员导出
module.exports = {
    Comment
}