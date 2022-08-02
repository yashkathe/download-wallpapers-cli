const express = require("express")
const puppeteer = require("puppeteer")
const readLine = require("readline")

const app = express()

const askQuestion = (query) => {
    const rl = readLine.createInterface({
        input: process.stdin,
        output: process.stdout,
    });

    return new Promise(resolve => rl.question(query, (ans) => {
        rl.close();
        resolve(ans);
    }))
}

const startScraping = async () => {

    //initialise puppeteer
    const browser = await puppeteer.launch()
    const page = await browser.newPage()
    await page.goto('https://www.wallpaperflare.com/')

    //get user input
    const wallpaperInput = await askQuestion("What wallpapers are you looking for? : ");

    //start the search
    await page.waitForSelector('#portal_input')

    await page.type('#portal_input', wallpaperInput)

    await Promise.all([
        page.click("#portal_sub"),
        page.waitForNavigation()
    ])

    console.log(page.url())

    await browser.close()
}

startScraping()

app.listen(process.env.PORT || 8080, () => {
    console.log('server running')
})