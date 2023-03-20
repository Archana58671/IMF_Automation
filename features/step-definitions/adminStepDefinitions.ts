import { Given, When, Then, BeforeAll, setDefaultTimeout, World, AfterStep, Status, After, Before, BeforeStep } from "@cucumber/cucumber";
import { expect } from "chai";
import * as fs from "fs";
import { parse } from 'csv-parse/sync';
import * as path from 'path';
import * as chai from "chai";
import { chaiImage } from "chai-image"
import {compareScreenshots} from './commonFunctions'
chai.use(chaiImage)


let objectEditTitle: string;
let deleteCancel:string, addDeliverable:any, editDeliverable:any, cancelrecordname:any
let deleteDeliverable:string;
let nxtPhase:string;
let totalPhases:string[]=[];
let totalNoOfPhases: number;
let currentPhase:string;
let deliverableDeleteCancel:number, documentsCount:any, labelsCount:any, documentTooltip:string[]=[], formLabelTooltip:string[]=[];
let deleterecord:string;
let labelType:string;
var page:any
var search:any
var partialsearch:any
var addedPhaseByAdmin:any, editedPhaseByAdmin:any, recordname:any, recordname1:any, addNewObjectivename:any, editObjectivename:any

const records = parse(fs.readFileSync(path.join('C:\\Users\\W58671\\Onedrive - Woodside Energy Ltd\\Desktop\\IMF Automation', 'input.csv')), {
    columns: true,
    skip_empty_lines: true
  });
  
  
setDefaultTimeout(60*100000);

