"use server"
import puppeteer from 'puppeteer';

export async function scrape(username) {
    let browser;
    try {
        browser = await puppeteer.launch({ headless: false });
        const page = await browser.newPage();

        const navigationPromise=page.waitForNavigation({
            waitUntil:"networkidle0",
            timeout:120000,
        })
        await page.setExtraHTTPHeaders({
            'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.97 Safari/537.36'
        });


        
        await page.goto('https://ilo.so/twitter-id/',{
            waitUntil:"networkidle0",
            timeout:120000,
        });
        await page.setViewport({ width: 1080, height: 1024 });

        await page.type('#id_username', username);

        const parentElement = await page.waitForSelector('#username_form');

        const button = await parentElement.$('button');
        await button.click();

        await page.waitForSelector('#user_id');
        await navigationPromise();

        const user_id = await page.evaluate(() => document.querySelector('#user_id').textContent);

        return user_id;
    }
    catch (err) {
        return err;
    }
    finally {
        browser.close();
    }

};