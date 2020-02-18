const { Comment } = require('../../model/comment');

module.exports = async(req,res) =>{
    // 接收客户端传递过来的请求参数
    const { content,uid,aid } =req.body;

    await Comment.create({
        content:content,
        uid:uid,
        aid:aid,
        time:new Date()
    });

    res.redirect('/home/article?id='+aid);
}