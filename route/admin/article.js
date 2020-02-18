const { Article } = require('../../model/article');
const pagination = require('mongoose-sex-page');

module.exports = async (req,res) => {
    // 客户端传递过来的页码
    const page = req.query.page;
    //locals这个对象可以把添加的属性传递到客户端
    req.app.locals.currentLink = 'article';
    // page方法指定当前页面 
    // size方法指定每页显示的数据条数
    // display方法指定客户端要显示的页码数量
    // exec方法向数据库中发送查询请求
    // 查询所有文章数据
    let count = await Article.countDocuments({});
    let articles = await pagination(Article).find().page(page).size(2).display(3).populate('author').exec();

    //  res.send(articles.records);
    //  return;
    res.render('admin/article.art',{
        articles:articles,
        count:count
    });
 }