//引用express框架
const express = require('express');
//处理路径
const path = require('path');
//引入body-parser模块，用来处理post请求参数
const bodyParser = require('body-parser');
// 导入express-session
const session = require('express-session');
// 导入art-template模板引擎
const template = require('art-template');
// 导入dateformate第三方模块
const dateFormat = require('dateformat');
// 导入第三方模块morgan
const morgan = require('morgan');
// 导入config模块
const config = require('config');
//创建网站服务器
const app = express();
// 数据库连接
require('./model/connect');
//处理post请求参数,只能接收客户端传递过来的普通请求参数，而不能接收二进制请求参数，所以要用formidable
app.use(bodyParser.urlencoded({extended:false}));
//配置session
app.use(session({
    secret:'secret key',
    saveUnitialized:false,
    cookie:{
        maxAge:24*60*60*1000
    }
}));


//当渲染后缀为art的模板时，所使用的模板引擎是什么
app.engine('art',require('express-art-template'));
//告诉express框架模板所在的位置
app.set('views',path.join(__dirname,'views'));
//告诉express框架木板的默认后缀
app.set('view engine','art');
// 向模板内部导入dateFormate变量，这样就能在模板中使用它了
template.defaults.imports.dateFormat = dateFormat;


//开放静态资源文件
app.use(express.static(path.join(__dirname,'public')));


// 获取系统环境变量，返回值是对象
if(process.env.NODE_ENV == 'development'){
    // 当前是开发环境
    console.log('当前是开发环境');
    // 在开发环境中，将客户端发送到服务器的请求信息响应到控制台中
    app.use(morgan('dev'));
}else{
    console.log('当前是生产环境')
};

//导入路由模块
const home = require('./route/home');
const admin = require('./route/admin');

//拦截请求，判断用户登录状态
app.use('/admin',require('./middleware/loginGuard'));

app.use('/home',home);
app.use('/admin',admin);

// 错误处理中间件
// app.use((err,req,res,next) => {
//     // 把字符串转成对象 JSON.parse()
//     const result = JSON.parse(err);
//     let params = [];
//     for(let attr in result){
//         if(attr != 'path'){
//             params.push(attr + '=' + result[attr]);
//         }
//     }
//     res.redirect(`${result.path}?${params.join('&')}`);
// });

//监听端口
app.listen(8080);
console.log('网站服务器启动成功，请访问localhost');
