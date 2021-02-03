//文章添加功能
// 引入formidable模块
const formidable = require('formidable');
//引入path系统模块
const path = require('path');
//引入Article集合
const {Article,validateArticle} = require('../../model/article');

module.exports =  (req, res ,next) => {

    //创建表单解析对象
    const form = new formidable.IncomingForm();
    //设置文件上传路径，推荐写绝对路径
    form.uploadDir = path.join(__dirname,'../','../','public','uploads');
    //保留上传文件扩展名
    form.keepExtensions = true;
    //对表单进行解析
    form.parse(req, async (err, fields, files) => {
        //验证输入数据是否符合要求
        try {
            await validateArticle(fields);
        } catch (error) {
            return next(JSON.stringify({path: '/admin/article-edit', message: error.message}));
        }

        //回调函数，若解析出错，err保存错误信息；成功则err为空
        //fields存储除了文件外其他普通的表单请求参数
        //files存储上传文件信息，path保存的事服务器的绝对路径，需要用split对路径进行切割
        // console.log(files.cover.path.split('public')[1]);
        //先数据库插入文章信息
        await Article.create({
            title: fields.title,
            author: fields.author,
            publishDate: fields.publishDate,
            cover: files.cover.path.split('public')[1],
            content: fields.content,
        });
        res.redirect('/admin/article');
    });
    // res.send("OK");
}