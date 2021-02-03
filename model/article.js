// 引入mongoose模块
const mongoose = require('mongoose');
//引入joi模块
const Joi = require('joi');
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

const validateArticle = (article) => {
    //定义用户对象规则
    const schema = Joi.object({
        title: Joi.string().min(4).max(20).required().error(new Error("输入标题不符合要求")),
        author: Joi.string().error(new Error("输入作者不符合要求")),
        publishDate: Joi.date().max('now').error(new Error("输入日期不符合要求")),
        cover: Joi.string().error(new Error("图片不符合要求")),
        content: Joi.string().error(new Error("内容不符合要求"))
    });

    //实施验证,返回一个promise对象
    return schema.validateAsync(article);
};


// 将集合规则作为模块成员导出
module.exports = {
    Article,
    validateArticle
}