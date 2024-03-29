//连接数据库
//引入mongoose第三方模块
const mongoose = require('mongoose');
const config = require('config');
console.log(config.get('db.host'));
//连接数据库
mongoose.connect(`mongodb://${config.get('db.user')}:${config.get('db.pwd')}@${config.get('db.host')}:${config.get('db.port')}/${config.get('db.name')}`,{useNewUrlParser: true,useUnifiedTopology: true,useCreateIndex: true})
    .then(() => console.log('数据库连接成功'))
    .catch(() => console.log('数据库连接失败'));