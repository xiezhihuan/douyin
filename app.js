const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch({
        executablePath:puppeteer.executablePath(),
        headless:false,
        devtools:true
    });
    const page = await browser.newPage();
    await page.goto('https://baidu.com');
    await page.screenshot({path: 'example.png'});

    await browser.close();
})();
//
// const puppeteer = require('puppeteer');
// const path = require('path');
//
// (async () => {
//     const browser = await puppeteer.launch({
//     args: ['--no-sandbox', '--disable-setuid-sandbox'],
//         // 这里注意路径指向可执行的浏览器。
//         // 各平台路径可以在 node_modules/puppeteer-core/lib/BrowserFetcher.js 中找到
//         // Mac 为 '下载文件解压路径/Chromium.app/Contents/MacOS/Chromium'
//         // Linux 为 '下载文件解压路径/chrome'
//         // Windows 为 '下载文件解压路径/chrome.exe'
//         executablePath: path.resolve('/puppeteer/node_modules/puppeteer/.local-chromium/linux-722234/chromium-linux/chrome')
//     });
//     const page = await browser.newPage();
//     await page.setViewport({
//         width: 375,
//         height: 667,
//         deviceScaleFactor: 1,
//         isMobile: true
//     })
//     await page.goto('https://marxjiao.com/');
//     await page.screenshot({path: 'marx-blog.png'});
//     await browser.close();
// })();
//
