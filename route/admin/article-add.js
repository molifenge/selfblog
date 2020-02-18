// 引入formidable第三方模块
const formidable = require('formidable');
const path = require('path');
const { Article } = require('../../model/article');

module.exports = (req,res) => {
    // 1.创建表单解析对象
    const form = new formidable.IncomingForm();
    // 2.配置上传的文件放在哪一个地方，建议使用绝对路径
    form.uploadDir = path.join(__dirname,'../','../','public','uploads');
    // 3.保留上传文件后缀
    form.keepExtensions = true;
    // 4.解析表单
    // err是错误对象：如果表单解析失败，err存储错误信息；如果表单解析成功，err将会是空
    // fields对象类型：保存普通表单数据
    // files对象类型：保存了和上传文件相关的数据
    form.parse(req,async (err,fields,files) => {
        // res.send(files.cover.path.split('public')[1]);
        await Article.create({
            title:fields.title,
            author:fields.author,
            publishDate:fields.publishDate,
            cover:files.cover.path.split('public')[1],
            content:fields.content
        });
        res.redirect('/admin/article');
    });
}