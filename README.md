#该框架有Node.js + express + MongoDB + puppeteer组成

[puppeteer官方文档](https://github.com/puppeteer/puppeteer/blob/master/docs/api.md#pagegotourl-options)

[mongodb驱动api文档](http://mongodb.github.io/node-mongodb-native/3.2/api/)

[request-promise文档](https://www.npmjs.com/package/request-promise)
## 版本号规则
0.0.0.0
由四位数组成，各位数只增不减。
各位数字的含义：
- 第一位：开发框架大改变
- 第二位：开发框架小改变
- 第三位：项目号
- 第四位：项目需求变动或增加需求

## 通信方式
有3种发起网络请求的方式
- 通过puppeteer模拟浏览器发起网络请求
- 通过request-promise对指定url发起网络请求
- 通过lib/http/agent对统一域名发起请求（未开发）

## MongoDB数据库操作
有2种方式
- 通过官方驱动mongodb进行无数据类型存入数据，即得到什么数据就存入什么。
- 通过mongoose进行指定数据类型存入数据
