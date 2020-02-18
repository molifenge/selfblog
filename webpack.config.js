const path = require('path');

module.exports = {
    mode:'development',
    entry:path.join(__dirname,'./app.js'),
    module:{
        rules:[
        {test:/\.css$/,use:['style-loader','css-loader']},
        {test:/\.jpg|png|gif|bmp|ttf|eot|svg|woff|woff2$/,use:'url-loader?limit = 16940'},
        {test:/\.art$/,use:'art-template-loader'}
    ]
    },
    node:{
        fs:"empty",
        net:"empty"
    }
}