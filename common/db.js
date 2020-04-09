const MongoClient = require('mongodb').MongoClient;
const test = require('assert');

// Connection url
const url = 'mongodb://localhost:27017';

// Database Name
const dbName = 'douyin';
const collectionName = 'crude_hot_word';

class DB {
    constructor(url, dbName, collectionName) {
        this.url = url;
        this.dbName = dbName;
        this.collectionName = collectionName
    }

    save(data) {
        // Connect using MongoClient
        MongoClient.connect(url, function (err, client) {
            test.equal(null, err);
            // Create a collection we want to drop later
            const col = client.db(dbName).collection(collectionName);
            // Insert a bunch of documents
            col.insertOne(data, {w: 1}, function (err, result) {
                test.equal(null, err);
                client.close();
            });
        });
    }
}

var db = new DB(url,dbName,collectionName);
module.exports = db;