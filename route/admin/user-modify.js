const { User } = require('../../model/user');
const bcrypt = require('bcryptjs');

module.exports = async (req,res,next) => {
    // 接收客户端传递的参数
    const {username,email,role,state,password} = req.body;
    //即将要修改的用户id 
    const id = req.query.id;

    let user = await User.findOne({_id:id});
    
    //密码比对 
    let isValid = await bcrypt.compare(password,user.password);

    if(isValid){
        //密码比对成功
        // 将用户信息更新到数据库中
        // 注意密码是用来比对的，不能改
        await User.updateOne({_id:id},{
            username:username,
            email:email,
            role:role,
            state:state
        });

        // 用户重定向到用户列表页面
        res.redirect('/admin/user');
    }else{
        //密码比对失败
        let obj = {path:'/admin/user-edit',message:'密码比对失败，不能进行用户信息修改',id:id};
        next(JSON.stringify(obj));
    }
}