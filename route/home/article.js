const { Article } = require('../../model/article');
const { Comment } = require('../../model/comment');

module.exports = async (req,res) => {
    // 接收客户端传递过来的id值
    const id = req.query.id;
    // 根据文章id查询文章详细信息
    let article = await Article.findOne({_id:id}).populate('author');
    // 根据文章id查询评论详细信息
    let comments = await Comment.find({aid:id}).populate('uid');
    
    // res.send(comments);
    // return;

    res.render('home/article.art',{article,comments});
}