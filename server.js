const express = require("express");
const fsp = require("fs").promises;
const fs = require("fs");
const puppeteer = require("puppeteer");
const readLine = require("readline");
const moment = require("moment");

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

const startScraping = async () => {

    //initialise puppeteer
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    console.log("getting ready to scrape");
    await page.goto('https://www.wallpaperflare.com/');

    //get user input
    const wallpaperInput = await askQuestion("What wallpapers are you looking for? : ");

    console.log("setting up downloads directory");

    if(!fs.existsSync("./downloads")) {
        fs.mkdirSync("./downloads");
    }

    if(!fs.existsSync(`./downloads/${wallpaperInput}/${moment().format("DoMMMYY")}`)) {
        fs.mkdirSync(`./downloads/${wallpaperInput}`);
        fs.mkdirSync(`./downloads/${wallpaperInput}/${moment().format("DoMMMYY")}`);

    }

    //start the search
    await page.goto(`https://www.wallpaperflare.com/search?wallpaper=${wallpaperInput}`);

    pageUrl = page.url();
    console.log(pageUrl);

    // sleep.sleep(2)

    console.log('downloading..., this will take some time');
    const photos = await page.$$eval("#gallery > li > figure > a > img", imgs => {
        return imgs.map(x => x.getAttribute("data-src"));
    });

    for(const photo of photos) {
        const imagePage = await page.goto(photo);
        await fsp.writeFile(`${__dirname}/downloads/${wallpaperInput}/${moment().format("DoMMMYY")}/${photo.split("/").pop()}`, await imagePage.buffer());
    }

    await browser.close();
};

startScraping();

app.listen(process.env.PORT || 8080, () => {
    console.log(`starting browser`);
});