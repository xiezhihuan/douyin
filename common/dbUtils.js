const mongodb = require("mongodb");
const assert = require('assert');
const mongoClient = mongodb.MongoClient;

// Connection url
const url = 'mongodb://localhost:27017';

// Database Name
const dbName = 'douyin';
module.exports.collectionName = {
    crude_hot_word: 'crude_hot_words',
    crude_hot_word_haveId:'crude_hot_words_haveId',
    crude_hot_video:'crude_hot_videos',
    hot_words:'hot_words',
    hot_videos:'hot_videos',
    users:'users',
};




function _connect(){
    return new Promise((resolve,reject)=>{
        mongoClient.connect(url,{ useUnifiedTopology: true },(err,client) => {
            assert.equal(null,err,'数据库连接失败');
            const db = client.db(dbName);
            resolve(db);
            // reject(err);
        });
    });
}

module.exports.insertOne = async (collName,insertObj)=>{
    const db = await _connect();
    return new Promise((resolve,reject)=>{
        db.collection(collName).insertOne({...insertObj,delete:0},(err,results)=>{
            if(err) reject(err);
            else resolve(results);
        });
    });
};

// 根据条件查找数据，返回查找到的数量
module.exports.count = async (collName,whereObj={})=>{
    const db = await _connect();
    return new Promise((resolve,reject)=>{
        db.collection(collName).countDocuments(whereObj,(err,results)=>{
            if(err) reject(err);
            else resolve(results);
        });
    });
};
// 根据条件查找数据（查找之前进行排序、跳过、查找几条等操作），返回查找到的数据
module.exports.find = async (collName,whereObj={},limit=0,skip=0,sortObj={})=>{
    const db = await _connect();
    return new Promise((resolve,reject)=>{
        db.collection(collName).find(whereObj).sort(sortObj).skip(skip).limit(limit).toArray((err,results)=>{
            if(err) reject(err);
            else resolve(results);
        });
    });
};
// 根据id查找到该数据并进行修改
module.exports.updateOneById = async (collName,id,updateObj)=>{
    const db = await _connect();
    return new Promise((resolve,reject)=>{
        db.collection(collName).updateOne({_id:mongodb.Objectid(id)},updateObj,(err,results)=>{
            if(err) reject(err);
            else resolve(results);
        });
    });
};

// 根据某字段查找到该数据,如果该数据存在，则更新;不存在，则创建
module.exports.updateOneByField = async (collName,fieldObj,updateObj)=>{
    const db = await _connect();
    return new Promise((resolve,reject)=>{
        db.collection(collName).updateOne(fieldObj,{$set:{...updateObj,delete: 0}},{upsert:true},(err,results)=>{
            if(err) reject(err);
            else resolve(results);
        });
    });
};

// 根据id查找到数据并进行删除操作
module.exports.deleteOneById = async (collName,id)=>{
    const db = await _connect();
    return new Promise((resolve,reject)=>{
        db.collection(collName).deleteOne({_id:mongodb.ObjectId(id)},(err,results)=>{
            if(err) reject(err);
            else resolve(results);
        });
    });
};
