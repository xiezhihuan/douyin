var Utils = require('./common/utils');
var http = require('request-promise');
var db = require('./common/db');
var Url = require('./common/url');


var options = {
    uri: Url.word_hot_list,
    headers: {
        'User-Agent': 'Request-Promise'
    },
    json: true // Automatically parses the JSON string in the response
};

http(options)
    .then(function (repos) {
        var data ={
            date: new Date().Format('yyyy-MM-dd'),
            timestamp: new Date().getTime(),
            data:repos
        };
        db.save(data);
    })
    .catch(function (err) {
        // API call failed...
    });




