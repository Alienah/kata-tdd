const puppeteer = require('puppeteer');

// (async () => {
//     const browser = await puppeteer.launch({ headless: false, slowMo: 150 });
//     const page = await browser.newPage();
//     await page.goto('http://127.0.0.1:5500/index.html');
//     await page.click('#btn-start');
//     await page.screenshot({ path: 'myApp.png' });

//     await browser.close();
// })();

// const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch({ headless: false, slowMo: 150 })
    const page = await browser.newPage()

    await page.setViewport({ width: 768, height: 512 })

    await page.goto('http://127.0.0.1:5500/index.html')

    await page.waitForSelector('#btn-start')
    await page.click('#btn-start')

    await page.waitForSelector('#item-1')
    await page.click('#item-1')

    await page.waitForSelector('#btn-next')
    await page.click('#btn-next')

    await page.waitForSelector('#item-0')
    await page.click('#item-0')

    await page.waitForSelector('#btn-next')
    await page.click('#btn-next')

    await page.waitForSelector('#item-1')
    await page.click('#item-1')

    await page.waitForSelector('#btn-next')
    await page.click('#btn-next')

    await page.waitForSelector('#item-2')
    await page.click('#item-2')

    await page.waitForSelector('#btn-next')
    await page.click('#btn-next')

    await page.waitForSelector('#player-name')
    await page.type('#player-name', 'AIDA')

    await page.waitForSelector('#btn-send')
    await page.click('#btn-send')

    await page.waitForSelector('#link-to-explanation')
    await page.click('#link-to-explanation')

    await page.waitForSelector('#btn-hide')
    await page.click('#btn-hide')

    await page.waitForSelector('#btn-start')
    await page.click('#btn-start')

    await page.waitForSelector('#item-0')
    await page.click('#item-0')

    await page.waitForSelector('#btn-next')
    await page.click('#btn-next')

    await page.waitForSelector('#item-2')
    await page.click('#item-2')

    await page.waitForSelector('#btn-next')
    await page.click('#btn-next')

    await page.waitForSelector('#item-1')
    await page.click('#item-1')

    await page.waitForSelector('#btn-next')
    await page.click(' #btn-next')

    await page.waitForSelector('#item-2')
    await page.click('#item-2')

    await page.waitForSelector('#btn-next')
    await page.click('#btn-next')

    await page.waitForSelector('#player-name')
    await page.type('#player-name', 'DAENERYS')

    await page.waitForSelector('#btn-send')
    await page.click('#btn-send')

    await page.screenshot({ path: 'myApp.png' });

    await browser.close()
})()

