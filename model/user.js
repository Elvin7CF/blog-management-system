//引入dotenv模块,把密钥隐藏在env文件
require('dotenv').config();
//创建用户集合
//引入mongoose第三方模块
const mongoose = require('mongoose');
//引入bcrypt模块
const bcrypt = require('bcrypt');
const saltRounds = 10;//哈希迭代次数
//创建用户集合规则
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        //非空
        required: true,
        //限定字符串长度
        minlength: 2,
        maxlength: 20
    },
    email: {
        type: String,
        required: true,
        //保证邮箱唯一
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true
    },
    // 0 启用状态
    // 1 禁用状态
    state: {
        type: Number,
        default: 0
    }
});
//创建集合
const User = mongoose.model('User', userSchema);
//创建超级管理员用户
async function createUser(){
    //运用bcrypt模块，哈希迭代保存在env文件的管理员密码
    const hashPass = await bcrypt.hash(process.env.ADMIN_PASS, saltRounds);
    const user = await User.create({
        username: 'elvin',
        email: 'elvin@test.com',
        password: hashPass,
        role: 'admin',
        state: 0
    });
};
// createUser(); 



//将用户集合作为模块成员导出
module.exports = {
    //后面可能会开放其他东西，所以这里导出一个对象
    //ES6，相当于User: User
    User
}

