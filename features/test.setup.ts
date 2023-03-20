import { Before, BeforeAll, AfterAll, After, AfterStep, World, BeforeStep } from "@cucumber/cucumber";
import { devices, chromium } from "playwright";
import { OurWorld } from "./types";
import { BrowserContext, Page,Browser } from "playwright";
import * as fs from "fs";
let browser: Browser, context: BrowserContext, page: Page;
BeforeAll(async function () {
  browser = await chromium.launch({
    headless: false,
    channel:'chrome',
    slowMo: 5,
  });
  
});


Before(async function (this: OurWorld) {
  this.context = await browser.newContext({ recordVideo:{dir: "./recordings"}});
  this.page = await this.context.newPage();
  await this.page.goto("https://imf-test.dev.app.woodside/")
  await this.page.waitForTimeout(10000)
});

AfterStep(async function () {
  let page=this.page
  await page.waitForTimeout(2000)
  this.attach(await page.screenshot(), "image/png");
 
});
After(async function(scenario){
  await this.page.close()
  await this.context.close()
  const videoName=await this.page.video().path()
  fs.rename(videoName, "recordings/"+scenario.pickle.name + ".webm",(
    async () => await console.log(scenario.pickle.name)
  ))
})