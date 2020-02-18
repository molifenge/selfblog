//引入mongoose第三方模块
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
// 引入joi模块
const Joi = require('joi');

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
        minlength:2,
        maxlength:20
    },
    email:{
        type:String,
        // 保证邮箱地址不重复，因为要用这个作为登录名
        unique:true,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    //admin超级管理员
    //normal普通用户
    role:{
        type:String,
        required:true
    },
    state:{
        // 0--使用状态  1--禁用状态
        type:Number,
        default:0
    }
});
//创建集合（表）
const User = mongoose.model('User',userSchema);

async function createUser(){
    const salt = await bcrypt.genSalt();
    const pass = await bcrypt.hash('123456',salt);
    const user = await  User.create({
        username:'iteheima',
        email:'123456@qq.com',
        password:pass,
        role:'admin',
        state:0
    });
}

// createUser();

// 验证用户信息
const validateUser = user => {
    //定义验证规则
    const schema = {
        username:Joi.string().min(2).max(12).required().error(new Error('用户名不符合验证规则')),
        email:Joi.string().email().required().error(new Error('邮箱格式不符合要求')),
        // regex（正则表达式），范围在a-z、A-Z、0-9中，最短3，最长30
        password:Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).required().error(new Error('密码格式不符合要求')),
        // valid方法告诉客户端只传递normal和admin，除此之外都是不合法的
        role:Joi.string().valid('normal','admin').required().error(new Error('角色值非法')),
        state:Joi.number().valid(0,1).required().error(new Error('状态值非法'))
    };

    //实施验证
    return Joi.validate(user,schema);
}


//把用户集合作为模块成员进行导出
module.exports = {
    User,
    validateUser
};