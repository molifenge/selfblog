

const {User,validateUser} = require('../../model/user');

const bcrypt = require('bcryptjs');

module.exports = async (req,res,next) => {

    

    try{
        await validateUser(req.body)
    }catch(e){
        //验证没有通过
        // res.redirect('/admin/user-edit?message='+ e.message);
        // JSOM.stringify() 将对象数据类型转化成字符串
        
        return next(JSON.stringify({path:'/admin/user-edit',message:e.message}));
    }
    
    //根据邮箱地址查询用户是否存在
    let user = await User.findOne({email:req.body.email});
    // 如果用户已经存在，就说明邮箱地址已经被使用
    if(user){
        return next(JSON.stringify({path:'/admin/user-edit',message:'该邮箱已经被占用'}));
    }
    // 对密码进行加密处理
    // 生成随机字符串
    const salt = await bcrypt.genSalt(10);
    //加密 
    const password = await bcrypt.hash(req.body.password,salt);
    // 替换密码
    req.body.password = password;
    // 将用户信息添加到数据库中
    User.create(req.body);
    // 页面重定向到用户列表页面
    res.redirect('/admin/user');
}