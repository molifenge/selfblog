const {User} = require('../../model/user');
const bcrypt = require('bcryptjs');

module.exports = async(req,res) => {
    //接收请求参数
    const {email,password} = req.body;

    if(email.trim().length == 0 || password.trim().length == 0) return res.status(400).render('admin/error',{msg:'邮件或地址错误'});
    //根据邮箱地址查询用户信息
    // 如果查询到用户，user的值是对象类型
    // 如果没有查询到用户，user变量为空
    let user = await User.findOne({email});

    if(user){
        //查询到
        // 调用compare方法进行比对，返回一个布尔值
        isValue =await bcrypt.compare(password,user.password);
        if(isValue){
            //相等，登陆成功
            // 将用户名存储在请求对象中,session会自动生成sessionId并存储到cookie中
            req.session.username = user.username;
            // 将用户角色存储到session中
            req.session.role = user.role;
            //这个app就是app.js里面的那个app,网站服务器
            req.app.locals.userInfo = user;
            // 对用户角色进行判断
            if(user.role == 'admin'){
                // 重定向到用户列表页面
                res.redirect('/admin/user');
            }else{
                res.redirect('/home/');
            }
            
        }else{
            res.status(400).render('admin/error',{msg:'密码错误'});
        }
    }else{
        //没有查询到
        res.status(400).render('admin/error',{msg:'邮箱地址或密码错误'});
    }
}