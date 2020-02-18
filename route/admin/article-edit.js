const {Article} = require('../../model/article');

module.exports = async (req,res) =>{

    let id = req.query.id;
    
    // res.send(id);
    // return;
    if(id){
        //说明是文章修改页面
        let article = await Article.findOne({_id:id});
        res.render('admin/article-edit.art',{
            article:article,
            link:'/admin/article-modify?id='+id,
            button:'修改'
        });
    }else{
        res.render('admin/article-edit.art',{
            link:'/admin/article-edit',
            button:'添加'
        });
    }
}