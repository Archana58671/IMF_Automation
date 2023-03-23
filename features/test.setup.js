"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const cucumber_1 = require("@cucumber/cucumber");
const playwright_1 = require("playwright");
const fs = __importStar(require("fs"));
let browser, context, page;
(0, cucumber_1.BeforeAll)(async function () {
    browser = await playwright_1.chromium.launch({
        headless: false,
        channel: 'chrome',
        slowMo: 5,
    });
});
(0, cucumber_1.Before)(async function () {
    this.context = await browser.newContext({ recordVideo: { dir: "./recordings" } });
    this.page = await this.context.newPage();
    await this.page.goto("https://imf-test.dev.app.woodside/");
    await this.page.waitForTimeout(10000);
});
(0, cucumber_1.AfterStep)(async function () {
    let page = this.page;
    await page.waitForTimeout(2000);
    this.attach(await page.screenshot(), "image/png");
});
(0, cucumber_1.After)(async function (scenario) {
    await this.page.close();
    await this.context.close();
    const videoName = await this.page.video().path();
    fs.rename(videoName, "recordings/" + scenario.pickle.name + ".webm", (async () => await console.log(scenario.pickle.name)));
});
