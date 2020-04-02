/*
* 需求：
* 请问淘宝法拍的成交案例的面积能抓吗？重庆地区已成交法拍房各自的面积
* 思路：
* 通过GoodListUrl可以获得各个拍品的id
* 然后根据id拼接得到GoodDetailUrl可以获得拍品的描述，描述中有房屋面积*/

/*
* 项目未完成原因：
* 1、客户预算太少，150元
* 2、数据不规则，有些拍品没有房屋面积的描述，有些在表格中，有些在文字描述中。数据抽取麻烦
* 3、团队客服回复不积极*/

/*
* 项目中可优化的小工程
* 1、从html表格中提取数据，转化为json格式*/

const puppeteer = require('puppeteer');
const jsoup = require('./lib/JsJsoup/JsJsoup');

/*一共150页数据，通过page索引每一页*/
const getGoodListUrl = (page=1)=>{
    return `https://sf.taobao.com/item_list.htm?page=${page}&spm=a213w.7398504.pagination.1.21b9533aoEZBiO&category=50025969&auction_source=0&province=%D6%D8%C7%EC&sorder=2&st_param=-1&auction_start_seg=-1`
};

/*通过拍品id跳转到详情页获取房子面积*/
const getGoodDetailUrl = (id)=>{
    return `https://sf-item.taobao.com/sf_item/${id}.htm?  `
};

const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

(async () => {
    const browser = await puppeteer.launch({
        executablePath:puppeteer.executablePath(),
        headless:false,
    });
    const page = await browser.newPage();
    await page.goto(getGoodListUrl(1));
    const html = await page.content();
    const dom =new jsoup.parseDocument(html);
    const paiItem = dom.getElementsByClass('pai-item');
    const id = paiItem[0].getAttr('id').slice(-12); //从标签属性id中获取商品id
    await page.goto(getGoodDetailUrl(id),{waitUntil:'domcontentloaded'});
    await page.click('a[href*="RemindTip"]');
    await delay(10000);
    const html2 = await page.content();
    const dom2 =new jsoup.parseDocument(html2);
    const table = dom2.getElementsByTag('table') ;
    console.log(table[2].html());
    // await browser.close();
})();

