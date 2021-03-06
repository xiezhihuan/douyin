var Utils = require('../common/utils');
var dbUtils = require('../common/dbUtils');
var Url = require('../common/url');
const agent = require('../common/http/agent');
const API = require('../common/http/douyin');

async function _getHotSearch(url,collection) {
   const resp = await agent.get(url);
   const data ={
        date: new Date().Format('yyyy-MM-dd'),
        timestamp: new Date().getTime(),
        data: resp,
   };
   dbUtils.updateOneByField(collection,{date:data.date},data);
   return data;
}

const douyin = {
    /*
    * 获取精确的热搜词（含id），并存入数据库
    * 包含这三个字段{hot_value,group_id,word}
    * */
   async getExactHotWord_haveId(){
        const crudeHotWord = await _getHotSearch(Url.hot_word_list_haveId,dbUtils.collectionName.crude_hot_word_haveId);
       const wordList = crudeHotWord.data.data.word_list;
        wordList.forEach(item =>{
            const {hot_value,group_id,word} = item;
            dbUtils.updateOneByField(dbUtils.collectionName.hot_words,{word},{hot_value,group_id,word})
        });
    },

    /*
    * 获取精确的热搜词（含id），并存入数据库
    * 包含这三个字段{hot_value,group_id,word}
    * */
    async getExactHotWord(){
        const crudeHotWord = await _getHotSearch(Url.hot_word_list,dbUtils.collectionName.crude_hot_word);
        const wordList = crudeHotWord.data.word_list;
        wordList.forEach(item =>{
            const {hot_value,word} = item;
            dbUtils.updateOneByField(dbUtils.collectionName.hot_words,{word},{hot_value,word});
        });
    },

    /*
    * 从热搜视频数据中筛选有用字段，并存入视频库中*/
    async getHotVideos(){
        const crudeVideosObj = await _getHotSearch(Url.hot_video_list,dbUtils.collectionName.crude_hot_video);
        const aweme_list = crudeVideosObj.data.aweme_list;
        aweme_list.forEach(item =>{
            const {share_url,aweme_id,create_time,desc,hot_value,group_id,duration,} = item.aweme_info;
            const {vid} = item.aweme_info.video;
            const cover = item.aweme_info.video.cover.url_list[0];
            const play_addr = API.video.play+vid;
            const playwm_addr = API.video.playwm+vid;
            dbUtils.updateOneByField(dbUtils.collectionName.hot_videos,{vid},{vid,desc,hot_value,
                play_addr,playwm_addr,cover,create_time,duration,share_url,group_id,aweme_id})
        })
    },

   async getUsers(){
        const crudeVideosObj = await _getHotSearch(Url.hot_video_list,dbUtils.collectionName.crude_hot_video);
       const aweme_list = crudeVideosObj.data.aweme_list;
       aweme_list.forEach(item =>{
           const {uid,nickname,signature} = item.aweme_info.author;
           const avatar = item.aweme_info.author.avatar_larger.url_list[0];
           dbUtils.updateOneByField(dbUtils.collectionName.users,{uid},{uid,nickname,signature,avatar})
       })
   }
};

module.exports = douyin;