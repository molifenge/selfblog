// 引入mongoose第三方模块
const mongoose = require('mongoose');
// 创建规则
const commentSchema = mongoose.Schema({
    // article id 文章ID
    aid:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Article'
    },
    // user id 用户id
    uid:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    // 评论时间
    time:{
        type:Date
    },
    content:{
        type:String
    }

});

// 创建评论集合
const Comment = mongoose.model('Comment',commentSchema);

module.exports = {
    Comment
};