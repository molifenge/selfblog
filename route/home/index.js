const { Article } = require('../../model/article');
// 导入分页模块
const pagination = require('mongoose-sex-page');

module.exports = async (req,res) => {
    let page = req.query.page;

    let result = await pagination(Article).find().page(page).size(4).display(5).populate('author').exec();
    
    // res.send(result);
    // return;

    res.render('home/default.art',{
        result:result
    });

}