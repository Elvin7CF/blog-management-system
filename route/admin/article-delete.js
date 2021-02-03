//文章删除功能
//导入文章集合
const {Article} = require('../../model/article');

module.exports = (req, res) => {
    Article.findOneAndDelete({_id: req.query.id},function(err) {
        if(!err){
            res.redirect("/admin/article");
        }else{
            console.log(err);
        }
    });
}