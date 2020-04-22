const douyin = require('./work/douyin');
const schedule = require('node-schedule');

async function run() {
   updateHotwords();
   douyin.getHotVideos();
   douyin.getUsers();
}

function updateHotwords() {
    douyin.getExactHotWord_haveId().then(()=>{
        console.log('完成热搜词精确库更新（有id的）');
    });
    douyin.getExactHotWord().then(()=>{
        console.log('完成热搜词精确库更新（无id的）');
    });
}
var j = schedule.scheduleJob('2 0 * * *', function(){
  run();
});
