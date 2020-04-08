var mongoose = require('../db');
var Schema = mongoose.Schema;
var UserSchema = new Schema({
   userName: { type: String },
    userpwd: { type:String }
});

module.exports = mongoose.model('User_test',UserSchema);
/*
* User_test 是将创建的collection名称
* userName、userpwd是要存入的字段，未在这里声明的不会存入数据库*/