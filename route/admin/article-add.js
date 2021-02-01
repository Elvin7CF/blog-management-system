//文章添加功能

// 引入formidable模块
const formidable = require('formidable');
//引入path系统模块
const path = require('path');

module.exports = (req, res) => {
    //创建表单解析对象
    const form = new formidable.IncomingForm();
    //设置文件上传路径，推荐写绝对路径
    form.uploadDir = path.join(__dirname,'../','../','public','uploads');
    //保留上传文件扩展名
    form.keepExtensions = true;
    //对表单进行解析
    form.parse(req, (err, fields, files) => {
        res.send(files);
    });
    // res.send("OK");
}