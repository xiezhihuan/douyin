var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/mytestdb');
mongoose.connection.on('connected', ()=> {
    console.log('连接成功');
});
mongoose.connection.on('error', ()=> {
    console.log('出错了');
});
mongoose.connection.on('disconnected', ()=> {
    console.log('连接断开');
});

module.exports = mongoose;
/*
* mytestdb 是要链接的数据库名称*/
