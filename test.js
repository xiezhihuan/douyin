var User = require('./model/user');
var user = new User({
    userName: 'su222san44',
    userpwd: '1234',
});
/*新增*/
// user.save((err,res)=>{
//    if (err){
//        console.log("Error:" + err);
//    }else{
//        console.log("Res:" + res);
//    }
// });

/*查询*/
// User.find((err,user)=>{
//     if (err){
//        console.log("Error:" + err);
//    }else{
//        console.log("User:" + user);
//    }
// });

/*更新*/
// User.updateOne({'userName':'susan'},{'userpwd':'456222444444222278'},(err,res)=>{
//     if (err){
//        console.log("Error:" + err);
//    }else{
//        console.log("Res:" + res);
//    }
// });

User.deleteOne({'userName':'susan44'},(err,res)=>{
    if (err){
       console.log("Error:" + err);
   }else{
       console.log("Res:" + res);
   }
});