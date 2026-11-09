const { test, expect } = require('@playwright/test')


//test.describe.configure({mode: 'parallel'});
test.describe.configure({mode: 'serial'});
test(" @Web  Popup Validations", async ({page})=>{

await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
//await page.goto("https://google.com");
//await page.goBack();
//await page.goForward();

await expect(page.locator("#displayed-text")).toBeVisible();
await page.locator("#hide-textbox").click();
await expect(page.locator("#displayed-text")).toBeHidden();
await page.pause();
page.on('dialog', dialog =>   dialog.accept());
await page.locator("#confirmbtn").click();
await page.locator("#mousehover").hover();
const framesPge = page.frameLocator("#courses-iframe");
await framesPge.locator("li a[href='lifetime-access']:visible").click();
const textCheck = await framesPge.locator(".text h2").textContent();
console.log(textCheck.split(" ")[1]);

});


test("Screenshot and visual comparison", async({page})=>{

await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
//await page.goto("https://google.com");
//await page.goBack();
//await page.goForward();
await expect(page.locator("#displayed-text")).toBeVisible();
await page.locator("#displayed-text").screenshot({path: 'partialScreenshot.png'});
await page.locator("#hide-textbox").click();
await page.screenshot({path: 'screenshot.png'});
await expect(page.locator("#displayed-text")).toBeHidden();

});


//Screenshot -store-> Screenshot -> 
test('Visual', async({page})=>{

  await page.goto("https://workspace.google.com/intl/en-US/gmail/");
  expect(await page.screenshot()).toMatchSnapshot('landing.png');
});