for (const record of records) {

BeforeStep(async function () {
        page=this.page
});    

// When("I launch IMF application",  async function () {
//     page=this.page
//     await page.goto("https://imf-test.dev.app.woodside/")
//     await page.waitForTimeout(5000)
   
// })
When("I Click on three dots present at the right corner",  async function () {
   
    await page.locator("//button[@aria-label='More']").click();

})
Then("I should see All Investments, My Investments and Action Required tabs on Home page",  async function () {
    page=this.page
    expect((await page.locator("xpath=//button[@class='MuiButtonBase-root MuiTab-root MuiTab-textColorPrimary Mui-selected capitalize text-base text-primary font-semibold px-10 css-1q2h7u5']").innerText()).valueOf()).to.includes('My Investments');
    expect((await page.locator("xpath=(//button[@class='MuiButtonBase-root MuiTab-root MuiTab-textColorPrimary capitalize text-base text-primary font-semibold px-10 css-1q2h7u5'])[2]").innerText()).valueOf()).to.includes('All Investments')
    expect((await page.locator("xpath=(//button[@class='MuiButtonBase-root MuiTab-root MuiTab-textColorPrimary capitalize text-base text-primary font-semibold px-10 css-1q2h7u5'])[1]").innerText()).valueOf()).to.includes('Action Required')

})

Then("I should see Admin, Home and searh icons and three dots at the right corner of the page",  async function () {
    
    await page.locator("//button[@aria-label='Home']").screenshot({ path: 'Screenshots\\homeIconActual.png' });
    await page.locator("//button[@aria-label='Admin']").screenshot({ path: 'Screenshots\\adminIconActual.png' });
    await page.locator("//button[@aria-label='More']").screenshot({ path: 'Screenshots\\threeDotsActual.png' });
    compareScreenshots("Screenshots\\homeIconActual.png", "Screenshots\\homeIconExpected.png")    
    compareScreenshots("Screenshots\\threeDotsActual.png", "Screenshots\\threeDotsExpected.png") 
    compareScreenshots("Screenshots\\adminIconActual.png", "Screenshots\\adminIconExpected.png")    
       
})
Then("Woodside Logo should be present at the left corner of the page",  async function () {
    
    await page.locator("xpath=//img[@class='h-12']").screenshot({ path: 'Screenshots\\woodsideLogoActual.png' });
    compareScreenshots("Screenshots\\woodsideLogoActual.png", "Screenshots\\woodsideLogoExpected.png")    
})
Then("It should show user name and user email id",  async function () {
   
    expect((await page.locator("xpath=//div[@class='font-semibold text-gray-600 MuiBox-root css-0']").innerText()).valueOf()).to.eql(`Hey, ${record.username}`)
    expect((await page.locator("xpath=//div[@class='text-sm text-gray-600 MuiBox-root css-0']").innerText()).valueOf()).to.eql(record.useremailid)
})

When("I click on Admin icon", async function () {
    page=this.page
    await page.locator("//button[@aria-label='Admin']").click()
})
Then("User should navigate to Admin page", async function () {
    expect((await page.locator("xpath=//span[@class='text-primary font-semibold']").innerText()).valueOf()).to.includes('Admin')
})
Then("should see Objectives and Deliverables,Roadmap,Location,Asset,Phase,Investment Type,Label tabs", async function () {
    expect((await page.locator("xpath=(//div[@class='MuiTabs-flexContainer justify-evenly css-k008qs']//button)[2]").innerText()).valueOf()).to.includes('Objective & Deliverable')
    expect((await page.locator("xpath=(//div[@class='MuiTabs-flexContainer justify-evenly css-k008qs']//button)[1]").innerText()).valueOf()).to.includes('Roadmap')
    expect((await page.locator("xpath=(//div[@class='MuiTabs-flexContainer justify-evenly css-k008qs']//button)[3]").innerText()).valueOf()).to.includes('Location')
    expect((await page.locator("xpath=(//div[@class='MuiTabs-flexContainer justify-evenly css-k008qs']//button)[4]").innerText()).valueOf()).to.includes('Asset')
    expect((await page.locator("xpath=(//div[@class='MuiTabs-flexContainer justify-evenly css-k008qs']//button)[5]").innerText()).valueOf()).to.includes('Phase')
    expect((await page.locator("xpath=(//div[@class='MuiTabs-flexContainer justify-evenly css-k008qs']//button)[6]").innerText()).valueOf()).to.includes('Investment Type')
    expect((await page.locator("xpath=(//div[@class='MuiTabs-flexContainer justify-evenly css-k008qs']//button)[7]").innerText()).valueOf()).to.includes('Label')

})
When("I click on Location tab", async function () {
    await page.locator("xpath=(//div[@class='MuiTabs-flexContainer justify-evenly css-k008qs']//button)[3]").click();
})
When("I click on {string} tab", async function (Tabname) {
    await page.locator(`text=${Tabname}`).first().click()
})
Then("I should navigate to {string} tab and see {string} and {string} columns", async function (Tab, Column1, Column2) {
    if(Tab=="Label"){
    expect((await page.locator("xpath=(//th[@class='MuiTableCell-root MuiTableCell-head MuiTableCell-stickyHeader MuiTableCell-sizeMedium font-semibold bg-gray-200 css-8coetn'])[1]").innerText()).valueOf()).to.includes('Type')
    expect((await page.locator("xpath=(//th[@class='MuiTableCell-root MuiTableCell-head MuiTableCell-stickyHeader MuiTableCell-sizeMedium font-semibold bg-gray-200 css-8coetn'])[2]").innerText()).valueOf()).to.includes('Label')
    expect((await page.locator("xpath=(//th[@class='MuiTableCell-root MuiTableCell-head MuiTableCell-stickyHeader MuiTableCell-sizeMedium text-center font-semibold bg-gray-200 css-8coetn'])").innerText()).valueOf()).to.includes('Action')
    }
    else{
    expect(await page.locator("xpath=(//th[@class='MuiTableCell-root MuiTableCell-head MuiTableCell-stickyHeader MuiTableCell-sizeMedium font-semibold bg-gray-200 css-8coetn'])").innerText()).to.eql(Column1)
    expect(await page.locator("xpath=(//th[@class='MuiTableCell-root MuiTableCell-head MuiTableCell-stickyHeader MuiTableCell-sizeMedium text-center font-semibold bg-gray-200 css-8coetn'])").innerText()).to.eql(Column2)
    }
})
Then("I should navigate to Location tab and see Location and Action columns", async function () {
    expect((await page.locator("xpath=(//th[@class='MuiTableCell-root MuiTableCell-head MuiTableCell-stickyHeader MuiTableCell-sizeMedium font-semibold bg-gray-200 css-8coetn'])").innerText()).valueOf()).to.includes('Location')
    expect((await page.locator("xpath=(//th[@class='MuiTableCell-root MuiTableCell-head MuiTableCell-stickyHeader MuiTableCell-sizeMedium text-center font-semibold bg-gray-200 css-8coetn'])").innerText()).valueOf()).to.includes('Action')
})
Then("I should see Search icon and Add button", async function () {
    await page.locator("xpath=//div[@class='flex border-2 rounded-full MuiBox-root css-0']").screenshot({ path: 'Screenshots\\searchIconOfTabsActual.png' })
    compareScreenshots("Screenshots\\searchIconOfTabsActual.png", "Screenshots\\searchIconOfTabsExpected.png")
    await page.locator("xpath=(//div[@class='MuiBox-root css-0'])[3]").screenshot({ path: 'Screenshots\\addIconOfTabsActual.png' })
    compareScreenshots("Screenshots\\addIconOfTabsActual.png", "Screenshots\\addIconOfTabsExpected.png")   
})
Then("Action column should show edit and Delete icon for each row", async function () {
    let sizeofIcons=await page.locator("xpath=//button[@class='MuiButtonBase-root MuiIconButton-root MuiIconButton-sizeMedium css-1yxmbwk']").count()
    let edit=0, dlt=0
    for(edit=0;edit<sizeofIcons;edit++){ 
      await page.locator("xpath=(//button[@class='MuiButtonBase-root MuiIconButton-root MuiIconButton-sizeMedium css-1yxmbwk'])").nth(edit).screenshot({ path: 'Screenshots\\EditIconActual.png'})
      await page.waitForTimeout(200)
      //compareScreenshots("Screenshots\\EditIconActual.png", "Screenshots\\EditIconExpected.png")
      edit=edit+1;
    }
    for(dlt=1;dlt<sizeofIcons;dlt++){  
      await page.locator("xpath=(//button[@class='MuiButtonBase-root MuiIconButton-root MuiIconButton-sizeMedium css-1yxmbwk'])").nth(dlt).screenshot({ path: 'Screenshots\\DeleteIconActual.png'})
      await page.waitForTimeout(200)
      ///compareScreenshots("Screenshots\\DeleteIconActual.png", "Screenshots\\DeleteIconExpected.png")
      dlt=dlt+1;
    }
    
}) 
// When("I click on Asset tab", async function () {
//     await page.locator("xpath=(//div[@class='MuiTabs-flexContainer justify-evenly css-k008qs']//button)[4]").click();
// })
// Then("I should navigate to Asset tab and see Asset and Action columns", async function () {
//     expect((await page.locator("xpath=(//th[@class='MuiTableCell-root MuiTableCell-head MuiTableCell-stickyHeader MuiTableCell-sizeMedium font-semibold bg-gray-200 css-8coetn'])").innerText()).valueOf()).to.includes('Asset')
//     expect((await page.locator("xpath=(//th[@class='MuiTableCell-root MuiTableCell-head MuiTableCell-stickyHeader MuiTableCell-sizeMedium text-center font-semibold bg-gray-200 css-8coetn'])").innerText()).valueOf()).to.includes('Action')
// })
When("I click on Phase tab", async function () {
    await page.locator("xpath=(//div[@class='MuiTabs-flexContainer justify-evenly css-k008qs']//button)[5]").click();
})
// Then("I should navigate to Phase tab and see Phase and Action columns", async function () {
//     expect((await page.locator("xpath=(//th[@class='MuiTableCell-root MuiTableCell-head MuiTableCell-stickyHeader MuiTableCell-sizeMedium font-semibold bg-gray-200 css-8coetn'])").innerText()).valueOf()).to.includes('Phase')
//     expect((await page.locator("xpath=(//th[@class='MuiTableCell-root MuiTableCell-head MuiTableCell-stickyHeader MuiTableCell-sizeMedium text-center font-semibold bg-gray-200 css-8coetn'])").innerText()).valueOf()).to.includes('Action')
// })
// When("I click on Investment Type tab", async function () {
//     await page.locator("xpath=(//div[@class='MuiTabs-flexContainer justify-evenly css-k008qs']//button)[6]").click();
// })
// Then("I should navigate to Investment Type tab and see Investment Type and Action columns", async function () {
//     expect((await page.locator("xpath=(//th[@class='MuiTableCell-root MuiTableCell-head MuiTableCell-stickyHeader MuiTableCell-sizeMedium font-semibold bg-gray-200 css-8coetn'])").innerText()).valueOf()).to.includes('Investment Type')
//     expect((await page.locator("xpath=(//th[@class='MuiTableCell-root MuiTableCell-head MuiTableCell-stickyHeader MuiTableCell-sizeMedium text-center font-semibold bg-gray-200 css-8coetn'])").innerText()).valueOf()).to.includes('Action')
// })
When("I click on Label tab", async function () {
    await page.locator("xpath=(//div[@class='MuiTabs-flexContainer justify-evenly css-k008qs']//button)[7]").click();
})
Then("I should navigate to Label tab and see Type, Label and Action columns", async function () {
    expect((await page.locator("xpath=(//th[@class='MuiTableCell-root MuiTableCell-head MuiTableCell-stickyHeader MuiTableCell-sizeMedium font-semibold bg-gray-200 css-8coetn'])[1]").innerText()).valueOf()).to.includes('Type')
    expect((await page.locator("xpath=(//th[@class='MuiTableCell-root MuiTableCell-head MuiTableCell-stickyHeader MuiTableCell-sizeMedium font-semibold bg-gray-200 css-8coetn'])[2]").innerText()).valueOf()).to.includes('Label')
    expect((await page.locator("xpath=(//th[@class='MuiTableCell-root MuiTableCell-head MuiTableCell-stickyHeader MuiTableCell-sizeMedium text-center font-semibold bg-gray-200 css-8coetn'])").innerText()).valueOf()).to.includes('Action')
})
When("I click on Add button", async function () {
    await page.locator("xpath=(//div[@class='MuiBox-root css-0'])[3]").click();
})
When("I click Add button for adding duplicate record", async function () {
recordname=await page.locator("(//td[@class='MuiTableCell-root MuiTableCell-body MuiTableCell-sizeMedium border-l css-q34dxg'])[1]").innerText()
await page.locator("xpath=(//div[@class='MuiBox-root css-0'])[3]").click();
})
Then("Add {string} popup should open", async function (column1) {
    if(column1=="Label"){  
         expect((await page.locator("xpath=//h2[@class='MuiTypography-root MuiTypography-h6 MuiDialogTitle-root capitalize css-ohyacs']").innerText()).valueOf()).to.includes('Add')
}else{
   expect((await page.locator("xpath=//h2[@class='MuiTypography-root MuiTypography-h6 MuiDialogTitle-root capitalize css-ohyacs']").innerText()).valueOf()).to.includes(`Add ${column1}`)
}
})
When("I Enter the {string} name in {string}  free text field and click on Add button", async function (Tabname, column1) {
await page.waitForTimeout(1000)
recordname= Math.random().toString(20).substr(2, 6)
recordname="NewRecord"+recordname
   await page.locator(`//input[@name='${column1}']`).fill("")
   await page.locator(`//input[@name='${column1}']`).type(recordname)
   await page.locator("//div[@class='MuiDialogActions-root MuiDialogActions-spacing css-14b29qc']//button[1]").click()
})
When("I Enter the {string} name in {string} free text field and click on Save button", async function (Tabname, column1) {
    await page.waitForTimeout(1000)
       await page.locator(`//input[@name='${column1}']`).fill("")
       await page.locator(`//input[@name='${column1}']`).type(recordname)
       await page.locator("//div[@class='MuiDialogActions-root MuiDialogActions-spacing css-14b29qc']//button[1]").click()
    })

When("I Enter {string} name in {string} free text field and click on Add button", async function (Tabname, column1) {
       await page.waitForTimeout(1000)
       await page.locator(`//input[@name='${column1}']`).fill("")
       await page.locator(`//input[@name='${column1}']`).type(recordname)
       await page.locator("//div[@class='MuiDialogActions-root MuiDialogActions-spacing css-14b29qc']//button[1]").click()
    
    })
Then("{string} add successful toaster message should appear and newly added {string} should appear in the list", async function ( Tabname, column1) {
   expect((await page.locator("xpath=//div[@role='alert']").last().innerText()).valueOf()).to.includes(`${Tabname} add successful`)
   let count=await page.locator("//td[@class='MuiTableCell-root MuiTableCell-body MuiTableCell-sizeMedium border-l css-q34dxg']").count()
   let recrd=0;
   for(let i=1;i<=count;i++)
   {
        if(await page.locator(`(//td[@class='MuiTableCell-root MuiTableCell-body MuiTableCell-sizeMedium border-l css-q34dxg'])[${i}]`).innerText()==recordname){
        recrd=1;
        break
   }
   }
   if(recrd!=1){await page.locator("record not added").click()}
})

When("I click Add button for creating duplicate Form Labels", async function () {
    recordname=await page.locator("(//tr[@class='MuiTableRow-root hover:bg-gray-100 css-1gqug66']/td[contains(text(), 'Form Label')]//following-sibling::td[1])[1]").innerText()
    await page.locator("xpath=(//div[@class='MuiBox-root css-0'])[3]").click();
})
When("I select Type Form Label, Enter the Label name in Label free text field and click on Add button", async function () {
    await page.locator("xpath=//div[@id='mui-component-select-type']").click()
    await page.locator("xpath=(//span[@class='MuiTypography-root MuiTypography-body1 MuiListItemText-primary css-yb0lig'])[1]").click()
    await page.locator("xpath=//input[@name='label']").fill("")
    await page.locator("xpath=//input[@name='label']").type(recordname)
    await page.locator("//div[@class='MuiDialogActions-root MuiDialogActions-spacing css-14b29qc']//button[1]").click()
 })
 When("I click Add button for creating duplicate Documents", async function () {
    recordname=await page.locator("(//tr[@class='MuiTableRow-root hover:bg-gray-100 css-1gqug66']/td[contains(text(), 'Document')]//following-sibling::td[1])[1]").innerText()
    await page.locator("xpath=(//div[@class='MuiBox-root css-0'])[3]").click();
})
When("I select Type Document, Enter the Label name in Label free text field and click on Add button", async function () {
    await page.locator("xpath=//div[@id='mui-component-select-type']").click()
    await page.locator("xpath=(//span[@class='MuiTypography-root MuiTypography-body1 MuiListItemText-primary css-yb0lig'])[2]").click()
    await page.locator("xpath=//input[@name='label']").fill("")
    await page.locator("xpath=//input[@name='label']").type(recordname)
    await page.locator("//div[@class='MuiDialogActions-root MuiDialogActions-spacing css-14b29qc']//button[1]").click()

 })
When("I Enter the {string} name in {string}  free text field and click on Cancel button", async function (Tabname, column1) {
    cancelrecordname= Math.random().toString(20).substr(2, 6)
    cancelrecordname="Cancel"+cancelrecordname
    await page.locator(`//input[@name='${column1}']`).type(cancelrecordname)
    await page.locator("//button[contains(text(),'Cancel')]").click()
})
Then("Newly added {string} should not appear in the list and No toster message", async function (column1) {
    expect(await page.locator("xpath=//div[@role='alert']").count()).to.be.eql(0)
    let count=await page.locator("//td[@class='MuiTableCell-root MuiTableCell-body MuiTableCell-sizeMedium border-l css-q34dxg']").count()
   let flag=0;
   for(let i=1;i<=count;i++)
   {
        if(await page.locator(`//td[@class='MuiTableCell-root MuiTableCell-body MuiTableCell-sizeMedium border-l css-q34dxg'][${i}]`).innerText==cancelrecordname){
        flag=1;
        break
   }
   }
   if(flag!=0){await page.locator("record not added").click()}
    //expect((await page.locator("xpath=//tbody[@class='MuiTableBody-root css-1xnox0e']").innerText()).valueOf()).to.not.includes(record.cancelLocation)
})
// Then("Add Asset popup should open", async function () {
//     expect((await page.locator("xpath=//h2[@class='MuiTypography-root MuiTypography-h6 MuiDialogTitle-root capitalize css-ohyacs']").innerText()).valueOf()).to.includes('Add Asset')
//  })
//  When("I Enter the Asset name in Asset free text field and click on Save button", async function () {
//     await page.locator("xpath=//input[@name='asset']").fill("")
//     await page.locator("xpath=//input[@name='asset']").type(record.addAsset)
//     await page.locator("text=Save").click()
//  })
//  Then("Asset add successful toaster message should appear and newly added Asset should appear in the list", async function () {
//     expect((await page.locator("xpath=//div[@role='alert']").innerText()).valueOf()).to.includes('Asset add successful')
//     expect((await page.locator("xpath=//tbody[@class='MuiTableBody-root css-1xnox0e']").innerText()).valueOf()).to.includes(record.addAsset) 
//  })
//  When("I Enter the Asset name in Asset free text field and click on Cancel button", async function () {
//      await page.locator("xpath=//input[@name='asset']").type(record.cancelAsset)
//      await page.locator("text=Cancel").click()
//  })
//  Then("Newly added Asset should not appear in the list and No toster message", async function () {
//      expect(await page.locator("xpath=//div[@role='alert']").count()).to.be.eql(0)
//      expect((await page.locator("xpath=//tbody[@class='MuiTableBody-root css-1xnox0e']").innerText()).valueOf()).to.not.includes(record.cancelAsset)
//  })
//  Then("Add Phase popup should open", async function () {
//     expect((await page.locator("xpath=//h2[@class='MuiTypography-root MuiTypography-h6 MuiDialogTitle-root capitalize css-ohyacs']").innerText()).valueOf()).to.includes('Add Phase')
//  })
//  When("I Enter the Phase name in Phase free text field and click on Save button", async function () {
//     await page.locator("xpath=//input[@name='phase']").fill("")
//     await page.locator("xpath=//input[@name='phase']").type(record.addPhase)
//     await page.locator("text=Save").click()
//  })
//  Then("Phase add successful toaster message should appear and newly added Phase should appear in the list", async function () {
//     expect((await page.locator("xpath=//div[@role='alert']").innerText()).valueOf()).to.includes('Phase add successful')
//     expect((await page.locator("xpath=//tbody[@class='MuiTableBody-root css-1xnox0e']").innerText()).valueOf()).to.includes(record.addPhase) 
//  })
//  When("I Enter the Phase name in Phase free text field and click on Cancel button", async function () {
//      await page.locator("xpath=//input[@name='phase']").type("New Phase Cancel Playwright")
//      await page.locator("text=Cancel").click()
//  })
//  Then("Newly added Phase should not appear in the list and No toster message", async function () {
//      expect(await page.locator("xpath=//div[@role='alert']").count()).to.be.eql(0)
//      expect((await page.locator("xpath=//tbody[@class='MuiTableBody-root css-1xnox0e']").innerText()).valueOf()).to.not.includes("New Phase Cancel Playwright")
//  })
//  Then("Add Investment Type popup should open", async function () {
//     expect((await page.locator("xpath=//h2[@class='MuiTypography-root MuiTypography-h6 MuiDialogTitle-root capitalize css-ohyacs']").innerText()).valueOf()).to.includes('Add Investment Type')
//  })
//  When("I Enter the Investment Type name in Investment Type free text field and click on Save button", async function () {
//     await page.locator("xpath=//input[@name='investmentType']").fill("")
//     await page.locator("xpath=//input[@name='investmentType']").type(record.addInvestmentType)
//     await page.locator("text=Save").click()
//  })
//  Then("Investment Type add successful toaster message should appear and newly added Investment Type should appear in the list", async function () {
//     expect((await page.locator("xpath=//div[@role='alert']").innerText()).valueOf()).to.includes('Investment Type add successful')
//     expect((await page.locator("xpath=//tbody[@class='MuiTableBody-root css-1xnox0e']").innerText()).valueOf()).to.includes(record.addInvestmentType) 
//  })
//  When("I Enter the Investment Type name in Investment Type free text field and click on Cancel button", async function () {
//      await page.locator("xpath=//input[@name='investmentType']").type(record.cancelInvestmentType)
//      await page.locator("text=Cancel").click()
//  })
//  Then("Newly added Investment Type should not appear in the list and No toster message", async function () {
//      expect(await page.locator("xpath=//div[@role='alert']").count()).to.be.eql(0)
//      expect((await page.locator("xpath=//tbody[@class='MuiTableBody-root css-1xnox0e']").innerText()).valueOf()).to.not.includes(record.cancelInvestmentType)
//  })
 Then("Add Label popup should open", async function () {
    expect((await page.locator("xpath=//h2[@class='MuiTypography-root MuiTypography-h6 MuiDialogTitle-root capitalize css-ohyacs']").innerText()).valueOf()).to.includes('Add')
 })
 When("I select Type as Form Label, Enter the Label name in Label free text field and click on Add button", async function () {
    recordname= Math.random().toString(20).substr(2, 6)
    recordname="NewRecord"+recordname
    await page.locator("xpath=//div[@id='mui-component-select-type']").click()
    await page.locator("xpath=(//span[@class='MuiTypography-root MuiTypography-body1 MuiListItemText-primary css-yb0lig'])[1]").click()
    await page.locator("xpath=//input[@name='label']").fill("")
    await page.locator("xpath=//input[@name='label']").type(recordname)
    await page.locator("//div[@class='MuiDialogActions-root MuiDialogActions-spacing css-14b29qc']//button[1]").click()

 })
 Then("Form Label add successful toaster message should appear and newly added Form Label should appear in the list", async function () {
    expect(await page.locator("xpath=//div[@role='alert']").last().innerText()).to.eql('Form Label add successful')
    let count=await page.locator("//tr[@class='MuiTableRow-root hover:bg-gray-100 css-1gqug66']/td[contains(text(), 'Form Label')]//following-sibling::td[1]").count()
    let recrd=0;
    for(let i=1;i<=count;i++)
    {
         if(await page.locator(`(//tr[@class='MuiTableRow-root hover:bg-gray-100 css-1gqug66']/td[contains(text(), 'Form Label')]//following-sibling::td[1])[${i}]`).innerText()==recordname){
         recrd=1;
         break
    }
    }
    if(recrd!=1){await page.locator("record not added").click()}

    //expect((await page.locator("xpath=//tbody[@class='MuiTableBody-root css-1xnox0e']").innerText()).valueOf()).to.includes(recordname) 
 })
 When("I select Type as Document, Enter the Label name in Label free text field and click on Add button", async function () {
    recordname= Math.random().toString(20).substr(2, 6)
    recordname="NewRecord"+recordname
    await page.locator("xpath=//div[@id='mui-component-select-type']").click()
    await page.locator("xpath=(//span[@class='MuiTypography-root MuiTypography-body1 MuiListItemText-primary css-yb0lig'])[2]").click()
    await page.locator("xpath=//input[@name='label']").fill("")
    await page.locator("xpath=//input[@name='label']").type(recordname)
    await page.locator("//div[@class='MuiDialogActions-root MuiDialogActions-spacing css-14b29qc']//button[1]").click()
 })
 Then("Document add successful toaster message should appear and newly added Document should appear in the list", async function () {
    expect((await page.locator("xpath=//div[@role='alert']").last().innerText()).valueOf()).to.eql('Document add successful')
    let count=await page.locator("//tr[@class='MuiTableRow-root hover:bg-gray-100 css-1gqug66']/td[contains(text(), 'Document')]//following-sibling::td[1]").count()
    let recrd=0;
    for(let i=1;i<=count;i++)
    {
         if(await page.locator(`(//tr[@class='MuiTableRow-root hover:bg-gray-100 css-1gqug66']/td[contains(text(), 'Document')]//following-sibling::td[1])[${i}]`).innerText()==recordname){
         recrd=1;
         break
    }
    }
    if(recrd!=1){await page.locator("record not added").click()}

    //expect((await page.locator("xpath=//tbody[@class='MuiTableBody-root css-1xnox0e']").innerText()).valueOf()).to.includes(recordname) 
 })
 When("I select Type as Form Label, Enter the Label name in Label free text field and click on Cancel button", async function () {
    await page.locator("xpath=//div[@id='mui-component-select-type']").click()
    await page.locator("xpath=(//span[@class='MuiTypography-root MuiTypography-body1 MuiListItemText-primary css-yb0lig'])[1]").click()
    await page.locator("xpath=//input[@name='label']").type("Cancel")
    await page.locator("//button[contains(text(),'Cancel')]").click()
 })
 Then("Newly added Label should not appear in the list and No toster message", async function () {
     expect(await page.locator("xpath=//div[@role='alert']").count()).to.be.eql(0)
     expect((await page.locator("xpath=//tbody[@class='MuiTableBody-root css-1xnox0e']").innerText()).valueOf()).to.not.includes("Cancel")
 })
 When("I click on Edit button of any record in Action column", async function () {
    recordname1=await page.locator("(//td[@class='MuiTableCell-root MuiTableCell-body MuiTableCell-sizeMedium border-l css-q34dxg'])[1]").innerText()
    recordname=await page.locator("(//td[@class='MuiTableCell-root MuiTableCell-body MuiTableCell-sizeMedium border-l css-q34dxg'])[2]").innerText()
    await page.locator("xpath=(//button[@class='MuiButtonBase-root MuiIconButton-root MuiIconButton-sizeMedium css-1yxmbwk'])[1]").click()
 })
 Then("Edit {string} popup should open", async function (Tabname) {
    if(Tabname=="Label"){
        expect((await page.locator("xpath=//h2[@class='MuiTypography-root MuiTypography-h6 MuiDialogTitle-root capitalize css-ohyacs']").innerText()).valueOf()).to.contain.oneOf(["Edit Form Label","Edit Document"])
    }
    else{
    expect((await page.locator("xpath=//h2[@class='MuiTypography-root MuiTypography-h6 MuiDialogTitle-root capitalize css-ohyacs']").innerText()).valueOf()).to.includes(`Edit ${Tabname}`)
    }
})
When("I Edit the {string} name in {string} free text field and click on Save button", async function (Tabname, column1) {
    recordname= Math.random().toString(20).substr(2, 6)
    recordname="NewRecord"+recordname
    await page.locator(`//input[@name='${column1}']`).fill("")
    await page.locator(`//input[@name='${column1}']`).fill(recordname1)
    await page.locator("//button[contains(text(),'Save')]").click()
 })
 Then("{string} edit successful toaster message should appear and {string} should get updated as Edited by user", async function (Tabanme1, Tabname2) {
    expect((await page.locator("xpath=//div[@role='alert']").last().innerText()).valueOf()).to.includes(`${Tabanme1} edit successful`)
    expect((await page.locator("xpath=(//td[@class='MuiTableCell-root MuiTableCell-body MuiTableCell-sizeMedium border-l css-q34dxg'])[1]").innerText()).valueOf()).to.includes(recordname1)
})
When("I Edit the {string} name in {string} free text field and click on Cancel button", async function (Tabname, column1) {
    recordname= Math.random().toString(20).substr(2, 6)
    recordname="NewRecord"+recordname
    await page.locator(`//input[@name='${column1}']`).fill("")
    await page.locator(`//input[@name='${column1}']`).fill(recordname)
    await page.locator("//button[contains(text(),'Cancel')]").click()
 })
 Then("{string} should not get updated as Edited by user and No toster message", async function (Tabname) {
    expect(await page.locator("xpath=//div[@role='alert']").count()).to.be.eql(0)
    expect((await page.locator("xpath=(//td[@class='MuiTableCell-root MuiTableCell-body MuiTableCell-sizeMedium border-l css-q34dxg'])[1]").innerText()).valueOf()).to.not.includes(recordname)
 })

// Then("Edit Asset popup should open", async function () {
//     expect((await page.locator("xpath=//h2[@class='MuiTypography-root MuiTypography-h6 MuiDialogTitle-root capitalize css-ohyacs']").innerText()).valueOf()).to.includes('Edit Asset')
// })
// When("I Edit the Asset name in Asset free text field and click on Save button", async function () {
//     await page.locator("xpath=//input[@name='asset']").fill("")
//     await page.locator("xpath=//input[@name='asset']").fill(record.editLocation)
//     await page.locator("text=Save").click()
//  })
//  Then("Asset edit successful toaster message should appear and Asset should get updated as Edited by user", async function () {
//     expect((await page.locator("xpath=//div[@role='alert']").innerText()).valueOf()).to.includes('Asset edit successful')
//     expect((await page.locator("xpath=(//td[@class='MuiTableCell-root MuiTableCell-body MuiTableCell-sizeMedium border-l css-q34dxg'])[1]").innerText()).valueOf()).to.includes(record.editLocation)
// })
// When("I Edit the Asset name in Asset free text field and click on Cancel button", async function () {
//     await page.locator("xpath=//input[@name='asset']").fill("")
//     await page.locator("xpath=//input[@name='asset']").fill("Cancel")
//     await page.locator("text=Cancel").click()
//  })
// Then("Asset should not get updated as Edited by user and No toster message", async function () {
//     expect(await page.locator("xpath=//div[@role='alert']").count()).to.be.eql(0)
//     expect((await page.locator("xpath=(//td[@class='MuiTableCell-root MuiTableCell-body MuiTableCell-sizeMedium border-l css-q34dxg'])[1]").innerText()).valueOf()).to.not.includes("Cancel")
//  })

// Then("Edit Phase popup should open", async function () {
//     expect((await page.locator("xpath=//h2[@class='MuiTypography-root MuiTypography-h6 MuiDialogTitle-root capitalize css-ohyacs']").innerText()).valueOf()).to.includes('Edit Phase')
// })
// When("I Edit the Phase name in Phase free text field and click on Save button", async function () {
//     await page.locator("xpath=//input[@name='phase']").fill("")
//     await page.locator("xpath=//input[@name='phase']").fill(record.editLocation)
//     await page.locator("text=Save").click()
//  })
// Then("Phase edit successful toaster message should appear and Phase should get updated as Edited by user", async function () {
//     expect((await page.locator("xpath=//div[@role='alert']").innerText()).valueOf()).to.includes('Phase edit successful')
//     expect((await page.locator("xpath=(//td[@class='MuiTableCell-root MuiTableCell-body MuiTableCell-sizeMedium border-l css-q34dxg'])[1]").innerText()).valueOf()).to.includes(record.editLocation)
// })
// When("I Edit the Phase name in Phase free text field and click on Cancel button", async function () {
//     await page.locator("xpath=//input[@name='phase']").fill("")
//     await page.locator("xpath=//input[@name='phase']").fill("Cancel")
//     await page.locator("text=Cancel").click()
//  })
// Then("Phase should not get updated as Edited by user and No toster message", async function () {
//     expect(await page.locator("xpath=//div[@role='alert']").count()).to.be.eql(0)
//     expect((await page.locator("xpath=(//td[@class='MuiTableCell-root MuiTableCell-body MuiTableCell-sizeMedium border-l css-q34dxg'])[1]").innerText()).valueOf()).to.not.includes("Cancel")
//  })

// Then("Edit Investment Type popup should open", async function () {
//     expect((await page.locator("xpath=//h2[@class='MuiTypography-root MuiTypography-h6 MuiDialogTitle-root capitalize css-ohyacs']").innerText()).valueOf()).to.includes('Edit Investment Type')
// })
// When("I Edit the Investment Type in Investment Type free text field and click on Save button", async function () {
//     await page.locator("xpath=//input[@name='investmentType']").fill("")
//     await page.locator("xpath=//input[@name='investmentType']").fill(record.editLocation)
//     await page.locator("text=Save").click()
//  })
// Then("Investment Type edit successful toaster message should appear and Investment Type should get updated as Edited by user", async function () {
//     expect((await page.locator("xpath=//div[@role='alert']").innerText()).valueOf()).to.includes('Investment Type edit successful')
//     expect((await page.locator("xpath=(//td[@class='MuiTableCell-root MuiTableCell-body MuiTableCell-sizeMedium border-l css-q34dxg'])[1]").innerText()).valueOf()).to.includes(record.editLocation)
// })
// When("I Edit the Investment Type in Investment Type free text field and click on Cancel button", async function () {
//     await page.locator("xpath=//input[@name='investmentType']").fill("")
//     await page.locator("xpath=//input[@name='investmentType']").fill("Cancel")
//     await page.locator("text=Cancel").click()
//  })
// Then("Investment Type should not get updated as Edited by user and No toster message", async function () {
//     expect(await page.locator("xpath=//div[@role='alert']").count()).to.be.eql(0)
//     expect((await page.locator("xpath=(//td[@class='MuiTableCell-root MuiTableCell-body MuiTableCell-sizeMedium border-l css-q34dxg'])[1]").innerText()).valueOf()).to.not.includes("Cancel")
//  })


When("I click on Edit button of any record of type Form Label in Action column", async function () {
    recordname1=await page.locator("(//td[contains(text(), 'Form Label')]//following::td//following::td//button[2])[1]//parent::td//preceding-sibling::td[2]").innerText()
    recordname=await page.locator("(//tr[@class='MuiTableRow-root hover:bg-gray-100 css-1gqug66']/td[contains(text(), 'Form Label')]//following-sibling::td[1])[2]").innerText()
    await page.locator("(//td[contains(text(), 'Form Label')]//following::td//following::td//button[2]//preceding-sibling::button)[1]").click()
 })
Then("Edit Form Label popup should open", async function () {
    expect((await page.locator("xpath=//h2[@class='MuiTypography-root MuiTypography-h6 MuiDialogTitle-root capitalize css-ohyacs']").innerText()).valueOf()).to.includes('Edit Form Label')
})
Then("Edit Document popup should open", async function () {
    expect((await page.locator("xpath=//h2[@class='MuiTypography-root MuiTypography-h6 MuiDialogTitle-root capitalize css-ohyacs']").innerText()).valueOf()).to.includes('Edit Document')
})
 When("I Edit the Label in Label free text field and click on Save button", async function () {
    await page.locator("xpath=//input[@name='label']").fill("")
    //await page.locator("xpath=//input[@name='label']").fill(recordname)
    await page.locator("xpath=//input[@name='label']").fill("Investment Manager")
    await page.locator("//button[contains(text(),'Save')]").click()
 })
 When("I Edit Label in Label free text field and click on Save button", async function () {
    // recordname= Math.random().toString(20).substr(2, 6)
    // recordname="NewRecord"+recordname
    await page.locator("xpath=//input[@name='label']").fill("")
    await page.locator("xpath=//input[@name='label']").fill(recordname1)
    await page.locator("//button[contains(text(),'Save')]").click()
 })
 When("I Edit the Label of Docuent Type in Label free text field and click on Save button", async function () {
    recordname= Math.random().toString(20).substr(2, 6)
    recordname="NewRecord"+recordname
    await page.locator("xpath=//input[@name='label']").fill("")
    await page.locator("xpath=//input[@name='label']").fill(recordname)
    await page.locator("//button[contains(text(),'Save')]").click()
 })
 When("I Edit Label of Document Type in Label free text field and click on Save button", async function () {
    await page.locator("xpath=//input[@name='label']").fill("")
    await page.locator("xpath=//input[@name='label']").fill(recordname)
    await page.locator("//button[contains(text(),'Save')]").click()
 })
Then("Form Label edit successful toaster message should appear and Label should get updated as Edited by user", async function () {
    expect((await page.locator("xpath=//div[@role='alert']").last().innerText()).valueOf()).to.includes('Form Label edit successful')
    expect((await page.locator("(//td[contains(text(), 'Form Label')]//following::td//following::td//button[2])[1]//parent::td//preceding-sibling::td[2]").innerText()).valueOf()).to.eql(recordname1)
})
When("I click on Edit button of any record of type Document in Action column", async function () {
    recordname=await page.locator("(//tr[@class='MuiTableRow-root hover:bg-gray-100 css-1gqug66']/td[contains(text(), 'Document')]//following-sibling::td[1])[2]").innerText()
    recordname1=await page.locator("(//tr[@class='MuiTableRow-root hover:bg-gray-100 css-1gqug66']/td[contains(text(), 'Document')]//following-sibling::td[1])[1]").innerText()
    console.log(recordname)
    await page.locator("xpath=(//td[contains(text(), 'Document')]//following::td//following::td//button)[1]").click()
 })
Then("Document edit successful toaster message should appear and Label should get updated as Edited by user", async function () {
    expect((await page.locator("xpath=//div[@role='alert']").last().innerText()).valueOf()).to.includes('Document edit successful')
    expect((await page.locator("xpath=(//td[contains(text(), 'Document')]//following::td)[1]").innerText()).valueOf()).to.eql(recordname1)
})
When("I Edit the Label in Label free text field and click on Cancel button", async function () {
    await page.locator("xpath=//input[@name='label']").fill("")
    await page.locator("xpath=//input[@name='label']").fill("Cancel")
    await page.locator("//button[contains(text(),'Cancel')]").click()
 })
Then("Label should not get updated as Edited by user and No toster message", async function () {
    expect(await page.locator("xpath=//div[@role='alert']").count()).to.be.eql(0)
    expect((await page.locator("(//td[contains(text(), 'Form Label')]//following::td//following::td//button)[1]//parent::td//preceding-sibling::td[1]").innerText()).valueOf()).to.not.eql("Cancel")
 })
 Then("{string} already exists. Could not add the {string}. toaster message should appear and there should not be two {string} with same name", async function (Tabname1, Tabname2, column1) {
    await page.waitForTimeout(4000)
    expect((await page.locator("xpath=//div[@role='alert']").last().innerText()).valueOf()).to.includes(`${Tabname1} already exists. Could not add the ${Tabname1}.`)    
    expect(await page.locator(`text="${recordname}"`).count()).to.be.eql(1)
})
// Then("Asset already exists. Could not save the Asset. toaster message should appear and there should not be two Assets with same name", async function () {
//     expect((await page.locator("xpath=//div[@role='alert']").innerText()).valueOf()).to.includes('Asset already exists. Could not save the Asset')    
//     expect(await page.locator(`text="${record.addAsset}"`).count()).to.be.eql(1)
// })
// Then("Phase already exists. Could not save the Phase. toaster message should appear and there should not be two Phases with same name", async function () {
//     expect((await page.locator("xpath=//div[@role='alert']").innerText()).valueOf()).to.includes('Phase already exists. Could not save the Phase.')    
//     expect(await page.locator(`text="${record.addPhase}"`).count()).to.be.eql(1)
// })
// Then("Investment Type already exists. Could not save the Investment Type. toaster message should appear and there should not be two Investment Types with same name", async function () {
//     expect((await page.locator("xpath=//div[@role='alert']").innerText()).valueOf()).to.includes('Investment Type already exists. Could not save the Investment Type.')    
//     expect(await page.locator(`text="${record.addInvestmentType}"`).count()).to.be.eql(1)
// })
Then("Form Label already exists. Could not add the Form Label. toaster message should appear and there should not be two Form Labels with same name", async function () {
    expect((await page.locator("xpath=//div[@role='alert']").last().innerText()).valueOf()).to.includes('Form Label already exists. Could not add the Form Label.')    
    //expect(await page.locator(`text="${recordname}"`).count()).to.be.lessThanOrEqual(2)
    let count=await page.locator("//tr[@class='MuiTableRow-root hover:bg-gray-100 css-1gqug66']/td[contains(text(), 'Form Label')]//following-sibling::td[1]").count()
    let recrd=0;
    for(let i=1;i<=count;i++)
    {
         if(await page.locator(`(//tr[@class='MuiTableRow-root hover:bg-gray-100 css-1gqug66']/td[contains(text(), 'Form Label')]//following-sibling::td[1])[${i}]`).innerText()==recordname){
         recrd=recrd+1;
         
    }
    }
    if(recrd!=1){await page.locator("duplicate records exist").click()}

})
Then("Document already exists. Could not add the Document. toaster message should appear and there should not be two Documents with same name", async function () {
    expect((await page.locator("xpath=//div[@role='alert']").last().innerText()).valueOf()).to.includes('Document already exists. Could not add the Document.')    
    //expect(await page.locator(`text="${recordname}"`).count()).to.be.lessThanOrEqual(2)
    let count=await page.locator("//tr[@class='MuiTableRow-root hover:bg-gray-100 css-1gqug66']/td[contains(text(), 'Document')]//following-sibling::td[1]").count()
    let recrd=0;
    for(let i=1;i<=count;i++)
    {
         if(await page.locator(`(//tr[@class='MuiTableRow-root hover:bg-gray-100 css-1gqug66']/td[contains(text(), 'Document')]//following-sibling::td[1])[${i}]`).innerText()==recordname){
         recrd=recrd+1;
         
    }
    }
    if(recrd!=1){await page.locator("duplicate documents exist").click()}
})
Then("{string} already exists. Could not save the {string} toaster message should appear and there should not be two {string} with same name", async function (Tabname1, Tabname2, rcrdname) {
    expect((await page.locator("xpath=//div[@role='alert']").last().innerText()).valueOf()).to.includes(`${Tabname1} already exists. Could not save the ${Tabname1}.`)    
    expect(await page.locator(`text="${recordname}"`).count()).to.be.eql(1)
})
// Then("This Asset already exists. toaster message should appear and there should not be two Assets with same name", async function () {
//     expect((await page.locator("xpath=//div[@role='alert']").innerText()).valueOf()).to.includes('This Asset already exists.')    
//     expect(await page.locator(`text="${record.addAsset}"`).count()).to.be.eql(1)
// })
// Then("This Phase already exists. toaster message should appear and there should not be two Phases with same name", async function () {
//     expect((await page.locator("xpath=//div[@role='alert']").innerText()).valueOf()).to.includes('This Phase already exists.')    
//     expect(await page.locator(`text="${record.addPhase}"`).count()).to.be.eql(1)
// })
// Then("This Investment Type already exists. toaster message should appear and there should not be two Investment Types with same name", async function () {
//     expect((await page.locator("xpath=//div[@role='alert']").innerText()).valueOf()).to.includes('This Investment Type already exists.')    
//     expect(await page.locator(`text="${record.addInvestmentType}"`).count()).to.be.eql(1)
// })
Then("Form Label already exists. Could not save the Form Label toaster message should appear and there should not be two Form Labels with same name", async function () {
    await page.waitForTimeout(2000)
    expect((await page.locator("xpath=//div[@role='alert']").innerText()).valueOf()).to.includes('Form Label already exists. Could not save the Form Label')    
    //expect(await page.locator(`text="${recordname}"`).count()).to.be.lessThanOrEqual(2)
    let count=await page.locator("//tr[@class='MuiTableRow-root hover:bg-gray-100 css-1gqug66']/td[contains(text(), 'Form Label')]//following-sibling::td[1]").count()
    let recrd=0;
    for(let i=1;i<=count;i++)
    {
         if(await page.locator(`(//tr[@class='MuiTableRow-root hover:bg-gray-100 css-1gqug66']/td[contains(text(), 'Form Label')]//following-sibling::td[1])[${i}]`).innerText()==recordname){
         recrd=recrd+1;
         
    }
    }
    if(recrd!=1){await page.locator("duplicate records exist").click()}
})
Then("Document already exists. Could not save the Document toaster message should appear and there should not be two Documents with same name", async function () {
    await page.waitForTimeout(2000)
    expect((await page.locator("xpath=//div[@role='alert']").last().innerText()).valueOf()).to.includes('Document already exists. Could not save the Document')    
    //expect(await page.locator(`text="${recordname}"`).count()).to.be.lessThanOrEqual(2)
    let count=await page.locator("//tr[@class='MuiTableRow-root hover:bg-gray-100 css-1gqug66']/td[contains(text(), 'Document')]//following-sibling::td[1]").count()
    let recrd=0;
    for(let i=1;i<=count;i++)
    {
         if(await page.locator(`(//tr[@class='MuiTableRow-root hover:bg-gray-100 css-1gqug66']/td[contains(text(), 'Document')]//following-sibling::td[1])[${i}]`).innerText()==recordname){
         recrd=recrd+1;
         
    }
    }
    if(recrd!=1){await page.locator("duplicate documents exist").click()}
})
When("I Enter the name partially in Search bar", async function () {
    let str=(await page.locator("xpath=(//th[@class='MuiTableCell-root MuiTableCell-head MuiTableCell-stickyHeader MuiTableCell-sizeMedium font-semibold bg-gray-200 css-8coetn'])[1]").innerText()).valueOf()
    if(str=="Type"){
    search=await page.locator("(//td[@class='MuiTableCell-root MuiTableCell-body MuiTableCell-sizeMedium css-q34dxg'])[1]").innerText()
     partialsearch=search.slice(-3)
    await page.locator("xpath=//input[@class='MuiInputBase-input MuiInput-input MuiInputBase-inputSizeSmall MuiInputBase-inputAdornedStart py-1 css-2duac4']").type(partialsearch)
    }
    else{
        search=await page.locator("(//td[@class='MuiTableCell-root MuiTableCell-body MuiTableCell-sizeMedium border-l css-q34dxg'])[1]").innerText()
     partialsearch=search.slice(0, 3);
    await page.locator("xpath=//input[@class='MuiInputBase-input MuiInput-input MuiInputBase-inputSizeSmall MuiInputBase-inputAdornedStart py-1 css-2duac4']").type(partialsearch)
    }
})
Then("The records containing or matching the words should be filtered and populated in the table", async function () {
    let str=(await page.locator("xpath=(//th[@class='MuiTableCell-root MuiTableCell-head MuiTableCell-stickyHeader MuiTableCell-sizeMedium font-semibold bg-gray-200 css-8coetn'])[1]").innerText()).valueOf()
    if(str==="Type")
    {
        let cnt=await page.locator("//tr[@class='MuiTableRow-root hover:bg-gray-100 css-1gqug66']//td[2]").count()
        for(let i=0; i<cnt; i++)
        {
        let str=(await page.locator("//tr[@class='MuiTableRow-root hover:bg-gray-100 css-1gqug66']//td[2]").nth(i).innerText()).valueOf()
        expect(str.toLowerCase()).contains(partialsearch.toLowerCase())
        
        }
    }
    else{
    let cnt=await page.locator("xpath=//td[@class='MuiTableCell-root MuiTableCell-body MuiTableCell-sizeMedium border-l css-q34dxg']").count()
    for(let i=0; i<cnt; i++)
    {
        let str=(await page.locator("xpath=//td[@class='MuiTableCell-root MuiTableCell-body MuiTableCell-sizeMedium border-l css-q34dxg']").nth(i).innerText()).valueOf()
        expect(str.toLowerCase()).contains(partialsearch.toLowerCase())
    }
}
})
When("I Enter the name completely in Search bar", async function () {
    let str=(await page.locator("xpath=(//th[@class='MuiTableCell-root MuiTableCell-head MuiTableCell-stickyHeader MuiTableCell-sizeMedium font-semibold bg-gray-200 css-8coetn'])[1]").innerText()).valueOf()
    if(str=="Type"){
    search=await page.locator("(//td[@class='MuiTableCell-root MuiTableCell-body MuiTableCell-sizeMedium css-q34dxg'])[1]").innerText()
    await page.locator("xpath=//input[@class='MuiInputBase-input MuiInput-input MuiInputBase-inputSizeSmall MuiInputBase-inputAdornedStart py-1 css-2duac4']").fill("")
    await page.locator("xpath=//input[@class='MuiInputBase-input MuiInput-input MuiInputBase-inputSizeSmall MuiInputBase-inputAdornedStart py-1 css-2duac4']").type(search)
    }
    else{
        search=await page.locator("(//td[@class='MuiTableCell-root MuiTableCell-body MuiTableCell-sizeMedium border-l css-q34dxg'])[1]").innerText()
        await page.locator("xpath=//input[@class='MuiInputBase-input MuiInput-input MuiInputBase-inputSizeSmall MuiInputBase-inputAdornedStart py-1 css-2duac4']").fill("")
        await page.locator("xpath=//input[@class='MuiInputBase-input MuiInput-input MuiInputBase-inputSizeSmall MuiInputBase-inputAdornedStart py-1 css-2duac4']").type(search)
    }
})
Then("It should show the exact match only", async function () {
    let str=(await page.locator("(//th[@class='MuiTableCell-root MuiTableCell-head MuiTableCell-stickyHeader MuiTableCell-sizeMedium font-semibold bg-gray-200 css-8coetn'])[1]").innerText()).valueOf()
    if(str==="Type")
    {
        let cnt=await page.locator("//tr[@class='MuiTableRow-root hover:bg-gray-100 css-1gqug66']//td[2]").count()
        for(let i=0; i<cnt; i++)
        {
        let str=(await page.locator("//tr[@class='MuiTableRow-root hover:bg-gray-100 css-1gqug66']//td[2]").nth(i).innerText()).valueOf()
        expect(str.toLowerCase()).contains(search.toLowerCase())
        }
    }
else
{
    let cnt=await page.locator("xpath=//td[@class='MuiTableCell-root MuiTableCell-body MuiTableCell-sizeMedium border-l css-q34dxg']").count()
    for(let i=0; i<cnt; i++)
    {
    let value=(await page.locator("xpath=//td[@class='MuiTableCell-root MuiTableCell-body MuiTableCell-sizeMedium border-l css-q34dxg']").nth(i).innerText()).valueOf()
    expect(value.toLowerCase()).to.includes(search.toLowerCase())
    }
}
})
When("I Enter the words which are not there in the table", async function () {
    await page.locator("xpath=//input[@class='MuiInputBase-input MuiInput-input MuiInputBase-inputSizeSmall MuiInputBase-inputAdornedStart py-1 css-2duac4']").fill("")
    await page.locator("xpath=//input[@class='MuiInputBase-input MuiInput-input MuiInputBase-inputSizeSmall MuiInputBase-inputAdornedStart py-1 css-2duac4']").type('amruta')
})
Then("It should show No Data found ! Message", async function () {
    expect(await page.locator("xpath=//td[@class='MuiTableCell-root MuiTableCell-body MuiTableCell-sizeMedium border-l css-q34dxg']").count()).to.be.eql(0)
    expect((await page.locator("xpath=//div[@class='MuiAlert-message css-1xsto0d']").innerText()).valueOf()).to.includes('No Data found !')
})
When("I Select Investment Type and Roadmap", async function () {
    await page.locator("xpath=(//div[@class='MuiSelect-select MuiSelect-outlined MuiInputBase-input MuiOutlinedInput-input css-qiwgdb'])[1]").click()
    await page.locator("text=Greenfields").click()
    await page.waitForTimeout(2000)
    await page.locator("xpath=(//div[@class='MuiSelect-select MuiSelect-outlined MuiInputBase-input MuiOutlinedInput-input css-qiwgdb'])[2]").click()
    await page.locator("xpath=(//span[@class='MuiTypography-root MuiTypography-body1 MuiListItemText-primary css-yb0lig'])[1]").click()
})
When("I Select Investment Type, Roadmap as Exploration", async function () {
    await page.locator("xpath=(//div[@class='MuiSelect-select MuiSelect-outlined MuiInputBase-input MuiOutlinedInput-input css-qiwgdb'])[1]").click()
    await page.locator("text=Exploration").click()
    await page.waitForTimeout(2000)
    await page.locator("xpath=(//div[@class='MuiSelect-select MuiSelect-outlined MuiInputBase-input MuiOutlinedInput-input css-qiwgdb'])[2]").click()
    await page.locator("xpath=(//span[@class='MuiTypography-root MuiTypography-body1 MuiListItemText-primary css-yb0lig'])[1]").click()
})
Then("It should show the Roadmap of selected Investment Type and Roadmap", async function () {
    expect(await page.locator("xpath=//div[@class='bg-pink-400 rounded-md shadow-md border-x-2 border-t-2 border-white MuiBox-root css-0']").count()).to.be.greaterThan(0)
})
Then("It should show the Roadmap for selected Investment Type and Roadmap", async function () {
    expect(await page.locator("xpath=//div[@class='flex justify-between items-center MuiBox-root css-0']").count()).to.be.greaterThan(1)
})
Then("Roadmap should show Phases, number of number of objectives that phase contains", async function () {
    //expect(await page.locator("xpath=//div[@class='bg-pink-400 rounded-md shadow-md cursor-pointer w-full group/action border-x-2 border-t-2 border-white MuiBox-root css-0']").count()).to.be.greaterThan(1)
    let cnt=await page.locator("xpath=(//div[@class='text-pink-400 MuiBox-root css-0'])").count()
    for(let i=0; i<cnt;i++){
    let txt:any=await page.locator("xpath=(//div[@class='text-pink-400 MuiBox-root css-0'])").nth(i).innerText()
    if(txt>=0){
        //console.log("phase is showing number of number of objectives")
    }
    else{await page.locator("phase is not showing number of number of objectives")}
    } 
})
// Then("Roadmap should show Phases, number of number of objectives the phase contains", async function () {
//     //expect(await page.locator("xpath=//div[@class='flex justify-between items-center MuiBox-root css-0']").count()).to.be.greaterThan(0)
//     let cnt=await page.locator("xpath=(//div[@class='text-pink-400 MuiBox-root css-0'])").count()
//     for(let i=0; i<cnt;i++){
//     let txt:any=await page.locator("xpath=(//div[@class='text-pink-400 MuiBox-root css-0'])").nth(i).innerText()
//     let ObjNumber=parseInt(txt, 10)
//     if(ObjNumber>=0){
//         console.log("phase is showing number of number of objectives")
//     }
//     } 
// })
Then("Objectives of particular phase at the below of that phase and Star mark at the end of mandatory Objective", async function () {
    let viewicons=await page.locator("(//button[@aria-label='Show Objectives'])[1]").count()
    for(let i=1;i<=viewicons;i++)
    {
        await page.locator("(//button[@aria-label='Show Objectives'])[1]").click()
    }
    
    let count=await page.locator("xpath=//div[@class='text-pink-400 MuiBox-root css-0']//div").count()
    let numOFObjinAllPhases:any=0;
    let totalObj:number=0;
    for(let i=0;i<count;i++){
    numOFObjinAllPhases=await page.locator("xpath=//div[@class='text-pink-400 MuiBox-root css-0']//div").nth(i).innerText()
    numOFObjinAllPhases=parseInt(numOFObjinAllPhases, 10);
    totalObj+=numOFObjinAllPhases;
    }
    expect(await page.locator("xpath=//div[@class='p-2 flex items-center rounded-lg hover:bg-gray-100 cursor-pointer MuiBox-root css-0']").count()).to.be.eql(totalObj)
    let mandatoryObjCnt=await page.locator("xpath=(//*[@aria-label='Mandatory Objective'])").count()
    if(mandatoryObjCnt>0)
    {
        await page.locator("xpath=(//*[@aria-label='Mandatory Objective'])[1]").screenshot({ path: 'Screenshots\\MandatoryObjectIconActual.png' })
        compareScreenshots('Screenshots\\MandatoryObjectIconActual.png', 'Screenshots\\MandatoryObjectIconExpected.png')
    }
})
When("I click on Objective and Deliverable tab", async function () {
    await page.locator("xpath=(//div[@class='MuiTabs-flexContainer justify-evenly css-k008qs']//button)[2]").click();
})
Then("I should navigate to Objective and Deliverable tab and see Investment Type and Roadmap dropdowns", async function () {
    expect(await page.locator("xpath=//*[@data-testid='ArrowDropDownIcon']").count()).to.be.eql(2)
})
When("I click on any Phase", async function () {
    await page.locator("xpath=(//div[@class='text-pink-400 MuiBox-root css-0'])[1]").click();
    
})
Then("It should show Objctives and Deliverables and Objectives section should have add button for adding Objectives", async function () {
    await page.waitForTimeout(3000)
    expect(await page.locator("xpath=(//div[@class='font-semibold MuiBox-root css-0'])[1]").innerText()).to.includes('Objectives')
    expect(await page.locator("xpath=(//div[@class='font-semibold MuiBox-root css-0'])[2]").innerText()).to.includes('Deliverables')
    expect(await page.locator("xpath=//*[@data-testid='AddCircleRoundedIcon']")).to.exist
})
Then("Objective section should show number of objectives shown on that phase", async function () {
    let ObjOfPhase=await page.locator("xpath=(//div[@class='text-pink-400 MuiBox-root css-0'])[1]").innerText()
    let ObjInPhase=parseInt(ObjOfPhase,10)    
    expect(await page.locator("xpath=//div[@class='w-2/5 p-2 flex justify-between items-start MuiBox-root css-0']").count()).to.be.eql(ObjInPhase)
})
Then("Deliverables section should show deliverables for objects of that phase", async function () {
    let num:any=await page.locator("xpath=//div[@class='w-2/5 p-2 flex justify-between items-start MuiBox-root css-0']").count()
    expect(await page.locator("xpath=//div[@class='flex justify-between items-start MuiBox-root css-0']").count()).to.be.greaterThanOrEqual(num)
})
Then("Each objective and Deliverable should show 3 dots and star mark if that objective is mandatory at the left side of that Objective", async function () {
    let mandatoryObjCnt=await page.locator("xpath=(//*[@aria-label='Mandatory Objective'])").count()
    if(mandatoryObjCnt>0)
    {
        for(let i=0;i<mandatoryObjCnt;i++)
        {
        await page.locator("xpath=(//*[@aria-label='Mandatory Objective'])").nth(i).screenshot({ path: 'Screenshots\\MandatoryObjectIconOfObjNDelPageActual.png' })
        compareScreenshots('Screenshots\\MandatoryObjectIconOfObjNDelPageActual.png', 'Screenshots\\MandatoryObjectIconOfObjNDelPageExpected.png')
        }
    }
    let count=await page.locator("xpath=(//div[@class='group flex MuiBox-root css-0'])").count()
    for(let j=0;j<count;j++)
    {
    await page.locator("xpath=(//div[@class='group flex MuiBox-root css-0'])").nth(j).screenshot({ path: 'Screenshots\\3DotsOfObjAndDeliverablesActual.png' })
    compareScreenshots('Screenshots\\3DotsOfObjAndDeliverablesActual.png', 'Screenshots\\3DotsOfObjAndDeliverablesExpected.png')   
    }
})
Then("I Click on any phase and then hover the mouse on 3 dots of any objective", async function () {
    await page.locator("xpath=(//div[@class='text-pink-400 MuiBox-root css-0'])[1]").click();
    await page.locator("xpath=(//div[@class='group flex MuiBox-root css-0'])[1]").hover({force:true,timeout:2000, trial:true})
})
Then("It should show view, add, edit and Delete icons", async function () {
    await page.locator("xpath=(//div[@class='group flex MuiBox-root css-0'])[1]").hover({force:true,timeout:2000, trial:true})
    await page.locator("xpath=(//div[@class='hidden absolute group-hover:block right-0 MuiBox-root css-0'])[1]").screenshot({path:'Screenshots\\iconsOfObjectivesActual.png'})
    //compareScreenshots('Screenshots\\iconsOfObjectivesExpected.png', 'Screenshots\\iconsOfObjectivesActual.png')
})
When("I click on view icon", async function () {
    await page.locator("xpath=(//div[@class='group flex MuiBox-root css-0'])[1]").hover({force:true,timeout:2000})
    await page.locator("xpath=(//button[@aria-label='View'])[1]").click({force:true})
})
When("I click view icon of deliverable", async function () {
    await page.locator("xpath=(//div[@class='group flex MuiBox-root css-0'])[2]").hover({force:true,timeout:2000})
    await page.locator("xpath=(//button[@aria-label='View'])[2]").click()
})
Then("View Objective popup should open and should show Title, Information and Discipline of that Objective", async function () {
    expect(await page.locator("xpath=//div[@role='dialog']").count()).to.be.eql(1)
    let viewObj=(await page.locator("xpath=//div[@class='flex justify-start items-center gap-5 MuiBox-root css-0']").innerText()).valueOf()
    expect(viewObj).to.contain.oneOf(['View Objective','View Objective\nMandatory'])
    expect((await page.locator("xpath=(//div[@class='pb-5 MuiBox-root css-0'])[1]").innerText()).valueOf()).contains('Title')
    expect((await page.locator("xpath=(//div[@class='pb-5 MuiBox-root css-0'])[2]").innerText()).valueOf()).contains('Discipline')
    expect((await page.locator("xpath=//div[@class='MuiBox-root css-0']//b").innerText()).valueOf()).contains('Information')
})
Then("It should show Mandatory word if that objective is mandatory and Close button", async function () {
    //xpect((await page.locator("xpath=//div[@class='text-xs bg-gray-100 rounded-full px-3 py-2 MuiBox-root css-0']").innerText()).valueOf()).contains('Mandatory')
    expect(await page.locator("xpath=//button[contains(text(), 'Close')]").count()).to.be.eql(1)
})
When("I click on Close button", async function () {
    await page.locator("xpath=//button[contains(text(), 'Close')]").click()
})
Then("Popup should get closed", async function () {
    expect(await page.locator("xpath=//div[@class='flex justify-start items-center gap-5 MuiBox-root css-0']").count()).to.be.eql(0)
})
Then("I verify Objective presence in other Investment Types", async function () {
    //expect(await page.locator("xpath=//div[contains(text(),'Understand the Commercial Economics of the Investment')]")).to.exist
    for(let j=0; j<2;j++){
    await page.locator("xpath=(//div[@class='text-pink-400 MuiBox-root css-0'])").nth(j).click();
    let cnt1=await page.locator("xpath=//div[@class='text-sm MuiBox-root css-0']").count()
    let flag1:number=0
    for(let i=0;i<cnt1;i++){
    let ObjInOtherIT=await page.locator("xpath=//div[@class='text-sm MuiBox-root css-0']").nth(i).innerText()
    if(ObjInOtherIT==="Understand the Commercial Economics of the Investment"){flag1=1}
    }
    if(flag1==1){}
    else{await page.locator("xpath=Objective not available").click()}
    //await page.locator("xpath=(//div[@class='text-pink-400 MuiBox-root css-0'])[2]").click();
    }

    await page.locator("xpath=(//div[@class='MuiSelect-select MuiSelect-outlined MuiInputBase-input MuiOutlinedInput-input css-qiwgdb'])[1]").click()
    await page.locator("text=Brownfields").click()
    await page.waitForTimeout(2000)
    await page.locator("xpath=(//div[@class='MuiSelect-select MuiSelect-outlined MuiInputBase-input MuiOutlinedInput-input css-qiwgdb'])[2]").click()
    await page.locator("xpath=(//span[@class='MuiTypography-root MuiTypography-body1 MuiListItemText-primary css-yb0lig'])[1]").click()
    await page.waitForTimeout(2000)
    await page.locator("xpath=(//div[@class='text-pink-400 MuiBox-root css-0'])[1]").click();
    let cnt=await page.locator("xpath=//div[@class='text-sm MuiBox-root css-0']").count()
    let flag:number=0
    for(let i=0;i<cnt;i++){
    let ObjInOtherIT=await page.locator("xpath=//div[@class='text-sm MuiBox-root css-0']").nth(i).innerText()
    if(ObjInOtherIT==="Understand the Commercial Economics of the Investment"){flag=1}
    }
    if(flag==1){}
    else{await page.locator("xpath=Objective not available").click()}
    //expect(await page.locator("xpath=//div[contains(text(),'Understand the Commercial Economics of the Investment')]")).to.exist
    
    await page.locator("xpath=(//div[@class='MuiSelect-select MuiSelect-outlined MuiInputBase-input MuiOutlinedInput-input css-qiwgdb'])[1]").click()
    await page.locator("text=Greenfields").click()
    await page.waitForTimeout(2000)
    await page.locator("xpath=(//div[@class='MuiSelect-select MuiSelect-outlined MuiInputBase-input MuiOutlinedInput-input css-qiwgdb'])[2]").click()
    await page.locator("xpath=(//span[@class='MuiTypography-root MuiTypography-body1 MuiListItemText-primary css-yb0lig'])[1]").click()
    await page.waitForTimeout(2000)
    await page.locator("xpath=(//div[@class='bg-white px-2 rounded-full font-semibold text-assess MuiBox-root css-0'])[1]").click();
})
When("I click on edit icon", async function () {
    await page.locator(`xpath=(//div[contains(text(), '${addNewObjectivename}')]//following-sibling::div/div)[1]`).hover({force:true,timeout:2000, trial:true})
    //await page.locator("xpath=(//div[@class='group flex MuiBox-root css-0'])[1]").hover({force:true,timeout:2000, trial:true})
    await page.locator(`((//div[contains(text(), '${addNewObjectivename}')]//following-sibling::div/div)[1]//div)[5]/button`).click()
})
When("I click on the edit icon", async function () {
    await page.locator(`(//div[@class='group flex MuiBox-root css-0'])[1]`).hover({force:true,timeout:2000, trial:true})
    await page.locator(`(//button[@aria-label='Edit'])[1]`).click({force:true})
})
When("I click edit icon again", async function () {
    await page.locator("xpath=(//div[@class='group flex MuiBox-root css-0'])[1]").hover({force:true,timeout:2000, trial:true})
    await page.locator("xpath=(//button[@aria-label='Edit'])[1]").click()
})
When("Edit Objective popup should open and it should show Title, Information, Discipline and Mandatory fields", async function () {
    expect(await page.locator("xpath=//div[@role='dialog']").count()).to.be.eql(1)
    let editObj=(await page.locator("xpath=//div[@class='flex justify-start items-center gap-5 MuiBox-root css-0']").innerText()).valueOf()
    expect(editObj).to.contain.oneOf(['Edit Objective','Edit Objective\nMandatory'])
    expect((await page.locator("xpath=(//div[@class='font-semibold pb-1 MuiBox-root css-0'])[1]").innerText()).valueOf()).contains('Title')
    expect((await page.locator("xpath=(//div[@class='font-semibold pb-1 MuiBox-root css-0'])[2]").innerText()).valueOf()).contains('Discipline')
    expect((await page.locator("xpath=(//div[@class='font-semibold pb-1 MuiBox-root css-0'])[3]").innerText()).valueOf()).contains('Mandatory')
    expect((await page.locator("xpath=(//div[@class='font-semibold pb-1 MuiBox-root css-0'])[4]").innerText()).valueOf()).contains('Information')
})
When("All should be editable and it should show Save and Cancel buttons", async function () {
    expect(await page.locator("xpath=//button[contains(text(), 'Save')]").count()).to.be.eql(1)
    expect(await page.locator("xpath=//button[contains(text(), 'Cancel')]").count()).to.be.eql(1)
    expect(await page.locator("xpath=//textarea[@name='title']").isEditable()).to.be.true
    expect(await page.locator("xpath=//textarea[@name='information']").isEditable()).to.be.true
    expect(await page.locator("xpath=//input[@name='discipline']").isEditable()).to.be.true
    expect(await page.locator("xpath=//input[@name='mandatory']").isEditable()).to.be.true
})
When("I Edit the Objective and click on Save button", async function () {
    editObjectivename= Math.random().toString(20).substr(2, 6)
    editObjectivename="EditObjective"+editObjectivename
    await page.locator("xpath=//textarea[@name='title']").fill(editObjectivename)
    //objectEditTitle=(await page.locator("xpath=//textarea[@name='title']").innerText()).valueOf()
    await page.locator("xpath=//button[contains(text(), 'Save')]").click()
})
Then("Objective should gets updated as edited by user", async function () {
    let cnt1=await page.locator("//div[@class='w-2/5 p-2 flex justify-between items-start MuiBox-root css-0']/div[@class='text-sm MuiBox-root css-0']").count()
    let flag1:number=0
    for(let i=0;i<cnt1;i++)
    {
      let newlyaddedObj=await page.locator("xpath=//div[@class='text-sm MuiBox-root css-0']").nth(i).innerText()
      if(newlyaddedObj===editObjectivename)
      {
        flag1=1
        break
      }
    }
    if(flag1==1){}
    else{await page.locator("xpath=Objective not edited").click()}
  })


Then("Objective edit successful toaster message should appear", async function () {
    expect((await page.locator("xpath=//div[@role='alert']").last().innerText()).valueOf()).to.includes('Objective edit successful')    
})
Then("objective should get updated as edited by user for that particular Roadmap and Phase", async function () {
    //expect(await page.locator('text="Edit Playwright"')).to.exist
    let cnt2=await page.locator("xpath=//div[@class='text-sm MuiBox-root css-0']").count()
    let flag2:number=0
    for(let i=0;i<cnt2;i++){
    let ObjInOtherIT=await page.locator("xpath=//div[@class='text-sm MuiBox-root css-0']").nth(i).innerText()
    if(ObjInOtherIT===editObjectivename)
    {
        flag2=1
    }
    }
    if(flag2==1){}
    else{await page.locator("xpath=archana").click()}
    

    await page.locator("xpath=(//div[@class='text-pink-400 MuiBox-root css-0'])[2]").click();//click on second phase
    let cnt1=await page.locator("xpath=//div[@class='text-sm MuiBox-root css-0']").count()
    let flag1:number=0
    for(let i=0;i<cnt1;i++){
    let ObjInOtherIT=await page.locator("xpath=//div[@class='text-sm MuiBox-root css-0']").nth(i).innerText()
    if(ObjInOtherIT===editObjectivename){flag1=1}
    }
    if(flag1==1){await page.locator("xpath=objective got edited in other phase also").click()}
    else{}
   

    await page.locator("xpath=(//div[@class='MuiSelect-select MuiSelect-outlined MuiInputBase-input MuiOutlinedInput-input css-qiwgdb'])[1]").click()
    await page.locator("//span[@class='MuiTypography-root MuiTypography-body1 MuiListItemText-primary css-yb0lig' and contains(text(), 'Brownfield')]").click()
    await page.waitForTimeout(2000)
    await page.locator("xpath=(//div[@class='MuiSelect-select MuiSelect-outlined MuiInputBase-input MuiOutlinedInput-input css-qiwgdb'])[2]").click()
    await page.locator("xpath=(//span[@class='MuiTypography-root MuiTypography-body1 MuiListItemText-primary css-yb0lig'])[1]").click()
    await page.waitForTimeout(2000)
    //await page.locator("xpath=(//div[@class='bg-white px-2 rounded-full font-semibold text-assess MuiBox-root css-0'])[1]").click();
    await page.locator(`//div[@class='bg-white px-2 rounded-full font-semibold text-${currentPhase} MuiBox-root css-0']`).click()
    let cnt=await page.locator("xpath=//div[@class='text-sm MuiBox-root css-0']").count()
    let flag:number=0
    for(let i=0;i<cnt;i++){
    let ObjInOtherIT=await page.locator("xpath=//div[@class='text-sm MuiBox-root css-0']").nth(i).innerText()
    if(ObjInOtherIT===editObjectivename){flag=1}
    }
    if(flag==1){await page.locator("xpath=objective got edited for other roadma also").click()}
    else{}
    

    await page.locator("xpath=(//div[@class='MuiSelect-select MuiSelect-outlined MuiInputBase-input MuiOutlinedInput-input css-qiwgdb'])[1]").click()
    await page.locator("//span[@class='MuiTypography-root MuiTypography-body1 MuiListItemText-primary css-yb0lig' and contains(text(), 'Greenfield')]").click()
    await page.waitForTimeout(2000)
    await page.locator("xpath=(//div[@class='MuiSelect-select MuiSelect-outlined MuiInputBase-input MuiOutlinedInput-input css-qiwgdb'])[2]").click()
    await page.locator("xpath=(//span[@class='MuiTypography-root MuiTypography-body1 MuiListItemText-primary css-yb0lig'])[1]").click()
    await page.waitForTimeout(2000)
    await page.locator("xpath=(//div[@class='bg-white px-2 rounded-full font-semibold text-assess MuiBox-root css-0'])[1]").click();
})

When("I Edit the Objective and click on Cancel button", async function () {
    await page.locator("xpath=//textarea[@name='title']").fill("CancelEditPlaywright")
    await page.locator("xpath=//button[contains(text(), 'Cancel')]").click()
})
Then("Objective should not get updated as edited by user and No toaster message", async function () {
    expect(await page.locator("xpath=//div[@role='alert']").count()).to.eql(0)
    expect((await page.locator("xpath=(//div[@class='text-sm MuiBox-root css-0'])[1]").innerText()).valueOf()).to.not.includes("CancelEditPlaywright")
})

Then("I verify Objective in other Investment Types and phases", async function () {
    //expect(await page.locator("xpath=//div[contains(text(),'Understand the Commercial Economics of the Investment')]")).to.exist
    for(let j=0; j<2;j++){
    await page.locator("xpath=(//div[@class='text-pink-400 MuiBox-root css-0'])").nth(j).click();
    let cnt1=await page.locator("xpath=//div[@class='text-sm MuiBox-root css-0']").count()
    let flag1:number=0
    for(let i=0;i<cnt1;i++){
    let ObjInOtherIT=await page.locator("xpath=//div[@class='text-sm MuiBox-root css-0']").nth(i).innerText()
    if(ObjInOtherIT==="EditPlaywright"){flag1=1}
    }
    if(flag1==1){}
    else{await page.locator("xpath=archana").click()}
    //await page.locator("xpath=(//div[@class='text-pink-400 MuiBox-root css-0'])[2]").click();
    }

    await page.locator("xpath=(//div[@class='MuiSelect-select MuiSelect-outlined MuiInputBase-input MuiOutlinedInput-input css-qiwgdb'])[1]").click()
    await page.locator("text=Greenfields").click()
    await page.waitForTimeout(2000)
    await page.locator("xpath=(//div[@class='MuiSelect-select MuiSelect-outlined MuiInputBase-input MuiOutlinedInput-input css-qiwgdb'])[2]").click()
    await page.locator("xpath=(//span[@class='MuiTypography-root MuiTypography-body1 MuiListItemText-primary css-yb0lig'])[1]").click()
    await page.waitForTimeout(2000)
    await page.locator("xpath=(//div[@class='text-pink-400 MuiBox-root css-0'])[1]").click();
    let cnt=await page.locator("xpath=//div[@class='text-sm MuiBox-root css-0']").count()
    let flag:number=0
    for(let i=0;i<cnt;i++){
    let ObjInOtherIT=await page.locator("xpath=//div[@class='text-sm MuiBox-root css-0']").nth(i).innerText()
    if(ObjInOtherIT==="EditPlaywright"){flag=1}
    }
    if(flag==1){}
    else{await page.locator("xpath=archana").click()}
    //expect(await page.locator("xpath=//div[contains(text(),'Understand the Commercial Economics of the Investment')]")).to.exist
    
    await page.locator("xpath=(//div[@class='MuiSelect-select MuiSelect-outlined MuiInputBase-input MuiOutlinedInput-input css-qiwgdb'])[1]").click()
    await page.locator("text=Brownfields").click()
    await page.waitForTimeout(2000)
    await page.locator("xpath=(//div[@class='MuiSelect-select MuiSelect-outlined MuiInputBase-input MuiOutlinedInput-input css-qiwgdb'])[2]").click()
    await page.locator("xpath=(//span[@class='MuiTypography-root MuiTypography-body1 MuiListItemText-primary css-yb0lig'])[1]").click()
    await page.waitForTimeout(2000)
    await page.locator("xpath=(//div[@class='bg-white px-2 rounded-full font-semibold text-assess MuiBox-root css-0'])[1]").click();
})
When("I click on delete icon", async function () {
    await page.locator(`xpath=(//div[contains(text(), '${addNewObjectivename}')]//following-sibling::div/div)[1]`).hover({force:true,timeout:2000, trial:true})
    await page.locator(`((//div[contains(text(), '${addNewObjectivename}')]//following-sibling::div/div)[1]//div)[4]/button`).click()
    // await page.locator("xpath=(//div[contains(text(), 'EditPlaywright')]//following-sibling::div/div)[1]").hover({force:true,timeout:2000, trial:true})
    // //await page.locator("xpath=(//div[@class='group flex MuiBox-root css-0'])[1]").hover({force:true,timeout:2000, trial:true})
    // await page.locator("xpath=(//button[@aria-label='Delete'])[1]").click()
})
When("I click delete icon again", async function () {
    deleteCancel=await page.locator("xpath=(//div[@class='text-sm MuiBox-root css-0'])[1]").innerText()
    await page.locator("xpath=(//div[@class='group flex MuiBox-root css-0'])[1]").hover({force:true,timeout:2000, trial:true})
    await page.locator("xpath=(//button[@aria-label='Delete'])[1]").click()
})
Then("Delete Objective popup should open with a message Are you sure you want to delete objective and Confirm and Cancel button", async function () {
    let deleteObj=(await page.locator("xpath=//div[@class='flex justify-start items-center gap-5 MuiBox-root css-0']").innerText()).valueOf()
    expect(deleteObj).to.contain.oneOf(['Delete Objective','Delete Objective\nMandatory'])
    expect((await page.locator("xpath=//div[@class='MuiDialogContent-root py-4 css-1ty026z']").innerText())).contains(`Are you sure you want to delete objective "${addNewObjectivename}"?`)
    expect(await page.locator("xpath=//button[contains(text(), 'Confirm')]").count()).to.be.eql(1)
    expect(await page.locator("xpath=//button[contains(text(), 'Cancel')]").count()).to.be.eql(1)
})
When("I click on Confirm button", async function () {
    await page.locator("xpath=//button[contains(text(), 'Confirm')]").click()
})    
Then("Objective delete successful toaster message should appear", async function () {
    expect((await page.locator("xpath=//div[@role='alert']").last().innerText()).valueOf()).to.includes('Objective delete successful')    
})

Then("Objective should get deleted along with its associated deliverables for that particular Roadmap and Phase", async function () {
    let cnt2=await page.locator("xpath=//div[@class='text-sm MuiBox-root css-0']").count()
    let flag2:number=0
    for(let i=0;i<cnt2;i++){
    let ObjInOtherIT=await page.locator("xpath=//div[@class='text-sm MuiBox-root css-0']").nth(i).innerText()
    if(ObjInOtherIT===addNewObjectivename)
    {
        flag2=1
    }
    }
    if(flag2==1){await page.locator("xpath=objective not deleted").click()}
    else{}
    
    await page.locator("xpath=(//div[@class='text-pink-400 MuiBox-root css-0'])[2]").click();//click on second phase
    let cnt1=await page.locator("xpath=//div[@class='text-sm MuiBox-root css-0']").count()
    let flag1:number=0
    for(let i=0;i<cnt1;i++){
    let ObjInOtherIT=await page.locator("xpath=//div[@class='text-sm MuiBox-root css-0']").nth(i).innerText()
    if(ObjInOtherIT===addNewObjectivename){flag1=1}
    }
    if(flag1==1){}
    else{await page.locator("xpath=objective got deleted in other phase also").click()}
   
    await page.locator("xpath=(//div[@class='MuiSelect-select MuiSelect-outlined MuiInputBase-input MuiOutlinedInput-input css-qiwgdb'])[1]").click()
    await page.locator("text=Brownfields").click()
    await page.waitForTimeout(2000)
    await page.locator("xpath=(//div[@class='MuiSelect-select MuiSelect-outlined MuiInputBase-input MuiOutlinedInput-input css-qiwgdb'])[2]").click()
    await page.locator("xpath=(//span[@class='MuiTypography-root MuiTypography-body1 MuiListItemText-primary css-yb0lig'])[1]").click()
    await page.waitForTimeout(2000)
    //await page.locator("xpath=(//div[@class='bg-white px-2 rounded-full font-semibold text-assess MuiBox-root css-0'])[1]").click();
    currentPhase=currentPhase.toLowerCase()
    await page.locator(`//div[@class='bg-white px-2 rounded-full font-semibold text-${currentPhase} MuiBox-root css-0']`).click()
    let cnt=await page.locator("xpath=//div[@class='text-sm MuiBox-root css-0']").count()
    let flag:number=0
    for(let i=0;i<cnt;i++){
    let ObjInOtherIT=await page.locator("xpath=//div[@class='text-sm MuiBox-root css-0']").nth(i).innerText()
    if(ObjInOtherIT===addNewObjectivename){flag=1}
    }
    if(flag==1){}
    else{await page.locator("xpath=objective got deleted in other Investment types").click()}
    

    await page.locator("xpath=(//div[@class='MuiSelect-select MuiSelect-outlined MuiInputBase-input MuiOutlinedInput-input css-qiwgdb'])[1]").click()
    await page.locator("text=Greenfields").click()
    await page.waitForTimeout(2000)
    await page.locator("xpath=(//div[@class='MuiSelect-select MuiSelect-outlined MuiInputBase-input MuiOutlinedInput-input css-qiwgdb'])[2]").click()
    await page.locator("xpath=(//span[@class='MuiTypography-root MuiTypography-body1 MuiListItemText-primary css-yb0lig'])[1]").click()
    await page.waitForTimeout(2000)
    await page.locator("xpath=(//div[@class='bg-white px-2 rounded-full font-semibold text-assess MuiBox-root css-0'])[1]").click();
})
When("I click on Cancel button", async function () {
    await page.locator("xpath=//button[contains(text(), 'Cancel')]").click()
})    
Then("Objective should not get deleted and No toaster message", async function () {
    expect(await page.locator("xpath=//div[@role='alert']").count()).to.eql(0)
    expect((await page.locator("xpath=(//div[@class='text-sm MuiBox-root css-0'])[1]").innerText()).valueOf()).to.includes(deleteCancel)  
})
When("I click on add icon", async function () {
    await page.locator("xpath=(//div[@class='group flex MuiBox-root css-0'])[1]").hover({force:true,timeout:2000, trial:true})
    await page.locator("xpath=(//button[@aria-label='Add Deliverables'])[1]").click()
})
Then("Add Deliverable popup should open and it should contain Title and Informatin free text fields, Add and Cancel buttons", async function () {
    let addDelivrbl=(await page.locator("xpath=//div[@class='flex justify-start items-center gap-5 MuiBox-root css-0']").innerText()).valueOf()
    expect(addDelivrbl).to.contain.oneOf(['Add Deliverable','Add Deliverable\nMandatory'])
    expect((await page.locator("xpath=(//div[@class='font-semibold pb-1 MuiBox-root css-0'])[1]").innerText()).valueOf()).contains('Title')
    expect((await page.locator("xpath=(//div[@class='font-semibold pb-1 MuiBox-root css-0'])[2]").innerText()).valueOf()).contains('Information')
    await page.locator("xpath=//textarea[@name='title']").isEditable()
    await page.locator("xpath=//textarea[@name='information']").isEditable()
    expect(await page.locator("xpath=//button[contains(text(), 'Add')]").count()).to.be.eql(1)
    expect(await page.locator("xpath=//button[contains(text(), 'Cancel')]").count()).to.be.eql(1)
})
When("I Enter all the details and click on Add button", async function () {
    addDeliverable= Math.random().toString(20).substr(2, 6)
    addDeliverable="Deliverable"+addDeliverable
    await page.locator("xpath=//textarea[@name='title']").fill(addDeliverable)
    await page.locator("xpath=//textarea[@name='information']").fill(addDeliverable)
    await page.locator("xpath=//button[contains(text(), 'Add')]").click()
    await page.waitForTimeout(3000)
})
When("I Enter all the details and click on Cancel button", async function () {
    await page.locator("xpath=//textarea[@name='title']").fill('Cancel deliverable playwright')
    await page.locator("xpath=//textarea[@name='information']").fill('Cancel deliverable playwright')
    await page.locator("xpath=//button[contains(text(), 'Cancel')]").click()
})
Then("Deliverable add successful toaster message should appear and that deliverable should be added to that particular Objective", async function () {
    expect((await page.locator("xpath=//div[@role='alert']").last().innerText()).valueOf()).to.includes('Deliverable add successful') 
    let newDeliverablecnt=await page.locator("xpath=(//div[@class='flex border-x border-b MuiBox-root css-0'])[1]//div[@class='w-3/5 border-l MuiBox-root css-0']/child::div").count()
    let flag=0;
    for(let i=0;i<newDeliverablecnt;i++){
        let newDeliverable=await page.locator("xpath=(//div[@class='flex border-x border-b MuiBox-root css-0'])[1]//div[@class='w-3/5 border-l MuiBox-root css-0']/child::div").nth(i).innerText()
        if(newDeliverable===addDeliverable)
        {
            flag=1
            break
        }
    }
    if(flag!=1){await page.locator("xpath=Deliverable not added").click()}
})
Then("That deliverable should not be added to that particular Objective and No toaster message", async function () {
    expect(await page.locator("xpath=//div[@role='alert']").count()).to.eql(0)
    let newDeliverablecnt=await page.locator("xpath=(//div[@class='flex border-x border-b MuiBox-root css-0'])[1]//div[@class='w-3/5 border-l MuiBox-root css-0']/child::div").count()
    let flag=0;
    for(let i=0;i<newDeliverablecnt;i++){
        let newDeliverable=await page.locator("xpath=(//div[@class='flex border-x border-b MuiBox-root css-0'])[1]//div[@class='w-3/5 border-l MuiBox-root css-0']/child::div").nth(i).innerText()
        if(newDeliverable==='Cancel deliverable playwright'){flag=1}
    }
    if(flag==1){await page.locator("xpath=Deliverable not added").click()}
})
Then("I Click on any phase and then hover the mouse on 3 dots of any deliverable", async function () {
    await page.locator("xpath=(//div[@class='text-pink-400 MuiBox-root css-0'])[1]").click();
    await page.locator("xpath=(//div[@class='group flex MuiBox-root css-0'])[2]").hover({force:true,timeout:2000, trial:true})
})
Then("I Click on any phase", async function () {
    await page.locator("xpath=(//div[@class='text-pink-400 MuiBox-root css-0'])[1]").click();
})
Then("It should show view, edit and Delete icons", async function () {
    await page.locator("xpath=(//div[@class='group flex MuiBox-root css-0'])[2]").hover({force:true,timeout:2000, trial:true})
    await page.locator("xpath=(//div[@class='hidden absolute group-hover:block right-0 MuiBox-root css-0'])[2]").screenshot({path:'Screenshots\\iconsOfDeliverablesActual.png'})
    //compareScreenshots('Screenshots\\iconsOfDeliverablesExpected.png', 'Screenshots\\iconsOfDeliverablesActual.png')
})
Then("View Deliverable popup should open and should show Title and Information fields and Close button", async function () {
    expect(await page.locator("xpath=//div[@role='dialog']").count()).to.be.eql(1)
    let viewDel=(await page.locator("xpath=//div[@class='flex justify-start items-center gap-5 MuiBox-root css-0']").innerText()).valueOf()
    expect(viewDel).to.contain.oneOf(['View Deliverable','View Deliverable\nMandatory'])
    expect((await page.locator("xpath=(//div[@class='pb-5 MuiBox-root css-0'])[1]").innerText()).valueOf()).contains('Title')
    expect((await page.locator("xpath=//div[@class='MuiBox-root css-0']//b").innerText()).valueOf()).contains('Information')
    expect(await page.locator("xpath=//button[contains(text(), 'Close')]").count()).to.be.eql(1)
})
When("I click edit icon of deliverable", async function () {
    await page.locator("xpath=(//div[@class='group flex MuiBox-root css-0'])[2]").hover({force:true,timeout:2000})
    await page.locator("xpath=(//button[@aria-label='Edit'])[2]").click({force:true})
})
Then("Edit Deliverable popup should open and it should show Title and Information fields", async function () {
    expect(await page.locator("xpath=//div[@role='dialog']").count()).to.be.eql(1)
    let editDel=(await page.locator("xpath=//div[@class='flex justify-start items-center gap-5 MuiBox-root css-0']").innerText()).valueOf()
    expect(editDel).to.contain.oneOf(['Edit Deliverable','Edit Deliverable\nMandatory'])
    expect((await page.locator("xpath=(//div[@class='font-semibold pb-1 MuiBox-root css-0'])[1]").innerText()).valueOf()).contains('Title')
    expect((await page.locator("xpath=(//div[@class='font-semibold pb-1 MuiBox-root css-0'])[2]").innerText()).valueOf()).contains('Information')
})
Then("All fields should be editable and it should show Save and Cancel buttons", async function () {
    expect(await page.locator("xpath=//button[contains(text(), 'Save')]").count()).to.be.eql(1)
    expect(await page.locator("xpath=//button[contains(text(), 'Cancel')]").count()).to.be.eql(1)
    await page.locator("xpath=//textarea[@name='title']").isEditable()
    await page.locator("xpath=//textarea[@name='information']").isEditable()
})
When("I Edit the Deliverable and click on Save button", async function () {
    editDeliverable= Math.random().toString(20).substr(2, 6)
    editDeliverable="NewObjective"+editDeliverable
    await page.locator("xpath=//textarea[@name='title']").fill(editDeliverable)
    await page.locator("xpath=//button[contains(text(), 'Save')]").click()
})
Then("Deliverable edit successful toaster message should appear", async function () {
    expect((await page.locator("xpath=//div[@role='alert']").last().innerText()).valueOf()).to.includes('Deliverable edit successful')    
})
When("I click the delete icon of deliverable where only one deliverable is present", async function () {
    let totalObj=await page.locator("(//div[@class='flex border-x border-b MuiBox-root css-0'])").count()
    for(let i=0;i<totalObj;i++)
    {
    let noOfDelForEachObj=await page.locator(`(//div[@class='w-3/5 border-l MuiBox-root css-0'])[${i}]/div`).count()
    if(noOfDelForEachObj==1)
    {
        await page.locator(`((//div[@class='w-3/5 border-l MuiBox-root css-0'])[${i}]/div/div//following::div)[1]`).hover({force:true,timeout:2000})
        await page.locator(`((//div[@class='w-3/5 border-l MuiBox-root css-0'])[${i}]/div/div//following::div)[1]/div/div//button[@aria-label='Delete']`).click()
        break
    }
    }
    
})
Then("You can't delete last Deliverable ! toaster message should appear", async function () {
    expect((await page.locator("xpath=//div[@role='alert']").last().innerText()).valueOf()).to.includes("You can't delete last Deliverable !")    
})
Then("Deliverable should get updated as edited by user", async function () {
    expect((await page.locator("xpath=(//div[@class='text-sm MuiBox-root css-0'])[2]").innerText()).valueOf()).to.includes(editDeliverable)    
})
When("I Edit the Deliverable and click on Cancel button", async function () {
    await page.locator("xpath=//textarea[@name='title']").type("Cancel deliverable playwright")
    await page.locator("xpath=//button[contains(text(), 'Cancel')]").click()
})
Then("Deliverable should not get updated as edited by user and No toaster message", async function () {
    expect(await page.locator("xpath=//div[@role='alert']").count()).to.eql(0)
    expect((await page.locator("xpath=(//div[@class='text-sm MuiBox-root css-0'])[2]").innerText()).valueOf()).to.not.includes('Cancel deliverable playwright')
})
When("I click delete icon of deliverable", async function () {
    // deleteDeliverable=await page.locator("xpath=(//div[@class='text-sm MuiBox-root css-0'])[2]").innerText()
    // await page.locator("xpath=(//div[@class='group flex MuiBox-root css-0'])[2]").hover({force:true,timeout:2000})
    // await page.locator("xpath=(//button[@aria-label='Delete'])[2]").click()

    let totalObj=await page.locator("(//div[@class='flex border-x border-b MuiBox-root css-0'])").count()
    for(let i=1;i<totalObj;i++)
    {
    let noOfDelForEachObj=await page.locator(`(//div[@class='w-3/5 border-l MuiBox-root css-0'])[${i}]/div`).count()
    if(noOfDelForEachObj!=1)
    {
        deliverableDeleteCancel=i;
        deleteDeliverable=await page.locator(`((//div[@class='w-3/5 border-l MuiBox-root css-0'])[${i}]//div[@class='text-sm MuiBox-root css-0'])[1]`).innerText()
        await page.locator(`((//div[@class='w-3/5 border-l MuiBox-root css-0'])[${i}]/div/div//following::div)[1]`).hover({force:true,timeout:2000})
        await page.locator(`((//div[@class='w-3/5 border-l MuiBox-root css-0'])[${i}]/div/div//following::div)[1]/div/div//button[@aria-label='Delete']`).click()
        break
    }
    }
})

Then("Delete Deliverable popup should open with a message Are you sure you want to delete deliverable and Confirm and Cancel button", async function () {
    let deleteDel=(await page.locator("xpath=//div[@class='flex justify-start items-center gap-5 MuiBox-root css-0']").innerText()).valueOf()
    expect(deleteDel).to.contain.oneOf(['Delete Deliverable','Delete Deliverable\nMandatory'])
    expect((await page.locator("xpath=//div[@class='MuiDialogContent-root py-4 css-1ty026z']").innerText()).valueOf()).to.eql(`Are you sure you want to delete deliverable "${deleteDeliverable}"?`)
    expect(await page.locator("xpath=//button[contains(text(), 'Confirm')]").count()).to.be.eql(1)
    expect(await page.locator("xpath=//button[contains(text(), 'Cancel')]").count()).to.be.eql(1)
})
Then("Deliverable delete successful toaster message should appear", async function () {
    expect((await page.locator("xpath=//div[@role='alert']").last().innerText()).valueOf()).to.includes('Deliverable delete successful')    
})
Then("Deliverable should get deleted", async function () {
    let cnt=await page.locator("((//div[@class='w-3/5 border-l MuiBox-root css-0'])//div[@class='text-sm MuiBox-root css-0'])").count()
    expect((await page.locator(`((//div[@class='w-3/5 border-l MuiBox-root css-0'])[${deliverableDeleteCancel}]//div[@class='text-sm MuiBox-root css-0'])[1]`).innerText()).valueOf()).to.not.eql(deleteDeliverable) 
})
Then("Deliverable should not get deleted and No toaster message", async function () {
    expect(await page.locator("xpath=//div[@role='alert']").count()).to.eql(0)
    let cnt=await page.locator("((//div[@class='w-3/5 border-l MuiBox-root css-0'])//div[@class='text-sm MuiBox-root css-0'])").count()
    expect((await page.locator(`((//div[@class='w-3/5 border-l MuiBox-root css-0'])[${deliverableDeleteCancel}]//div[@class='text-sm MuiBox-root css-0'])[1]`).innerText()).valueOf()).to.eql(deleteDeliverable)
})

When("I hover mouse on any Phase", async function () {
    currentPhase=await page.locator("(//div[@class='flex items-center text-white font-semibold MuiBox-root css-0'])[1]").innerText()
    await page.hover("xpath=(//div[@class='flex justify-between items-center MuiBox-root css-0'])[1]")
    nxtPhase=await page.locator("(//div[@class='flex items-center text-white font-semibold MuiBox-root css-0'])[2]").innerText()
})
Then("It should show Add button at the start and end of that phase, Edit and Delete button on that phase", async function () {
    expect(await page.locator("xpath=(//*[@data-testid='AddCircleOutlineRoundedIcon'])[1]")).to.exist
    expect(await page.locator("xpath=(//*[@data-testid='AddCircleOutlineRoundedIcon'])[2]")).to.exist
    expect(await page.locator("(//*[@data-testid='EditRoundedIcon'])[1]")).to.exist
    expect(await page.locator("(//*[@data-testid='DeleteRoundedIcon'])[1]")).to.exist
})
When("I click on starting add button of that phase", async function () {
    await page.hover("(//div[@class='text-pink-400 MuiBox-root css-0'])[1]")
    if(await page.locator("xpath=(//*[@data-testid='AddCircleOutlineRoundedIcon'])[1]").isVisible())
    {
        await page.locator("xpath=(//*[@data-testid='AddCircleOutlineRoundedIcon'])[1]").click()
    }
    else{
        await page.locator("(//*[@data-testid='AddRoundedIcon'])[1]").click()
    }
})
When("I click on ending add button of that phase", async function () {
    await page.hover("(//div[@class='text-pink-400 MuiBox-root css-0'])[1]")
    if(await page.locator("xpath=(//*[@data-testid='AddCircleOutlineRoundedIcon'])[2]").isVisible())
    {
        await page.locator("xpath=(//*[@data-testid='AddCircleOutlineRoundedIcon'])[2]").click()
    }
    else{
        await page.locator("(//*[@data-testid='AddRoundedIcon'])[2]").click()
    }
})
Then("Add Phase popup should  open and it should contain a drop down", async function () {
    expect(await page.locator("xpath=//div[@role='dialog']").count()).to.be.eql(1)
    expect((await page.locator("xpath=//h2[@class='MuiTypography-root MuiTypography-h6 MuiDialogTitle-root capitalize css-ohyacs']").innerText()).valueOf()).to.eql('Add Phase')
    expect(await page.locator("xpath=//input[@name='phasename']")).to.exist
})
Then("Info: If you do not see any Phase, please make sure that it is added in admin Phase tab. Add and Cancel button", async function () {
    expect(await page.locator("text=Info: If you do not see any Phase, please make sure that it is added in admin Phase tab.")).to.exist
    expect(await page.locator("//button[contains(text(), 'Add')]")).to.exist
    expect(await page.locator("//button[contains(text(), 'Cancel')]")).to.exist

})
When("I Click on dropdown", async function () {
await page.locator("#mui-component-select-phasename").click()

})
Then("It should show all the phases available and Already added phases should be in view mode only", async function () {
    for(let i=0;i<totalNoOfPhases;i++){
        expect((await page.locator("//ul[@class='MuiList-root MuiList-padding MuiMenu-list css-r8u8y9']/li/div/span").nth(i).innerText()).valueOf()).to.eql(totalPhases[i])
    }
    if(await page.locator(`//li[@data-value="${nxtPhase}"]`).exist){
    expect(await page.locator(`//li[@data-value="${nxtPhase}"]`).getAttribute('aria-disabled')).to.eql('true')
}
})
Then("I will store all the Phases", async function () {
        totalNoOfPhases=await page.locator("//td[@class='MuiTableCell-root MuiTableCell-body MuiTableCell-sizeMedium border-l css-q34dxg']").count()
        for(let i=0;i<totalNoOfPhases;i++)
        {
                totalPhases[i]=await page.locator("//td[@class='MuiTableCell-root MuiTableCell-body MuiTableCell-sizeMedium border-l css-q34dxg']").nth(i).innerText()
        }
})
When("I slect a phase and click on Add button", async function () {
    // await page.locator(`//li[@data-value='${record.addPhaseStart}']`).click()
    // await page.locator("//button[contains(text(), 'Add')]").click()

  let cnt=await page.locator("//ul[@class='MuiList-root MuiList-padding MuiMenu-list css-r8u8y9']/li").count()
  for(let i=0;i<cnt;i++)
  {
  if(await page.locator("//ul[@class='MuiList-root MuiList-padding MuiMenu-list css-r8u8y9']/li").nth(i).isEditable())
  {
    await page.locator("//ul[@class='MuiList-root MuiList-padding MuiMenu-list css-r8u8y9']/li").nth(i).click()
    break
  }
  }
  addedPhaseByAdmin=await page.locator("//div[@id='mui-component-select-phasename']").innerText()
  await page.locator("//button[contains(text(), 'Add')]").click()
})
When("I slect phase and click on Add button", async function () {
    // await page.locator(`//li[@data-value='${record.addPhaseEnd}']`).click()
    // await page.locator("//button[contains(text(), 'Add')]").click()
  let cnt=await page.locator("//ul[@class='MuiList-root MuiList-padding MuiMenu-list css-r8u8y9']/li").count()
  for(let i=0;i<cnt;i++)
  {
  if(await page.locator("//ul[@class='MuiList-root MuiList-padding MuiMenu-list css-r8u8y9']/li").nth(i).isEditable())
  {
    await page.locator("//ul[@class='MuiList-root MuiList-padding MuiMenu-list css-r8u8y9']/li").nth(i).click()
    break
  }
  }
  addedPhaseByAdmin=await page.locator("//div[@id='mui-component-select-phasename']").innerText()
  await page.locator("//button[contains(text(), 'Add')]").click()
})
Then("Phase add successful toaster message should appear and Phase should get added at the start of the phase on which you have clicked add button", async function () {
    expect((await page.locator("xpath=//div[@role='alert']").last().innerText()).valueOf()).to.eql('Phase add successful') 
    expect((await page.locator("xpath=(//div[@class='flex items-center text-white font-semibold MuiBox-root css-0'])[1]").innerText()).valueOf()).to.eql(addedPhaseByAdmin) 
})
Then("Phase add successful toaster message should appear and Phase should get added at the end of the phase on which you have clicked add button", async function () {
    expect((await page.locator("xpath=//div[@role='alert']").last().innerText()).valueOf()).to.eql('Phase add successful') 
    expect((await page.locator("xpath=(//div[@class='flex items-center text-white font-semibold MuiBox-root css-0'])[2]").innerText()).valueOf()).to.eql(addedPhaseByAdmin) 
})
When("I click on edit button of that phase", async function () {
    await page.locator("xpath=(//*[@data-testid='EditRoundedIcon'])[1]").click()
})
Then("Edit Phase popup should open and it should contain a drop down", async function () {
    expect(await page.locator("xpath=//div[@role='dialog']").count()).to.be.eql(1)
    expect((await page.locator("xpath=//h2[@class='MuiTypography-root MuiTypography-h6 MuiDialogTitle-root capitalize css-ohyacs']").innerText()).valueOf()).to.eql('Edit Phase')
    expect(await page.locator("xpath=//input[@name='phasename']")).to.exist
})
Then("Info: If you do not see any Phase, please make sure that it is added in admin Phase tab. Save and Cancel button", async function () {
    expect(await page.locator("text=Info: If you do not see any Phase, please make sure that it is added in admin Phase tab.")).to.exist
    expect(await page.locator("//button[contains(text(), 'Save')]")).to.exist
    expect(await page.locator("//button[contains(text(), 'Cancel')]")).to.exist
})
When("I slect phase and click on Save button", async function () {
    // await page.locator(`//li[@data-value='${record.editPhase}']`).click()
    // await page.locator("//button[contains(text(), 'Save')]").click()
  let cnt=await page.locator("//ul[@class='MuiList-root MuiList-padding MuiMenu-list css-r8u8y9']/li").count()
  for(let i=0;i<cnt;i++)
  {
  if(await page.locator("//ul[@class='MuiList-root MuiList-padding MuiMenu-list css-r8u8y9']/li").nth(i).isEditable())
  {
    await page.locator("//ul[@class='MuiList-root MuiList-padding MuiMenu-list css-r8u8y9']/li").nth(i).click()
    break
  }
  }
await page.locator("//textarea[@name='justification']").type("Adding phase")
editedPhaseByAdmin=await page.locator("//div[@id='mui-component-select-phasename']").innerText()
await page.locator("//button[contains(text(), 'Save')]").click()
})
When("I slect phase and clicks Save button", async function () {
    // await page.locator(`//li[@data-value='${record.editPhase}']`).click()
    // await page.locator("//button[contains(text(), 'Save')]").click()
  let cnt=await page.locator("//ul[@class='MuiList-root MuiList-padding MuiMenu-list css-r8u8y9']/li").count()
  for(let i=0;i<cnt;i++)
  {
  if(await page.locator("//ul[@class='MuiList-root MuiList-padding MuiMenu-list css-r8u8y9']/li").nth(i).isEditable())
  {
    await page.locator("//ul[@class='MuiList-root MuiList-padding MuiMenu-list css-r8u8y9']/li").nth(i).click()
    break
  }
  }
editedPhaseByAdmin=await page.locator("//div[@id='mui-component-select-phasename']").innerText()
await page.locator("//button[contains(text(), 'Save')]").click()
})

Then("Phase edit successful toaster message should appear and Phase should get updated", async function () {
    expect((await page.locator("xpath=//div[@role='alert']").last().innerText()).valueOf()).to.eql('Phase edit successful') 
    expect((await page.locator("xpath=(//div[@class='flex items-center text-white font-semibold MuiBox-root css-0'])[1]").innerText()).valueOf()).to.eql(editedPhaseByAdmin) 
})
When("I click on delete button of that phase", async function () {
    await page.hover("(//div[@class='text-pink-400 MuiBox-root css-0'])[1]")
    await page.locator("xpath=(//*[@data-testid='DeleteRoundedIcon'])[1]").click()
})
Then("Phase delete successful toaster message should appear and Phase should get deleted", async function () {
    expect((await page.locator("xpath=//div[@role='alert']").last().innerText()).valueOf()).to.eql('Phase delete successful') 
    expect((await page.locator("xpath=(//div[@class='flex items-center text-white font-semibold MuiBox-root css-0'])[1]").innerText()).valueOf()).to.not.eql(currentPhase) 
})
Then("Delete Phase popup should open and it should show Are you sure you want to delete phase message and Confirm and Cancel buttons", async function () {
    let deletePhase=(await page.locator("//h2[@class='MuiTypography-root MuiTypography-h6 MuiDialogTitle-root capitalize css-ohyacs']").innerText()).valueOf()
    expect(deletePhase).to.contain.oneOf(['Delete Phase','Delete Phase\nMandatory'])
    expect((await page.locator("//div[@class='MuiDialogContent-root py-4 css-1ty026z']").innerText()).valueOf()).eql(`Are you sure you want to delete phase "${currentPhase}" ?` )
    expect(await page.locator("//button[contains(text(), 'Confirm')]").count()).to.be.eql(1)
    expect(await page.locator("//button[contains(text(), 'Cancel')]").count()).to.be.eql(1)
})
When("I click on Phase and the click on add Objective button", async function () {
    currentPhase=await page.locator("(//div[@class='flex items-center text-white font-semibold MuiBox-root css-0'])[1]").innerText()
    nxtPhase=await page.locator("(//div[@class='flex items-center text-white font-semibold MuiBox-root css-0'])[2]").innerText()
    await page.locator("xpath=(//div[@class='text-pink-400 MuiBox-root css-0'])[1]").click();
    await page.locator("//button[@aria-label='Add Objective']").click()
})
Then("Add Objective popup should open", async function () {
    expect(await page.locator("xpath=//div[@role='dialog']").count()).to.be.eql(1)
    expect(await page.locator("//h2[@class='MuiTypography-root MuiTypography-h6 MuiDialogTitle-root capitalize css-ohyacs']").innerText()).to.eql('Add Objective')
})
Then("It should show Title, Information, Discipline, Mandatory, Investment Roadmaps, Investment Phases in Objecive details section", async function () {
    expect(await page.locator("//h2[@class='MuiTypography-root MuiTypography-h6 MuiDialogTitle-root capitalize css-ohyacs']").innerText()).to.eql('Add Objective')
    expect(await page.locator("(//div[@class='font-semibold text-white MuiBox-root css-0'])[1]").innerText()).to.eql('Objective Details')
    expect(await page.locator("(//textarea[@name='title']//preceding-sibling::div)[1]").innerText()).to.eql('Title')
    expect(await page.locator("(//div[@id='mui-component-select-discipline']//parent::div[1]//preceding-sibling::div[1])[1]").innerText()).to.eql('Discipline')
    expect(await page.locator("(//div[@class='font-semibold pb-1 MuiBox-root css-0'])[3]").innerText()).to.eql('Mandatory')
    expect(await page.locator("(//textarea[@name='information']//preceding-sibling::div)[1]").innerText()).to.eql('Information')
    expect(await page.locator("//div[@name='roadmap']//child::div[1]").innerText()).to.eql('Investment Roadmaps')
    expect(await page.locator("//div[@name='phase']//child::div[1]").innerText()).to.eql('Investment Phases')
})
Then("I fill all the details in Objective details section and click on add button", async function () {
    addNewObjectivename= Math.random().toString(20).substr(2, 6)
    addNewObjectivename="NewObjective"+addNewObjectivename
    await page.locator("(//textarea[@name='title'])[1]").fill(`${addNewObjectivename}`)
    await page.locator("#mui-component-select-discipline").click()
    await page.locator("(//li[@class='MuiButtonBase-root MuiMenuItem-root MuiMenuItem-gutters MuiMenuItem-root MuiMenuItem-gutters css-1km1ehz'])[1]").click()
    await page.locator("//input[@name='mandatory']").check()
    await page.locator("(//textarea[@name='information'])[1]").fill(`${addNewObjectivename}`)
    await page.locator("//input[@class='PrivateSwitchBase-input css-1m9pwf3' and @value='Brownfields']").check()
    await page.locator("//input[@class='PrivateSwitchBase-input css-1m9pwf3' and @value='Greenfields']").check()
    await page.locator(`//input[@class='PrivateSwitchBase-input css-1m9pwf3' and @value='${currentPhase}']`).check()
    await page.locator(`//input[@class='PrivateSwitchBase-input css-1m9pwf3' and @value='${nxtPhase}']`).check()
    await page.locator("(//button[contains(text(),'Add')])[1]").click()
})
When("I click on Deliverable Details section and Add Deliverable button", async function () {
    await page.locator("(//*[@data-testid='ExpandMoreIcon'])[2]").click()
    await page.locator("//button[@class='MuiButtonBase-root MuiIconButton-root MuiIconButton-sizeMedium text-primary css-1yxmbwk']").click()  
})
When("I click on Objective Details section", async function () {
    await page.locator("text=Objective Details").click()
    //await page.locator("(//*[@data-testid='ExpandMoreIcon'])[2]").click()
})
Then("It should show Add Deliverable heading, Title and Information fields", async function () {
    expect(await page.locator("(//h2[@class='MuiTypography-root MuiTypography-h6 MuiDialogTitle-root capitalize css-ohyacs'])[2]").innerText()).to.eql('Add Deliverable')
    expect(await page.locator("(//textarea[@name='title']//preceding-sibling::div)[2]").innerText()).to.eql('Title')
    expect(await page.locator("(//textarea[@name='information']//preceding-sibling::div)[2]").innerText()).to.eql('Information')
})
When("I fill all the details in Deliverable details section and click on add button", async function () {   
    addDeliverable= Math.random().toString(20).substr(2, 6)
    addDeliverable="Deliverable"+addDeliverable

    await page.locator("(//textarea[@name='information'])[2]").fill(`${addDeliverable}`)
    await page.locator("(//textarea[@name='title'])[2]").fill(`${addDeliverable}`)  
    await page.locator("(//button[contains(text(),'Add')])[2]").click() 
})
Then("Objective add successful toaster message should appear", async function () {
    expect((await page.locator("xpath=//div[@role='alert']").last().innerText()).valueOf()).to.eql('Objective add successful') 
})
Then("Objective should get added at all the Investment types and Phases which we selected while adding", async function () {
    for(let j=0; j<2;j++){
        await page.locator("xpath=(//div[@class='text-pink-400 MuiBox-root css-0'])").nth(j).click();
        let cnt1=await page.locator("xpath=//div[@class='text-sm MuiBox-root css-0']").count()
        let flag1:number=0
        for(let i=0;i<cnt1;i++){
        let ObjInOtherIT=await page.locator("xpath=//div[@class='text-sm MuiBox-root css-0']").nth(i).innerText()
        if(ObjInOtherIT===addNewObjectivename)
        {
            flag1=1
            break
        }
        }
        if(flag1==1){}
        else{await page.locator("xpath=Objective not added").click()}
        }
    
        await page.locator("xpath=(//div[@class='MuiSelect-select MuiSelect-outlined MuiInputBase-input MuiOutlinedInput-input css-qiwgdb'])[1]").click()
        await page.locator("text=Brownfields").click()
        await page.waitForTimeout(2000)
        await page.locator("xpath=(//div[@class='MuiSelect-select MuiSelect-outlined MuiInputBase-input MuiOutlinedInput-input css-qiwgdb'])[2]").click()
        await page.locator("xpath=(//span[@class='MuiTypography-root MuiTypography-body1 MuiListItemText-primary css-yb0lig'])[1]").click()
        await page.waitForTimeout(2000)
        currentPhase=currentPhase.toLowerCase()
        if( await page.locator(`//div[@class='bg-white px-2 rounded-full font-semibold text-${currentPhase} MuiBox-root css-0']`).isVisible())
        {
        await page.locator(`//div[@class='bg-white px-2 rounded-full font-semibold text-${currentPhase} MuiBox-root css-0']`).click()
        let cnt=await page.locator("xpath=//div[@class='text-sm MuiBox-root css-0']").count()
        let flag:number=0
        for(let i=0;i<cnt;i++){
        let ObjInOtherIT=await page.locator("xpath=//div[@class='text-sm MuiBox-root css-0']").nth(i).innerText()
        if(ObjInOtherIT===addNewObjectivename)
        {
            flag=1
            break
        }
        }
        if(flag==1){}
        else{await page.locator("xpath=Objective not added").click()}
        }
        if( await page.locator(`//div[@class='bg-white px-2 rounded-full font-semibold text-${nxtPhase} MuiBox-root css-0']`).isVisible())
        {
        nxtPhase=nxtPhase.toLowerCase()
        await page.locator(`//div[@class='bg-white px-2 rounded-full font-semibold text-${nxtPhase} MuiBox-root css-0']`).click()
        let cnt1=await page.locator("xpath=//div[@class='text-sm MuiBox-root css-0']").count()
        let flag1:number=0
        for(let i=0;i<cnt1;i++){
        let ObjInOtherIT=await page.locator("xpath=//div[@class='text-sm MuiBox-root css-0']").nth(i).innerText()
        if(ObjInOtherIT===addNewObjectivename)
        {
            flag1=1
            break
        }
        }
        if(flag1==1){}
        else{await page.locator("xpath=Objective not added").click()}
        }

        await page.locator("xpath=(//div[@class='MuiSelect-select MuiSelect-outlined MuiInputBase-input MuiOutlinedInput-input css-qiwgdb'])[1]").click()
        await page.locator("text=Greenfields").click()
        await page.waitForTimeout(2000)
        await page.locator("xpath=(//div[@class='MuiSelect-select MuiSelect-outlined MuiInputBase-input MuiOutlinedInput-input css-qiwgdb'])[2]").click()
        await page.locator("xpath=(//span[@class='MuiTypography-root MuiTypography-body1 MuiListItemText-primary css-yb0lig'])[1]").click()
        await page.waitForTimeout(2000)
        await page.locator("xpath=(//div[@class='text-pink-400 MuiBox-root css-0'])[1]").click()

})

When("I click on Delete button of any record in {string} column", async function (Tabname) {
    deleterecord=await page.locator("(//td[contains(text(),'NewRecord')])[1]").innerText()
    await page.locator("(//td[contains(text(),'NewRecord')]//following-sibling::td/button[2])").first().click()
})
//cancel delete
When("I click Delete button of any record in {string} column", async function (Tabname) {
    deleterecord=await page.locator("(//td[@class='MuiTableCell-root MuiTableCell-body MuiTableCell-sizeMedium border-l css-q34dxg'])[1]").innerText()
    await page.locator("(//*[@aria-label='Delete'])").first().click()
})
//

When("Delete {string} popup should open with message Are you sure you want to delete {string} and Confirm and Cancel button", async function (Tabname, column1) {
expect(await page.locator("//div[@role='dialog']")).to.exist
expect(await page.locator("//h2[@class='MuiTypography-root MuiTypography-h6 MuiDialogTitle-root capitalize css-ohyacs']").innerText()).to.eql(`Delete ${Tabname}`)
expect(await page.locator("//div[@class='MuiDialogContent-root py-4 css-1ty026z']/div").innerText()).to.eql(`Are you sure you want to delete ${column1} "${deleterecord}"?`)
expect(await page.locator("//button[contains(text(), 'Confirm')]").count()).to.be.eql(1)
expect(await page.locator("//button[contains(text(), 'Cancel')]").count()).to.be.eql(1)
})
When("{string} delete successful toaster message should appear and {string} should get deleted", async function (Tabname, column1) {
    expect((await page.locator("xpath=//div[@role='alert']").last().innerText()).valueOf()).to.eql(`${Tabname} delete successful`) 
   let count=await page.locator("//td[@class='MuiTableCell-root MuiTableCell-body MuiTableCell-sizeMedium border-l css-q34dxg']").count()
   let recrd=0;
   for(let i=1;i<=count;i++)
   {
        if(await page.locator(`(//td[@class='MuiTableCell-root MuiTableCell-body MuiTableCell-sizeMedium border-l css-q34dxg'])[${i}]`).innerText()==deleterecord){
        recrd=1;
        break
   }
   }
   if(recrd==1){await page.locator("record not deleted").click()}
   //expect(await page.locator("(//td[@class='MuiTableCell-root MuiTableCell-body MuiTableCell-sizeMedium border-l css-q34dxg'])[1]").innerText()).to.not.eql(deleterecord)
})
When("{string} should not get deleted and No toaster message", async function (Tabname) {
    expect(await page.locator("xpath=//div[@role='alert']").count()).to.eql(0)
    //expect(await page.locator("(//td[@class='MuiTableCell-root MuiTableCell-body MuiTableCell-sizeMedium border-l css-q34dxg'])[1]").innerText()).to.eql(deleterecord)
    let count=await page.locator("//td[@class='MuiTableCell-root MuiTableCell-body MuiTableCell-sizeMedium border-l css-q34dxg']").count()
   let recrd=0;
   for(let i=1;i<=count;i++)
   {
        if(await page.locator(`(//td[@class='MuiTableCell-root MuiTableCell-body MuiTableCell-sizeMedium border-l css-q34dxg'])[${i}]`).innerText()==deleterecord){
        recrd=1;
        break
   }
   }
   if(recrd!=1){await page.locator("record deleted").click()}
})
When("{string} should not get deleted and no toaster message", async function (Tabname) {
    expect(await page.locator("xpath=//div[@role='alert']").count()).to.eql(0)
    let flag=0;
    let count=await page.locator(`(//tr[@class='MuiTableRow-root hover:bg-gray-100 css-1gqug66']/td[@class='MuiTableCell-root MuiTableCell-body MuiTableCell-sizeMedium border-l css-q34dxg'])//following::td[1]`).count()
    for(let i=1;i<=count;i++)
    {
    if(await page.locator(`(//tr[@class='MuiTableRow-root hover:bg-gray-100 css-1gqug66']/td[@class='MuiTableCell-root MuiTableCell-body MuiTableCell-sizeMedium border-l css-q34dxg'])[${i}]//following::td[1]`).innerText()==deleterecord)
    {
        flag=1
        break
    }
    }
    if(flag!=1){await page.locator("Label not deleted").click()}
})
When("{string} delete successful toaster message should appear and {string} should gets deleted from that particular label type", async function (Labelname,Tabname) {
    await page.waitForTimeout(1000)
    expect(await page.locator("xpath=//div[@role='alert']").last().innerText()).to.eql(`${Labelname} delete successful`) 
    let flag=0;
    let count=await page.locator(`//tr[@class='MuiTableRow-root hover:bg-gray-100 css-1gqug66']/td[contains(text(), '${Labelname}')]//following-sibling::td[1]`).count()
    for(let i=1;i<=count;i++)
    {
    if(await page.locator(`(//tr[@class='MuiTableRow-root hover:bg-gray-100 css-1gqug66']/td[contains(text(), '${Labelname}')]//following-sibling::td[1])[${i}]`).innerText()==deleterecord)
    {
      flag=1;
      break
    }
    }
    if(flag==1){await page.locator("Label not deleted").click()}
})
When("I click on Delete button of any {string} record in {string} column", async function (Labelname, column1) {
    await page.waitForTimeout(5000)
    // deleterecord=await page.locator(`(((//*[contains(text(), '${Labelname}')]//following-sibling::td[2])//button[2])[1]//parent::td//preceding-sibling::td)[2]`).innerText()
    // await page.locator(`(//*[contains(text(), '${Labelname}')]//following-sibling::td[2])//button[2]`).first().click()
    deleterecord=await page.locator(`//td[contains(text(),'${Labelname}')]//following-sibling::td[contains(text(),'NewRecord')]`).first().innerText()
    await page.locator(`//td[contains(text(),'${Labelname}')]//following-sibling::td[contains(text(),'NewRecord')]//following-sibling::td/button[2]`).first().click()
})
//cancel delete
When("I click Delete button of any {string} record in {string} column", async function (Labelname, column1) {
    await page.waitForTimeout(5000)
    deleterecord=await page.locator(`(((//*[contains(text(), '${Labelname}')]//following-sibling::td[3])//button[2])[1]//parent::td//preceding-sibling::td)[2]`).innerText()
    await page.locator(`(//*[contains(text(), '${Labelname}')]//following-sibling::td[3])//button[2]`).first().click()
})
//

When("I Click on Add button without entering {string}",  async function (Tabname) {
    page=this.page
    await page.locator("(//div[@class='MuiDialogActions-root MuiDialogActions-spacing css-14b29qc']//button)[1]").click()
  })
  
  Then("Please Enter {string} error message should appear below the {string} field",  async function (Tabname, column1) {
    if(Tabname=="Label"){
      expect(await page.locator("(//p[@class='MuiFormHelperText-root Mui-error css-j7o63n'])[1]").innerText()).to.eql('Please Select Type')
      expect(await page.locator("(//p[@class='MuiFormHelperText-root Mui-error css-j7o63n'])[2]").innerText()).to.eql(`Please Enter ${Tabname}`)
    }
    else{
    expect(await page.locator("//p[@class='MuiFormHelperText-root Mui-error css-j7o63n']").innerText()).to.eql(`Please Enter ${Tabname}`)
    }
  })
  Then("Please Enter {string} error message should appear",  async function (Tabname) {
    if(Tabname=="Label"){
      expect(await page.locator("(//p[@class='MuiFormHelperText-root Mui-error css-j7o63n'])[1]").innerText()).to.eql('Please Enter Label')
    }
    else{
    expect(await page.locator("//p[@class='MuiFormHelperText-root Mui-error css-j7o63n']").innerText()).to.eql(`Please Enter ${Tabname}`)
    }
  })
  When("I Click on Cancel button and then click on Add button",  async function () {
    await page.locator("(//div[@class='MuiDialogActions-root MuiDialogActions-spacing css-14b29qc']//button)[2]").click()
    await page.locator("xpath=(//div[@class='MuiBox-root css-0'])[3]").click();
  })
  When("I Click on Cancel button without entering {string}",  async function (Tabname) {
    await page.locator("(//div[@class='MuiDialogActions-root MuiDialogActions-spacing css-14b29qc']//button)[2]").click()
  })
  Then("Popup should gets closed without any error message",  async function () {
    expect(await page.locator("//div[@role='dialog']").count()).to.be.eql(0)
    expect(await page.locator("//p[@class='MuiFormHelperText-root Mui-error css-j7o63n']").count()).to.be.eql(0)
  })
  When("I Remove the {string} and click on Save button",  async function (column1) {
      await page.locator(`//input[@name='${column1}']`).fill("")
      await page.locator("//button[contains(text(),'Save')]").click()
  })
  When("I Click on Cancel button and then click on Edit button",  async function () {
    await page.locator("//button[contains(text(),'Cancel')]").click()
    await page.locator("xpath=(//button[@class='MuiButtonBase-root MuiIconButton-root MuiIconButton-sizeMedium css-1yxmbwk'])[1]").click()
  })
  When("I Remove the {string} and click on Cancel button",  async function (column1) {
    await page.locator(`//input[@name='${column1}']`).fill("")
    await page.locator("//button[contains(text(),'Cancel')]").click()
  })
  When("I Click on Cancel button without selecting phase",  async function () {
    page=this.page
    await page.locator("//button[contains(text(),'Cancel')]").click()
  })
  When("I Click on Add button without selecting phase",  async function () {
    await page.locator("(//div[@class='MuiDialogActions-root MuiDialogActions-spacing css-14b29qc']//button)[1]").click()
  })
  When("I click Add button without entering any details",  async function () {
    page=this.page
    await page.locator("(//div[@class='MuiDialogActions-root MuiDialogActions-spacing css-14b29qc']//button)[1]").click()
  })
  Then("Please Select Phase error message should appear",  async function () {
    expect(await page.locator("(//p[@class='MuiFormHelperText-root Mui-error css-j7o63n'])[1]").innerText()).to.eql('Please Select Phase Name')
  })
  Then("Please Enter Title and Please Enter Information error message should appear",  async function () {
    expect(await page.locator("(//p[@class='MuiFormHelperText-root Mui-error css-j7o63n'])[1]").innerText()).to.eql('Please Enter Title')
    expect(await page.locator("(//p[@class='MuiFormHelperText-root Mui-error css-j7o63n'])[2]").innerText()).to.eql('Please Enter Information')
  })
  Then("I remove the Title and click on Save button",  async function () {
    page=this.page
    await page.locator(`//textarea[@name='title']`).fill("")
    await page.locator("//button[contains(text(),'Save')]").click()
  })
  Then("Please Enter Title error message should appear",  async function () {
    expect(await page.locator("(//p[@class='MuiFormHelperText-root Mui-error css-j7o63n'])[1]").innerText()).to.eql('Please Enter Title')
  })
  Then("It should show the error message at each field",  async function () {
    page=this.page
    expect(await page.locator("//textarea[@name='title']//following-sibling::p").innerText()).to.eql('Please Enter Title')
    expect(await page.locator("//div[@class='MuiFormControl-root MuiFormControl-fullWidth css-tzsjye']//following-sibling::p").innerText()).to.eql('Please Select Discipline')
    expect(await page.locator("//textarea[@name='information']//following-sibling::p").innerText()).to.eql('Please Enter Information')
    expect(await page.locator("//div[@name='roadmap']//following-sibling::p").innerText()).to.eql('Please Select At Least 1 Investment Roadmap')
    expect(await page.locator("//div[@name='phase']//following-sibling::p").innerText()).to.eql('Please Select At Least 1 Investment Phase')
    await page.locator("text=Deliverable Details").click()
    expect(await page.locator("//div[@class='mx-2 MuiBox-root css-0']//p").innerText()).to.eql('Please Add At Least 1 Deliverable')    
  })

  Then("Mandatory objectives should have star icon on the left side of Objectives", async function () {
    // page=this.page
    // let mandatoryObjCnt=await page.locator("xpath=(//*[@aria-label='Mandatory Objective'])").count()
    // if(mandatoryObjCnt>0)
    // {
    //     for(let i=1;i<mandatoryObjCnt;i++)
    //     {
        await page.locator(`xpath=(//*[@aria-label='Mandatory Objective'])[1]`).screenshot({ path: 'Screenshots\\MandatoryObjectIconActual.png' })
        compareScreenshots('Screenshots\\MandatoryObjectIconActual.png', 'Screenshots\\MandatoryObjectIconExpected.png')
    //     }
    // }
})

Then("I delete all phases added by Script",  async function () {
    let cnt=await page.locator("//*[contains(text(),'NewPhase')]//following-sibling::td/button[2]").count()
   
    for(let i=1;i<=cnt;i++)
    {
   await page.locator(`(//*[contains(text(),'NewPhase')]//following-sibling::td/button[2])[1]`).click({force:true})
   await page.locator("//button[contains(text(),'Confirm')]").click()
   await page.waitForTimeout(3000)
   
    }
})
Then("I store the tooltip text of Labels",  async function () {
     documentsCount=await page.locator("//td[@class='MuiTableCell-root MuiTableCell-body MuiTableCell-sizeMedium border-l css-q34dxg' and contains(text(),'Document')]").count()
     for(let i=0;i<documentsCount;i++)
     {
            documentTooltip[i]=await page.locator(`(//td[@class='MuiTableCell-root MuiTableCell-body MuiTableCell-sizeMedium border-l css-q34dxg' and contains(text(),'Document')]//following-sibling::td[2])`).nth(i).innerText()
     }
     labelsCount=await page.locator("//td[@class='MuiTableCell-root MuiTableCell-body MuiTableCell-sizeMedium border-l css-q34dxg' and contains(text(),'Form Label')]").count()
     for(let i=0;i<labelsCount;i++)
     {
            formLabelTooltip[i]=await page.locator(`(//td[@class='MuiTableCell-root MuiTableCell-body MuiTableCell-sizeMedium border-l css-q34dxg' and contains(text(),'Form Label')]//following-sibling::td[2])`).nth(i).innerText()
            
        }
})
When("I come to home page and Click on Create button",  async function () {
    page=this.page
    await page.click("//button[@aria-label='Home']")
    await page.locator("//a[@href='/details']//button").click()
})
Then("I hover the mouse on Investment Leads and verify the tooltips",  async function () {
   let count=await page.locator("//div[@class='w-1/4 MuiBox-root css-0']").count()
   await page.locator(`(//div[@class='w-1/4 MuiBox-root css-0'])[1]`).hover()
    expect(await page.locator(`(//div[@role='tooltip']//div)`).innerText()).to.eql(formLabelTooltip[0])
   for(let i=2;i<=count;i++)
   {
    await page.locator(`(//div[@class='w-1/4 MuiBox-root css-0'])[${i}]`).hover()
    expect(await page.locator(`(//div[@role='tooltip']//div)[2]`).innerText()).to.eql(formLabelTooltip[i-1])
    await page.waitForTimeout(5000)
   }
})
Then("I hover the mouse on Investment Documents and verify the tooltips",  async function () {
    let count=await page.locator("//div[@class='w-1/4 MuiBox-root css-0']").count()
    await page.locator(`(//div[@class='w-1/4 MuiBox-root css-0'])[1]`).hover()
    expect(await page.locator(`(//div[@role='tooltip']//div)`).innerText()).to.eql(documentTooltip[0])
    for(let i=2;i<=count;i++)
    {
     await page.locator(`(//div[@class='w-1/4 MuiBox-root css-0'])[${i}]`).hover()
     expect(await page.locator(`(//div[@role='tooltip']//div)[2]`).innerText()).to.eql(documentTooltip[i-1])
     await page.waitForTimeout(5000)
    }
 })

 Then("I change the tooltip text in Admin page",  async function () {
    await page.locator("//button[@aria-label='Admin']").click()
    await page.locator("xpath=(//div[@class='MuiTabs-flexContainer justify-evenly css-k008qs']//button)[7]").click();
    await page.locator("(//td[@class='MuiTableCell-root MuiTableCell-body MuiTableCell-sizeMedium border-l css-q34dxg' and contains(text(),'Document')]//following-sibling::td[3]//button)[1]").click()
    await page.locator("//textarea[@name='tooltip']").fill("")
    await page.locator("//textarea[@name='tooltip']").fill("Tooltip text")
    await page.locator("//button[contains(text(),'Save')]").click()
 })
When("I click on last LIVE phase Investment",  async function () {
    page=this.page
    do
  {
   await page.locator("//div[@class='flex justify-center mt-2 MuiBox-root css-0']/button").click()
  }while(await page.locator("xpath=//div[@role='alert']").isVisible()==false)

  await page.locator(`//div[contains(text(),'${record.AdminInvstNameMAD}')]//following-sibling::div[4]/div[contains(text(),'${record.AdminPhaseNameMAD}')]`).click()
 })
When("I click on Mark As Done button",  async function () {
    page=this.page
    await page.locator(`//button[contains(text(), 'Mark As Done')]`).click()
 })
Then("I should see mark as done popup",  async function () {
    expect(await page.locator("xpath=//h2[@class='MuiTypography-root MuiTypography-h6 MuiDialogTitle-root capitalize css-ohyacs']").innerText()).to.eql('Mark As Done')
    expect(await page.locator("(//*[@data-testid='CheckCircleRoundedIcon'])[2]//parent::div").innerText()).to.eql(` Are you sure you want to mark as DONE "${record.AdminPhaseNameMAD}" phase of investment "${record.AdminInvstNameMAD}" ?`)
    expect(await page.locator("//button[contains(text(),'Confirm')]").isVisible()).to.be.true
    expect(await page.locator("//button[contains(text(),'Cancel')]").isVisible()).to.be.true

 })
Then("I should see Investment Closed meesage and I should redirect to Action Required tab",  async function () {
    await page.waitForTimeout(1000)
    expect(await page.locator("text=Investment Closed").isVisible()).to.be.true
    await page.waitForTimeout(6000)
    expect(await page.locator("//button[contains(text(),'Action Required')]").getAttribute('aria-selected')).to.eql("true")

})
When("I click on My Investments tab",  async function () {
    await page.locator("//button[contains(text(),'My investments')]").click()
})
Then("last phase of investment status should be DONE",  async function () {
    do
  {
   await page.locator("//div[@class='flex justify-center mt-2 MuiBox-root css-0']/button").click()
  }while(await page.locator("xpath=//div[@role='alert']").isVisible()==false)
    expect(await page.locator(`//div[contains(text(),'${record.AdminInvstNameMAD}')]//following-sibling::div[4]/div[contains(text(),'${record.AdminPhaseNameMAD}')]//parent::div//preceding-sibling::div[5]/div`).innerText()).to.eql('DONE')
})
}
