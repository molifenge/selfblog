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
