const { User } = require('../../model/user');

module.exports = async (req,res) => {

    //locals这个对象可以把添加的属性传递到客户端
    req.app.locals.currentLink = 'user';

    // 接收客户端传递过来的当前页参数
    let page = req.query.page || 1;
    // 每一页显示的数据条数
    let pagesize = 3;
    // 数据总条数
    let count = await User.countDocuments({});
    // 总页数,向上取整，3.1=4，3.8=4
    let total = Math.ceil(count/pagesize);
    
    // 页码对应的数据查询开始位置
    let start = (page-1)*pagesize;
    // 查询用户信息
    let users = await User.find({}).limit(pagesize).skip(start);

    // res.send(users);
    // 将用户信息从数据库中查询出来
    res.render('admin/user',{
        users:users,
        page:page,
        total:total,
        count:count
    });
}