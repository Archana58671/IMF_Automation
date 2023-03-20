import * as fs from "fs";
import { expect } from "chai";
import { Browser, BrowserContext, Page } from "playwright";

const playwright = require('playwright');
let browser: Browser, context: BrowserContext, page: Page;


interface MatchImageOptions {
  // Custom diff config passed to pixelmatch
  diff?: DiffOptions;
  
}

interface DiffOptions {
  threshold?: 10;

}


export function compareScreenshots( buffActual:any, buffExpected:any) {
    const Expected = fs.readFileSync(buffActual);
    const Actual = fs.readFileSync(buffExpected); 
    expect(Actual).to.matchImage(Expected)  
    
  }
  
  