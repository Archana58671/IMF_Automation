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
const commonFunctions_1 = require("./commonFunctions");
chai.use(chai_image_1.chaiImage);
const playwright = require('playwright');
var page;
var investmentNumber, phasename, addObjective, nextPhase;
var investmenttype, roadmap, investmentName, deletebuttonofdraftstate, investmentNameOfDraftState, existingInvestmentName;
let locationname, asset, objName, delName, numOfObj, filterText, textcolumnofverification, editDeliverable, deleteDeliverable;
let totalFormLabels = [], allPhaseNames = [], investmentLeads = ['Sourav Dutta', 'Pratyusha Das', 'Sayali Gurav', 'Aaron Tung', 'Anushruti Shah', 'Vaibhav Meharwal', 'Bhavesh Khairnar'];
let resetPhase, currentPhaseName, addedPhaseByUser, numberofObjInNewlyAddedPhase, currentPhase, roadmapname, addDeliverable;
let addPhaseJustification = "Adding phase";
let deletePhaseJustification = "Deleting phase";
let JustificationEnteredDate, approvalPendingInvestment, approvalPendingPhase;
let newPage;
const records = (0, sync_1.parse)(fs.readFileSync(path.join('C:\\Users\\W58671\\Onedrive - Woodside Energy Ltd\\Desktop\\IMF Automation', 'input.csv')), {
    columns: true,
    skip_empty_lines: true
});
(0, cucumber_1.setDefaultTimeout)(30 * 100000);
for (const record of records) {
    (0, cucumber_1.BeforeStep)(async function () {
        page = this.page;
    });
    (0, cucumber_1.When)("I click on Create button", async function () {
        page = this.page;
        await page.locator("//a[@href='/details']//button").click();
    });
    (0, cucumber_1.Then)("Create New Investment page should open", async function () {
        (0, chai_1.expect)(await page.locator("//span[@class='text-primary font-semibold']").innerText()).to.eql("Investment");
    });
    (0, cucumber_1.Then)("should show Investment Details, Investment Description, Investment Leads and Team Members section", async function () {
        (0, chai_1.expect)(await page.locator("(//div[@class='font-semibold MuiBox-root css-0'])[1]").innerText()).to.eql("Investment Details");
        (0, chai_1.expect)(await page.locator("(//div[@class='font-semibold MuiBox-root css-0'])[2]").innerText()).to.eql("Investment Description");
        (0, chai_1.expect)(await page.locator("(//div[@class='font-semibold MuiBox-root css-0'])[3]").innerText()).to.eql("Investment Leads");
        (0, chai_1.expect)(await page.locator("(//div[@class='font-semibold MuiBox-root css-0'])[4]").innerText()).to.eql("Team Members");
    });
    (0, cucumber_1.Then)("Save and Next buttons", async function () {
        (0, chai_1.expect)(await page.locator("//button[contains(text(), 'save')]").isVisible()).to.be.true;
        (0, chai_1.expect)(await page.locator("//button[contains(text(), 'next')]").isVisible()).to.be.true;
    });
    (0, cucumber_1.When)("I click on Next button", async function () {
        await page.locator("//button[contains(text(),'next')]").click();
        await page.waitForTimeout(3000);
    });
    (0, cucumber_1.When)("I click Next button in Roadmap page", async function () {
        if (await page.locator("(//div[@class='text-pink-400 MuiBox-root css-0'])[1]").isVisible()) {
            await page.locator("//button[contains(text(),'next')]").click();
        }
        else {
            await page.locator("//div[@class='MuiFormControl-root MuiFormControl-fullWidth w-52 css-tzsjye']").click();
            await page.locator("//span[@class='MuiTypography-root MuiTypography-body1 MuiListItemText-primary css-yb0lig']").first().click();
            await page.waitForTimeout(3000);
            await page.locator("//button[contains(text(),'next')]").click();
        }
    });
    (0, cucumber_1.When)("I click on Back button", async function () {
        await page.locator("//button[contains(text(),'back')]").click();
        await page.waitForTimeout(3000);
    });
    (0, cucumber_1.Then)("Each field should show error message", async function () {
        (0, chai_1.expect)(await page.locator("(//p[@class='MuiFormHelperText-root Mui-error css-j7o63n'])[1]").innerText()).to.eql("Please Enter Investment Name");
        (0, chai_1.expect)(await page.locator("(//p[@class='MuiFormHelperText-root Mui-error css-j7o63n'])[2]").innerText()).to.eql("Please Enter Investment Description");
        (0, chai_1.expect)(await page.locator("(//p[@class='MuiFormHelperText-root Mui-error css-j7o63n'])[3]").innerText()).to.eql("Please Select Investment Type");
        (0, chai_1.expect)(await page.locator("(//p[@class='MuiFormHelperText-root Mui-error css-j7o63n'])[4]").innerText()).to.eql("Please Select Location");
        (0, chai_1.expect)(await page.locator("(//p[@class='MuiFormHelperText-root Mui-error css-j7o63n'])[5]").innerText()).to.eql("Please Select Asset");
        (0, chai_1.expect)(await page.locator("(//p[@class='MuiFormHelperText-root Mui-error css-j7o63n'])[6]").innerText()).to.eql("Please Select Year");
        (0, chai_1.expect)(await page.locator("(//p[@class='MuiFormHelperText-root Mui-error css-j7o63n'])[7]").innerText()).to.eql("Please Search & Select Investment Lead(s)");
    });
    (0, cucumber_1.When)("I fill some of the fields and click on Next button", async function () {
        await page.locator("//input[@name='investmentname']").fill("Playwright");
        await page.locator("//textarea[@name='investmentdescription']").fill("Playwright");
        await page.locator("//button[contains(text(),'next')]").click();
    });
    (0, cucumber_1.Then)("Should show the error message only at unfilled fields", async function () {
        (0, chai_1.expect)(await page.locator("(//p[@class='MuiFormHelperText-root Mui-error css-j7o63n'])[1]").innerText()).to.not.eql("Please Enter Investment Name");
        (0, chai_1.expect)(await page.locator("(//p[@class='MuiFormHelperText-root Mui-error css-j7o63n'])[2]").innerText()).to.not.eql("Please Enter Investment Description");
        (0, chai_1.expect)(await page.locator("(//p[@class='MuiFormHelperText-root Mui-error css-j7o63n'])[1]").innerText()).to.eql("Please Select Investment Type");
        (0, chai_1.expect)(await page.locator("(//p[@class='MuiFormHelperText-root Mui-error css-j7o63n'])[2]").innerText()).to.eql("Please Select Location");
        (0, chai_1.expect)(await page.locator("(//p[@class='MuiFormHelperText-root Mui-error css-j7o63n'])[3]").innerText()).to.eql("Please Select Asset");
        (0, chai_1.expect)(await page.locator("(//p[@class='MuiFormHelperText-root Mui-error css-j7o63n'])[4]").innerText()).to.eql("Please Select Year");
        (0, chai_1.expect)(await page.locator("(//p[@class='MuiFormHelperText-root Mui-error css-j7o63n'])[5]").innerText()).to.eql("Please Search & Select Investment Lead(s)");
    });
    (0, cucumber_1.Then)("It should show the Roadmap of selected Investment Type in details page and Roadmap", async function () {
        (0, chai_1.expect)(await page.locator("//div[@class='bg-pink-400 rounded-md shadow-md border-x-2 border-t-2 border-white group/action MuiBox-root css-0']").count()).to.be.greaterThan(0);
    });
    (0, cucumber_1.When)("I Fill investment name in Investment Details section", async function () {
        page = this.page;
        investmentName = Math.random().toString(20).substr(2, 6);
        investmentName = "New investment" + investmentName;
        await page.locator("//input[@name='investmentname']").fill(investmentName);
        await page.locator("//textarea[@name='investmentdescription']").fill(investmentName);
    });
    (0, cucumber_1.When)("I click on Save button", async function () {
        await page.waitForTimeout(5000);
        await page.locator("//button[contains(text(), 'save')]").click();
    });
    (0, cucumber_1.When)("Please fill-up 'Investment Name and Investment Type' before saving ! toaster message should appear", async function () {
        (0, chai_1.expect)(await page.locator("xpath=//div[@role='alert']").last().innerText()).to.be.eql('Please fill-up "Investment Name and Investment Type" before saving !');
    });
    (0, cucumber_1.When)("I Fill Investment Name and Investment Type", async function () {
        investmentName = Math.random().toString(20).substr(2, 6);
        investmentName = "New investment" + investmentName;
        await page.locator("//input[@name='investmentname']").fill(investmentName);
        await page.locator("#mui-component-select-investmenttype").click();
        investmenttype = "Exploration";
        await page.locator("text=Exploration").click();
    });
    (0, cucumber_1.Then)("Investment save successful toaster message should appear", async function () {
        (0, chai_1.expect)(await page.locator("xpath=//div[@role='alert']").last().innerText()).to.be.eql('Investment save successful');
    });
    (0, cucumber_1.When)("I click on Home button", async function () {
        page = this.page;
        await page.waitForTimeout(3000);
        await page.click("//button[@aria-label='Home']");
    });
    (0, cucumber_1.When)("User should navigate to Home page and Should see a saved Investment with Draft state in My Investment tab", async function () {
        (0, chai_1.expect)(await page.locator("//button[@class='MuiButtonBase-root MuiTab-root MuiTab-textColorPrimary Mui-selected capitalize text-base text-primary font-semibold px-10 css-1q2h7u5']").innerText()).to.eql('My Investments');
        let cnt = await page.locator("//div[@class='px-6 border-b-2 border-r-2 cursor-pointer hover:bg-gray-100 border-l-8 border-l-draft group MuiBox-root css-0']/div/div[2]").count();
        let flag = 0;
        for (var i = 0; i < cnt; i++) {
            if (await page.locator("(//div[@class='px-6 border-b-2 border-r-2 cursor-pointer hover:bg-gray-100 border-l-8 border-l-draft group MuiBox-root css-0']/div/div[2])").nth(i).innerText() == investmentName) {
                flag = 1;
                investmentNumber = i;
                break;
            }
            if (flag != 1) {
                await page.locator("investment not saved as draft");
            }
        }
    });
    (0, cucumber_1.When)("I Click on Drafted Investment", async function () {
        await page.locator(`//div[@class='flex items-center py-4 MuiBox-root css-0' and contains(text(), '${investmentName}')]`).click();
    });
    (0, cucumber_1.When)("User should navigate to a page where he saved it as a draft and details entered while saving as draft should be prefilled", async function () {
        (0, chai_1.expect)(await page.locator("//span[@class='text-primary font-semibold']").innerText()).to.eql("Investment");
        (0, chai_1.expect)(await page.locator("//input[@name='investmentname']").getAttribute('value')).to.eql(investmentName);
        (0, chai_1.expect)(await page.locator("#mui-component-select-investmenttype").innerText()).to.eql(investmenttype);
    });
    (0, cucumber_1.When)("I Fill All the fields in create new investment page", async function () {
        investmentName = Math.random().toString(20).substr(2, 6);
        investmentName = "New investment" + investmentName;
        await page.locator("//input[@name='investmentname']").fill(investmentName);
        await page.locator("#mui-component-select-investmenttype").click();
        investmenttype = "Greenfields";
        await page.locator("text=Greenfield").click();
        await page.locator("#mui-component-select-locationname").click();
        await page.locator("//ul[@class='MuiList-root MuiList-padding MuiMenu-list css-r8u8y9']/li[2]/div").click();
        await page.locator("#mui-component-select-asset").click();
        await page.locator("//ul[@class='MuiList-root MuiList-padding MuiMenu-list css-r8u8y9']/li[2]/div").click();
        await page.locator("(//div[@class='MuiFormControl-root MuiTextField-root w-full css-1qrsed1']//parent::div)[1]").click();
        await page.locator("text=2023").click();
        await page.locator("//textarea[@name='investmentdescription']").fill(investmentName);
        let cnt = await page.locator(`(//input[@placeholder='Find user using WOPID, Name or Email'])`).count();
        for (let i = 1; i <= cnt; i++) {
            await page.locator(`(//input[@placeholder='Find user using WOPID, Name or Email'])[${i}]`).type(investmentLeads[i]);
            await page.waitForTimeout(5000);
            await page.keyboard.press('ArrowDown');
            await page.keyboard.press('Enter');
        }
        await page.locator("//*[@data-testid='AddCircleRoundedIcon']").click();
        await page.locator("//input[@name='role']").fill("Tester");
        await page.locator("//div[@name='user']").click();
        await page.locator(`(//input[@placeholder='Find user using WOPID, Name or Email'])`).last().type(record.Wopid);
        await page.waitForTimeout(2000);
        await page.locator(`text=${record.NameOfWopid}`).click();
        await page.waitForTimeout(2000);
        await page.locator("(//div[@class='MuiDialogActions-root MuiDialogActions-spacing css-14b29qc']//button)[1]").click();
    });
    (0, cucumber_1.When)("I Fill remaining fields in create new investment page", async function () {
        await page.locator("#mui-component-select-locationname").click();
        await page.locator("//ul[@class='MuiList-root MuiList-padding MuiMenu-list css-r8u8y9']/li[2]/div").click();
        await page.locator("#mui-component-select-asset").click();
        await page.locator("//ul[@class='MuiList-root MuiList-padding MuiMenu-list css-r8u8y9']/li[2]/div").click();
        await page.locator("(//div[@class='MuiFormControl-root MuiTextField-root w-full css-1qrsed1']//parent::div)[1]").click();
        await page.locator("text=2023").click();
        await page.locator("//textarea[@name='investmentdescription']").fill(investmentName);
        let cnt = await page.locator(`(//input[@placeholder='Find user using WOPID, Name or Email'])`).count();
        for (let i = 0; i < cnt; i++) {
            await page.locator(`(//input[@placeholder='Find user using WOPID, Name or Email'])`).nth(i).type(investmentLeads[i]);
            await page.waitForTimeout(4000);
            await page.keyboard.press('ArrowDown');
            await page.keyboard.press('Enter');
        }
    });
    (0, cucumber_1.When)("Investment Details section should contain Investment Name, Investment Type, Location, Asset and Year fields", async function () {
        (0, chai_1.expect)(await page.locator("(//legend[@class='css-yjsfm1']/span)[1]").innerText()).to.eql("Investment Name");
        (0, chai_1.expect)(await page.locator("(//legend[@class='css-yjsfm1']/span)[2]").innerText()).to.eql("Investment Type");
        (0, chai_1.expect)(await page.locator("(//legend[@class='css-yjsfm1']/span)[3]").innerText()).to.eql("Location");
        (0, chai_1.expect)(await page.locator("(//legend[@class='css-yjsfm1']/span)[4]").innerText()).to.eql("Asset");
        (0, chai_1.expect)(await page.locator("(//legend[@class='css-yjsfm1']/span)[5]").innerText()).to.eql("Phase Start Year");
    });
    (0, cucumber_1.When)("Investment Description section should contain a free text field", async function () {
        (0, chai_1.expect)(await page.locator("//textarea[@placeholder='Type Here']")).to.be.exist;
    });
    (0, cucumber_1.When)("I get all FormLabels form Admin tab", async function () {
        page = this.page;
        await page.locator("//button[@aria-label='Admin']").click();
        await page.locator("xpath=(//div[@class='MuiTabs-flexContainer justify-evenly css-k008qs']//button)[7]").click();
        await page.waitForTimeout(3000);
        let cnt = await page.locator("//td[contains(text(), 'Form Label')]//following::td[@class='MuiTableCell-root MuiTableCell-body MuiTableCell-sizeMedium css-q34dxg']").count();
        let j = 0;
        for (let i = 1; i <= cnt; i++) {
            totalFormLabels[j] = await page.locator(`(//td[contains(text(), 'Form Label')]//following::td[@class='MuiTableCell-root MuiTableCell-body MuiTableCell-sizeMedium css-q34dxg'])[${i}]`).innerText();
            console.log(totalFormLabels[i]);
            j++;
            i = i + 1;
        }
        await page.waitForTimeout(2000);
        await page.locator("//button[@aria-label='Home']").click();
    });
    (0, cucumber_1.When)("Investment Leads section should conation all the fields which are included as Form Label Type in Label tab of Admin page", async function () {
        let cnt = await page.locator("//div[@class='w-1/4 MuiBox-root css-0']").count();
        (0, chai_1.expect)(cnt).to.eql(totalFormLabels.length);
        for (let i = 0; i < cnt; i++) {
            (0, chai_1.expect)(await page.locator("//div[@class='w-1/4 MuiBox-root css-0']").nth(i).innerText()).to.eql(totalFormLabels[i]);
        }
    });
    (0, cucumber_1.When)("Team Members section should contain add button", async function () {
        (0, chai_1.expect)(await page.locator("//*[@data-testid='AddCircleRoundedIcon']")).to.exist;
    });
    (0, cucumber_1.When)("I Click on Team Members add button", async function () {
        await page.locator("//*[@data-testid='AddCircleRoundedIcon']").click();
    });
    (0, cucumber_1.When)("Add Team Member popup should open and it should contain Roel and User fields and Add and Cancel buttons", async function () {
        (0, chai_1.expect)(await page.locator("//h2[@class='MuiTypography-root MuiTypography-h6 MuiDialogTitle-root capitalize css-ohyacs']").innerText()).to.eql('Add Team Member');
        (0, chai_1.expect)(await page.locator("(//h2[@class='MuiTypography-root MuiTypography-h6 MuiDialogTitle-root capitalize css-ohyacs']//following::div/div/label)[1]").innerText()).to.eql('Role');
        (0, chai_1.expect)(await page.locator("(//h2[@class='MuiTypography-root MuiTypography-h6 MuiDialogTitle-root capitalize css-ohyacs']//following::div/div/label)[2]").innerText()).to.eql('User');
        (0, chai_1.expect)(await page.locator("(//div[@class='MuiDialogActions-root MuiDialogActions-spacing css-14b29qc']//button)[1]").innerText()).to.eql('Add');
        (0, chai_1.expect)(await page.locator("(//div[@class='MuiDialogActions-root MuiDialogActions-spacing css-14b29qc']//button)[2]").innerText()).to.eql('Cancel');
    });
    (0, cucumber_1.When)("I should navigate to Roadmap page and see Investment name at the top, Investment Type and Roadmap dropdown and Back, Save As Draft, Next buttons", async function () {
        page = this.page;
        (0, chai_1.expect)(await page.locator("//div[@class='text-primary text-xl font-semibold MuiBox-root css-0']").innerText()).to.eql(investmentName);
        (0, chai_1.expect)(await page.locator("//div[@class='flex items-center gap-2 text-primary font-medium MuiBox-root css-0']/div[1]").innerText()).to.eql("Investment Type :");
        (0, chai_1.expect)(await page.locator("//span[@class='bg-gray-300 px-4 pb-2 pt-1 rounded-full']").innerText()).to.eql(investmenttype);
        (0, chai_1.expect)(await page.locator("//div[@class='MuiFormControl-root MuiFormControl-fullWidth w-52 css-tzsjye']/label").innerText()).to.eql("Roadmap");
        (0, chai_1.expect)(await page.locator("//button[contains(text(), 'back')]")).to.exist;
        (0, chai_1.expect)(await page.locator("//button[contains(text(), 'next')]")).to.exist;
        (0, chai_1.expect)(await page.locator("//button[contains(text(), 'save')]")).to.exist;
    });
    (0, cucumber_1.When)("I Select Roadmap", async function () {
        page = this.page;
        await page.locator("//div[@class='MuiFormControl-root MuiFormControl-fullWidth w-52 css-tzsjye']").click();
        roadmap = await page.locator("//span[@class='MuiTypography-root MuiTypography-body1 MuiListItemText-primary css-yb0lig']").first().innerText();
        await page.locator("//span[@class='MuiTypography-root MuiTypography-body1 MuiListItemText-primary css-yb0lig']").first().click();
        await page.waitForTimeout(2000);
    });
    (0, cucumber_1.When)("I Click on any Objective", async function () {
        await page.locator("//div[@class='w-full text-sm MuiBox-root css-0']").first().click();
    });
    (0, cucumber_1.Then)("Information section should open at the right end and it should show the Information of that Objective", async function () {
        (0, chai_1.expect)(await page.locator("//div[@class='text-center font-semibold MuiBox-root css-0']").innerText()).to.eql("Information");
        (0, chai_1.expect)(await page.locator("//div[@class='px-2 overflow-y-auto leading-10 MuiBox-root css-cxtz18']")).to.exist;
    });
    (0, cucumber_1.When)("I click on Roadmap dropdown again", async function () {
        page = this.page;
        await page.locator("//div[@class='MuiInputBase-root MuiOutlinedInput-root MuiInputBase-colorPrimary MuiInputBase-formControl  css-fvipm8']/div").click();
    });
    (0, cucumber_1.Then)("Change Warning popup should appear", async function () {
        (0, chai_1.expect)(await page.locator("//h2[@class='MuiTypography-root MuiTypography-h6 MuiDialogTitle-root capitalize css-ohyacs']").innerText()).to.eql('Change Warning');
    });
    (0, cucumber_1.Then)("Should show message If you change roadmap from Roadmapname to anything else, the changes you have made if any in Objective & Deliverable, Review will be lost ! And Okay button", async function () {
        (0, chai_1.expect)(await page.locator("//div[@class='MuiDialogContent-root py-4 css-1ty026z']//div").innerText()).to.eql(`If you change roadmap data from "${roadmap}" to anything else, the changes you have made (if any) in Roadmap, Objective & Deliverable, Review will be lost !`);
        (0, chai_1.expect)(await page.locator("//div[@class='MuiDialogActions-root MuiDialogActions-spacing css-14b29qc']/button").innerText()).to.eql("Okay");
    });
    (0, cucumber_1.Then)("Objectives and Deliverables of first phase of that Roadmap", async function () {
        (0, chai_1.expect)(await page.locator("xpath=(//div[@class='font-semibold MuiBox-root css-0'])[1]").innerText()).to.includes('Objectives');
        (0, chai_1.expect)(await page.locator("xpath=(//div[@class='font-semibold MuiBox-root css-0'])[2]").innerText()).to.includes('Deliverables');
        let numOfObj = await page.locator("//div[@class='text-pink-400 MuiBox-root css-0']/div").first().innerText();
        let cnt = parseInt(numOfObj, 10);
        (0, chai_1.expect)(await page.locator("//div[@class='w-2/5 p-2 flex justify-between items-start MuiBox-root css-0']").count()).to.eql(cnt);
        (0, chai_1.expect)(await page.locator("//div[@class='flex justify-between items-start MuiBox-root css-0']").count()).greaterThanOrEqual(cnt);
    });
    (0, cucumber_1.Then)("I should navigate to Objectives and Deliverable page And Page should show Investent Type, Roadmap name and Reset Phase, Back, Next, Save As Draft buttons", async function () {
        page = this.page;
        (0, chai_1.expect)(await page.locator("//div[@class='text-primary text-xl font-semibold MuiBox-root css-0']").innerText()).to.eql(investmentName);
        (0, chai_1.expect)(await page.locator("(//div[@class='flex items-center gap-10 text-primary font-medium MuiBox-root css-0']/div/div)[1]").innerText()).to.eql("Investment Type :");
        (0, chai_1.expect)(await page.locator("(//span[@class='bg-gray-300 px-4 pb-2 pt-1 rounded-full'])[1]").innerText()).to.eql(investmenttype);
        (0, chai_1.expect)(await page.locator("(//div[@class='flex items-center gap-10 text-primary font-medium MuiBox-root css-0']/div/div)[3]").innerText()).to.eql("Roadmap :");
        (0, chai_1.expect)(await page.locator("(//span[@class='bg-gray-300 px-4 pb-2 pt-1 rounded-full'])[2]").innerText()).to.eql(roadmap);
        (0, chai_1.expect)(await page.locator("//button[contains(text(), 'back')]")).to.exist;
        (0, chai_1.expect)(await page.locator("//button[contains(text(), 'next')]")).to.exist;
        (0, chai_1.expect)(await page.locator("//button[contains(text(), 'save')]")).to.exist;
        (0, chai_1.expect)(await page.locator("//button[contains(text(), 'reset phase')]")).to.exist;
        currentPhaseName = await page.locator("(//div[@class='text-white font-semibold MuiBox-root css-0'])[1]").innerText();
        let cnt = await page.locator("//div[@class='text-white font-semibold MuiBox-root css-0']").count();
        for (let i = 0; i < cnt; i++) {
            allPhaseNames[i] = await page.locator(`(//div[@class='text-white font-semibold MuiBox-root css-0'])`).nth(i).innerText();
        }
        (0, chai_1.expect)(await page.locator("xpath=(//div[@class='font-semibold MuiBox-root css-0'])[1]").innerText()).to.includes('Objectives');
        (0, chai_1.expect)(await page.locator("xpath=(//div[@class='font-semibold MuiBox-root css-0'])[2]").innerText()).to.includes('Deliverables');
        numOfObj = await page.locator("//div[@class='text-pink-400 MuiBox-root css-0']/div").first().innerText();
        numOfObj = parseInt(numOfObj, 10);
    });
    (0, cucumber_1.Then)("Toggle button for Non mandatory Objective", async function () {
        (0, chai_1.expect)(await page.locator("//span[@class='MuiSwitch-root MuiSwitch-sizeSmall css-vd1cxy']")).to.exist;
    });
    (0, cucumber_1.When)("I hover the mouse on 3 dots of any objective", async function () {
        await page.locator("xpath=(//div[@class='group flex MuiBox-root css-0'])[1]").hover({ force: true, timeout: 2000, trial: true });
    });
    (0, cucumber_1.Then)("It should show view and add buttons", async function () {
        await page.locator("xpath=(//div[@class='hidden absolute group-hover:block right-0 MuiBox-root css-0'])[1]").screenshot({ path: 'Screenshots\\iconsOfUserObjectivesActual.png' });
    });
    (0, cucumber_1.When)("I hover the mouse on 3 dots of any deliverable", async function () {
        await page.locator("xpath=(//div[@class='group flex MuiBox-root css-0'])[2]").hover({ force: true, timeout: 2000, trial: true });
    });
    (0, cucumber_1.When)("I Enter all details and click on Add button in deliverable details section", async function () {
        addDeliverable = Math.random().toString(20).substr(2, 6);
        addDeliverable = "NewDeliverable" + addDeliverable;
        await page.locator("xpath=//textarea[@name='title']").fill(addDeliverable);
        await page.locator("xpath=//textarea[@name='information']").fill(addDeliverable);
        await page.locator("xpath=//button[contains(text(), 'Add')]").click();
    });
    (0, cucumber_1.When)("I hover the mouse on 3 dots of newly added deliverable", async function () {
        await page.locator(`//*[contains(text(),'${addDeliverable}')]/following-sibling::div[1]`).hover({ force: true, timeout: 2000, trial: true });
    });
    (0, cucumber_1.Then)("It should show view button", async function () {
        await page.locator("xpath=(//div[@class='hidden absolute group-hover:block right-0 MuiBox-root css-0'])[2]").screenshot({ path: 'Screenshots\\iconsOfUserDeliverablesActual.png' });
    });
    (0, cucumber_1.Then)("I fill all details in Objective details section and click on add button", async function () {
        addObjective = Math.random().toString(20).substr(2, 6);
        addObjective = "Objective" + addObjective;
        await page.locator("(//textarea[@name='title'])[1]").fill(`${addObjective}`);
        await page.locator("#mui-component-select-discipline").click();
        await page.locator("(//li[@class='MuiButtonBase-root MuiMenuItem-root MuiMenuItem-gutters MuiMenuItem-root MuiMenuItem-gutters css-1km1ehz'])[1]").click();
        await page.locator("(//textarea[@name='information'])[1]").fill(`${addObjective}`);
        await page.locator("(//button[contains(text(),'Add')])[1]").click();
    });
    (0, cucumber_1.Then)("Objective should get added to that Investment", async function () {
        let cnt1 = await page.locator("//div[@class='w-2/5 p-2 flex justify-between items-start MuiBox-root css-0']/div[@class='text-sm MuiBox-root css-0']").count();
        let flag1 = 0;
        for (let i = 0; i < cnt1; i++) {
            let newlyaddedObj = await page.locator("xpath=//div[@class='text-sm MuiBox-root css-0']").nth(i).innerText();
            if (newlyaddedObj === addObjective) {
                flag1 = 1;
                break;
            }
        }
        if (flag1 == 1) { }
        else {
            await page.locator("xpath=Objective not added").click();
        }
    });
    (0, cucumber_1.When)("I click on add Objective button", async function () {
        await page.locator("//button[@aria-label='Add Objective']").click();
    });
    (0, cucumber_1.When)("I click on toggle button present at Non mandatory Objective", async function () {
        objName = await page.locator("((//div[@class='w-2/5 p-2 flex justify-between items-start MuiBox-root css-0']//div[@class='group flex MuiBox-root css-0']//following-sibling::div[1][@class='pt-2 MuiBox-root css-0']//parent::div)[1]//preceding-sibling::div)[1]").innerText();
        await page.locator("//div[@class='w-2/5 p-2 flex justify-between items-start MuiBox-root css-0']//div[@class='group flex MuiBox-root css-0']//following-sibling::div[1][@class='pt-2 MuiBox-root css-0']").first().click();
    });
    (0, cucumber_1.When)("I click on toggle button present at Inactive Objective", async function () {
        objName = await page.locator("((//span[@aria-label='Inactive Objective'])[1]/parent::span/parent::div/parent::div/parent::div//div[1])[1]").innerText();
        await page.locator("//span[@aria-label='Inactive Objective']").first().click();
    });
    (0, cucumber_1.When)("Non mandatory Objective and its deliverables should become Inactive", async function () {
        (0, chai_1.expect)(await page.locator(`//*[contains(text(), '${objName}')]//following-sibling::div/div[2]/span/span[1]`).getAttribute('aria-label')).to.eql('Inactive Objective');
    });
    (0, cucumber_1.When)("Objective and its deliverables should become Active", async function () {
        let obj = await page.locator(`//*[contains(text(), '${objName}')]//following-sibling::div/div[3]/span/span[1]`).isVisible();
        if (obj == true) {
            (0, chai_1.expect)(await page.locator(`//*[contains(text(), '${objName}')]//following-sibling::div/div[3]/span/span[1]`).getAttribute('aria-label')).to.eql('Active Objective');
        }
        else {
            (0, chai_1.expect)(await page.locator(`//*[contains(text(), '${objName}')]//following-sibling::div/div[2]/span/span[1]`).getAttribute('aria-label')).to.eql('Active Objective');
        }
    });
    (0, cucumber_1.When)("I Enter the details and click on Add button", async function () {
        addDeliverable = Math.random().toString(20).substr(2, 6);
        addDeliverable = "Deliverable" + addDeliverable;
        await page.locator("xpath=//textarea[@name='title']").fill(addDeliverable);
        await page.locator("xpath=//textarea[@name='information']").fill(addDeliverable);
        await page.locator("xpath=//button[contains(text(), 'Add')]").click();
    });
    (0, cucumber_1.Then)("Deliverable add successful toaster message should appear and that deliverable should be added to that Objective", async function () {
        (0, chai_1.expect)((await page.locator("xpath=//div[@role='alert']").innerText()).valueOf()).to.includes('Deliverable add successful');
        await page.waitForTimeout(5000);
        let newDeliverablecnt = await page.locator("//div[@class='flex justify-between items-start MuiBox-root css-0']/child::div[1]").count();
        var flag = 0;
        for (let i = 1; i <= newDeliverablecnt; i++) {
            let newDeliverable = await page.locator(`(//div[@class='flex justify-between items-start MuiBox-root css-0']/child::div[1])[${i}]`).innerText();
            if (newDeliverable === addDeliverable) {
                flag = 1;
                break;
            }
        }
        if (flag == 1) { }
        else {
            await page.locator("xpath=Deliverable not added").click();
        }
    });
    (0, cucumber_1.When)("I Edit the Deliverable and clicks Save button", async function () {
        editDeliverable = Math.random().toString(20).substr(2, 6);
        editDeliverable = "Edit Deliverable" + editDeliverable;
        await page.locator("xpath=//textarea[@name='title']").fill(editDeliverable);
        await page.locator("xpath=//button[contains(text(), 'Save')]").click();
    });
    (0, cucumber_1.Then)("Deliverable should gets updated as edited by user", async function () {
        let newDeliverablecnt = await page.locator("//div[@class='flex justify-between items-start MuiBox-root css-0']/child::div[1]").count();
        let flag = 0;
        await page.waitForTimeout(4000);
        for (let i = 0; i < newDeliverablecnt; i++) {
            let newDeliverable = await page.locator("//div[@class='flex justify-between items-start MuiBox-root css-0']/child::div[1]").nth(i).innerText();
            if (newDeliverable === editDeliverable) {
                flag = 1;
                break;
            }
        }
        if (flag != 1) {
            await page.locator("xpath=Deliverable not edited").click();
        }
    });
    (0, cucumber_1.When)("I click on Reset Phase button", async function () {
        resetPhase = await page.locator("(//div[@class='text-white font-semibold MuiBox-root css-0'])[1]").innerText();
        await page.locator("//button[contains(text(),'reset phase')]").click();
    });
    (0, cucumber_1.When)("Change Warning popup should open with message If you reset phase phasename,the phase will revert back to the default data, the changes you have made if any in Objective & Deliverable, Review will be lost !, Confirm and Cancel buttons", async function () {
        (0, chai_1.expect)(await page.locator("//h2[@class='MuiTypography-root MuiTypography-h6 MuiDialogTitle-root capitalize css-ohyacs']").innerText()).to.eql('Change Warning');
        (0, chai_1.expect)(await page.locator("//div[@class='MuiDialogContent-root py-4 css-1ty026z']//div").innerText()).to.eql(`If you reset phase "${resetPhase}", the phase will revert back to the default data, the changes you have made (if any) in Objective & Deliverable, Review will be lost !`);
        (0, chai_1.expect)(await page.locator("(//div[@class='MuiDialogActions-root MuiDialogActions-spacing css-14b29qc']/button)[1]").innerText()).to.eql("Confirm");
        (0, chai_1.expect)(await page.locator("(//div[@class='MuiDialogActions-root MuiDialogActions-spacing css-14b29qc']/button)[2]").innerText()).to.eql("Cancel");
    });
    (0, cucumber_1.When)("Newly added objective should not get deleted", async function () {
        let newDeliverablecnt = await page.locator("//div[@class='flex justify-between items-start MuiBox-root css-0']/child::div[1]").count();
        let flag = 0;
        for (let i = 0; i < newDeliverablecnt; i++) {
            let newDeliverable = await page.locator("//div[@class='flex justify-between items-start MuiBox-root css-0']/child::div[1]").nth(i).innerText();
            if (newDeliverable === addDeliverable) {
                flag = 1;
                break;
            }
        }
        if (flag != 1) {
            await page.locator("xpath=Deliverable not added").click();
        }
    });
    (0, cucumber_1.When)("Phase reset successful toaster message should appear and newly added objective should get deleted", async function () {
        (0, chai_1.expect)((await page.locator("xpath=//div[@role='alert']").innerText()).valueOf()).to.includes('Phase reset successful');
        let newDeliverablecnt = await page.locator("//div[@class='flex justify-between items-start MuiBox-root css-0']/child::div[1]").count();
        let flag = 0;
        for (let i = 0; i < newDeliverablecnt; i++) {
            let newDeliverable = await page.locator("//div[@class='flex justify-between items-start MuiBox-root css-0']/child::div[1]").nth(i).innerText();
            if (newDeliverable === addDeliverable) {
                flag = 1;
                break;
            }
        }
        if (flag == 1) {
            await page.locator("xpath=Deliverable not added").click();
        }
    });
    (0, cucumber_1.When)("I click edit icon of newly added deliverable", async function () {
        await page.locator(`//*[contains(text(),'${addDeliverable}')]//following::*[@data-testid='EditRoundedIcon']`).click();
    });
    (0, cucumber_1.When)("I click the delete icon of newly added deliverable", async function () {
        await page.locator(`//*[contains(text(),'${addDeliverable}')]//following::*[@data-testid='DeleteRoundedIcon']`).click();
    });
    (0, cucumber_1.Then)("Delete Deliverable popup opens with a message Are you sure you want to delete deliverable and Confirm and Cancel button", async function () {
        let deleteDel = (await page.locator("xpath=//div[@class='flex justify-start items-center gap-5 MuiBox-root css-0']").innerText()).valueOf();
        (0, chai_1.expect)(deleteDel).to.contain.oneOf(['Delete Deliverable', 'Delete Deliverable\nMandatory']);
        (0, chai_1.expect)((await page.locator("xpath=//div[@class='MuiDialogContent-root py-4 css-1ty026z']").innerText()).valueOf()).to.eql(`Are you sure you want to delete deliverable "${addDeliverable}"?`);
        (0, chai_1.expect)(await page.locator("xpath=//button[contains(text(), 'Confirm')]").count()).to.be.eql(1);
        (0, chai_1.expect)(await page.locator("xpath=//button[contains(text(), 'Cancel')]").count()).to.be.eql(1);
    });
    (0, cucumber_1.Then)("Deliverable gets deleted", async function () {
        let newDeliverablecnt = await page.locator("//div[@class='flex justify-between items-start MuiBox-root css-0']/child::div[1]").count();
        let flag = 0;
        await page.waitForTimeout(4000);
        for (let i = 0; i < newDeliverablecnt; i++) {
            let newDeliverable = await page.locator("//div[@class='flex justify-between items-start MuiBox-root css-0']/child::div[1]").nth(i).innerText();
            if (newDeliverable === addDeliverable) {
                flag = 1;
                break;
            }
        }
        if (flag == 1) {
            await page.locator("xpath=Deliverable not deleted").click();
        }
    });
    (0, cucumber_1.When)("I hover the mouse on 3 dots of newly added objective", async function () {
        await page.locator(`//*[contains(text(),'${addObjective}')]/following-sibling::div/div[1]`).hover({ force: true, timeout: 2000, trial: true });
    });
    (0, cucumber_1.When)("I click on Delete button of newly added objective", async function () {
        await page.locator(`(//*[contains(text(),'${addObjective}')]//following::*[@data-testid='DeleteRoundedIcon'])[1]`).click();
    });
    (0, cucumber_1.Then)("Delete Objective popup opens with a message Are you sure you want to delete objective and Confirm and Cancel button", async function () {
        let deleteObj = (await page.locator("xpath=//div[@class='flex justify-start items-center gap-5 MuiBox-root css-0']").innerText()).valueOf();
        (0, chai_1.expect)(deleteObj).to.contain.oneOf(['Delete Objective', 'Delete Objective\nMandatory']);
        (0, chai_1.expect)((await page.locator("xpath=//div[@class='MuiDialogContent-root py-4 css-1ty026z']").innerText()).valueOf()).to.eql(`Are you sure you want to delete objective "${addObjective}"?`);
        (0, chai_1.expect)(await page.locator("xpath=//button[contains(text(), 'Confirm')]").count()).to.be.eql(1);
        (0, chai_1.expect)(await page.locator("xpath=//button[contains(text(), 'Cancel')]").count()).to.be.eql(1);
    });
    (0, cucumber_1.Then)("Objective should get deleted", async function () {
        let cnt1 = await page.locator("//div[@class='w-2/5 p-2 flex justify-between items-start MuiBox-root css-0']/div[@class='text-sm MuiBox-root css-0']").count();
        let flag1 = 0;
        for (let i = 0; i < cnt1; i++) {
            let newlyaddedObj = await page.locator("xpath=//div[@class='text-sm MuiBox-root css-0']").nth(i).innerText();
            if (newlyaddedObj === addObjective) {
                flag1 = 1;
                break;
            }
        }
        if (flag1 != 1) { }
        else {
            await page.locator("xpath=Objective not deleted").click();
        }
    });
    (0, cucumber_1.When)("I click on edit button of newly added objective", async function () {
        await page.locator(`(//*[contains(text(),'${addObjective}')]//following::*[@data-testid='EditRoundedIcon'])[1]`).click();
    });
    (0, cucumber_1.Then)("Then Edit Objective popup should open and it should show Title, Information, Discipline fields", async function () {
        (0, chai_1.expect)(await page.locator("xpath=//div[@role='dialog']").count()).to.be.eql(1);
        let editObj = (await page.locator("xpath=//div[@class='flex justify-start items-center gap-5 MuiBox-root css-0']").innerText()).valueOf();
        (0, chai_1.expect)(editObj).to.contain.oneOf(['Edit Objective', 'Edit Objective\nMandatory']);
        (0, chai_1.expect)((await page.locator("xpath=(//div[@class='font-semibold pb-1 MuiBox-root css-0'])[1]").innerText()).valueOf()).contains('Title');
        (0, chai_1.expect)((await page.locator("xpath=(//div[@class='font-semibold pb-1 MuiBox-root css-0'])[2]").innerText()).valueOf()).contains('Discipline');
        (0, chai_1.expect)((await page.locator("xpath=(//div[@class='font-semibold pb-1 MuiBox-root css-0'])[3]").innerText()).valueOf()).contains('Information');
    });
    (0, cucumber_1.Then)("All fields should editable and it should show Save and Cancel buttons", async function () {
        (0, chai_1.expect)(await page.locator("xpath=//button[contains(text(), 'Save')]").count()).to.be.eql(1);
        (0, chai_1.expect)(await page.locator("xpath=//button[contains(text(), 'Cancel')]").count()).to.be.eql(1);
        (0, chai_1.expect)(await page.locator("xpath=//textarea[@name='title']").isEditable()).to.be.true;
        (0, chai_1.expect)(await page.locator("xpath=//textarea[@name='information']").isEditable()).to.be.true;
        (0, chai_1.expect)(await page.locator("xpath=//input[@name='discipline']").isEditable()).to.be.true;
    });
    (0, cucumber_1.When)("I click on toggle button present at mandatory Objective", async function () {
        objName = await page.locator("(//*[@aria-label='Mandatory Objective' ]//parent::div//parent::div//following-sibling::div//div)[1]").innerText();
        await page.locator("(//*[@aria-label='Mandatory Objective' ]//parent::div//parent::div//following-sibling::div//div[2]//div[2])[2]").click();
    });
    (0, cucumber_1.When)("Mandatory Objective and its deliverables should become Inactive", async function () {
        (0, chai_1.expect)(await page.locator(`//*[contains(text(), '${objName}')]//following-sibling::div/div[2]/span/span[1]`).getAttribute('aria-label')).to.eql('Inactive Objective');
    });
    (0, cucumber_1.When)("Justification popup should open and it should contain Save and Cancel button", async function () {
        (0, chai_1.expect)(await page.locator(`//h2[@class='MuiTypography-root MuiTypography-h6 MuiDialogTitle-root capitalize css-ohyacs']`).innerText()).to.eql('Justification');
        (0, chai_1.expect)(await page.locator("//div[@class='MuiDialogContent-root py-4 css-1ty026z']/div/div[1]").innerText()).to.eql(`Please provide justification to disable mandatory objective "${objName}"`);
        (0, chai_1.expect)(await page.locator("//button[contains(text(), 'Save')]").isVisible()).to.be.true;
        (0, chai_1.expect)(await page.locator("//button[contains(text(), 'Cancel')]").isVisible()).to.be.true;
    });
    (0, cucumber_1.When)("I enter justification and click on Save button", async function () {
        await page.locator("//textarea[@name='justification']").type("Test");
        await page.locator("//button[contains(text(), 'Save')]").click();
    });
    (0, cucumber_1.When)("I click on Objective and Deliverable button present in Review section", async function () {
        await page.waitForTimeout(4000);
        await page.locator("//button[contains(text(), 'Objective & Deliverable')]").click();
        await page.waitForTimeout(4000);
    });
    (0, cucumber_1.Then)("Review Objective and Deliverable page should open", async function () {
        (0, chai_1.expect)(await page.locator("text=Review - Objective & Deliverable").isVisible()).to.be.true;
    });
    (0, cucumber_1.When)("I click on view button of inactivated objective", async function () {
        await page.locator(`//div[contains(text(), '${objName}')]/following-sibling::div`).first().click();
    });
    (0, cucumber_1.Then)("view objective popup should open", async function () {
        (0, chai_1.expect)(await page.locator("//h2[@class='MuiTypography-root MuiTypography-h6 MuiDialogTitle-root capitalize css-ohyacs']/div").innerText()).to.eql("View Objective\nMandatory");
    });
    (0, cucumber_1.Then)("It should show Title, Information, Discipline and Justification", async function () {
        (0, chai_1.expect)(await page.locator(`text=Title: ${objName}`).isVisible()).to.be.true;
        (0, chai_1.expect)(await page.locator(`text=Justification:`).isVisible()).to.be.true;
        (0, chai_1.expect)(await page.locator("//b[contains(text(), 'Justification')]//following-sibling::div").innerText()).to.eql("Test");
        (0, chai_1.expect)(await page.locator(`text=Discipline:`).isVisible()).to.be.true;
        (0, chai_1.expect)(await page.locator(`text=Information:`).isVisible()).to.be.true;
    });
    (0, cucumber_1.Then)("I close the Review Objective and Deliverable page", async function () {
        await page.locator("//button[@aria-label='Close']").click();
    });
    (0, cucumber_1.When)("I Activate Inactivated mandatory objective", async function () {
        await page.locator(`(//div[(contains(text(), '${objName}'))])[1]//following-sibling::div/div[2]`).click();
    });
    (0, cucumber_1.When)("I click on view button of activated objective", async function () {
        await page.locator(`//div[contains(text(), '${objName}')]/following-sibling::div`).first().click();
    });
    (0, cucumber_1.Then)("Popup should show Title, Information, Discipline and Justification should not be there", async function () {
        (0, chai_1.expect)(await page.locator(`text=Title: ${objName}`).isVisible()).to.be.true;
        (0, chai_1.expect)(await page.locator(`text=Justification:`).isVisible()).to.be.false;
        (0, chai_1.expect)(await page.locator(`text=Discipline:`).isVisible()).to.be.true;
        (0, chai_1.expect)(await page.locator(`text=Information:`).isVisible()).to.be.true;
    });
    (0, cucumber_1.When)("I click on toggle button present at Deliverable", async function () {
        delName = await page.locator("((//div[@class='w-3/5 border-l MuiBox-root css-0']//div[@class='group flex MuiBox-root css-0']//following-sibling::div[1][@class='pt-2 MuiBox-root css-0']//parent::div)[1]//preceding-sibling::div)[1]").innerText();
        await page.locator("//div[@class='w-3/5 border-l MuiBox-root css-0']//div[@class='group flex MuiBox-root css-0']//following-sibling::div[1][@class='pt-2 MuiBox-root css-0']").first().click();
    });
    (0, cucumber_1.Then)("Deliverable should become Inactive", async function () {
        (0, chai_1.expect)(await page.locator(`//*[contains(text(), '${delName}')]//following-sibling::div/div[2]/span/span[1]`).getAttribute('aria-label')).to.eql('Inactive Deliverable');
    });
    (0, cucumber_1.When)("I click on toggle button present at Inactive Deliverable", async function () {
        objName = await page.locator("((//span[@aria-label='Inactive Deliverable'])[1]/parent::span/parent::div/parent::div/parent::div//div[1])[1]").innerText();
        await page.locator("//span[@aria-label='Inactive Deliverable']").first().click();
    });
    (0, cucumber_1.Then)("Deliverable should become Active", async function () {
        (0, chai_1.expect)(await page.locator(`//*[contains(text(), '${delName}')]//following-sibling::div/div[2]/span/span[1]`).getAttribute('aria-label')).to.eql('Active Deliverable');
    });
    (0, cucumber_1.When)("I Inactivate all Deliverables of particular Objective then I should get Objective must have at least 1 deliverable toaster message", async function () {
        await page.waitForTimeout(4000);
        let cnt = await page.locator("//div[@class='w-3/5 border-l MuiBox-root css-0']").count();
        let i, j, cntofdel;
        for (i = 1; i <= cnt; i++) {
            cntofdel = await page.locator(`((//div[@class='w-3/5 border-l MuiBox-root css-0'])[${i}]/div)`).count();
            if (cntofdel > 1) {
                console.log(cntofdel);
                for (j = 1; j <= cntofdel; j++) {
                    console.log(j);
                    if (j == cntofdel) {
                        await page.locator(`(((//div[@class='w-3/5 border-l MuiBox-root css-0'])[${i}]/div)[${j}]/div//following-sibling::div)[3]`).click();
                        (0, chai_1.expect)((await page.locator("xpath=//div[@role='alert']").innerText()).valueOf()).to.includes("Objective must have at least 1 deliverable !");
                        break;
                    }
                    else {
                        await page.locator(`(((//div[@class='w-3/5 border-l MuiBox-root css-0'])[${i}]/div)[${j}]/div//following-sibling::div)[3]`).click();
                    }
                }
                break;
            }
        }
    });
    (0, cucumber_1.When)("I hover the mouse on any Investment of Draft state", async function () {
        page = this.page;
        let cnt = await page.locator("//div[@class='uppercase MuiBox-root css-0']").count();
        for (let i = 1; i <= cnt; i++) {
            let iname = await page.locator(`(//div[@class='uppercase MuiBox-root css-0'])[${i}]`).innerText();
            if (iname == "DRAFT") {
                deletebuttonofdraftstate = i;
                await page.locator(`(//div[@class='uppercase MuiBox-root css-0'])[${i}]`).hover({ force: true, timeout: 2000, trial: true });
                break;
            }
        }
        investmentNameOfDraftState = await page.locator(`(//div[@class='grid gap-8 grid-cols-8 MuiBox-root css-0'])[${deletebuttonofdraftstate + 1}]/div[2]`).innerText();
    });
    (0, cucumber_1.Then)("I should see Delete button", async function () {
        await page.locator(`(//div[@class='uppercase MuiBox-root css-0'])[${deletebuttonofdraftstate}]`).hover({ force: true, timeout: 2000, trial: true });
    });
    (0, cucumber_1.When)("I click on delete button present on investment of draft state", async function () {
        await page.locator(`(//div[@class='uppercase MuiBox-root css-0'])[${deletebuttonofdraftstate}]`).hover({ force: true, timeout: 2000, trial: true });
        await page.locator(`(//button[@aria-label='Delete Investment'])[${deletebuttonofdraftstate}]`).click();
    });
    (0, cucumber_1.Then)("Delete Investment popup should open", async function () {
        (0, chai_1.expect)(await page.locator("//h2[@class='MuiTypography-root MuiTypography-h6 MuiDialogTitle-root capitalize css-ohyacs']").innerText()).to.eql('Delete Investment');
    });
    (0, cucumber_1.Then)("It should have message Are you sure you want to delete investment and Confirm and Cancel buttons", async function () {
        (0, chai_1.expect)(await page.locator("//div[@class='MuiDialogContent-root py-4 css-1ty026z']/div").innerText()).to.eql(`Are you sure you want to delete investment "${investmentNameOfDraftState}"?`);
        (0, chai_1.expect)(await page.locator("//button[contains(text(), 'Confirm')]").isVisible()).to.be.true;
        (0, chai_1.expect)(await page.locator("//button[contains(text(), 'Cancel')]").isVisible()).to.be.true;
    });
    (0, cucumber_1.Then)("Investment delete successful toaster message should appear", async function () {
        (0, chai_1.expect)(await page.locator("xpath=//div[@role='alert']").innerText()).to.eql(`Investment delete successful`);
    });
    (0, cucumber_1.Then)("Investment should get deleted", async function () {
        (0, chai_1.expect)(await page.locator(`(//div[@class='grid gap-8 grid-cols-8 MuiBox-root css-0'])[${deletebuttonofdraftstate + 1}]/div[2]`).innerText()).to.not.eql(investmentNameOfDraftState);
    });
    (0, cucumber_1.Then)("Investment should not get deleted", async function () {
        (0, chai_1.expect)(await page.locator(`(//div[@class='grid gap-8 grid-cols-8 MuiBox-root css-0'])[${deletebuttonofdraftstate + 1}]/div[2]`).innerText()).to.eql(investmentNameOfDraftState);
    });
    (0, cucumber_1.When)("I click on All Investments tab", async function () {
        page = this.page;
        await page.locator("//button[contains(text(),'All investments')]").click();
    });
    (0, cucumber_1.When)("I click on Action Required tab", async function () {
        page = this.page;
        await page.locator("//button[contains(text(),'Action Required')]").click();
    });
    (0, cucumber_1.Then)("I should navigate to All Investments tab", async function () {
        (0, chai_1.expect)(await page.locator("//button[contains(text(),'All investments')]").getAttribute("aria-selected")).to.eql('true');
    });
    (0, cucumber_1.Then)("I delete All Investments present in DRAFT state", async function () {
        do {
            await page.locator("//div[@class='flex justify-center mt-2 MuiBox-root css-0']/button").click();
        } while (await page.locator("xpath=//div[@role='alert']").isVisible() == false);
        let cnt = await page.locator("(//div[@class='uppercase MuiBox-root css-0' and contains(text(),'DRAFT')])").count();
        for (let i = 1; i <= cnt; i++) {
            await page.waitForTimeout(6000);
            await page.locator("(//div[@class='uppercase MuiBox-root css-0' and contains(text(),'DRAFT')])[1]").hover({ force: true });
            await page.locator(`(//button[@aria-label='Delete Investment'])[1]`).click({ force: true });
            (0, chai_1.expect)(await page.locator("//h2[@class='MuiTypography-root MuiTypography-h6 MuiDialogTitle-root capitalize css-ohyacs']").innerText()).to.eql('Delete Investment');
            await page.locator("xpath=//button[contains(text(), 'Confirm')]").click();
        }
    });
    (0, cucumber_1.Then)("There should not be any Draft state investments in Dashboard", async function () {
        let cnt = await page.locator(`//div[@class='uppercase MuiBox-root css-0']`);
        for (let i = 1; i <= cnt; i++) {
            (0, chai_1.expect)(await page.locator(`(//div[@class='uppercase MuiBox-root css-0'])[${i}]`).innerText()).to.not.eql("DRAFT");
        }
    });
    (0, cucumber_1.Then)("I should navigate to Review page and should see Investment Type, Roadmap, Phase and Status", async function () {
        await page.waitForTimeout(3000);
        (0, chai_1.expect)(await page.locator("((//div[@class='flex items-center gap-2 MuiBox-root css-0'])[1]/div)[1]").innerText()).to.eql("Investment Type :");
        (0, chai_1.expect)(await page.locator("((//div[@class='flex items-center gap-2 MuiBox-root css-0'])[1]/div)[2]/span").innerText()).to.eql(investmenttype);
        (0, chai_1.expect)(await page.locator("((//div[@class='flex items-center gap-2 MuiBox-root css-0'])[2]/div)[1]").innerText()).to.eql("Roadmap :");
        (0, chai_1.expect)(await page.locator("((//div[@class='flex items-center gap-2 MuiBox-root css-0'])[2]/div)[2]/span").innerText()).to.eql(investmenttype);
        (0, chai_1.expect)(await page.locator("((//div[@class='flex items-center gap-2 MuiBox-root css-0'])[3]/div)[1]").innerText()).to.eql("Phase :");
        (0, chai_1.expect)(await page.locator("((//div[@class='flex items-center gap-2 MuiBox-root css-0'])[3]/div)[2]/div/div").innerText()).to.eql(`${currentPhaseName}`);
        (0, chai_1.expect)(await page.locator("((//div[@class='flex items-center gap-2 MuiBox-root css-0'])[4]/div)[1]").innerText()).to.eql("Status :");
        (0, chai_1.expect)(await page.locator("((//div[@class='flex items-center gap-2 MuiBox-root css-0'])[4]/div)[2]/div").innerText()).to.eql("Open");
    });
    (0, cucumber_1.Then)("Investment Documents, Approver and Review Investment sections", async function () {
        (0, chai_1.expect)(await page.locator("(//div[@class='font-semibold MuiBox-root css-0'])[1]").innerText()).to.contain.oneOf(["Investment Documents", "Investment Documents (Optional)"]);
        (0, chai_1.expect)(await page.locator("(//div[@class='font-semibold MuiBox-root css-0'])[2]").innerText()).to.eql("Approver");
        (0, chai_1.expect)(await page.locator("(//div[@class='font-semibold MuiBox-root css-0'])[3]").innerText()).to.eql("Review Investment");
    });
    (0, cucumber_1.Then)("Details, Roadmap, Objective and Deliverable, Back, Save and Send buttons", async function () {
        (0, chai_1.expect)(await page.locator("//button[contains(text(),'Details')]").isVisible()).to.true;
        (0, chai_1.expect)(await page.locator("//button[contains(text(),'Roadmap')]").isVisible()).to.true;
        (0, chai_1.expect)(await page.locator("//button[contains(text(),'back')]").isVisible()).to.true;
        (0, chai_1.expect)(await page.locator("//button[contains(text(),'save')]").isVisible()).to.true;
        (0, chai_1.expect)(await page.locator("//button[contains(text(),'send')]").isVisible()).to.true;
        (0, chai_1.expect)(await page.locator("//button[contains(text(),'Objective & Deliverable')]").isVisible()).to.true;
    });
    (0, cucumber_1.When)("I click on any Investment of Draft state", async function () {
        page = this.page;
        investmentNameOfDraftState = await page.locator(`((//div[@class='uppercase MuiBox-root css-0' and contains(text(),'DRAFT')])[1]//parent::div/following-sibling::div)[1]`).innerText();
        await page.locator(`(//div[@class='uppercase MuiBox-root css-0' and contains(text(),'DRAFT')])[1]`).click();
    });
    (0, cucumber_1.Then)("Investment shoud open", async function () {
    });
    (0, cucumber_1.Then)("All fields should be editable", async function () {
        for (let i = 0; i < 3; i++) {
            if (await page.locator("//input[@name='investmentname']").isVisible()) {
                break;
            }
            else {
                await page.locator("//button[contains(text(),'back')]").click();
            }
        }
        (0, chai_1.expect)(await page.locator("//input[@name='investmentname']").isEditable()).to.be.true;
        (0, chai_1.expect)(await page.locator("//input[@name='investmenttype']").isEditable()).to.be.true;
        (0, chai_1.expect)(await page.locator("//input[@name='locationname']").isEditable()).to.be.true;
        (0, chai_1.expect)(await page.locator("//input[@name='asset']").isEditable()).to.be.true;
        (0, chai_1.expect)(await page.locator("//textarea[@name='investmentdescription']").isEditable()).to.be.true;
        (0, chai_1.expect)(await page.locator("(//input[@placeholder='Find user using WOPID, Name or Email'])[1]").isEditable()).to.be.true;
        (0, chai_1.expect)(await page.locator("//*[@data-testid='AddCircleRoundedIcon']").isEditable()).to.be.true;
    });
    (0, cucumber_1.When)("I edit the investment and click on Save button", async function () {
        investmentName = Math.random().toString(20).substr(2, 6);
        investmentName = "New investments" + investmentName;
        await page.locator("//input[@name='investmentname']").fill("");
        await page.locator("//input[@name='investmentname']").fill(investmentName);
        await page.waitForTimeout(3000);
        await page.locator("//button[contains(text(),'save')]").click();
    });
    (0, cucumber_1.Then)("I should see Investment with edited details", async function () {
        (0, chai_1.expect)(await page.locator(`((//div[@class='uppercase MuiBox-root css-0' and contains(text(),'DRAFT')])[1]//parent::div/following-sibling::div)[1]`).innerText()).to.eql(investmentName);
    });
    (0, cucumber_1.When)("I click on Details button present in Review section", async function () {
        await page.waitForTimeout(3000);
        await page.locator("//button[contains(text(),'Details')]").click();
        await page.waitForTimeout(3000);
    });
    (0, cucumber_1.Then)("It should show the detail filled in Details page in view mode", async function () {
        (0, chai_1.expect)(await page.locator("//label[contains(text(), 'Investment Name')]//following-sibling::div/input").getAttribute('value')).to.eql(investmentName);
        (0, chai_1.expect)(await page.locator("//label[contains(text(), 'Investment Name')]//following-sibling::div/input").isEditable()).to.be.false;
    });
    (0, cucumber_1.When)("I click on Roadmap button present in Review section", async function () {
        await page.waitForTimeout(3000);
        await page.locator("//button[contains(text(),'Roadmap')]").click();
        await page.waitForTimeout(3000);
    });
    (0, cucumber_1.Then)("It should show the Roadmap selected in roadmap page", async function () {
        let cnt = await page.locator("//div[@class='text-white font-semibold MuiBox-root css-0']").count();
        for (let i = 0; i < cnt; i++) {
            (0, chai_1.expect)(await page.locator(`(//div[@class='text-white font-semibold MuiBox-root css-0'])`).nth(i).innerText()).to.eql(allPhaseNames[i]);
        }
        (0, chai_1.expect)(await page.locator(`(//div[@class='bg-gray-300 px-4 pb-2 pt-1 rounded-full MuiBox-root css-0'])[1]`).innerText()).to.eql(investmenttype);
        (0, chai_1.expect)(await page.locator(`(//div[@class='bg-gray-300 px-4 pb-2 pt-1 rounded-full MuiBox-root css-0'])[2]`).innerText()).to.eql(roadmap);
    });
    (0, cucumber_1.When)("I click on Objective & Deliverable button present in Review section", async function () {
        await page.waitForTimeout(3000);
        await page.locator("//button[contains(text(),'Objective & Deliverable')]").click();
        await page.waitForTimeout(3000);
    });
    (0, cucumber_1.Then)("It should show the Objectives and Deliverable present in Objective & Deliverable page", async function () {
        let cnt = await page.locator("//div[@class='text-white font-semibold MuiBox-root css-0']").count();
        for (let i = 0; i < cnt; i++) {
            (0, chai_1.expect)(await page.locator(`(//div[@class='text-white font-semibold MuiBox-root css-0'])`).nth(i).innerText()).to.eql(allPhaseNames[i]);
        }
        (0, chai_1.expect)(await page.locator(`(//div[@class='bg-gray-300 px-4 pb-2 pt-1 rounded-full MuiBox-root css-0'])[1]`).innerText()).to.eql(investmenttype);
        (0, chai_1.expect)(await page.locator(`(//div[@class='bg-gray-300 px-4 pb-2 pt-1 rounded-full MuiBox-root css-0'])[2]`).innerText()).to.eql(roadmap);
        (0, chai_1.expect)(await page.locator("(//div[@class='flex items-center gap-2 MuiBox-root css-0']/div[contains(text(), 'Phase :')])[2]").isVisible()).to.be.true;
        (0, chai_1.expect)(await page.locator("(//div[@class='text-white font-semibold MuiBox-root css-0'])[1]").innerText()).to.eql(allPhaseNames[0]);
        (0, chai_1.expect)(await page.locator("//*[@data-testid='MoreVertRoundedIcon']")).to.exist;
        (0, chai_1.expect)(await page.locator("//input[@class='PrivateSwitchBase-input MuiSwitch-input css-1m9pwf3']")).to.exist;
        (0, chai_1.expect)(await page.locator("(//div[@class='bg-open px-4 pb-2 pt-1 text-white rounded-full capitalize MuiBox-root css-0'])[2]").innerText()).to.eql('Open');
        (0, chai_1.expect)(await page.locator("//div[@class='w-2/5 p-2 flex justify-between items-start MuiBox-root css-0']").count()).to.eql(numOfObj);
        (0, chai_1.expect)(await page.locator("//div[@class='flex justify-between items-start MuiBox-root css-0']").count()).greaterThanOrEqual(cnt);
    });
    (0, cucumber_1.Then)("It should show Add button at the start and end of that phase and Delete button on that phase", async function () {
        (0, chai_1.expect)(await page.locator("xpath=(//*[@data-testid='AddCircleOutlineRoundedIcon'])[1]")).to.exist;
        (0, chai_1.expect)(await page.locator("xpath=(//*[@data-testid='AddCircleOutlineRoundedIcon'])[2]")).to.exist;
        (0, chai_1.expect)(await page.locator("(//*[@data-testid='DeleteRoundedIcon'])[1]")).to.exist;
    });
    (0, cucumber_1.Then)("Info: If you do not see any required Phase, please contact IMF admin. Add and Cancel button", async function () {
        (0, chai_1.expect)(await page.locator("text=Info: If you do not see any required Phase, please contact IMF admin.").isVisible()).to.be.true;
        (0, chai_1.expect)(await page.locator("//button[contains(text(), 'Cancel')]").isVisible()).to.be.true;
    });
    (0, cucumber_1.When)("I Fill All fields in create new investment page with investent type as Exploration", async function () {
        investmentName = Math.random().toString(20).substr(2, 6);
        investmentName = "New investment" + investmentName;
        await page.locator("//input[@name='investmentname']").fill(investmentName);
        await page.locator("#mui-component-select-investmenttype").click();
        investmenttype = "Exploration";
        await page.locator("text=Exploration").click();
        await page.locator("#mui-component-select-locationname").click();
        await page.locator("//ul[@class='MuiList-root MuiList-padding MuiMenu-list css-r8u8y9']/li[2]/div").click();
        await page.locator("#mui-component-select-asset").click();
        await page.locator("//ul[@class='MuiList-root MuiList-padding MuiMenu-list css-r8u8y9']/li[2]/div").click();
        await page.locator("(//div[@class='MuiFormControl-root MuiTextField-root w-full css-1qrsed1']//parent::div)[1]").click();
        await page.locator("text=2023").click();
        await page.locator("//textarea[@name='investmentdescription']").fill(investmentName);
        let cnt = await page.locator(`(//input[@placeholder='Find user using WOPID, Name or Email'])`).count();
        for (let i = 1; i <= cnt; i++) {
            await page.locator(`(//input[@placeholder='Find user using WOPID, Name or Email'])[${i}]`).type(investmentLeads[i]);
            await page.waitForTimeout(5000);
            await page.keyboard.press('ArrowDown');
            await page.keyboard.press('Enter');
        }
        await page.locator("//*[@data-testid='AddCircleRoundedIcon']").click();
        await page.locator("//input[@name='role']").fill("Tester");
        await page.locator("//div[@name='user']").click();
        await page.locator(`(//input[@placeholder='Find user using WOPID, Name or Email'])`).last().type(record.Wopid);
        await page.waitForTimeout(2000);
        await page.locator(`text=${record.NameOfWopid}`).click();
        await page.waitForTimeout(2000);
        await page.locator("(//div[@class='MuiDialogActions-root MuiDialogActions-spacing css-14b29qc']//button)[1]").click();
    });
    (0, cucumber_1.Then)("Add Phase popup should  open and it should contain drop down and Free text field for entering justification", async function () {
        (0, chai_1.expect)(await page.locator("xpath=//div[@role='dialog']").count()).to.be.eql(1);
        (0, chai_1.expect)((await page.locator("xpath=//h2[@class='MuiTypography-root MuiTypography-h6 MuiDialogTitle-root capitalize css-ohyacs']").innerText()).valueOf()).to.eql('Add Phase');
        (0, chai_1.expect)(await page.locator("xpath=//input[@name='phasename']")).to.exist;
        (0, chai_1.expect)(await page.locator("(//div[@class='flex flex-col gap-4 MuiBox-root css-0']/div)[2]").innerText()).to.eql('Please provide justification below :');
        (0, chai_1.expect)(await page.locator("//textarea[@name='justification']").getAttribute('placeholder')).to.eql('Type Justification');
    });
    (0, cucumber_1.When)("I hover mouse on Phase", async function () {
        await page.hover("(//div[@class='text-pink-400 MuiBox-root css-0'])[1]");
        await page.waitForTimeout(3000);
        currentPhase = await page.locator("(//div[@class='flex items-end text-white font-semibold MuiBox-root css-0'])[1]").innerText();
    });
    (0, cucumber_1.When)("I slect a phase and enter justification and click on Add button", async function () {
        let objectDate = new Date();
        let day = String(objectDate.getDate()).padStart(2, '0');
        let month = String(objectDate.getMonth() + 1).padStart(2, '0');
        let year = objectDate.getFullYear();
        JustificationEnteredDate = day + "/" + month + "/" + year;
        await page.locator(`//span[@class='MuiTypography-root MuiTypography-body1 MuiListItemText-primary css-yb0lig' and contains(text(), '${phasename}')]`).click();
        await page.locator("//textarea[@name='justification']").type(addPhaseJustification);
        await page.locator("//button[contains(text(), 'Add')]").click();
    });
    (0, cucumber_1.Then)("Phase add successful toaster message should appear, Phase should get added at the start of the phase on which you have clicked add button", async function () {
        (0, chai_1.expect)((await page.locator("xpath=//div[@role='alert']").innerText()).valueOf()).to.eql('Phase add successful');
        (0, chai_1.expect)((await page.locator("xpath=(//div[@class='flex items-end text-white font-semibold MuiBox-root css-0'])[1]").innerText()).valueOf()).to.eql(phasename);
        numberofObjInNewlyAddedPhase = await page.locator("(//div[@class='text-pink-400 MuiBox-root css-0']/div)[1]").innerText();
    });
    (0, cucumber_1.Then)("Phase add successful toaster message should appear, Phase should get added at the end of the phase on which you have clicked add button", async function () {
        (0, chai_1.expect)((await page.locator("xpath=//div[@role='alert']").innerText()).valueOf()).to.eql('Phase add successful');
        (0, chai_1.expect)((await page.locator("xpath=(//div[@class='flex items-end text-white font-semibold MuiBox-root css-0'])[2]").innerText()).valueOf()).to.eql(phasename);
        numberofObjInNewlyAddedPhase = await page.locator("(//div[@class='text-pink-400 MuiBox-root css-0']/div)[2]").innerText();
    });
    (0, cucumber_1.Then)("Select Greenfield roadmap and verfiy newly added phase in Exploration should have same objectives as Greenfield", async function () {
        await page.locator("(//div[@class='MuiSelect-select MuiSelect-outlined MuiInputBase-input MuiOutlinedInput-input css-qiwgdb'])[1]").click();
        await page.locator("text=Greenfield").click();
        await page.locator("(//div[@class='MuiSelect-select MuiSelect-outlined MuiInputBase-input MuiOutlinedInput-input css-qiwgdb'])[2]").click();
        await page.locator("(//span[@class='MuiTypography-root MuiTypography-body1 MuiListItemText-primary css-yb0lig'])[1]").click();
        phasename = phasename.toLowerCase();
        (0, chai_1.expect)(await page.locator(`//div[@class='bg-white px-2 rounded-full font-semibold text-${phasename} MuiBox-root css-0']`).innerText()).to.eql(numberofObjInNewlyAddedPhase);
    });
    (0, cucumber_1.Then)("Delete Phase popup should open and it should show Are you sure you want to delete phase phase name message and Confirm and Cancel buttons", async function () {
        let deletePhase = (await page.locator("//h2[@class='MuiTypography-root MuiTypography-h6 MuiDialogTitle-root capitalize css-ohyacs']").innerText()).valueOf();
        (0, chai_1.expect)(deletePhase).to.contain.oneOf(['Delete Phase', 'Delete Phase\nMandatory']);
        (0, chai_1.expect)((await page.locator("(//div[@class='flex flex-col gap-4 MuiBox-root css-0']/div)[1]").innerText()).valueOf()).eql(`Are you sure you want to delete phase "${currentPhase}" ?`);
        (0, chai_1.expect)(await page.locator("//button[contains(text(), 'Confirm')]").count()).to.be.eql(1);
        (0, chai_1.expect)(await page.locator("//button[contains(text(), 'Cancel')]").count()).to.be.eql(1);
    });
    (0, cucumber_1.When)("I Delete All phases of the roadmap", async function () {
        let cnt = await page.locator("(//div[@class='text-pink-400 MuiBox-root css-0'])").count();
        for (let i = 0; i < cnt - 2; i++) {
            await page.hover("(//div[@class='text-pink-400 MuiBox-root css-0'])[1]");
            await page.locator("xpath=(//*[@data-testid='DeleteRoundedIcon'])[1]").click();
            await page.locator("//textarea[@name='justification']").type("Test");
            await page.locator("xpath=//button[contains(text(), 'Confirm')]").click();
            await page.waitForTimeout(7000);
        }
    });
    (0, cucumber_1.Then)("I should get Roadmap should have atleast 2 Phases toaster message when 2 Phases are left", async function () {
        await page.hover("(//div[@class='text-pink-400 MuiBox-root css-0'])[1]");
        await page.locator("xpath=(//*[@data-testid='DeleteRoundedIcon'])[1]").click();
        (0, chai_1.expect)((await page.locator("xpath=//div[@role='alert']").innerText()).valueOf()).to.eql('Roadmap should have at least 2 Phases !');
    });
    (0, cucumber_1.When)("I enter justification and click on Confirm button", async function () {
        await page.locator("//textarea[@name='justification']").type(deletePhaseJustification);
        await page.locator("xpath=//button[contains(text(), 'Confirm')]").click();
    });
    (0, cucumber_1.Then)("Phase delete successful toaster message should appear and Phase should gets deleted for that investment", async function () {
        (0, chai_1.expect)((await page.locator("xpath=//div[@role='alert']").innerText()).valueOf()).to.eql('Phase delete successful');
        (0, chai_1.expect)((await page.locator("xpath=(//div[@class='flex items-end text-white font-semibold MuiBox-root css-0'])[1]").innerText()).valueOf()).to.not.eql(currentPhase);
    });
    (0, cucumber_1.When)("I select Status and click on search button", async function () {
        page = this.page;
        await page.waitForTimeout(13000);
        textcolumnofverification = 1;
        filterText = await page.locator("(//div[@class='grid gap-8 grid-cols-8 MuiBox-root css-0'])[2]/div[1]").innerText();
        await page.locator("(//div[@class='MuiSelect-select MuiSelect-outlined MuiSelect-multiple MuiInputBase-input MuiOutlinedInput-input css-qiwgdb'])[1]").click();
        await page.locator(`//span[@class='MuiTypography-root MuiTypography-body1 MuiListItemText-primary css-yb0lig' and contains(text(), '${filterText}')]`).click();
        await page.locator("(//div[@class='MuiSelect-select MuiSelect-outlined MuiSelect-multiple MuiInputBase-input MuiOutlinedInput-input css-qiwgdb'])[4]").click({ force: true });
        await page.locator("//*[@data-testid='FilterAltRoundedIcon']").click();
        await page.waitForTimeout(6000);
    });
    (0, cucumber_1.When)("I select Investment Types and click on search button", async function () {
        page = this.page;
        await page.waitForTimeout(13000);
        textcolumnofverification = 3;
        filterText = await page.locator("(//div[@class='grid gap-8 grid-cols-8 MuiBox-root css-0'])[2]/div[3]").innerText();
        await page.locator("(//div[@class='MuiSelect-select MuiSelect-outlined MuiSelect-multiple MuiInputBase-input MuiOutlinedInput-input css-qiwgdb'])[2]").click();
        await page.locator(`//span[@class='MuiTypography-root MuiTypography-body1 MuiListItemText-primary css-yb0lig' and contains(text(), '${filterText}')]`).click();
        await page.locator("(//div[@class='MuiSelect-select MuiSelect-outlined MuiSelect-multiple MuiInputBase-input MuiOutlinedInput-input css-qiwgdb'])[4]").click({ force: true });
        await page.locator("//*[@data-testid='FilterAltRoundedIcon']").click();
        await page.waitForTimeout(6000);
    });
    (0, cucumber_1.Then)("The records containing or matching the selection should be filtered and populated in the table", async function () {
        let cnt = await page.locator("(//div[@class='grid gap-8 grid-cols-8 MuiBox-root css-0'])").count();
        for (let i = 2; i <= cnt; i++) {
            (0, chai_1.expect)(await page.locator(`(//div[@class='grid gap-8 grid-cols-8 MuiBox-root css-0'])[${i}]/div[${textcolumnofverification}]`).innerText()).to.eql(filterText);
        }
        await page.locator("//*[@data-testid='RefreshRoundedIcon']").click();
    });
    (0, cucumber_1.When)("I select Location and click on search button", async function () {
        page = this.page;
        textcolumnofverification = 4;
        filterText = await page.locator("(//div[@class='grid gap-8 grid-cols-8 MuiBox-root css-0'])[2]/div[4]").innerText();
        await page.locator("(//div[@class='MuiSelect-select MuiSelect-outlined MuiSelect-multiple MuiInputBase-input MuiOutlinedInput-input css-qiwgdb'])[3]").click();
        await page.locator(`//span[@class='MuiTypography-root MuiTypography-body1 MuiListItemText-primary css-yb0lig' and contains(text(), '${filterText}')]`).click();
        await page.locator("(//div[@class='MuiSelect-select MuiSelect-outlined MuiSelect-multiple MuiInputBase-input MuiOutlinedInput-input css-qiwgdb'])[1]").click({ force: true });
        await page.locator("//*[@data-testid='FilterAltRoundedIcon']").click();
        await page.waitForTimeout(13000);
    });
    (0, cucumber_1.When)("I select Asset and click on search button", async function () {
        page = this.page;
        await page.waitForTimeout(13000);
        textcolumnofverification = 5;
        filterText = await page.locator("(//div[@class='grid gap-8 grid-cols-8 MuiBox-root css-0'])[2]/div[5]").innerText();
        await page.locator("(//div[@class='MuiSelect-select MuiSelect-outlined MuiSelect-multiple MuiInputBase-input MuiOutlinedInput-input css-qiwgdb'])[4]").click();
        await page.locator(`//span[@class='MuiTypography-root MuiTypography-body1 MuiListItemText-primary css-yb0lig' and contains(text(), '${filterText}')]`).click();
        await page.locator("(//div[@class='MuiSelect-select MuiSelect-outlined MuiSelect-multiple MuiInputBase-input MuiOutlinedInput-input css-qiwgdb'])[1]").click({ force: true });
        await page.locator("//*[@data-testid='FilterAltRoundedIcon']").click();
        await page.waitForTimeout(6000);
    });
    (0, cucumber_1.When)("I select Phase and click on search button", async function () {
        page = this.page;
        await page.waitForTimeout(13000);
        textcolumnofverification = 6;
        filterText = await page.locator("(//div[@class='grid gap-8 grid-cols-8 MuiBox-root css-0'])[2]/div[6]").innerText();
        await page.locator("(//div[@class='MuiSelect-select MuiSelect-outlined MuiSelect-multiple MuiInputBase-input MuiOutlinedInput-input css-qiwgdb'])[5]").click();
        await page.locator(`(//span[@class='MuiTypography-root MuiTypography-body1 MuiListItemText-primary css-yb0lig' and contains(text(), '${filterText}')])[1]`).click();
        await page.locator("(//div[@class='MuiSelect-select MuiSelect-outlined MuiSelect-multiple MuiInputBase-input MuiOutlinedInput-input css-qiwgdb'])[1]").click({ force: true });
        await page.locator("//*[@data-testid='FilterAltRoundedIcon']").click();
        await page.waitForTimeout(6000);
    });
    (0, cucumber_1.When)("I enter Investment Name and click on search button", async function () {
        page = this.page;
        filterText = await page.locator("(//div[@class='grid gap-8 grid-cols-8 MuiBox-root css-0'])[2]/div[2]").innerText();
        filterText = filterText.substr(0, 3);
        await page.locator("//input[@class='MuiInputBase-input MuiOutlinedInput-input css-1x5jdmq']").type(filterText);
        await page.locator("//*[@data-testid='FilterAltRoundedIcon']").click();
    });
    (0, cucumber_1.Then)("The records containing or matching the words should be filtered and populated in table", async function () {
        let cnt = await page.locator("(//div[@class='grid gap-8 grid-cols-8 MuiBox-root css-0'])").count();
        for (let i = 2; i <= cnt; i++) {
            (0, chai_1.expect)(await page.locator(`(//div[@class='grid gap-8 grid-cols-8 MuiBox-root css-0'])[${i}]/div[2]`).innerText()).to.contains(filterText);
        }
        await page.locator("//*[@data-testid='RefreshRoundedIcon']").click();
    });
    (0, cucumber_1.When)("I select year and click on search button", async function () {
        page = this.page;
        filterText = await page.locator("(//div[@class='grid gap-8 grid-cols-8 MuiBox-root css-0'])[2]/div[8]").innerText();
        await page.locator("(//div[@class='MuiFormControl-root MuiFormControl-fullWidth css-tzsjye'])[7]/div").click({ force: true });
        if (await page.locator(`//button[@class='PrivatePickersYear-yearButton css-m1gykc' and contains(text(), '${filterText}')]`).isVisible()) {
            await page.locator(`//button[@class='PrivatePickersYear-yearButton css-m1gykc' and contains(text(), '${filterText}')]`).click();
        }
        else {
            await page.locator(`//button[@class='PrivatePickersYear-yearButton Mui-selected css-m1gykc' and contains(text(), '${filterText}')]`).click();
        }
        await page.locator("//*[@data-testid='FilterAltRoundedIcon']").click();
    });
    (0, cucumber_1.Then)("The records containing the year should be filtered and populated in table", async function () {
        let cnt = await page.locator("(//div[@class='grid gap-8 grid-cols-8 MuiBox-root css-0'])").count();
        for (let i = 2; i <= cnt; i++) {
            (0, chai_1.expect)(await page.locator(`(//div[@class='grid gap-8 grid-cols-8 MuiBox-root css-0'])[${i}]/div[8]`).innerText()).to.eql(filterText);
        }
        await page.locator("//*[@data-testid='RefreshRoundedIcon']").click();
    });
    (0, cucumber_1.When)("I enter and select manager and click on search button", async function () {
        page = this.page;
        filterText = await page.locator("(//div[@class='grid gap-8 grid-cols-8 MuiBox-root css-0'])[2]/div[7]").innerText();
        await page.locator("//div[@class='MuiAutocomplete-endAdornment css-2iz2x6']").click();
        await page.locator(`//input[@placeholder='Find user']`).type(filterText);
        await page.waitForTimeout(5000);
        await page.keyboard.press('ArrowDown');
        await page.keyboard.press('Enter');
        await page.locator("//*[@data-testid='FilterAltRoundedIcon']").click();
    });
    (0, cucumber_1.When)("I enter Investment Name which is not existing and click on search button", async function () {
        page = this.page;
        await page.locator("//input[@class='MuiInputBase-input MuiOutlinedInput-input css-1x5jdmq']").type("x1z2d3cs");
        await page.locator("//*[@data-testid='FilterAltRoundedIcon']").click();
    });
    (0, cucumber_1.Then)("It should show No Data Found warning message", async function () {
        page = this.page;
        (0, chai_1.expect)(await page.locator("//div[@class='MuiAlert-message css-1xsto0d']").innerText()).to.eql('No Data found !');
        await page.locator("//*[@data-testid='RefreshRoundedIcon']").click();
    });
    (0, cucumber_1.Then)("The records containing the entered manager name should be filtered and populated in table", async function () {
        let cnt = await page.locator("(//div[@class='grid gap-8 grid-cols-8 MuiBox-root css-0'])").count();
        for (let i = 2; i <= cnt; i++) {
            (0, chai_1.expect)(await page.locator(`(//div[@class='grid gap-8 grid-cols-8 MuiBox-root css-0'])[${i}]/div[7]`).innerText()).to.eql(filterText);
        }
        await page.locator("//*[@data-testid='RefreshRoundedIcon']").click();
    });
    (0, cucumber_1.When)("I click on Send button without filling any details", async function () {
        await page.locator("//button[contains(text(), 'send')]").click();
    });
    (0, cucumber_1.Then)("I should get error messages for filling the fileds at below the respective fields", async function () {
        (0, chai_1.expect)(await page.locator("(//p[@class='MuiFormHelperText-root Mui-error css-j7o63n'])[1]").innerText()).to.eql('Please Enter Document Link(s)');
        (0, chai_1.expect)(await page.locator("(//p[@class='MuiFormHelperText-root Mui-error css-j7o63n'])[2]").innerText()).to.eql('Please Search & Select Approver');
    });
    (0, cucumber_1.When)("I fill invalid urls in the fields of Investment documents section and click on send button", async function () {
        let cnt = await page.locator("//input[@placeholder='Document Link']").count();
        for (let i = 0; i < cnt; i++) {
            await page.locator(`//input[@placeholder='Document Link']`).nth(i).fill("abcd");
        }
        await page.locator("//button[contains(text(), 'send')]").click();
    });
    (0, cucumber_1.Then)("I should get Please Enter Valid URLs error message at Investment documents section", async function () {
        (0, chai_1.expect)(await page.locator("(//p[@class='MuiFormHelperText-root Mui-error css-j7o63n'])[1]").innerText()).to.eql('Please Enter Valid URLs');
    });
    (0, cucumber_1.When)("I search unknown user in Investment leads or Team meber section", async function () {
        await page.locator(`(//input[@placeholder='Find user using WOPID, Name or Email'])`).nth(0).fill('12xyz34');
        await page.waitForTimeout(3000);
    });
    (0, cucumber_1.Then)("I should get User not found toaster message", async function () {
        (0, chai_1.expect)(await page.locator("xpath=//div[@role='alert']").innerText()).to.eql('User not found !');
    });
    (0, cucumber_1.When)("I click on Add team member and search unknown person", async function () {
        await page.locator("//*[@data-testid='AddCircleRoundedIcon']").click();
        await page.locator("//div[@name='user']").click();
        await page.locator(`(//input[@placeholder='Find user using WOPID, Name or Email'])`).last().fill('123xyaz');
        await page.waitForTimeout(3000);
    });
    (0, cucumber_1.When)("I click on Reset Roadmap button", async function () {
        roadmapname = await page.locator("//span[@class='bg-gray-300 px-4 pb-2 pt-1 rounded-full']").innerText();
        await page.locator("//button[contains(text(), 'reset roadmap')]").click();
    });
    (0, cucumber_1.Then)("I should get a Warningpopup with message If you reset roadmap roadmap name, the roadmap will revert back to the default data, the changes you have made if any in Roadmap, Objective & Deliverable, Review will be lost !", async function () {
        (0, chai_1.expect)(await page.locator("//h2[@class='MuiTypography-root MuiTypography-h6 MuiDialogTitle-root capitalize css-ohyacs']").innerText()).to.eql("Change Warning");
        (0, chai_1.expect)(await page.locator("//h2[@class='MuiTypography-root MuiTypography-h6 MuiDialogTitle-root capitalize css-ohyacs']//following-sibling::div/div").innerText()).to.eql(`If you reset roadmap "${roadmapname}", the roadmap will revert back to the default data, the changes you have made (if any) in Roadmap, Objective & Deliverable, Review will be lost !`);
        (0, chai_1.expect)(await page.locator("xpath=//button[contains(text(), 'Confirm')]").isVisible()).to.be.true;
        (0, chai_1.expect)(await page.locator("xpath=//button[contains(text(), 'Cancel')]").isVisible()).to.be.true;
    });
    (0, cucumber_1.Then)("Roadmap should revert back to default data", async function () {
        await page.waitForTimeout(3000);
        (0, chai_1.expect)((await page.locator("xpath=(//div[@class='flex items-end text-white font-semibold MuiBox-root css-0'])[1]").innerText()).valueOf()).to.not.eql(phasename);
    });
    (0, cucumber_1.Then)("Roadmap should not revert back to default data", async function () {
        await page.waitForTimeout(3000);
        (0, chai_1.expect)((await page.locator("xpath=(//div[@class='flex items-end text-white font-semibold MuiBox-root css-0'])[1]").innerText()).valueOf()).to.eql(phasename);
    });
    (0, cucumber_1.Then)("I should see info icon beside investment name", async function () {
        await page.waitForTimeout(3000);
        (0, chai_1.expect)(await page.locator("//*[@data-testid='InfoOutlinedIcon']").isVisible()).to.be.true;
    });
    (0, cucumber_1.Then)("I verfiy Created by User name by hovering mouse on info icon", async function () {
        await page.hover("//*[@data-testid='InfoOutlinedIcon']");
        (0, chai_1.expect)(await page.locator("//div[@class='text-primary text-sm p-1 MuiBox-root css-0']").innerText()).to.eql(`Created By : ${record.createdByUserNameAndEmail}`);
    });
    (0, cucumber_1.When)("I click on any Investment", async function () {
        await page.click("(//div[@class='flex items-center py-4 MuiBox-root css-0'])[1]");
        await page.waitForTimeout(3000);
    });
    (0, cucumber_1.Then)("I come back to Details page if investment is not on details page", async function () {
        for (let i = 0; i < 3; i++) {
            if (await page.locator("//button[contains(text(), 'back')]").isVisible()) {
                await page.locator("//button[contains(text(), 'back')]").click();
                await page.waitForTimeout(3000);
            }
        }
    });
    (0, cucumber_1.Then)("I verfiy CreatedBy User name by hovering mouse on info icon", async function () {
        await page.hover("//*[@data-testid='InfoOutlinedIcon']");
        (0, chai_1.expect)(await page.locator("//div[@class='text-primary text-sm p-1 MuiBox-root css-0']").innerText()).to.contains(`Created By :`);
    });
    (0, cucumber_1.When)("Click on Justification button", async function () {
        await page.waitForTimeout(3000);
        await page.locator("//button[contains(text(), 'Justification')]").click();
    });
    (0, cucumber_1.Then)("Justification popup should open", async function () {
        await page.waitForTimeout(3000);
        (0, chai_1.expect)(await page.locator("//h2[@class='MuiTypography-root MuiTypography-h6 MuiDialogTitle-root capitalize css-ohyacs']").innerText()).to.eql('Justification');
    });
    (0, cucumber_1.Then)("I should see the justification entered while adding a phase, name of user, justification added date and time", async function () {
        await page.waitForTimeout(3000);
        (0, chai_1.expect)(await page.locator("//div[@class='text-sm text-primary font-semibold MuiBox-root css-0']").innerText()).to.eql('Archana Menasangi');
        phasename = phasename.toLowerCase();
        (0, chai_1.expect)(await page.locator("//div[@class='bg-gray-400 inline-block text-sm px-2 rounded-full text-white font-semibold MuiBox-root css-0']").innerText()).to.eql(`add phase ${phasename}`);
        (0, chai_1.expect)(await page.locator("//div[@class='text-sm pl-8 whitespace-pre-line MuiBox-root css-0']").innerText()).to.eql(addPhaseJustification);
        let justificationaddeddate = await page.locator("//div[@class='text-gray-400 text-xs MuiBox-root css-0']").innerText();
        justificationaddeddate = justificationaddeddate.substr(0, 10);
        (0, chai_1.expect)(justificationaddeddate).to.eql(JustificationEnteredDate);
    });
    (0, cucumber_1.When)("I close the Justification popup and Review-Roadmap page", async function () {
        await page.waitForTimeout(3000);
        await page.locator("//button[contains(text(),'Close')]").click();
        await page.locator("//button[@aria-label='Close']").click();
    });
    (0, cucumber_1.Then)("I should see the justification entered while deleting a phase, name of user, justification added date and time", async function () {
        await page.waitForTimeout(3000);
        (0, chai_1.expect)(await page.locator("//div[@class='text-sm text-primary font-semibold MuiBox-root css-0']").first().innerText()).to.eql('Archana Menasangi');
        currentPhase = currentPhase.toLowerCase();
        (0, chai_1.expect)(await page.locator("//div[@class='bg-gray-400 inline-block text-sm px-2 rounded-full text-white font-semibold MuiBox-root css-0']").first().innerText()).to.eql(`delete phase ${currentPhase}`);
        (0, chai_1.expect)(await page.locator("//div[@class='text-sm pl-8 whitespace-pre-line MuiBox-root css-0']").first().innerText()).to.eql(deletePhaseJustification);
        let justificationaddeddate = await page.locator("//div[@class='text-gray-400 text-xs MuiBox-root css-0']").first().innerText();
        justificationaddeddate = justificationaddeddate.substr(0, 10);
        (0, chai_1.expect)(justificationaddeddate).to.eql(JustificationEnteredDate);
    });
    (0, cucumber_1.Then)("I take existing Investment name", async function () {
        page = this.page;
        await page.waitForTimeout(3000);
        existingInvestmentName = await page.locator("(//div[@class='flex items-center py-4 MuiBox-root css-0'])[1]").innerText();
    });
    (0, cucumber_1.Then)("I Enter Investment name same as existing investment name and click anywhere in the page", async function () {
        await page.locator("//input[@name='investmentname']").fill(existingInvestmentName);
        await page.locator("//textarea[@name='investmentdescription']").click();
    });
    (0, cucumber_1.Then)("This investment name already exists !  Toaster message should appear and Investment name should gets cleared from the investment name field", async function () {
        (0, chai_1.expect)(await page.locator("xpath=//div[@role='alert']").last().innerText()).to.be.eql('This investment name already exists !');
        (0, chai_1.expect)(await page.locator("//input[@name='investmentname']").getAttribute('value')).to.eql('');
    });
    (0, cucumber_1.When)("I Enter the Phase name in phase freetext field and click on Add button", async function () {
        page = this.page;
        await page.waitForTimeout(1000);
        phasename = Math.random().toString(20).substr(2, 6);
        phasename = "NewPhase" + phasename;
        await page.locator(`//input[@name='phase']`).fill("");
        await page.locator(`//input[@name='phase']`).type(phasename);
        await page.locator("(//div[@class='MuiDialogActions-root MuiDialogActions-spacing css-14b29qc']/button)[1]").click();
    });
    (0, cucumber_1.When)("I slect newly added phase, enter justification and click on Add button", async function () {
        await page.locator(`//span[@class='MuiTypography-root MuiTypography-body1 MuiListItemText-primary css-yb0lig' and contains(text(), '${phasename}')]`).click();
        await page.locator("//textarea[@name='justification']").fill("Adding phase conatining 0 Objective");
        await page.locator("//button[contains(text(), 'Add')]").click();
    });
    (0, cucumber_1.When)("I slect newly added phase and click on Add button", async function () {
        await page.locator(`//span[@class='MuiTypography-root MuiTypography-body1 MuiListItemText-primary css-yb0lig' and contains(text(), '${phasename}')]`).click();
        await page.locator("//button[contains(text(), 'Add')]").click();
    });
    (0, cucumber_1.Then)("Phase must have atleast 1 Objective toaster message should appear", async function () {
        (0, chai_1.expect)(await page.locator("xpath=//div[@role='alert']").last().innerText()).to.be.eql('Phase must have at least 1 Objective !');
    });
    (0, cucumber_1.Then)("User should be on Objective and Deliverable page", async function () {
        (0, chai_1.expect)(await page.locator("//button[contains(text(), 'next')]").isVisible()).to.be.true;
    });
    (0, cucumber_1.When)("I click on Merge button", async function () {
        page = this.page;
        currentPhase = await page.locator("(//div[@class='flex items-end text-white font-semibold MuiBox-root css-0'])[1]").innerText();
        nextPhase = await page.locator("(//div[@class='flex items-end text-white font-semibold MuiBox-root css-0'])[2]").innerText();
        await page.hover("(//div[@class='text-pink-400 MuiBox-root css-0'])[1]");
        await page.locator("//button[@aria-label='Merge Phase']").first().click();
    });
    (0, cucumber_1.Then)("Merge Phase popup should open with message are you sure you want to merge phases and Justification field", async function () {
        (0, chai_1.expect)(await page.locator("//h2[@class='MuiTypography-root MuiTypography-h6 MuiDialogTitle-root capitalize css-ohyacs']").innerText()).to.eql('Merge Phase');
        (0, chai_1.expect)(await page.locator("//div[@class='flex flex-col gap-4 MuiBox-root css-0']/div[1]").innerText()).to.eql(`Are you sure you want to merge phase "${currentPhase}" & "${nextPhase}" ?`);
        (0, chai_1.expect)(await page.locator("//button[contains(text(),'Cancel')]").isVisible()).to.be.true;
        (0, chai_1.expect)(await page.locator("//button[contains(text(),'Merge')]").isVisible()).to.be.true;
    });
    (0, cucumber_1.When)("I enter justification and click on Merge button", async function () {
        let objectDate = new Date();
        let day = String(objectDate.getDate()).padStart(2, '0');
        let month = String(objectDate.getMonth() + 1).padStart(2, '0');
        let year = objectDate.getFullYear();
        JustificationEnteredDate = day + "/" + month + "/" + year;
        await page.locator("//textarea[@name='justification']").fill("Merging Phases");
        await page.locator("//button[contains(text(),'Merge')]").click();
    });
    (0, cucumber_1.When)("I enter justification and click on Cancel button", async function () {
        await page.locator("//textarea[@name='justification']").fill("Merging Phases");
        await page.locator("//button[contains(text(),'Cancel')]").click();
    });
    (0, cucumber_1.Then)("Phase merge successful toaster message should appear", async function () {
        (0, chai_1.expect)(await page.locator("//div[@role='alert']").last().innerText()).to.eql('Phase merge successful');
    });
    (0, cucumber_1.Then)("Phses should get merged as one phase having both phase names", async function () {
        await page.waitForTimeout(3000);
        (0, chai_1.expect)(await page.locator("(//div[@class='flex items-end text-white font-semibold MuiBox-root css-0'])[1]").innerText()).to.eql(`${currentPhase} & ${nextPhase}`);
    });
    (0, cucumber_1.Then)("Phses should not get merged as one phase and No toaster message", async function () {
        await page.waitForTimeout(3000);
        (0, chai_1.expect)(await page.locator("//div[@role='alert']").count()).to.eql(0);
        (0, chai_1.expect)(await page.locator("(//div[@class='flex items-end text-white font-semibold MuiBox-root css-0'])[1]").innerText()).to.eql(`${currentPhase}`);
        let cnt = await page.locator("//div[@class='relative w-full MuiBox-root css-0'][1]//*[@class='text-sm MuiBox-root css-0']").count();
        for (let i = 1; i <= cnt; i++) {
            for (let j = 1; j <= cnt; j++) {
                let Objective = await page.locator(`(//div[@class='relative w-full MuiBox-root css-0'][1]//*[@class='text-sm MuiBox-root css-0'])[${i}]`).innerText();
                let objct = await page.locator(`(//div[@class='relative w-full MuiBox-root css-0'][1]//*[@class='text-sm MuiBox-root css-0'])[${j}]`).innerText();
                if (Objective == objct && i != j) {
                    await page.locator("merged phase contains duplicate objectives").click();
                }
            }
        }
    });
    (0, cucumber_1.When)("I merge all phases untill 2 phases left", async function () {
        page = this.page;
        let cnt = await page.locator("(//div[@class='flex items-end text-white font-semibold MuiBox-root css-0'])").count();
        for (let i = 1; i <= cnt - 2; i++) {
            await page.hover("(//div[@class='text-pink-400 MuiBox-root css-0'])[1]");
            await page.locator("//button[@aria-label='Merge Phase']").first().click();
            await page.locator("//textarea[@placeholder='Type Justification']").click();
            await page.locator("//textarea[@placeholder='Type Justification']").type("Merging Phases");
            await page.locator("//button[contains(text(),'Merge')]").click();
            await page.waitForTimeout(3000);
        }
    });
    (0, cucumber_1.When)("I click on merge button for Merging last 2 phases", async function () {
        await page.hover("(//div[@class='text-pink-400 MuiBox-root css-0'])[1]");
        await page.locator("//button[@aria-label='Merge Phase']").first().click();
    });
    (0, cucumber_1.Then)("I delete the phase added in Greenfield rodmap", async function () {
        await page.locator("//button[@aria-label='Home']").click();
        await page.locator("//button[@aria-label='Admin']").click();
        await page.locator("xpath=(//div[@class='MuiTabs-flexContainer justify-evenly css-k008qs']//button)[2]").click();
        await page.locator("xpath=(//div[@class='MuiSelect-select MuiSelect-outlined MuiInputBase-input MuiOutlinedInput-input css-qiwgdb'])[1]").click();
        await page.locator("text=Greenfield").click();
        await page.waitForTimeout(2000);
        await page.locator("xpath=(//div[@class='MuiSelect-select MuiSelect-outlined MuiInputBase-input MuiOutlinedInput-input css-qiwgdb'])[2]").click();
        await page.locator("xpath=(//span[@class='MuiTypography-root MuiTypography-body1 MuiListItemText-primary css-yb0lig'])[1]").click();
        await page.hover("(//div[@class='text-pink-400 MuiBox-root css-0'])[1]");
        await page.locator("xpath=(//*[@data-testid='DeleteRoundedIcon'])[1]").click();
        await page.locator("xpath=//button[contains(text(), 'Confirm')]").click();
        await page.waitForTimeout(3000);
    });
    (0, cucumber_1.Then)("Roadmap must have 2 phases tooaster message should appear", async function () {
        (0, chai_1.expect)(await page.locator("//div[@role='alert']").last().innerText()).to.eql('Roadmap should have at least 2 Phases !');
    });
    (0, cucumber_1.Then)("There should be 2 phases in Roadmap", async function () {
        (0, chai_1.expect)(await page.locator("(//div[@class='flex items-end text-white font-semibold MuiBox-root css-0'])").count()).to.eql(2);
    });
    (0, cucumber_1.Then)("I should not see Reset Phase button", async function () {
        await page.waitForTimeout(3000);
        (0, chai_1.expect)(await page.locator("//button[contains(text(),'reset phase')]").isVisible()).to.be.false;
    });
    (0, cucumber_1.Then)("I should see the justification entered while merging a phase, name of user, justification added date and time", async function () {
        await page.waitForTimeout(3000);
        (0, chai_1.expect)(await page.locator("//div[@class='text-sm text-primary font-semibold MuiBox-root css-0']").innerText()).to.eql('Archana Menasangi');
        currentPhase = currentPhase.toLowerCase();
        nextPhase = nextPhase.toLowerCase();
        (0, chai_1.expect)(await page.locator("//div[@class='bg-gray-400 inline-block text-sm px-2 rounded-full text-white font-semibold MuiBox-root css-0']").innerText()).to.eql(`merge phase ${currentPhase} & ${nextPhase}`);
        (0, chai_1.expect)(await page.locator("//div[@class='text-sm pl-8 whitespace-pre-line MuiBox-root css-0']").innerText()).to.eql("Merging Phases");
        let justificationaddeddate = await page.locator("//div[@class='text-gray-400 text-xs MuiBox-root css-0']").innerText();
        justificationaddeddate = justificationaddeddate.substr(0, 10);
        (0, chai_1.expect)(justificationaddeddate).to.eql(JustificationEnteredDate);
    });
    (0, cucumber_1.Then)("I add a deliverable to the investment type which is selected while creating an investment", async function () {
        await page.locator("xpath=(//div[@class='MuiTabs-flexContainer justify-evenly css-k008qs']//button)[2]").click();
        await page.locator("xpath=(//div[@class='MuiSelect-select MuiSelect-outlined MuiInputBase-input MuiOutlinedInput-input css-qiwgdb'])[1]").click();
        await page.locator("text=Exploration").click();
        await page.waitForTimeout(2000);
        await page.locator("xpath=(//div[@class='MuiSelect-select MuiSelect-outlined MuiInputBase-input MuiOutlinedInput-input css-qiwgdb'])[2]").click();
        await page.locator("xpath=(//span[@class='MuiTypography-root MuiTypography-body1 MuiListItemText-primary css-yb0lig'])[1]").click();
        await page.locator("xpath=(//div[@class='text-pink-400 MuiBox-root css-0'])[1]").click();
        await page.locator("xpath=(//div[@class='group flex MuiBox-root css-0'])[1]").hover({ force: true, timeout: 2000, trial: true });
        await page.locator("xpath=(//button[@aria-label='Add Deliverables'])[1]").click();
        addDeliverable = Math.random().toString(20).substr(2, 6);
        addDeliverable = "Deliverable" + addDeliverable;
        await page.locator("xpath=//textarea[@name='title']").fill(addDeliverable);
        await page.locator("xpath=//textarea[@name='information']").fill(addDeliverable);
        await page.locator("xpath=//button[contains(text(), 'Add')]").click();
        await page.waitForTimeout(3000);
    });
    (0, cucumber_1.Then)("I come back to the investments objective and deliverable page", async function () {
        await page.click("//button[@aria-label='Home']");
        await page.locator(`//div[@class='flex items-center py-4 MuiBox-root css-0' and contains(text(), '${investmentName}')]`).click();
        await page.waitForTimeout(3000);
    });
    (0, cucumber_1.Then)("I should see newly added deliverable in first phase", async function () {
        await page.waitForTimeout(3000);
        let newDeliverablecnt = await page.locator("//div[@class='flex justify-between items-start MuiBox-root css-0']/child::div[1]").count();
        var flag = 0;
        for (let i = 1; i <= newDeliverablecnt; i++) {
            let newDeliverable = await page.locator(`(//div[@class='flex justify-between items-start MuiBox-root css-0']/child::div[1])[${i}]`).innerText();
            if (newDeliverable === addDeliverable) {
                flag = 1;
                break;
            }
        }
        if (flag == 1) { }
        else {
            await page.locator("xpath=Data not synced with Admin").click();
        }
    });
    (0, cucumber_1.Then)("I should not see newly added deliverable in first phase", async function () {
        await page.waitForTimeout(3000);
        let newDeliverablecnt = await page.locator("//div[@class='flex justify-between items-start MuiBox-root css-0']/child::div[1]").count();
        var flag = 0;
        for (let i = 1; i <= newDeliverablecnt; i++) {
            let newDeliverable = await page.locator(`(//div[@class='flex justify-between items-start MuiBox-root css-0']/child::div[1])[${i}]`).innerText();
            if (newDeliverable === addDeliverable) {
                flag = 1;
                break;
            }
        }
        if (flag == 0) { }
        else {
            await page.locator("xpath=Data ynced with Admin after saving investment as draft").click();
        }
    });
    (0, cucumber_1.When)("I hover the mouse on any Investment of state Approval Pending and click on message icon", async function () {
        await page.hover("(//div[@class='uppercase MuiBox-root css-0' and contains(text(),'APPROVAL PENDING')])[1]");
        await page.click("(//button[@aria-label='Resend Approval'])[1]");
    });
    (0, cucumber_1.Then)("I should navigate to Review page see status as Approval Pending and Resend Approval button Admin Action section", async function () {
        approvalPendingPhase = await page.locator("//div[@class='bg-pink-400 text-white font-semibold rounded-full MuiBox-root css-0']").innerText();
        approvalPendingInvestment = await page.locator("//div[@class='text-primary text-xl font-semibold MuiBox-root css-0']").innerText();
        (0, chai_1.expect)(await page.locator("//div[@class='bg-pending px-4 pb-2 pt-1 text-white rounded-full capitalize MuiBox-root css-0']").innerText()).to.eql("Approval Pending");
        (0, chai_1.expect)(await page.locator("//div[@class='font-semibold MuiBox-root css-0']").last().innerText()).to.eql("Admin Action");
        (0, chai_1.expect)(await page.locator("//button[contains(text(),'Resend Approval')]").isVisible()).to.be.true;
    });
    (0, cucumber_1.When)("I click on Resend Approval button", async function () {
        await page.locator("//button[contains(text(),'Resend Approval')]").click();
    });
    (0, cucumber_1.Then)("Resend Approval popup should open", async function () {
        (0, chai_1.expect)(await page.locator("//h2[@class='MuiTypography-root MuiTypography-h6 MuiDialogTitle-root capitalize css-ohyacs']").innerText()).to.eql("Resend Approval");
        (0, chai_1.expect)(await page.locator("//button[contains(text(),'Confirm')]").isVisible()).to.be.true;
        (0, chai_1.expect)(await page.locator("//button[contains(text(),'Cancel')]").isVisible()).to.be.true;
        (0, chai_1.expect)(await page.locator("//div[@class='MuiDialogContent-root py-4 css-1ty026z']/div").innerText()).to.eql(`Are you sure you want to resend phase "${approvalPendingPhase}" of investment "${approvalPendingInvestment}" for approval?`);
    });
    (0, cucumber_1.Then)("Investment phase resent for approval toaster message should appear", async function () {
        (0, chai_1.expect)(await page.locator("//div[@role='alert']").last().innerText()).to.eql("Investment phase resent for approval");
    });
    (0, cucumber_1.Then)("Popup should gets closed and no toaster message", async function () {
        (0, chai_1.expect)(await page.locator("//div[@role='alert']").count()).to.eql(0);
        (0, chai_1.expect)(await page.locator("//div[@role='dialog']").count()).to.eql(0);
    });
    (0, cucumber_1.When)("I fill All the fields in Review page and click on Send button", async function () {
        let cnt = await page.locator("//input[@placeholder='Document Link']").count();
        for (let i = 1; i <= cnt; i++) {
            await page.locator(`(//input[@placeholder='Document Link'])[${i}]`).fill("https://dmslink.app.woodside/?dmsn=IMF1-429365771-219");
        }
        await page.locator(`(//input[@placeholder='Find user using WOPID, Name or Email'])[1]`).type(record.Approver);
        await page.waitForTimeout(4000);
        await page.keyboard.press('ArrowDown');
        await page.keyboard.press('Enter');
        await page.locator("//button[contains(text(),'send')]").click();
    });
    (0, cucumber_1.Then)("Send For Approval popup should open", async function () {
        (0, chai_1.expect)(await page.locator("//h2[@class='MuiTypography-root MuiTypography-h6 MuiDialogTitle-root capitalize css-ohyacs']").innerText()).to.eql("Send For Approval");
        (0, chai_1.expect)(await page.locator("//button[contains(text(),'Confirm')]").isVisible()).to.be.true;
        (0, chai_1.expect)(await page.locator("//button[contains(text(),'Cancel')]").isVisible()).to.be.true;
        (0, chai_1.expect)(await page.locator("//div[@class='flex flex-col gap-5 MuiBox-root css-0']/div[1]").innerText()).to.eql(`Are you sure you want to send for Approval?`);
        (0, chai_1.expect)(await page.locator("//div[@class='bg-gray-300 text-primary font-semibold rounded-full px-4 pb-2 pt-1 MuiBox-root css-0']").first().innerText()).to.eql(investmentName);
        (0, chai_1.expect)(await page.locator("(//div[@class='bg-gray-300 text-primary font-semibold rounded-full px-4 pb-2 pt-1 MuiBox-root css-0'])[2]").innerText()).to.eql('Usha Patel');
        (0, chai_1.expect)(await page.locator("(//div[@class='bg-pink-400 text-white font-semibold rounded-full MuiBox-root css-0'])[2]").innerText()).to.eql(currentPhaseName);
        (0, chai_1.expect)(await page.locator("(//div[@class='w-24 font-semibold MuiBox-root css-0'])[1]").innerText()).to.eql('Investment:');
        (0, chai_1.expect)(await page.locator("(//div[@class='w-24 font-semibold MuiBox-root css-0'])[2]").innerText()).to.eql("Phase:");
        (0, chai_1.expect)(await page.locator("(//div[@class='w-24 font-semibold MuiBox-root css-0'])[3]").innerText()).to.eql("Approver:");
    });
    (0, cucumber_1.When)("I click on Send button present on Send Approval popup", async function () {
        await page.waitForTimeout(3000);
        let TBA = await page.locator("//button[contains(text(),'Yes')]").isVisible();
        console.log(TBA);
        if (TBA) {
            await page.locator("//button[contains(text(),'Yes')]").click({ force: true });
            await page.waitForTimeout(3000);
        }
        investmentName = await page.locator("//div[@class='text-primary text-xl font-semibold MuiBox-root css-0']").innerText();
        currentPhaseName = await page.locator("(//div[@class='bg-pink-400 text-white font-semibold rounded-full MuiBox-root css-0']/div)[2]").innerText();
        await page.locator("//button[contains(text(),'Confirm')]").click();
    });
    (0, cucumber_1.Then)("Investment sent for Approval message should appear", async function () {
        await page.waitForTimeout(2000);
        (0, chai_1.expect)(await page.locator("text=Investment phase sent for approval").isVisible()).to.be.true;
    });
    (0, cucumber_1.Then)("user should recieve submitted email", async function () {
        await page.goto('https://outlook.office.com/mail/');
        await page.waitForTimeout(10000);
        await page.locator(`//div[@class='IjzWp XG5Jd gy2aJ Ejrkd']/span[contains(text(),'${investmentName} - ${currentPhaseName} submitted for approval')]`).click({ force: true });
        await page.waitForTimeout(5000);
        (0, chai_1.expect)(await page.locator("//span[@class='full UAxMv']").innerText()).to.eql(`${investmentName} - ${currentPhaseName} submitted for approval`);
    });
    (0, cucumber_1.Then)("I should see filter icon in the right corner of columns", async function () {
        await page.locator("//button[@aria-label='Apply Filter']").screenshot({ path: 'Screenshots\\FilterActual.png' });
        (0, commonFunctions_1.compareScreenshots)("Screenshots\\FilterActual.png", "Screenshots\\FilterExpected.png");
    });
    (0, cucumber_1.Then)("I should see step name Details should be enabaled and next stpes disabled", async function () {
        (0, chai_1.expect)(await page.locator("//span[@class='MuiStepLabel-iconContainer Mui-active css-a5nipc']").count()).to.eql(1);
        (0, chai_1.expect)(await page.locator("//span[@class='font-semibold text-primary']").innerText()).to.eql('Details');
        (0, chai_1.expect)(await page.locator("//span[@class='MuiStepLabel-iconContainer Mui-disabled css-a5nipc']").count()).to.eql(3);
    });
    (0, cucumber_1.Then)("I should see step name Edit Roadmap should be enabled and Details should be completed and next stpes disabled", async function () {
        (0, chai_1.expect)(await page.locator("//span[@class='MuiStepLabel-iconContainer Mui-active Mui-disabled css-a5nipc']").count()).to.eql(1);
        (0, chai_1.expect)(await page.locator("//span[@class='MuiStepLabel-iconContainer Mui-active Mui-completed css-a5nipc']").count()).to.eql(1);
        (0, chai_1.expect)(await page.locator("//span[@class='font-semibold text-primary']").innerText()).to.eql('Edit Roadmap');
        (0, chai_1.expect)(await page.locator("//span[@class='MuiStepLabel-iconContainer Mui-disabled css-a5nipc']").count()).to.eql(2);
    });
    (0, cucumber_1.Then)("I should see step name Edit Objective & Deliverable should be enabled and Edit Roadmap should be completed and next stpes disabled", async function () {
        (0, chai_1.expect)(await page.locator("//span[@class='MuiStepLabel-iconContainer Mui-active Mui-disabled css-a5nipc']").count()).to.eql(1);
        (0, chai_1.expect)(await page.locator("//span[@class='MuiStepLabel-iconContainer Mui-active Mui-completed css-a5nipc']").count()).to.eql(1);
        (0, chai_1.expect)(await page.locator("//span[@class='MuiStepLabel-iconContainer Mui-completed Mui-disabled css-a5nipc']").count()).to.eql(1);
        (0, chai_1.expect)(await page.locator("//span[@class='font-semibold text-primary']").innerText()).to.eql('Edit Objective & Deliverable');
        (0, chai_1.expect)(await page.locator("//span[@class='MuiStepLabel-iconContainer Mui-disabled css-a5nipc']").count()).to.eql(1);
    });
    (0, cucumber_1.Then)("I should see step name Review should be enabled and Edit Objective & Deliverable should be completed", async function () {
        (0, chai_1.expect)(await page.locator("//span[@class='MuiStepLabel-iconContainer Mui-active Mui-disabled css-a5nipc']").count()).to.eql(1);
        (0, chai_1.expect)(await page.locator("//span[@class='MuiStepLabel-iconContainer Mui-active Mui-completed css-a5nipc']").count()).to.eql(1);
        (0, chai_1.expect)(await page.locator("//span[@class='MuiStepLabel-iconContainer Mui-completed Mui-disabled css-a5nipc']").count()).to.eql(2);
        (0, chai_1.expect)(await page.locator("//span[@class='font-semibold text-primary']").innerText()).to.eql('Review');
        (0, chai_1.expect)(await page.locator("//span[@class='MuiStepLabel-iconContainer Mui-disabled css-a5nipc']").count()).to.eql(0);
    });
    (0, cucumber_1.Then)("I should see Help icon at the top right corner", async function () {
        await page.locator("//*[@data-testid='HelpCenterRoundedIcon']").screenshot({ path: 'Screenshots\\InfoIconActual.png' });
        (0, commonFunctions_1.compareScreenshots)("Screenshots\\InfoIconActual.png", "Screenshots\\InfoIconExpected.png");
    });
    (0, cucumber_1.When)("I hover mouse on Help icon", async function () {
        await page.hover("//*[@data-testid='HelpCenterRoundedIcon']");
    });
    (0, cucumber_1.Then)("I should see text Info", async function () {
        await page.hover("//*[@data-testid='HelpCenterRoundedIcon']");
        (0, chai_1.expect)(await page.locator("//div[@role='tooltip']").innerText()).to.eql("Info");
    });
    (0, cucumber_1.When)("I click on Help icon", async function () {
        const pagePromise = this.context.waitForEvent('page');
        await page.click("//*[@data-testid='HelpCenterRoundedIcon']");
        newPage = await pagePromise;
        await newPage.waitForLoadState();
    });
    (0, cucumber_1.When)("It should navigate to new tab and open sharepoint site", async function () {
        (0, chai_1.expect)(await newPage.url()).to.eql('https://woodsideenergy.sharepoint.com/sites/IMF');
    });
    (0, cucumber_1.When)("I click on Investment Leads fields", async function () {
    });
    (0, cucumber_1.Then)("It should show TBA in dropdown", async function () {
        let cnt = await page.locator(`(//input[@placeholder='Find user using WOPID, Name or Email'])`).count();
        for (let i = 1; i <= cnt; i++) {
            await page.locator(`(//input[@placeholder='Find user using WOPID, Name or Email'])[${i}]`).click();
            await page.waitForTimeout(3000);
            await page.keyboard.press('ArrowDown');
            await page.keyboard.press('Enter');
            (0, chai_1.expect)(await page.locator(`(//input[@placeholder='Find user using WOPID, Name or Email'])[${i}]`).getAttribute('value')).to.eql('TBA');
        }
    });
    (0, cucumber_1.Then)("I verify IMF Admin To adress", async function () {
        (0, chai_1.expect)(await page.locator(`//a[contains(text(),'IMF Admin')]`).getAttribute('href')).to.eql('mailto:ProjectsGovernance@woodside.com.au');
    });
    (0, cucumber_1.When)("I Fill All the fields in create new investment page with Investment leads as TBA", async function () {
        investmentName = Math.random().toString(20).substr(2, 6);
        investmentName = "New investment" + investmentName;
        await page.locator("//input[@name='investmentname']").fill(investmentName);
        await page.locator("#mui-component-select-investmenttype").click();
        investmenttype = "Greenfields";
        await page.locator("text=Greenfield").click();
        await page.locator("#mui-component-select-locationname").click();
        await page.locator("//ul[@class='MuiList-root MuiList-padding MuiMenu-list css-r8u8y9']/li[2]/div").click();
        await page.locator("#mui-component-select-asset").click();
        await page.locator("//ul[@class='MuiList-root MuiList-padding MuiMenu-list css-r8u8y9']/li[2]/div").click();
        await page.locator("(//div[@class='MuiFormControl-root MuiTextField-root w-full css-1qrsed1']//parent::div)[1]").click();
        await page.locator("text=2023").click();
        await page.locator("//textarea[@name='investmentdescription']").fill(investmentName);
        let cnt = await page.locator(`(//input[@placeholder='Find user using WOPID, Name or Email'])`).count();
        for (let i = 1; i <= cnt; i++) {
            await page.locator(`(//input[@placeholder='Find user using WOPID, Name or Email'])[${i}]`).click();
            await page.waitForTimeout(5000);
            await page.keyboard.press('ArrowDown');
            await page.keyboard.press('Enter');
        }
    });
    (0, cucumber_1.Then)("Send warning popup should open", async function () {
        (0, chai_1.expect)(await page.locator(`//h2[@class='MuiTypography-root MuiTypography-h6 MuiDialogTitle-root capitalize css-ohyacs']`).innerText()).to.eql('Send Warning');
        (0, chai_1.expect)(await page.locator("//div[@class='flex flex-col gap-2 MuiBox-root css-0']/div[1]").innerText()).to.eql('You are about to send for Approval with "TBA" for Investment Lead(s).');
        (0, chai_1.expect)(await page.locator("//div[@class='flex flex-col gap-2 MuiBox-root css-0']/div[2]").innerText()).to.eql('Do you wish to continue?');
        (0, chai_1.expect)(await page.locator("//button[contains(text(),'Yes')]").isVisible()).to.true;
        (0, chai_1.expect)(await page.locator("//button[contains(text(),'No')]").isVisible()).to.true;
    });
    (0, cucumber_1.When)("I click on Yes button", async function () {
        await page.locator("//button[contains(text(),'Yes')]").click();
    });
    (0, cucumber_1.When)("I click on No button", async function () {
        await page.locator("//button[contains(text(),'No')]").click();
    });
    (0, cucumber_1.Then)("Send For Approval popup should not open and user should remain on review page", async function () {
        (0, chai_1.expect)(await page.locator("xpath=//div[@role='dialog']").count()).to.be.eql(0);
        (0, chai_1.expect)(await page.locator("//h2[@class='MuiTypography-root MuiTypography-h6 MuiDialogTitle-root capitalize css-ohyacs']").count()).to.eql(0);
        (0, chai_1.expect)(await page.locator("//div[@name='approver']/div/label").isVisible()).to.true;
    });
    (0, cucumber_1.When)("I search and select the user for Investment Review lead", async function () {
        await page.locator("//div[contains(text(), 'Investment Review Lead')]//parent::div//following-sibling::div").click();
        await page.locator("//div[contains(text(), 'Investment Review Lead')]//parent::div//following-sibling::div").type(record.InvestmentReviewLeadWopid);
        await page.waitForTimeout(5000);
        await page.locator(`text=${record.InvestmentReviewLeadName}`).click();
    });
    (0, cucumber_1.When)("I seacrh the user for Investment Manager same as Investment Review lead", async function () {
        await page.locator("//div[contains(text(), 'Investment Manager')]//parent::div//following-sibling::div").click();
        await page.locator("//div[contains(text(), 'Investment Manager')]//parent::div//following-sibling::div").type(record.InvestmentReviewLeadWopid);
        await page.waitForTimeout(5000);
    });
    (0, cucumber_1.Then)("It should not allow to select the user, user should be disabled", async function () {
        (0, chai_1.expect)(await page.locator(`text=${record.InvestmentReviewLeadName}`).isEditable()).to.false;
    });
    (0, cucumber_1.Then)("I seacrh and select other user for Investment Manager", async function () {
        await page.locator("//div[contains(text(), 'Investment Manager')]//parent::div//following-sibling::div").click();
        await page.locator("//div[contains(text(), 'Investment Manager')]//parent::div//following-sibling::div/div/div/div/input").fill("");
        await page.waitForTimeout(3000);
        await page.locator("//div[contains(text(), 'Investment Manager')]//parent::div//following-sibling::div").type(record.InvestmentManagerWopid);
        await page.waitForTimeout(5000);
        await page.locator(`text=${record.InvestmentManagerName}`).click();
    });
    (0, cucumber_1.When)("I seacrh the user for other Leads, same as Investment Manager", async function () {
        let cnt = await page.locator("//input[@placeholder='Find user using WOPID, Name or Email']").count();
        if (cnt > 2) {
            for (let i = 1; i <= cnt; i++) {
                let leads = await page.locator(`(//div[@class='w-1/4 MuiBox-root css-0'])[${i}]`).innerText();
                if (leads === "Investment Manager" || leads === "Investment Review Lead") { }
                else {
                    await page.locator(`//div[contains(text(), '${leads}')]//parent::div//following-sibling::div/div/div/div/input`).click();
                    await page.locator(`//div[contains(text(), '${leads}')]//parent::div//following-sibling::div/div/div/div/input`).fill("");
                    await page.waitForTimeout(3000);
                    await page.locator(`//div[contains(text(), '${leads}')]//parent::div//following-sibling::div/div/div/div/input`).type(record.InvestmentManagerWopid);
                    await page.waitForTimeout(5000);
                    await page.locator(`text=${record.InvestmentManagerName}`).click();
                }
            }
        }
    });
    (0, cucumber_1.When)("I add team member same as Investent Leads other than Investment Review lead", async function () {
        await page.locator("//*[@data-testid='AddCircleRoundedIcon']").click();
        await page.locator("//input[@name='role']").fill("Tester");
        await page.locator("//div[@name='user']").click();
        await page.locator(`(//input[@placeholder='Find user using WOPID, Name or Email'])`).last().type(record.InvestmentManagerWopid);
        await page.waitForTimeout(4000);
        await page.locator(`text=${record.InvestmentManagerName}`).click();
        await page.waitForTimeout(2000);
        await page.locator("(//div[@class='MuiDialogActions-root MuiDialogActions-spacing css-14b29qc']//button)[1]").click();
    });
    (0, cucumber_1.Then)("It should allow to add the same user", async function () {
        (0, chai_1.expect)(await page.locator("(//*[@data-testid='EditRoundedIcon']//..//parent::div//..//input)[1]").getAttribute('value')).to.includes(record.InvestmentManagerName);
    });
    (0, cucumber_1.Then)("It should allow to add team member again same as other team member", async function () {
        await page.locator("//*[@data-testid='AddCircleRoundedIcon']").click();
        await page.locator("//input[@name='role']").fill("Tester");
        await page.locator("//div[@name='user']").click();
        await page.locator(`(//input[@placeholder='Find user using WOPID, Name or Email'])`).last().type(record.InvestmentManagerWopid);
        await page.waitForTimeout(4000);
        await page.locator(`text=${record.InvestmentManagerName}`).click();
        await page.waitForTimeout(2000);
        await page.locator("(//div[@class='MuiDialogActions-root MuiDialogActions-spacing css-14b29qc']//button)[1]").click();
        (0, chai_1.expect)(await page.locator("(//*[@data-testid='EditRoundedIcon']//..//parent::div//..//input)[2]").getAttribute('value')).to.includes(record.InvestmentManagerName);
    });
    (0, cucumber_1.Then)("Only Phases of selected Roadmap should appear and each phase should have eye icon on the phase name", async function () {
        (0, chai_1.expect)(await page.locator("(//div[@class='flex items-end text-white font-semibold MuiBox-root css-0'])[1]").isVisible()).to.be.true;
        (0, chai_1.expect)(await page.locator("(//div[@class='text-sm MuiBox-root css-0'])[1]").isVisible()).to.be.false;
        let cnt = await page.locator(`(//button[@aria-label='Show Objectives'])`).count();
        let phases = await page.locator("(//div[@class='flex items-end text-white font-semibold MuiBox-root css-0'])").count();
        if (cnt == phases) { }
        else {
            await page.locator("all phases not showing eye icons");
        }
    });
    (0, cucumber_1.When)("I click on eye icon of first phase", async function () {
        await page.locator("(//button[@aria-label='Show Objectives'])[1]").click();
    });
    (0, cucumber_1.Then)("It should show the Objectives below that phase", async function () {
        (0, chai_1.expect)(await page.locator("(//div[@class='w-full text-sm MuiBox-root css-0'])[1]").isVisible()).to.be.true;
    });
    (0, cucumber_1.When)("I click on eye icon of second phase", async function () {
        await page.locator("(//button[@aria-label='Show Objectives'])[1]").click();
        await page.waitForTimeout(3000);
    });
    (0, cucumber_1.Then)("It should show the Objectives below second phase", async function () {
        let numOFObjinFirstPhase = await page.locator("xpath=//div[@class='text-pink-400 MuiBox-root css-0']//div").nth(0).innerText();
        numOFObjinFirstPhase = parseInt(numOFObjinFirstPhase, 10);
        (0, chai_1.expect)(await page.locator(`(//div[@class='w-full text-sm MuiBox-root css-0'])[${numOFObjinFirstPhase + 1}]`).isVisible()).to.be.true;
    });
    (0, cucumber_1.When)("I again click on eye icon of first phase", async function () {
        await page.locator("(//button[@aria-label='Hide Objectives'])[1]").click();
    });
    (0, cucumber_1.Then)("It should hide the objectives", async function () {
        (0, chai_1.expect)(await page.locator("(//div[@class='text-sm MuiBox-root css-0'])[1]").isVisible()).to.be.false;
    });
    (0, cucumber_1.Then)("Review Roadmap page should open", async function () {
        (0, chai_1.expect)(await page.locator("//button[contains(text(),'Justification')]").isVisible()).to.be.true;
    });
    (0, cucumber_1.Then)("It should show only Phases of the Roadmap and each phase should have eye icon on the phase name", async function () {
        (0, chai_1.expect)(await page.locator("(//div[@class='flex items-end text-white font-semibold MuiBox-root css-0'])[1]").isVisible()).to.be.true;
        (0, chai_1.expect)(await page.locator("(//div[@class='text-sm MuiBox-root css-0'])[1]").isVisible()).to.be.false;
        let cnt = await page.locator(`(//button[@aria-label='Show Objectives'])`).count();
        let phases = await page.locator("(//div[@class='flex items-end text-white font-semibold MuiBox-root css-0'])").count();
        if (cnt == phases) { }
        else {
            await page.locator("all phases not showing eye icons");
        }
    });
    (0, cucumber_1.When)("I should see Optonal text at Investment Documents section heading", async function () {
        (0, chai_1.expect)(await page.locator(`(//div[@class='font-semibold MuiBox-root css-0'])[1]`).innerText()).to.eql("Investment Documents (Optional)");
    });
    (0, cucumber_1.When)("I fill only Approver field not Investment Document section fields and click on Send button", async function () {
        await page.locator(`(//input[@placeholder='Find user using WOPID, Name or Email'])[1]`).type('Usha Patel');
        await page.waitForTimeout(4000);
        await page.keyboard.press('ArrowDown');
        await page.keyboard.press('Enter');
        await page.locator("//button[contains(text(),'send')]").click();
    });
    (0, cucumber_1.When)("I should not see Optonal text at Investment Documents section heading", async function () {
        (0, chai_1.expect)(await page.locator(`(//div[@class='font-semibold MuiBox-root css-0'])[1]`).innerText()).to.not.eql("Investment Documents (Optional)");
        (0, chai_1.expect)(await page.locator(`(//div[@class='font-semibold MuiBox-root css-0'])[1]`).innerText()).to.eql("Investment Documents");
    });
    (0, cucumber_1.When)("I delete Asses phase if its a first phase in Roadmap", async function () {
        let firstphase = await page.locator(`(//div[@class='flex items-end text-white font-semibold MuiBox-root css-0'])[1]`).innerText();
        if (firstphase == "Assess") {
            await page.hover(`(//div[@class='flex items-end text-white font-semibold MuiBox-root css-0'])[1]`);
            await page.locator("(//button[@aria-label='Delete Phase'])[1]").click();
        }
        await page.locator("//textarea[@name='justification']").type(deletePhaseJustification);
        await page.locator("xpath=//button[contains(text(), 'Confirm')]").click();
        await page.waitForTimeout(3000);
    });
    (0, cucumber_1.When)("It should show Enter Investment Documnet Links errorr message at Investment Document section", async function () {
        (0, chai_1.expect)(await page.locator(`//p[@class='MuiFormHelperText-root Mui-error css-j7o63n']`).innerText()).to.eql("Please Enter Document Link(s)");
    });
    (0, cucumber_1.When)("I fill all fields of Investment Documents section and click on send button", async function () {
        let cnt = await page.locator("//input[@placeholder='Document Link']").count();
        for (let i = 1; i <= cnt; i++) {
            await page.locator(`(//input[@placeholder='Document Link'])[${i}]`).fill("https://dmslink.app.woodside/?dmsn=IMF1-429365771-219");
        }
        await page.locator("//button[contains(text(),'send')]").click();
    });
    (0, cucumber_1.When)("I hover the mouse on Details", async function () {
        page = this.page;
        await page.hover("//span[@aria-label='Edit your investment details.']");
    });
    (0, cucumber_1.Then)("Tooltip for Details should appear", async function () {
        (0, chai_1.expect)(await page.locator("//div[@role='tooltip']//div").innerText()).to.eql('Edit your investment details.');
    });
    (0, cucumber_1.When)("I hover the mouse on Location", async function () {
        await page.locator("//div[@id='mui-component-select-locationname']").hover();
    });
    (0, cucumber_1.Then)("Tooltip for location field should appear", async function () {
        (0, chai_1.expect)(await page.locator("//div[@role='tooltip']//div").innerText()).to.eql("Select investment location. Please select 'Others' if location is confidential, unknown or does not exist yet. Please contact the Project Governance Team to get new locations added to the list.");
    });
    (0, cucumber_1.When)("I hover the mouse on Asset", async function () {
        await page.hover("//div[@id='mui-component-select-asset']");
    });
    (0, cucumber_1.Then)("Tooltip for Asset field should appear", async function () {
        (0, chai_1.expect)(await page.locator("//div[@role='tooltip']//div").innerText()).to.eql("Select the most relevant asset. For investment that spans multiple assets, please pick the asset with the highest risk. Please select 'Others' if asset is confidential, unknown or does not exist yet. Please contact the Project Governance Team to get new asset added to the list.");
    });
    (0, cucumber_1.When)("I hover the mouse on Phase Start Year", async function () {
        await page.hover("//div[@aria-label='Input the start year of the investment (i.e., date of initiation).']");
    });
    (0, cucumber_1.Then)("Tooltip for Phase Start Year field should appear", async function () {
        (0, chai_1.expect)(await page.locator("//div[@role='tooltip']//div").innerText()).to.eql("Input the start year of the investment (i.e., date of initiation).");
    });
    (0, cucumber_1.When)("I hover the mouse on Team member", async function () {
        await page.hover("//div[contains(text(),'Team Members')]");
    });
    (0, cucumber_1.Then)("Tooltip for Team member field should appear", async function () {
        (0, chai_1.expect)(await page.locator("//div[@role='tooltip']//div").innerText()).to.eql("Team Leads for the Investment. Note: Team Leads added here will have read and edit access to this investment roadmap.");
    });
    (0, cucumber_1.When)("I hover the mouse on Edit Roadmap", async function () {
        await page.hover("//span[contains(text(),'Edit Roadmap')]");
    });
    (0, cucumber_1.Then)("Tooltip for Edit Roadmap should appear", async function () {
        (0, chai_1.expect)(await page.locator("//div[@role='tooltip']//div").innerText()).to.eql("Edit your investment roadmap by adding / deleting / merging the phases. For guidance, please refer to the Investment Management Framework SharePoint or contact the Project Governance Team.");
    });
    (0, cucumber_1.When)("I hover the mouse on Edit Objective and Deliverable", async function () {
        await page.hover("//span[contains(text(),'Edit Objective & Deliverable')]");
    });
    (0, cucumber_1.Then)("Tooltip for Edit Objective and Deliverable should appear", async function () {
        (0, chai_1.expect)(await page.locator("//div[@role='tooltip']//div").innerText()).to.eql("Select / de-select your investment objective(s) and deliverable(s) by toggling them on / off using the toggle slider. Justifications are required for mandatory objective(s).");
    });
    (0, cucumber_1.When)("I hover the mouse on Review", async function () {
        await page.hover("//span[contains(text(),'Review')]");
    });
    (0, cucumber_1.Then)("Tooltip for Review should appear", async function () {
        (0, chai_1.expect)(await page.locator("//div[@role='tooltip']//div").innerText()).to.eql("Add Documents link and approver for this phase and Review your investment before sending for approval.");
    });
    (0, cucumber_1.When)("I hover the mouse on Approver", async function () {
        await page.hover("//div[contains(text(),'Approver')]");
    });
    (0, cucumber_1.Then)("Tooltip for Approver field should appear", async function () {
        (0, chai_1.expect)(await page.locator("//div[@role='tooltip']//div").innerText()).to.eql("The approver of your roadmap will generally be one up within your direct reporting line, subject to agreed RACI in Frame workshop. For more information please see IMF SharePoint. Contact Project Governance Team for further guidance.");
    });
    (0, cucumber_1.When)("I click on Investment with status LIVE", async function () {
        page = this.page;
        await page.waitForTimeout(5000);
        do {
            await page.locator("//div[@class='flex justify-center mt-2 MuiBox-root css-0']/button").click();
        } while (await page.locator("xpath=//div[@role='alert']").isVisible() == false);
        await page.click("(//div[@class='uppercase MuiBox-root css-0' and contains(text(),'LIVE')])[1]");
    });
    (0, cucumber_1.Then)("I should see All details of Investment, Back and History buttons", async function () {
        (0, chai_1.expect)(await page.locator("//button[contains(text(), 'back')]").isEditable()).to.be.true;
        (0, chai_1.expect)(await page.locator("//button[contains(text(), 'History')]").isVisible()).to.be.true;
        (0, chai_1.expect)(await page.locator("//button[contains(text(), 'Details')]").isEditable()).to.be.true;
        (0, chai_1.expect)(await page.locator("//button[contains(text(), 'Roadmap')]").isEditable()).to.be.true;
        (0, chai_1.expect)(await page.locator("//button[contains(text(), 'Objective & Deliverable')]").isEditable()).to.be.true;
    });
    (0, cucumber_1.When)("I close the Review-Details page and click on Objective and deliverable button present in review section", async function () {
        await page.locator("//*[@data-testid='CancelRoundedIcon']").click();
        await page.waitForTimeout(3000);
        await page.locator("//button[contains(text(),'Objective & Deliverable')]").click();
    });
    (0, cucumber_1.Then)("I should see details updated as edited in Edit Objective and deliverable page", async function () {
        let cnt = await page.locator("(//div[@class='w-3/5 border-l MuiBox-root css-0'])[1]/div").count();
        let flag = 0;
        for (let i = 1; i <= cnt; i++) {
            let addedDeliverable = await page.locator(`(//div[@class='w-3/5 border-l MuiBox-root css-0']/div/div/div[1])[${i}]`).innerText();
            if (addedDeliverable == "add deliverable for hold status") {
                flag = 1;
            }
        }
        if (flag != 1) {
            await page.locator("Added Deliverable not updated for LIVE state investment").click();
        }
        await page.waitForTimeout(3000);
        await page.locator("//*[@data-testid='CancelRoundedIcon']").click();
    });
    (0, cucumber_1.Then)("I should see All details of Investment, and History button", async function () {
        (0, chai_1.expect)(await page.locator("//button[contains(text(), 'History')]").isVisible()).to.be.true;
        (0, chai_1.expect)(await page.locator("//button[contains(text(), 'Details')]").isEditable()).to.be.true;
        (0, chai_1.expect)(await page.locator("//button[contains(text(), 'Roadmap')]").isEditable()).to.be.true;
        (0, chai_1.expect)(await page.locator("//button[contains(text(), 'Objective & Deliverable')]").isEditable()).to.be.true;
    });
    (0, cucumber_1.When)("I click on Investment with status APPROVAL PENDING", async function () {
        page = this.page;
        await page.waitForTimeout(5000);
        do {
            await page.locator("//div[@class='flex justify-center mt-2 MuiBox-root css-0']/button").click();
        } while (await page.locator("xpath=//div[@role='alert']").isVisible() == false);
        await page.click("(//div[@class='uppercase MuiBox-root css-0' and contains(text(),'APPROVAL PENDING')])[1]");
    });
    (0, cucumber_1.When)("I click on Change Approver button", async function () {
        await page.locator("//button[contains(text(),'Change Approver')]").click();
    });
    (0, cucumber_1.Then)("Change Approver popup should open", async function () {
        (0, chai_1.expect)(await page.locator("//h2[@class='MuiTypography-root MuiTypography-h6 MuiDialogTitle-root capitalize css-ohyacs']").innerText()).to.eql("Change Approver");
        (0, chai_1.expect)(await page.locator("//button[contains(text(),'Save')]").isVisible()).to.be.true;
        (0, chai_1.expect)(await page.locator("//button[contains(text(),'Cancel')]").isVisible()).to.be.true;
    });
    (0, cucumber_1.When)("I change the Approver and click on save button", async function () {
        await page.locator("(//label[contains(text(),'Approver')]//parent::div//div//input)[2]").fill("");
        await page.locator("(//label[contains(text(),'Approver')]//parent::div//div//input)[2]").type("Deepayan ku");
        await page.locator("text=Deepayan Kundu").click();
        await page.locator("//button[contains(text(),'Save')]").click();
    });
    (0, cucumber_1.Then)("Approver update successful toaster message should appear and Approver name should get updated", async function () {
        (0, chai_1.expect)(await page.locator("xpath=//div[@role='alert']").last().innerText()).to.be.eql('Approver update successful');
        (0, chai_1.expect)(await page.locator("//label[contains(text(),'Approver')]//parent::div//div//input").getAttribute('value')).to.eql("Deepayan Kundu");
    });
    (0, cucumber_1.When)("I change the Approver and click on Cancel button", async function () {
        await page.locator("(//label[contains(text(),'Approver')]//parent::div//div//input)[2]").fill("");
        await page.locator("(//label[contains(text(),'Approver')]//parent::div//div//input)[2]").type("Deepayan ku");
        await page.locator("text=Deepayan Kundu").click();
        await page.locator("//button[contains(text(),'Cancel')]").click();
    });
    (0, cucumber_1.Then)("No toaster message should appear and Approver name should not get updated", async function () {
        (0, chai_1.expect)(await page.locator("xpath=//div[@role='alert']").count()).to.be.eql(0);
        (0, chai_1.expect)(await page.locator("//label[contains(text(),'Approver')]//parent::div//div//input").getAttribute('value')).to.not.eql("Deepayan Kundu");
    });
    (0, cucumber_1.When)("I click on newly created investment", async function () {
        await page.locator(`//div[@class='flex items-center py-4 MuiBox-root css-0' and contains(text(),'${investmentName}')]`).click();
    });
    (0, cucumber_1.When)("I click on Change Team Member button", async function () {
        await page.locator("//button[contains(text(),'Change Team Member')]").click();
    });
    (0, cucumber_1.Then)("Change Team Member popup should open", async function () {
        (0, chai_1.expect)(await page.locator("//h2[@class='MuiTypography-root MuiTypography-h6 MuiDialogTitle-root capitalize css-ohyacs']/div").innerText()).to.eql("Change Team Member");
        (0, chai_1.expect)(await page.locator("//button[contains(text(),'Save')]").isVisible()).to.be.true;
        (0, chai_1.expect)(await page.locator("//button[contains(text(),'Cancel')]").isVisible()).to.be.true;
    });
    (0, cucumber_1.When)("I Add the new team member and click on save button", async function () {
        await page.locator("//button[@aria-label='Add Team Members']").click();
        await page.locator("//input[@name='role']").fill("Tester");
        await page.locator("//input[@placeholder='Find user using WOPID, Name or Email']").type("Archana Mena");
        await page.locator("text=Archana Menasangi (TATA CONSULTANCY SERVICES LTD)").first().click();
        await page.locator("//button[contains(text(),'Add')]").click();
        await page.waitForTimeout(3000);
        await page.locator("//button[contains(text(),'Save')]").click();
    });
    (0, cucumber_1.Then)("Team Member update successful toaster message should appear and Team Member name should get added", async function () {
        (0, chai_1.expect)(await page.locator("xpath=//div[@role='alert']").last().innerText()).to.be.eql('Team member update successful');
        await page.waitForTimeout(3000);
        await page.locator("//button[contains(text(),'Details')]").click();
        (0, chai_1.expect)(await page.locator("//input[@value='Archana Menasangi (TATA CONSULTANCY SERVICES LTD)']").count()).to.eql(2);
    });
    (0, cucumber_1.When)("I Add the new team member and click on Cancel button", async function () {
        await page.locator("//button[@aria-label='Add Team Members']").click();
        await page.locator("//input[@name='role']").fill("Tester");
        await page.locator("//input[@placeholder='Find user using WOPID, Name or Email']").type("Archana Mena");
        await page.locator("text=Archana Menasangi (TATA CONSULTANCY SERVICES LTD)").first().click();
        await page.locator("//button[contains(text(),'Add')]").click();
        await page.waitForTimeout(3000);
        await page.locator("//button[contains(text(),'Cancel')]").click();
    });
    (0, cucumber_1.Then)("No toaster message should appear and Team Member name should not get added", async function () {
        (0, chai_1.expect)(await page.locator("xpath=//div[@role='alert']").count()).to.be.eql(0);
        await page.waitForTimeout(3000);
        await page.locator("//button[contains(text(),'Details')]").click();
        (0, chai_1.expect)(await page.locator("//input[@value='Archana Menasangi (TATA CONSULTANCY SERVICES LTD)']").count()).to.eql(1);
    });
    (0, cucumber_1.Then)("I should see the updated tooltip for respective fields when i hover the mouse on those fields", async function () {
        await page.locator("//button[@aria-label='Home']").click();
        await page.locator(`//div[@class='flex items-center py-4 MuiBox-root css-0' and contains(text(),'${investmentName}')]`).click();
        await page.locator(`(//div[@class='w-1/4 MuiBox-root css-0'])[1]`).hover();
        (0, chai_1.expect)(await page.locator(`(//div[@role='tooltip']//div)`).innerText()).to.eql('Tooltip text');
    });
    (0, cucumber_1.When)("I click on the last LIVE phase Investment", async function () {
        page = this.page;
        await page.locator(`//div[contains(text(),'${record.UserInvstNameMAD}')]//following-sibling::div[4]/div[contains(text(),'${record.UserPhaseNameMAD}')]`).click();
    });
    (0, cucumber_1.Then)("I should see the mark as done popup", async function () {
        (0, chai_1.expect)(await page.locator("xpath=//h2[@class='MuiTypography-root MuiTypography-h6 MuiDialogTitle-root capitalize css-ohyacs']").innerText()).to.eql('Mark As Done');
        (0, chai_1.expect)(await page.locator("(//*[@data-testid='CheckCircleRoundedIcon'])[2]//parent::div").innerText()).to.eql(` Are you sure you want to mark as DONE "${record.UserPhaseNameMAD}" phase of investment "${record.UserInvstNameMAD}" ?`);
        (0, chai_1.expect)(await page.locator("//button[contains(text(),'Confirm')]").isVisible()).to.be.true;
        (0, chai_1.expect)(await page.locator("//button[contains(text(),'Cancel')]").isVisible()).to.be.true;
    });
    (0, cucumber_1.Then)("last phase of the investment status should be DONE", async function () {
        do {
            await page.locator("//div[@class='flex justify-center mt-2 MuiBox-root css-0']/button").click();
        } while (await page.locator("xpath=//div[@role='alert']").isVisible() == false);
        (0, chai_1.expect)(await page.locator(`//div[contains(text(),'${record.UserInvstNameMAD}')]//following-sibling::div[4]/div[contains(text(),'${record.UserPhaseNameMAD}')]//parent::div//preceding-sibling::div[5]/div`).innerText()).to.eql('DONE');
    });
}
