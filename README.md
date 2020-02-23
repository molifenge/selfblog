# selfblog
Art-template+Express+MongoDB简单项目
# 前言
&nbsp;&nbsp;&nbsp;&nbsp;为了体验前后端交互的内容，我找了art-template+Express+MongoDB（[代码Github->https://github.com/molifenge/selfblog](https://github.com/molifenge/selfblog.git)）这个简单的小项目练练手，页面极其简陋，不喜勿喷。本项目是使用前端引擎art-template+Express+MongoDB为主开发的项目，本文将对项目使用的技术和一些细节处进行讲解。

# 一、效果图
**前台界面**：文章列表页面+文章详情页面
1.前台页面（含分页功能）
![前台文章列表](https://img-blog.csdnimg.cn/20200222113539589.gif)
2.文章详情页面+评论功能实现
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200222113929668.gif)
**后台界面**：登录页面+用户列表页面+文章列表页面
1.用户登录：
![后台登陆页面](https://img-blog.csdnimg.cn/20200222100936178.gif)
2.用户增加删除（分页功能）
![用户添加删除功能](https://img-blog.csdnimg.cn/20200222102402320.gif)
3.用户修改功能（密码比对失败不能修改）
![用户修改](https://img-blog.csdnimg.cn/20200222104847978.gif)
4.文章添加功能（含图片上传）
![文章添加功能](https://img-blog.csdnimg.cn/20200222110631964.gif)
5.文章修改删除功能
![文章修改删除](https://img-blog.csdnimg.cn/20200222112134977.gif)
# 二、功能
## 已经完成功能
 1. [x] 用户登录
 2. [x] 用户添加、修改、删除（包含密码验证、数据分页功能）
 3. [x] 文章添加、修改、删除（包含图片上传、数据分页功能）
 4. [x] 前台文章列表页面显示
 5. [x] 文章详情页面
 6. [x] 文章评论功能
## 期待优化或实现
 7. [ ] 用户注册功能
 8. [ ] 文章修改时，日期默认原始日期显示
 9. [ ] 前台文章列表页面自适应布局实现
 10. [ ] 前台文章列表页面美化
 11. [ ] 评论功能编辑器转Markdown编辑器
# 三、主要使用技术
 12. [x] 前端引擎art-template+express-art-template
 13. [x] Express
 14. [x] MongoDB
 15. [x] body-parser插件(处理post参数)
 16. [x] formidable插件(解析上传文件数据)
 17. [x] bcrypt插件(对密码进行加密)
 18. [x] mongoose-sex-page模块(分页功能实现)
 19. [x] Joi插件(数据校验)
 20. [x] express-session(用来存储登录用户的sessionId)
# 四、快速上手Express+MongoDB
## Express的使用
 ### 4.1 Express
 >&nbsp;&nbsp;&nbsp;&nbsp;Express是一个基于Node平台的web应用开发框架，它提供了一系列强大的特性，来帮助我们创建各种Web应用。
 
&nbsp;&nbsp;&nbsp;&nbsp;首先，我们要先**安装Express**。
 ```
 npm i express
 ```
 &nbsp;&nbsp;&nbsp;&nbsp;然后，我们利用express来创建**网站服务器**，以便后面进行页面交互：
 ```javascript
 //引入express框架
 const express = require('express');
 //创建网站服务器
 const app = express();
 //监听端口，这边监听的是8080端口，即可以通过localhost:8080/访问该项目中的文件
 app.listen(8080):
 ```
 ### 4.2 Express的中间件
 >&nbsp;&nbsp;&nbsp;&nbsp;中间件就是一堆方法，Node提供中间件可以拦截请求，从而对请求做出响应，或者是将请求交给下一个中间件。

以下是我看见过的一个关于中间件的示意图，表示的很清楚：
![中间件](https://img-blog.csdnimg.cn/20200222155452138.jpg?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzM2NjIzNzk4,size_16,color_FFFFFF,t_70)
&nbsp;&nbsp;&nbsp;&nbsp;而中间件主要由两个部分构成，即**中间件方法**和**请求处理函数**。中间件方法由Express提供，用来拦截请求；请求处理函数由程序员编写，用来处理请求。
&nbsp;&nbsp;&nbsp;&nbsp;比如`app.use(path,function(req,res,next))`。第一个参数`path`是要请求的路径，第二个参数是对应的请求处理函数，这个`function`又包括三个参数，即`req`、`res`、`next`。`req`是请求；`res`是响应；`next`是一个方法，因为我们在程序中可能不止使用一个中间件，`next`方法就是用来放行请求，跳到下一个中间件的，这个参数在要用到的时候写，如果没用到可写可不写。

&nbsp;&nbsp;&nbsp;&nbsp;在这次项目中，我主要使用了几个中间件：`app.use()`、`app.get()`、`app.port()`，还有内置中间件`express.static()`，这几个中间件的作用大都有些不同。
&nbsp;&nbsp;&nbsp;&nbsp;`app.use(path,function(req,res,next))`——向页面`path`发出请求时（无论是什么请求），调用后面那个请求处理函数。
&nbsp;&nbsp;&nbsp;&nbsp;`app.get(path,function(req,res,next))`——向页面`path`发出get请求时，调用后面那个请求处理函数。
&nbsp;&nbsp;&nbsp;&nbsp;`app.port(path,function(req,res,next))`——向页面`path`发出get请求时（表单提交数据），调用后面那个请求处理函数。
&nbsp;&nbsp;&nbsp;&nbsp;`app.use(express.static(path.join(__dirname,'public)))`——开放静态资源文件，这样就可以用url访问项目中的图片、css等静态资源了（`public`页面用来存放静态资源）。
### 4.3 项目中的路由文件
&nbsp;&nbsp;&nbsp;&nbsp;在项目中，我把所有的前端页面放在了views文件夹中，所有的路由处理逻辑放在了route文件夹中。而后，根据项目前后台，进一步区分admin（后台）和home（前台）两个文件夹。
![目录](https://img-blog.csdnimg.cn/20200222185337561.png)
&nbsp;&nbsp;&nbsp;&nbsp;为了使文件彼此之间依赖关系更加清晰，将所有的路由处理函数都封装成一个路由处理模块，然后将这个模块一整个代入。根据前后台功能，将路由处理分成两个主要文件，`admin.js`负责处理对后台系统页面的请求，`home.js`负责对前台页面的请求。于是在`app.js`中这样写：
```javascript
//导入两个主要的路由处理逻辑
const admin = require('./route/admin');
const home = require('./route/home');
//当访问localhost:8080/admin时会向admin发出请求，home同上
app.use('/admin',admin);
app.use('/home',home);
```
而后，`admin.js`中通过`express.Router()`创建路由，随后用中间件来拦截页面请求并对应相应的路由处理模块。最后，不要忘记了将一整个模块导出，即`module.exports = admin`。文件中这样写：
```javascript
// 后台管理
//引用express框架
const express = require('express');
//创建博客展示页面路由
const admin = express.Router();

//渲染登录页面
admin.get('/login',require('./admin/loginPage'));
//接收登录页面的数据并进行判断
admin.post('/login',require('./admin/login'));

//创建用户列表路由
admin.get('/user',require('./admin/userPage'));

//实现退出功能
admin.get('/logout',require('./admin/logout'));

// 1.用户管理
// 创建用户编辑页面路由
admin.get('/user-edit',require('./admin/user-edit'));
//创建实现用户添加功能路由
admin.post('/user-edit',require('./admin/user-edit-fn'));
// 用户修改路由
admin.post('/user-modify',require('./admin/user-modify'));
// 删除用户功能路由
admin.get('/delete',require('./admin/delete'));

// 2.文章管理
// 文章列表页面路由
admin.get('/article',require('./admin/article'));
// 文章编辑页面路由
admin.get('/article-edit',require('./admin/article-edit'));
// 文章添加功能路由
admin.post('/article-edit',require('./admin/article-add'));
//用户修改路由
admin.post('/article-modify',require('./admin/article-modify'));
// 删除文章功能路由
admin.get('/article-delete',require('./admin/article-delete'));

module.exports = admin;
```
`home.js`就不在这里列出了，可自行到Github查看。
## MongoDB的使用
### 4.5 MongoDB
>&nbsp;&nbsp;&nbsp;&nbsp;MongoDB就是一个数据库，选择它的好处很多，其中之一就是：MongoDB不需要显式创造数据库，如果正在使用的数据库不存在，MongoDB会自动创造。

&nbsp;&nbsp;&nbsp;&nbsp;操作MongoDB需要第三方模块`mongoose`，很多要使用的函数（包括常规的增删查改）都在mongoose里面。
&nbsp;&nbsp;&nbsp;&nbsp;首先，我们要先安装MongoDB。在命令行输入：
```
npm i mongoose
```
&nbsp;&nbsp;&nbsp;&nbsp;然后**启动数据库**：
```
net start mongodb
```
&nbsp;&nbsp;&nbsp;&nbsp;**停止数据库连接**是：
```
net stop mongodb
```
&nbsp;&nbsp;&nbsp;&nbsp;最后，**连接数据库**。
```javascript
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/playground')
	.then(() => console.log('数据库连接成功'))
	.catch(err => console.log('数据库连接失败',err));
```
**注意！！！** MongoDB默认是没有账户和密码登入的。如果想知道如何有账户和密码地访问数据库，指路-->MongoDB设置用户名密码[https://www.jianshu.com/p/237a0c5ad9fa](https://www.jianshu.com/p/237a0c5ad9fa)。
### 4.5 项目中使用的数据库表
&nbsp;&nbsp;&nbsp;&nbsp;我将本次项目所需的创建数据库表以及连接数据库等逻辑放在`model`文件夹中。根据需求，本次项目需要建三张表，分别是用户`user`、文章`article`、评论`comment`，对应`user.js`、`article.js`、`comment.js`。对应字段可直接前往代码查看。
### 4.6 MongoDB的创建集合和增删查改 
#### 4.6.1 创建集合
&nbsp;&nbsp;&nbsp;&nbsp;创建集合分两步：1.对集合设定规则；2.创建集合。
&nbsp;&nbsp;&nbsp;&nbsp;这里拿`user.js`来举例：
```javascript
//1.创建集合规则
const UserSchema = new mongoose.Shema({
	username:{
		type:String,//type——值类型
        required:true,//require——为true为必填项
        minlength:2,//最小字符串长度
        maxlength:20//最大字符串长度
	},//用户名
	email:{
		type:String,
        // unique为true是为了保证邮箱地址不重复，因为要用这个作为登录名
        unique:true,
        required:true
	},//邮箱
	password:{
		type:String,
        required:true
	},//密码
	role:{
		type:String,
        required:true
	},//角色，admin是超级管理员，normal是普通用户
	state:{
		type:Number,
        default:0//默认值为0
	}//状态，0——启用，1——禁用
});
//2.创建集合（表）User
const User = mongoose.model('User',userSchema);
//最后记得导出该集合，否则其他路由模块不能使用
module.exports = User;
```
这边**注意**一点！！创建集合后，我们在数据库中不一定能看见它。**只有当集合里面有数据时，集合才能显式被创建。**
#### 4.6.2 增删查改
&nbsp;&nbsp;&nbsp;&nbsp;以下是项目中用到的一些数据库的增删查改的语句：
```javascript
function createUser(){ //增加一条文档。
    const salt = await bcrypt.genSalt();
    const pass = await bcrypt.hash('123456',salt);
    const user = await  User.create({
        username:'iteheima',
        email:'123456@qq.com',
        password:pass,
        role:'admin',
        state:0
    });
User.find().then(result => console.log(result)); //查询User中所有文档
User.findOne({_id:id}); //查询User表中_id值为id（条件）的文档。
User.findOneAndDelete({_id:id}); //删除一条_id值为id的文档
User.updateOne({_id:id},{ //更新_id值为id的文档，更新数据见第二个参数
	username:username,
    email:email,
    role:role,
    state:state
});
```
# 五、快速上手art-template
&nbsp;&nbsp;&nbsp;&nbsp;前端渲染就是把数据渲染到前端页面上去，一般来说，有以下三种方法：
 1. JS原始语法渲染
 2. art-template等前端渲染引擎
 3. Vue模板语法。

&nbsp;&nbsp;&nbsp;&nbsp;这里我使用的是art-template模板引擎。
>&nbsp;&nbsp;&nbsp;&nbsp;art-template 是一个简约、超快的模板引擎,采用作用域预声明的技术来优化模板渲染速度，从而获得接近 JavaScript 极限的运行性能，并且同时支持 NodeJS 和浏览器。

&nbsp;&nbsp;&nbsp;&nbsp;首先，是安装art-template，为了更好地支持art-template在Express中的使用，我也安装了express-art-template。
```
npm i art-template express-art-template
```
&nbsp;&nbsp;&nbsp;&nbsp;然后，进行一些配置：
```javascript
//导入art-template
const template = require('art-template');
const path = require('path');
//告诉浏览器当渲染后缀为art的模块时所使用的模板引擎
app.engine('art',require('express-art-template'));
//告诉express框架模板所在的位置
app.set('views',path.join(__dirname,'views'));
//告诉express框架模板的默认后缀
app.set('view engine','art');
```
&nbsp;&nbsp;&nbsp;&nbsp;这样，我们就可以使用art-template模板语法进行前端渲染了，接下来将讲一些art-template在本项目中的运用。
&nbsp;&nbsp;&nbsp;&nbsp;首先，要知道，在项目中是有一些公共模块的，比如头部、尾部、导航栏等等。为了减少代码的冗余，也为了减少我们编写的代码量，art-template提供了**模板继承**和**子模板套用**两种方法，然后我把一些公共模块放在了对应的`common`文件夹里。
`common`文件夹目录如下：
![common目录](https://img-blog.csdnimg.cn/20200222143633896.png)
`layout.art`：页面骨架，用来放置页面公共部分，比如一些`<html>`、`<head>`、`<body>`等文件。
```html
<!-- 模板继承 -->
<!-- layout.art——页面骨架，用来放置所有页面都用的到的标签和资源，包括一些<html>、<head>、<body>等固定标签-->
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <title>Blog - Content Manager</title>
    <link rel="stylesheet" href="/admin/lib/bootstrap/css/bootstrap.min.css">
    <link rel="stylesheet" href="/admin/css/base.css">
    <!--这个block引入对应模板的link部分-->
    {{block 'link'}}{{/block}}
</head>

<body>
	<!--这个block引入对应模板的main部分，即页面主体部分-->
	{{block 'main'}} {{/block}}
	<script src="/admin/lib/jquery/dist/jquery.min.js"></script>
	<script src="/admin/lib/bootstrap/js/bootstrap.min.js"></script>
    <script src="/admin/js/common.js"></script>
    <!--这个block引入对应模板的script部分，即计算逻辑部分-->
	{{block 'script'}} {{/block}}
</body>
</html>
```
`header.art`和`aside.art`：页面公共部分，是头部和侧边导航栏。
![页面布局](https://img-blog.csdnimg.cn/202002221448329.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzM2NjIzNzk4,size_16,color_FFFFFF,t_70)
&nbsp;&nbsp;&nbsp;&nbsp;然后，在对应页面中继承`layout.art`并插入子模板`header.art`和`aside.art`。
例如，`user.art`(具体内容自见代码)：
```html
<!--继承layout.art，即将每个block放到对应的layout.art对应的位置上去-->
{{extend './common/layout.art'}}

{{block 'main'}}
    <!-- 子模板的相对路径相对的就是当前文件 因为它是由模板引擎解析的 而不是浏览器 -->
    <!--插入公共部分子模板-->
    {{include './common/header.art'}}
    <!-- 主体内容 -->
    <div class="content">
    	{{include './common/aside.art'}}
        <div class="main">
        	<!-- 分类标题 -->
            <div class="title">
                <h4>用户{{userInfo.username}}</h4>
                <span>找到{{count}}个用户</span>
                <a href="/admin/user-edit" class="btn btn-primary new">新增用户</a>
            </div>
            <!-- /分类标题 -->
            <!-- 内容列表 -->
            <table class="table table-striped table-bordered table-hover custom-table">
                ...
            </table>
            <!-- /内容列表 -->
            <!-- 分页 -->
            <ul class="pagination">
                ...
            </ul>
            <!-- /分页 -->
        </div>
    </div>
    <!-- /主体内容 -->
    <!-- 删除确认弹出框 -->
    <div class="modal fade confirm-modal">
        ...
    </div>
{{/block}}

{{block 'script'}}
    <script type="text/javascript">
        $('.delete').on('click', function () {
            // 获取用户id
            var id = $(this).attr('data-id');
            // 将要删除的用户id存储在隐藏域中
            $('#deleteUserId').val(id);
        })
    </script>
{{/block}}
```
# 六、相关插件
## 6.1 body-parser
&nbsp;&nbsp;&nbsp;&nbsp;`body-parser`也是一个Express的中间件，它主要是用来解析post提交过来的普通请求参数的。
&nbsp;&nbsp;&nbsp;&nbsp;它的使用如下：
```javasccript
//引入body-parser模块
const bodyParser = require('body-parser');
//配置body-parser模块,记得写在所有中间件前面
app.use(bodyParser.urlencoded({extended : false}));
```
&nbsp;&nbsp;&nbsp;&nbsp;这样就可以在`post`提交请求以后在`req.body`访问到表单提交的数据了。
&nbsp;&nbsp;&nbsp;&nbsp;但是，`body-parser`只能解析普通表单数据，向项目中有文件上传功能的，`body-parser`是没法解析的，`req.body`会是一个空对象。所以我们要使用`formidable`第三方模块。
## 6.2 formidable
&nbsp;&nbsp;&nbsp;&nbsp;`formidable`第三方模块也是用来解析表单的，它支持get、post请求参数，和文件上传功能。
&nbsp;&nbsp;&nbsp;&nbsp;首先，先安装`formidable`，在命令行输入：
```
npm i formidable
```
&nbsp;&nbsp;&nbsp;&nbsp;然后，在需要使用文件上传的表单数据的路由模块中：
```javascript
//1.引入formidable
const formidable = require('formidable');
//2.创建表单解析对象
const form = new formidable.IncomingForm();
//3.设置文件上传路径
form.uploadDir = path.join(__dirname,'../','../','public','uploads');
//4.保留表单上传文件的扩展名
form.keepExtensions = true;
//5.解析表单
form.parse(req,async (err,fields,files) => {
	//fields用来访问普通表单对象，比如fields.title
	//files用来访问上传文件，files.cover.path就是上传文件的绝对路径
	...
});
```
&nbsp;&nbsp;&nbsp;&nbsp;读取文件：
```javascript
//1.创建文件读取对象
var reader = new FileReader();
//2.读取文件
reader.readAsDataURL(this.files[0]);
reader.onload = funtion(){
	//将文件读取结果保存在页面中，以便显示
	preview.ssrc = reader.result;
}
```
## 6.3 bcypt
&nbsp;&nbsp;&nbsp;&nbsp;`bcypt`是用来给密码加密的，数据库中的密码原是按照明文存储的，这是极其不安全的。因此我们使用bcypt来对密码进行加密然后存储到数据库中。
首先，安装`bcypt`，在命令行中输入：
```
npm i bcyptjs
```
&nbsp;&nbsp;&nbsp;&nbsp;我们这个项目中需要使用到密码加密的地方就是添加用户，当我们在表单中填写要添加用户的信息后点击提交，表单数据就会被保存在req.body传递给相对应的路由处理模块。路由处理模块中，我们将加密后的密码替换`req.body.password`并在后面保存到数据库中去。
可见`/route/user-edit-fn.js`：
```javascript
//1.导入bcypt
const bcypt = require('bcryptjs');
//2.生成随机字符串
const salt = bcrypt.genSalt(10);
//3.使用随机字符串对密码进行加密
const password = bcypt.hash(req.body.password,salt);
//把加密后的密码替换给req.body.password
req.body.password = password;
```
&nbsp;&nbsp;&nbsp;&nbsp;在登录页面中，也有使用到`bcrpt的地方`：我们填入账户密码以后，要对密码进行比对,这时调用bcypt中的`compare`方法将输入的密码`req.body.password`和数据库中的密码`password`进行比对：
```javascript
const bcrypt = rquire('bcrypt');
const password = req.body.password;
let isValid = bcypt.compare(password,user.password);
```
## 6.4 mongoose-sex-page
&nbsp;&nbsp;&nbsp;&nbsp;这个插件是用来实现数据分页功能的，导入这个插件以后生成的集合构造函数包括以下内容(json格式)：
```json
{
	"page":1，//当前页
	"size":2,//每页显示数据条数
	"total"：8,//总共的数据条数
	"records":[
		//这里面是查询出来的具体数据
		{
			"_id":"5c...",
			"title":"ceshi"
		}
	],
	"pages":4,//总共多少页
	"display":[1,2,3,4]//客户端显示的页码
}
```
&nbsp;&nbsp;&nbsp;&nbsp;本项目中的具体使用可见`/route/article.js`路由模块和`/views/article.art`。
```javascript
//article.js
//1.导入mongoose-sex-page
const pagination = require('mongoose-sex-page');
//2.导入数据库
const {Article} = require('../../model/article');
module.exports = async (req,res) => {
    // 客户端传递过来的当前页码
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
```
&nbsp;&nbsp;&nbsp;&nbsp;此时传递到`article.art`页面上的数据`articles`，具体分页好以后的数据在`article.records`里面。
## 6.5 Joi
>&nbsp;&nbsp;&nbsp;&nbsp;Joi是JS对象的规则描述和验证器。

&nbsp;&nbsp;&nbsp;&nbsp;在项目中我用它来验证数据库的数据是否符合要求。安装也很简单，命令行输入`npm i Joi`就可以了。
&nbsp;&nbsp;&nbsp;&nbsp;然后我创建一个验证器，并且将它默认导出，这样在需要验证数据的地方我就可以直接导入这个验证器来使用了，如果验证没有通过会出现一个错误，我们只要判断是否捕捉到错误就可以了。
```javascript
//model/user.js
const Joi = require('Joi');
...
const validateUser = user => {
    //定义验证规则
    const schema = {
        username:Joi.string().min(2).max(12).required().error(new Error('用户名不符合验证规则')),
        email:Joi.string().email().required().error(new Error('邮箱格式不符合要求')),
        // regex（正则表达式），范围在a-z、A-Z、0-9中，最短3，最长30
        password:Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).required().error(new Error('密码格式不符合要求')),
        // valid方法告诉客户端只传递normal和admin，除此之外都是不合法的
        role:Joi.string().valid('normal','admin').required().error(new Error('角色值非法')),
        state:Joi.number().valid(0,1).required().error(new Error('状态值非法'))
    };

    //实施验证
    return Joi.validate(user,schema);
}
...
module.exports = {
	User,
    validateUser
}
```
## 6.6 express-session
&nbsp;&nbsp;&nbsp;&nbsp;在登录的时候有这样一个问题，我们在`login.art`输入账户和密码，然后根据代码，会自动跳转到用户列表页面。然而，我们是否真的登录了呢？其实，即使我们登录成功了，但是下一次访问服务器的时候，服务器依然不认得。因此，这里涉及到关于`cookie`和`session`的知识点。
&nbsp;&nbsp;&nbsp;&nbsp;`cookie`是浏览器为页面开辟的存储空间，`session`是服务器为访问的用户开辟的一个存储空间。当用户访问服务器的时候，需要服务器生成一个`sessionId`来唯一标识用户身份，并把这个`sessionId`存储在客户端`cookie`里面。然后，在下一次访问服务器的时候，带着这个`sessionId`去访问服务器，然后服务器才响应该用户登录后才能获取的信息。在这里，我们使用`express-session`来实现session功能。
```javascript
//app.js
// 导入express-session
const session = require('express-session');
//配置session
app.use(session({
    secret:'secret key',
    saveUnitialized:false,
    cookie:{
        maxAge:24*60*60*1000
    }
}));
```
# 七、踩坑记
## 7.1 安装bcrypt后，require(bcypt)出错。
&nbsp;&nbsp;&nbsp;&nbsp;在使用`bcrypt`的时候出错【笑哭】因为我原来是这样写地，安装是`npm i bcrypt`然后导入的是`require('bcrypt')`。但其实在window下要安装`bcryptjs`，然后`require('bcryptjs')`暂时还不懂其中的原理，可能由于node.js版本不同？

## 7.2 文章修改，没有上传文件点击修改后图片不显示。
&nbsp;&nbsp;&nbsp;&nbsp;在文章编辑页面中，预期的功能是，如果我没有重新上传封面图片，图片就默认是第一次创建文章数据时上传的图片。但是在`formidable`中，不管原来是否有图片，只要我没有上传图片，他就默认`files`为空，然后自己会生成1个0kb的图片，导致我不重新上传一张图片就点击提交文章封面图片就会为空。
&nbsp;&nbsp;&nbsp;&nbsp;因此我在路由模块`article-modify.js`中添加了一个判断：如果我没有重新上传图片，`files.cover.name`就会为空，那我就直接取数据库中的`cover`然后更新。
```javascript
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
```
# 项目地址
&nbsp;&nbsp;&nbsp;&nbsp;项目地址：[Github->https://github.com/molifenge/selfblog](https://github.com/molifenge/selfblog)
&nbsp;&nbsp;&nbsp;&nbsp;运行项目：
```
nodemon app.js
```
然后，在浏览器输入`localhost:8080/admin/login`即可访问。
