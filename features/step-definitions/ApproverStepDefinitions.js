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
const chai_1 = require("chai");
const fs = __importStar(require("fs"));
const sync_1 = require("csv-parse/sync");
const path = __importStar(require("path"));
const chai = __importStar(require("chai"));
const chai_image_1 = require("chai-image");
chai.use(chai_image_1.chaiImage);
const playwright = require('playwright');
var page;
let newPage, phaseName, investmentName;
const records = (0, sync_1.parse)(fs.readFileSync(path.join('C:\\Users\\W58671\\Onedrive - Woodside Energy Ltd\\Desktop\\IMF Automation', 'input.csv')), {
    columns: true,
    skip_empty_lines: true
});
(0, cucumber_1.setDefaultTimeout)(30 * 100000);
for (const record of records) {
    (0, cucumber_1.Then)("I should see Investments with APPROVAL PENDING status", async function () {
        page = this.page;
        let cnt = await page.locator("//div[@class='uppercase MuiBox-root css-0']").count();
        for (let i = 1; i <= cnt; i++) {
            (0, chai_1.expect)(await page.locator(`(//div[@class='uppercase MuiBox-root css-0'])[${i}]`).innerText()).to.eql("APPROVAL PENDING");
        }
    });
    (0, cucumber_1.Then)("I should redirect to Approval page", async function () {
        (0, chai_1.expect)(await page.locator("(//button[contains(text(), 'Approve')])[1]").isVisible()).to.be.true;
    });
    (0, cucumber_1.Then)("I should see All details of Investment, Approve and History buttons", async function () {
        (0, chai_1.expect)(await page.locator("(//button[contains(text(), 'Approve')])[1]").isVisible()).to.be.true;
        (0, chai_1.expect)(await page.locator("//button[contains(text(), 'History')]").isVisible()).to.be.true;
        (0, chai_1.expect)(await page.locator("(//div[@class='MuiInputBase-root MuiOutlinedInput-root MuiInputBase-colorPrimary MuiInputBase-fullWidth MuiInputBase-formControl css-1bp1ao6'])[1]/input").getAttribute('value')).to.includes(record.username);
        (0, chai_1.expect)(await page.locator("//button[contains(text(), 'Details')]").isEditable()).to.be.true;
        (0, chai_1.expect)(await page.locator("//button[contains(text(), 'Roadmap')]").isEditable()).to.be.true;
        (0, chai_1.expect)(await page.locator("//button[contains(text(), 'Objective & Deliverable')]").isEditable()).to.be.true;
    });
    (0, cucumber_1.When)("I click on History button", async function () {
        await page.locator("//button[contains(text(), 'History')]").click();
    });
    (0, cucumber_1.Then)("History sidebar should open and show the comments if entered by user", async function () {
        (0, chai_1.expect)(await page.locator("//div[@class='MuiPaper-root MuiPaper-elevation MuiPaper-elevation16 MuiDrawer-paper MuiDrawer-paperAnchorRight css-jhdkwj']")).to.exist;
        if ((0, chai_1.expect)(await page.locator("//div[@class='text-primary font-semibold MuiBox-root css-0']")).to.exist) { }
        else {
            (0, chai_1.expect)(await page.locator("//div[@class='text-sm pl-8 whitespace-pre-line MuiBox-root css-0']").first()).to.exist;
        }
    });
    (0, cucumber_1.Then)("I enter the comments and close the History side-bar", async function () {
        await page.locator("//textarea[@name='comment']").type("Approver comments in History bar");
        await page.locator("//*[@data-testid='SendRoundedIcon']").click();
        await page.waitForTimeout(3000);
        (0, chai_1.expect)(await page.locator("(//div[@class='text-sm pl-8 whitespace-pre-line MuiBox-root css-0'])[1]").innerText()).to.eql("Approver comments in History bar");
        await page.locator("//button[@aria-label='Close']").click();
    });
    (0, cucumber_1.When)("I click on Approve button", async function () {
        phaseName = await page.locator("//div[@class='bg-pink-400 text-white font-semibold rounded-full MuiBox-root css-0']/div").innerText();
        investmentName = await page.locator("//div[@class='text-primary text-xl font-semibold MuiBox-root css-0']").innerText();
        await page.locator("//button[contains(text(), 'Approve')]").first().click();
    });
    (0, cucumber_1.Then)("Approve Investment Phase popup should open", async function () {
        (0, chai_1.expect)(await page.locator("//h2[@class='MuiTypography-root MuiTypography-h6 MuiDialogTitle-root capitalize css-ohyacs']/div").innerText()).to.eql("Approve Investment Phase");
        (0, chai_1.expect)(await page.locator("(//div[@class='flex flex-col gap-4 MuiBox-root css-0']/div)[1]").innerText()).to.eql(` Are you sure you want to approve "${phaseName}" phase of investment "${investmentName}" ?`);
        (0, chai_1.expect)(await page.locator("//button[contains(text(), 'Confirm')]").isVisible()).to.be.true;
        (0, chai_1.expect)(await page.locator("//button[contains(text(), 'Cancel')]").isVisible()).to.be.true;
    });
    (0, cucumber_1.When)("I enter the comments and click on Confirm button", async function () {
        page.locator("//textarea[@name='comment']").type("Testing approver flow from automation");
        await page.locator("//button[contains(text(), 'Confirm')]").click();
    });
    (0, cucumber_1.Then)("Investmet phase approve successful message should appear and Approver should redirect to Action Required tab", async function () {
        await page.waitForTimeout(2000);
        (0, chai_1.expect)(await page.locator("text=Investment phase approve successful").isVisible()).to.be.true;
        await page.waitForTimeout(6000);
        (0, chai_1.expect)(await page.locator("//button[contains(text(),'Action Required')]").getAttribute('aria-selected')).to.eql("true");
    });
    (0, cucumber_1.Then)("Approved investment should not be present in Approvers Action Required tab", async function () {
        (0, chai_1.expect)(await page.locator(`text=${investmentName}`).isVisible()).to.be.false;
    });
    (0, cucumber_1.When)("I enter the comments and click on Cancel button", async function () {
        page.locator("//textarea[@name='comment']").type("Testing approver flow from automation");
        await page.locator("//button[contains(text(), 'Cancel')]").click();
    });
    (0, cucumber_1.Then)("Investmet phase approve successful message should not appear and aaprover should remain in same page", async function () {
        await page.waitForTimeout(4000);
        (0, chai_1.expect)(await page.locator("text=Investment phase approve successful").isVisible()).to.be.false;
        (0, chai_1.expect)(await page.locator("(//button[contains(text(), 'Approve')])[1]").isVisible()).to.be.true;
        (0, chai_1.expect)(await page.locator("//button[contains(text(), 'History')]").isVisible()).to.be.true;
    });
    (0, cucumber_1.When)("I click on Hold button", async function () {
        phaseName = await page.locator("//div[@class='bg-pink-400 text-white font-semibold rounded-full MuiBox-root css-0']/div").innerText();
        investmentName = await page.locator("//div[@class='text-primary text-xl font-semibold MuiBox-root css-0']").innerText();
        await page.locator("//button[contains(text(), 'Hold')]").first().click();
    });
    (0, cucumber_1.Then)("Hold Investment Phase popup should open", async function () {
        (0, chai_1.expect)(await page.locator("//h2[@class='MuiTypography-root MuiTypography-h6 MuiDialogTitle-root capitalize css-ohyacs']/div").innerText()).to.eql("Hold Investment Phase");
        (0, chai_1.expect)(await page.locator("(//div[@class='flex flex-col gap-4 MuiBox-root css-0']/div)[1]").innerText()).to.eql(` Are you sure you want to hold "${phaseName}" phase of investment "${investmentName}" ?`);
        (0, chai_1.expect)(await page.locator("//button[contains(text(), 'Confirm')]").isVisible()).to.be.true;
        (0, chai_1.expect)(await page.locator("//button[contains(text(), 'Cancel')]").isVisible()).to.be.true;
    });
    (0, cucumber_1.Then)("Investmet phase hold successful message should appear and Approver should redirect to Action Required tab", async function () {
        await page.waitForTimeout(2000);
        (0, chai_1.expect)(await page.locator("text=Investment phase hold successful").isVisible()).to.be.true;
        await page.waitForTimeout(4000);
        (0, chai_1.expect)(await page.locator("//button[contains(text(),'Action Required')]").getAttribute('aria-selected')).to.eql("true");
    });
    (0, cucumber_1.Then)("Hold investment should not be present in Approvers Action Required tab", async function () {
        (0, chai_1.expect)(await page.locator(`text=${investmentName}`).isVisible()).to.be.false;
    });
    (0, cucumber_1.Then)("Investmet phase hold successful message should not appear and aaprover should remain in same page", async function () {
        (0, chai_1.expect)(await page.locator("text=Investment phase approve successful").isVisible()).to.be.false;
        (0, chai_1.expect)(await page.locator("(//button[contains(text(), 'Approve')])[1]").isVisible()).to.be.true;
        (0, chai_1.expect)(await page.locator("//button[contains(text(), 'History')]").isVisible()).to.be.true;
    });
    (0, cucumber_1.When)("I click on Investment with status LIVE or DONE", async function () {
        page = this.page;
        do {
            await page.locator("//div[@class='flex justify-center mt-2 MuiBox-root css-0']/button").click();
        } while (await page.locator("xpath=//div[@role='alert']").isVisible() == false);
        await page.click("(//div[@class='uppercase MuiBox-root css-0' and (contains(text(),'LIVE') or  contains(text(),'DONE'))])[1]");
    });
    (0, cucumber_1.Then)("I should redirect to Review page", async function () {
        page = this.page;
        await page.waitForTimeout(3000);
        (0, chai_1.expect)(await page.locator("//button[contains(text(), 'History')]").isVisible()).to.be.true;
    });
    (0, cucumber_1.Then)("I should see All details of Investment and History buttons", async function () {
        (0, chai_1.expect)(await page.locator("//button[contains(text(), 'History')]").isVisible()).to.be.true;
        (0, chai_1.expect)(await page.locator("//button[contains(text(), 'Details')]").isEditable()).to.be.true;
        (0, chai_1.expect)(await page.locator("//button[contains(text(), 'Roadmap')]").isEditable()).to.be.true;
        (0, chai_1.expect)(await page.locator("//button[contains(text(), 'Objective & Deliverable')]").isEditable()).to.be.true;
    });
    (0, cucumber_1.Then)("History sidebar should open and show the comments", async function () {
        (0, chai_1.expect)(await page.locator("//div[@class='bg-green-500 inline-block text-sm px-2 rounded-full text-white font-semibold MuiBox-root css-0']")).to.exist;
    });
    (0, cucumber_1.When)("I click on Investment with status HOLD", async function () {
        page = this.page;
        await page.waitForTimeout(5000);
        do {
            await page.locator("//div[@class='flex justify-center mt-2 MuiBox-root css-0']/button").click();
        } while (await page.locator("xpath=//div[@role='alert']").isVisible() == false);
        await page.click("(//div[@class='uppercase MuiBox-root css-0' and contains(text(),'HOLD')])[1]");
    });
    (0, cucumber_1.Then)("I should see All details of Investment, Back, Send, Save and History buttons", async function () {
        (0, chai_1.expect)(await page.locator("//button[contains(text(), 'back')]").isEditable()).to.be.true;
        (0, chai_1.expect)(await page.locator("//button[contains(text(), 'save')]").isEditable()).to.be.true;
        (0, chai_1.expect)(await page.locator("//button[contains(text(), 'send')]").isEditable()).to.be.true;
        (0, chai_1.expect)(await page.locator("//button[contains(text(), 'History')]").isVisible()).to.be.true;
        (0, chai_1.expect)(await page.locator("//button[contains(text(), 'Details')]").isEditable()).to.be.true;
        (0, chai_1.expect)(await page.locator("//button[contains(text(), 'Roadmap')]").isEditable()).to.be.true;
        (0, chai_1.expect)(await page.locator("//button[contains(text(), 'Objective & Deliverable')]").isEditable()).to.be.true;
    });
    (0, cucumber_1.Then)("I should navigate to Objectives and Deliverable page and It should allow to add, edit, delete Objectives and deliverables of that phase", async function () {
        (0, chai_1.expect)(await page.locator("(//div[@class='font-semibold MuiBox-root css-0'])[1]").innerText()).to.eql('Objectives');
        (0, chai_1.expect)(await page.locator("(//div[@class='font-semibold MuiBox-root css-0'])[2]").innerText()).to.eql('Deliverables');
        await page.locator("(//span[@aria-label='Active Objective'])[1]//parent::span//parent::div//preceding-sibling::div").hover({ force: true, timeout: 5000, trial: true });
        await page.locator("(//button[@aria-label='Add Deliverables'])[1]").click({ force: true });
        await page.locator("//textarea[@name='title']").fill("add deliverable for hold status");
        await page.locator("//textarea[@name='information']").fill("add deliverable for hold status");
        await page.locator("//button[contains(text(), 'Add')]").click();
        (0, chai_1.expect)((await page.locator("xpath=//div[@role='alert']").last().innerText()).valueOf()).to.includes('Deliverable add successful');
    });
    (0, cucumber_1.Then)("I should navigate to Details page and and all fields should be editable except Investment Name and Investment Type", async function () {
        (0, chai_1.expect)(await page.locator("//input[@name='investmentname']").isEditable()).to.be.false;
        (0, chai_1.expect)(await page.locator("//input[@name='investmenttype']").isEditable()).to.be.false;
        await page.locator("//textarea[@name='investmentdescription']").fill('editing hold status investment');
    });
    (0, cucumber_1.Then)("I click on next button untill I reach Review page", async function () {
        await page.locator("//button[contains(text(), 'next')]").click();
        await page.waitForTimeout(3000);
        await page.locator("//button[contains(text(), 'next')]").click();
        await page.waitForTimeout(3000);
        await page.locator("//button[contains(text(), 'next')]").click();
        await page.waitForTimeout(3000);
    });
    (0, cucumber_1.Then)("I click on Send button", async function () {
        await page.locator("//button[contains(text(), 'send')]").click();
    });
}
