const { Article } = require('../../model/article');

module.exports = async (req,res) => {
    // res.send(req.query.id);
    await Article.findOneAndDelete({_id:req.query.id});

    res.redirect('/admin/article')
}