const { Article } = require('../../model/article');
// 1.引入formidable第三方模块来解析form-data类型数据
const formidable = require('formidable');
const path = require('path');

module.exports = (req,res,next) =>{
    // 获取要更新的Article对象id
    const id = req.query.id;

    // 2.创建表单解析对象
    const form = new formidable.IncomingForm();
    // 2.配置上传的文件放在哪一个地方，建议使用绝对路径
    form.uploadDir = path.join(__dirname,'../','../','public','uploads');
    // 3.保留上传文件后缀
    form.keepExtensions = true;
    // 4.解析表单
    form.parse(req, async (err,fields,files) => {
        // let oldpath = files.uploadImg.path;
        // let newpath = path.join(path.dirname(oldpath),files.uploadImg.name);
        // fs.rename(oldpath,newpath,(err => {
        //     res.send(newpath);
        // }));
        let cover = "";
        if(!files.cover.name){
            let article = await Article.findOne({_id:id});
            cover = article.cover;
        }
        else {
            cover = files.cover.path.split('public')[1];
        }
        // res.send(cover);
        await Article.updateOne({_id:id},{
             title:fields.title,
             author:fields.author,
             publishDate:fields.publishDate,
             cover:cover,
             content:fields.content
         });
         res.redirect('/admin/article');
    });
}