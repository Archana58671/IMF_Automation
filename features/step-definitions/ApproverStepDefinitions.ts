import { Given, When, Then, BeforeAll, setDefaultTimeout, World, AfterStep, Status, After, parseGherkinMessageStream, Before, BeforeStep } from "@cucumber/cucumber";
import { expect } from "chai";
import {expect as expt} from "@playwright/test"
import * as fs from "fs";
import { parse } from 'csv-parse/sync';
import * as path from 'path';
import * as chai from "chai";
import { chaiImage } from "chai-image"
//import {test} from "@playwright/test"
chai.use(chaiImage)
const playwright = require('playwright');

var page:any
let newPage:any, phaseName:any, investmentName:any
const records = parse(fs.readFileSync(path.join('C:\\Users\\W58671\\Onedrive - Woodside Energy Ltd\\Desktop\\IMF Automation', 'input.csv')), {
    columns: true,
    skip_empty_lines: true
  });
 
setDefaultTimeout(30*100000);
for (const record of records) {
Then("I should see Investments with APPROVAL PENDING status",  async function () {
    page=this.page
    let cnt=await page.locator("//div[@class='uppercase MuiBox-root css-0']").count()
    for(let i=1; i<=cnt;i++)
    {
        expect(await page.locator(`(//div[@class='uppercase MuiBox-root css-0'])[${i}]`).innerText()).to.eql("APPROVAL PENDING")
    }
})
Then("I should redirect to Approval page",  async function () {
    expect(await page.locator("(//button[contains(text(), 'Approve')])[1]").isVisible()).to.be.true
})
Then("I should see All details of Investment, Approve and History buttons",  async function () {
    expect(await page.locator("(//button[contains(text(), 'Approve')])[1]").isVisible()).to.be.true
    expect(await page.locator("//button[contains(text(), 'History')]").isVisible()).to.be.true
    expect(await page.locator("(//div[@class='MuiInputBase-root MuiOutlinedInput-root MuiInputBase-colorPrimary MuiInputBase-fullWidth MuiInputBase-formControl css-1bp1ao6'])[1]/input").getAttribute('value')).to.includes(record.username)
    expect(await page.locator("//button[contains(text(), 'Details')]").isEditable()).to.be.true
    expect(await page.locator("//button[contains(text(), 'Roadmap')]").isEditable()).to.be.true
    expect(await page.locator("//button[contains(text(), 'Objective & Deliverable')]").isEditable()).to.be.true
})
When("I click on History button",  async function () {
   await page.locator("//button[contains(text(), 'History')]").click()
})
Then("History sidebar should open and show the comments if entered by user",  async function () {
    expect(await page.locator("//div[@class='MuiPaper-root MuiPaper-elevation MuiPaper-elevation16 MuiDrawer-paper MuiDrawer-paperAnchorRight css-jhdkwj']")).to.exist
    if(expect(await page.locator("//div[@class='text-primary font-semibold MuiBox-root css-0']")).to.exist){}
    else{expect(await page.locator("//div[@class='text-sm pl-8 whitespace-pre-line MuiBox-root css-0']").first()).to.exist}
 })
Then("I enter the comments and close the History side-bar",  async function () {
    await page.locator("//textarea[@name='comment']").type("Approver comments in History bar")
    await page.locator("//*[@data-testid='SendRoundedIcon']").click()
    await page.waitForTimeout(3000)
    expect(await page.locator("(//div[@class='text-sm pl-8 whitespace-pre-line MuiBox-root css-0'])[1]").innerText()).to.eql("Approver comments in History bar")
    await page.locator("//button[@aria-label='Close']").click()
 })
When("I click on Approve button",  async function () {
    phaseName=await page.locator("//div[@class='bg-pink-400 text-white font-semibold rounded-full MuiBox-root css-0']/div").innerText()
    investmentName=await page.locator("//div[@class='text-primary text-xl font-semibold MuiBox-root css-0']").innerText()
    await page.locator("//button[contains(text(), 'Approve')]").first().click()
 })
Then("Approve Investment Phase popup should open",  async function () {
    expect(await page.locator("//h2[@class='MuiTypography-root MuiTypography-h6 MuiDialogTitle-root capitalize css-ohyacs']/div").innerText()).to.eql("Approve Investment Phase")
    expect(await page.locator("(//div[@class='flex flex-col gap-4 MuiBox-root css-0']/div)[1]").innerText()).to.eql(` Are you sure you want to approve "${phaseName}" phase of investment "${investmentName}" ?`)
    expect(await page.locator("//button[contains(text(), 'Confirm')]").isVisible()).to.be.true
    expect(await page.locator("//button[contains(text(), 'Cancel')]").isVisible()).to.be.true
})
When("I enter the comments and click on Confirm button",  async function () {
    page.locator("//textarea[@name='comment']").type("Testing approver flow from automation")
    await page.locator("//button[contains(text(), 'Confirm')]").click()
})
Then("Investmet phase approve successful message should appear and Approver should redirect to Action Required tab",  async function () {
    await page.waitForTimeout(2000)
    expect(await page.locator("text=Investment phase approve successful").isVisible()).to.be.true
    await page.waitForTimeout(6000)
    expect(await page.locator("//button[contains(text(),'Action Required')]").getAttribute('aria-selected')).to.eql("true")
})
Then("Approved investment should not be present in Approvers Action Required tab",  async function () {
    expect(await page.locator(`text=${investmentName}`).isVisible()).to.be.false
})
When("I enter the comments and click on Cancel button",  async function () {
    page.locator("//textarea[@name='comment']").type("Testing approver flow from automation")
    await page.locator("//button[contains(text(), 'Cancel')]").click()
})
Then("Investmet phase approve successful message should not appear and aaprover should remain in same page",  async function () {
    await page.waitForTimeout(4000)
    expect(await page.locator("text=Investment phase approve successful").isVisible()).to.be.false
    expect(await page.locator("(//button[contains(text(), 'Approve')])[1]").isVisible()).to.be.true
    expect(await page.locator("//button[contains(text(), 'History')]").isVisible()).to.be.true
})

When("I click on Hold button",  async function () {
    phaseName=await page.locator("//div[@class='bg-pink-400 text-white font-semibold rounded-full MuiBox-root css-0']/div").innerText()
    investmentName=await page.locator("//div[@class='text-primary text-xl font-semibold MuiBox-root css-0']").innerText()
    await page.locator("//button[contains(text(), 'Hold')]").first().click()
 })
Then("Hold Investment Phase popup should open",  async function () {
    expect(await page.locator("//h2[@class='MuiTypography-root MuiTypography-h6 MuiDialogTitle-root capitalize css-ohyacs']/div").innerText()).to.eql("Hold Investment Phase")
    expect(await page.locator("(//div[@class='flex flex-col gap-4 MuiBox-root css-0']/div)[1]").innerText()).to.eql(` Are you sure you want to hold "${phaseName}" phase of investment "${investmentName}" ?`)
    expect(await page.locator("//button[contains(text(), 'Confirm')]").isVisible()).to.be.true
    expect(await page.locator("//button[contains(text(), 'Cancel')]").isVisible()).to.be.true
})
Then("Investmet phase hold successful message should appear and Approver should redirect to Action Required tab",  async function () {
    await page.waitForTimeout(2000)
    expect(await page.locator("text=Investment phase hold successful").isVisible()).to.be.true
    await page.waitForTimeout(4000)
    expect(await page.locator("//button[contains(text(),'Action Required')]").getAttribute('aria-selected')).to.eql("true")
})
Then("Hold investment should not be present in Approvers Action Required tab",  async function () {
    expect(await page.locator(`text=${investmentName}`).isVisible()).to.be.false
})
Then("Investmet phase hold successful message should not appear and aaprover should remain in same page",  async function () {
    expect(await page.locator("text=Investment phase approve successful").isVisible()).to.be.false
    expect(await page.locator("(//button[contains(text(), 'Approve')])[1]").isVisible()).to.be.true
    expect(await page.locator("//button[contains(text(), 'History')]").isVisible()).to.be.true
})
//106
When("I click on Investment with status LIVE or DONE",  async function () {
    page=this.page
    do
  {
   await page.locator("//div[@class='flex justify-center mt-2 MuiBox-root css-0']/button").click()
  }while(await page.locator("xpath=//div[@role='alert']").isVisible()==false)

    await page.click("(//div[@class='uppercase MuiBox-root css-0' and (contains(text(),'LIVE') or  contains(text(),'DONE'))])[1]")
})
Then("I should redirect to Review page",  async function () {
    page=this.page
    await page.waitForTimeout(3000)
    expect(await page.locator("//button[contains(text(), 'History')]").isVisible()).to.be.true    
})
Then("I should see All details of Investment and History buttons",  async function () {
    expect(await page.locator("//button[contains(text(), 'History')]").isVisible()).to.be.true
    expect(await page.locator("//button[contains(text(), 'Details')]").isEditable()).to.be.true
    expect(await page.locator("//button[contains(text(), 'Roadmap')]").isEditable()).to.be.true
    expect(await page.locator("//button[contains(text(), 'Objective & Deliverable')]").isEditable()).to.be.true
})
Then("History sidebar should open and show the comments",  async function () {
    expect(await page.locator("//div[@class='bg-green-500 inline-block text-sm px-2 rounded-full text-white font-semibold MuiBox-root css-0']")).to.exist
})
When("I click on Investment with status HOLD",  async function () {
    page=this.page
    await page.waitForTimeout(5000)
    do
  {
   await page.locator("//div[@class='flex justify-center mt-2 MuiBox-root css-0']/button").click()
  }while(await page.locator("xpath=//div[@role='alert']").isVisible()==false)

    await page.click("(//div[@class='uppercase MuiBox-root css-0' and contains(text(),'HOLD')])[1]")
})
Then("I should see All details of Investment, Back, Send, Save and History buttons",  async function () {
    expect(await page.locator("//button[contains(text(), 'back')]").isEditable()).to.be.true
    expect(await page.locator("//button[contains(text(), 'save')]").isEditable()).to.be.true
    expect(await page.locator("//button[contains(text(), 'send')]").isEditable()).to.be.true
    expect(await page.locator("//button[contains(text(), 'History')]").isVisible()).to.be.true
    expect(await page.locator("//button[contains(text(), 'Details')]").isEditable()).to.be.true
    expect(await page.locator("//button[contains(text(), 'Roadmap')]").isEditable()).to.be.true
    expect(await page.locator("//button[contains(text(), 'Objective & Deliverable')]").isEditable()).to.be.true
})
Then("I should navigate to Objectives and Deliverable page and It should allow to add, edit, delete Objectives and deliverables of that phase",  async function () {
    expect(await page.locator("(//div[@class='font-semibold MuiBox-root css-0'])[1]").innerText()).to.eql('Objectives')
    expect(await page.locator("(//div[@class='font-semibold MuiBox-root css-0'])[2]").innerText()).to.eql('Deliverables')
    await page.locator("(//span[@aria-label='Active Objective'])[1]//parent::span//parent::div//preceding-sibling::div").hover({force:true,timeout:5000, trial:true})
    //await page.locator("(//div[@class='ml-2 flex flex-col items-center relative MuiBox-root css-0']/div/button)[1]").hover({force:true,timeout:5000, trial:true})
    await page.locator("(//button[@aria-label='Add Deliverables'])[1]").click({force:true})
    await page.locator("//textarea[@name='title']").fill("add deliverable for hold status")
    await page.locator("//textarea[@name='information']").fill("add deliverable for hold status")
    await page.locator("//button[contains(text(), 'Add')]").click()
    expect((await page.locator("xpath=//div[@role='alert']").last().innerText()).valueOf()).to.includes('Deliverable add successful')
})
Then("I should navigate to Details page and and all fields should be editable except Investment Name and Investment Type",  async function () {
    expect(await page.locator("//input[@name='investmentname']").isEditable()).to.be.false
    expect(await page.locator("//input[@name='investmenttype']").isEditable()).to.be.false
    await page.locator("//textarea[@name='investmentdescription']").fill('editing hold status investment')
})
Then("I click on next button untill I reach Review page",  async function () {
    await page.locator("//button[contains(text(), 'next')]").click()
    await page.waitForTimeout(3000)
    await page.locator("//button[contains(text(), 'next')]").click()
    await page.waitForTimeout(3000)
    await page.locator("//button[contains(text(), 'next')]").click()
    await page.waitForTimeout(3000)
})
Then("I click on Send button",  async function () {
    await page.locator("//button[contains(text(), 'send')]").click()
})
}