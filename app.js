var Utils = require('./common/utils');
var db = require('./common/db');
var Url = require('./common/url');
const agent = require('./common/http/agent');

agent.get(Url.word_hot_list).then( (repos)=> {
    var data ={
        date: new Date().Format('yyyy-MM-dd'),
        timestamp: new Date().getTime(),
        data: repos,
    };
    db.save(data);
});




