const { User } =require('../../model/user');

module.exports = async (req,res) => {
    // 要获取到地址栏中的id参数
    const { message,id } = req.query;
    if(id){
        // 当前有id，说明是修改操作
        let user = await User.findOne({_id:id});
        // 渲染user-edit页面
        res.render('admin/user-edit',{
            message:message,
            user:user,
            link:'/admin/user-modify?id='+id,
            button:'修改'
        });
    }else{
        // 是添加操作
        res.render('admin/user-edit',{
            message:message,
            link:'/admin/user-edit',
            button:'添加'
        });
    }
}