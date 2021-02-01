// 引入mongoose模块
const mongoose = require('mongoose');
// 创建文章Schema
const articleSchema = mongoose.Schema({
    title: {
        type: String,
        maxlength: 20,
        minlength: 4,
        require: [true, '请输入文章标题']
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        require: [true, '请填写作者']
    },
    publishDate: {
        type: Date,
        default: Date.now
    },
    cover:{
        type: String,
        default: null
    },
    content: {
        type: String
    }
});
// 根据规则创建集合
const Article = mongoose.model('Article', articleSchema);


// 将集合规则作为模块成员导出
module.exports = {
    Article
}