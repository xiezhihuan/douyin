const douyin = require('./work/douyin');

async function run() {
    douyin.getTodayHotVideos().then(()=>{
        console.log('完成每日热搜视频更新');
    });
    douyin.getTodayHotWords().then(()=>{
        console.log('完成每日热搜词更新');
    });
    const hotWords = await douyin.getTodayHotWords_haveId().then((hotWords)=>{
        console.log('完成每日热搜词更新（无groupid）');
        return hotWords;
    });
    // douyin.mergeHotWordDoc_haveId(hotWords.data.data.word_list).then(()=>{
    //     console.log('完成更新热搜词库');
    // });
}

run();