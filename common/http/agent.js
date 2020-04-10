const request = require('request-promise');
const $ = require('cheerio');

/*解析响应体body*/
function autoParse(body, response, resolveWithFullResponse) {
    if (/.*text\/html.*/.test(response.headers['content-type'])) {
        return $.load(body);
    }else if ( /.*application\/json.*/.test(response.headers['content-type']) ) {
        return JSON.parse(body);
    } else {
        return body;
    }
}

/*统一处理失败请求*/
function doRequest(option){
    return request(option).catch(function (err) {
        // API call failed...
        console.log(`网络请求失败,err:${err}`);
    });
}

class Agent {

    /*
    * get请求
    * 参数：
    * url:https://baidu.com/api?page=2&type=1
    * 返回值：Promise
    * */
    get(url){
        return doRequest({url,transform:autoParse});
    }

    post(url,param){
        return doRequest({url,body:param,transform:autoParse})
    }
}

const agent = new Agent();
module.exports = agent;

