const express = require("express");
const puppeteer = require("puppeteer");
const readLine = require("readline");

const config = require('./functions/settings');

const app = express();

const askQuestion = (query) => {
    const rl = readLine.createInterface({
        input: process.stdin,
        output: process.stdout,
    });

    return new Promise(resolve => rl.question(query, (ans) => {
        rl.close();
        resolve(ans);
    }));
};

config.createSettingsJson();
config.setSettings0();
config.setSettings1();

const startScraping = async () => {

    //initialise puppeteer
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('https://www.wallpaperflare.com/');

    //get user input
    const wallpaperInput = await askQuestion("What wallpapers are you looking for? : ");

    //start the search
    await page.goto(`https://www.wallpaperflare.com/search?wallpaper=${wallpaperInput}`);

    await page.waitForSelector('#search_input');

    await page.type('#search_input', wallpaperInput);
    await page.type('#swidth', "1920");
    await page.type('#sheight', "1080");

    await Promise.all([
        page.click("#search_sub"),
        page.waitForNavigation()
    ]);

    console.log(page.url());

    await browser.close();
};

startScraping();

app.listen(process.env.PORT || 8080, () => {
    console.log('change program settings from settings.json file');
});