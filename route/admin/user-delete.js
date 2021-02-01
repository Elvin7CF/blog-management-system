//删除用户功能
//引入用户集合
const {User} =require("../../model/user");
//method get 提交的form属性是从地址栏发送过来的，所以用query接收
module.exports = (req, res)=>{
    User.findOneAndDelete({_id: req.query.id},function(err) {
        if(!err){
            res.redirect("/admin/user");
        }else{
            console.log(err);
        }
    });
}