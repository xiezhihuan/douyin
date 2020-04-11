const douyin = require('./work/douyin');

async function run() {
   updateHotwords();
   douyin.getHotVideos();
}

function updateHotwords() {
    douyin.getExactHotWord_haveId().then(()=>{
        console.log('完成热搜词精确库更新（有id的）');
    });
    douyin.getExactHotWord().then(()=>{
        console.log('完成热搜词精确库更新（无id的）');
    });
}

run();