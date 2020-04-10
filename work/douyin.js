var Utils = require('../common/utils');
var dbUtils = require('../common/dbUtils');
var Url = require('../common/url');
const agent = require('../common/http/agent');

async function _getHotSearch(url,collection) {
   const resp = await agent.get(url);
   const data ={
        date: new Date().Format('yyyy-MM-dd'),
        timestamp: new Date().getTime(),
        data: resp,
   };
   dbUtils.insertOne(collection,data);
   return data;
}

const douyin = {

    /*获取今日热搜词(词更多，但没有groupid)
    * 频率：每日一次，23：00更新
    * */
    getTodayHotWords(){
        return _getHotSearch(Url.hot_word_list,dbUtils.collectionName.crude_hot_word);
    },

    /*获取今日热搜词（词少，但有groupid）
    * 频率：每日一次，23：00更新
    * */
    getTodayHotWords_haveId(){
        return _getHotSearch(Url.hot_word_list_haveId,dbUtils.collectionName.crude_hot_word_haveId);
    },

    /*获取今日热搜视频
    * 频率：每日一次，23：00更新
    * */
    getTodayHotVideos(){
       return  _getHotSearch(Url.hot_video_list,dbUtils.collectionName.crude_hot_video);
    },

   async mergeHotWordDoc_haveId(todayData){
       var arr = await dbUtils.find(dbUtils.collectionName.hot_words_haveId);
       var doc = arr[0];
       if (!arr[0]) doc = {}; //避免为空时，doc不是对象
       //将今日的数据合并到总表中
        todayData.forEach((item)=>{
            //通过对象key的唯一性去重，确保每条热搜词唯一
            doc[item.group_id] = {name: item.word, hot_value: item.hot_value};
        });
        dbUtils.insertOne(dbUtils.collectionName.hot_words_haveId,doc);//todo 是先删除再插入，还是刷新，还是其他方法？
    }
};

module.exports = douyin;