const { test, expect } = require("@playwright/test");



test("@Web Browser Context-Validation Error login", async ({ browser }) => {
  //chrome - plugins/ cookies

  const context = await browser.newContext();
  const page = await context.newPage();
   //page.route('**/*.css', route=> route.abort());
  //page.route('**/*.{jpg, png, jpeg}', route=> route.abort());
  const userName = page.locator("#username");
  const signIn = page.locator("#signInBtn");
  const cardTitles = page.locator(".card-body a");
  page.on('request', request=> console.log(request.url()));
  page.on('response', response=> console.log(response.url(), response.status()));
  await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
  console.log(await page.title());
  
  //css, xpath
  await userName.fill("rahulshetty");
  await page.locator("[type='password']").fill("Learning@830$3mK2");
  await signIn.click();
  //console.log(await page.locator("[style*='block']").textContent());
  await expect(page.locator("[style*='block']")).toContainText("Incorrect");

  // Type - Fill
  await userName.fill("");
  await userName.fill("rahulshettyacademy")
  await signIn.click();

  console.log(await cardTitles.first().textContent());
//console.log(await cardTitles.nth(1).textContent());
  const allTitles = await cardTitles.allTextContents();
  console.log(allTitles);

  console.log("Cores");
  console.log(require('os').cpus().length);
  
});


test("@Web UI Controls", async ({ page }) => {

  const userName = page.locator("#username");
  const signIn = page.locator("#signInBtn");
  const documentLink = page.locator("[href*='documents-request']");
  await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
  const dropdown = page.locator("select.form-control");
  await dropdown.selectOption("consult");
  await page.locator(".radiotextsty").last().click();
  await page.locator("#okayBtn").click();
  //assertion
  //console.log(await page.locator(".radiotextsty").last().isChecked());
  await expect(page.locator(".radiotextsty").last()).toBeChecked();
  await page.locator("#terms").click();
  await expect(page.locator("#terms")).toBeChecked();
  await page.locator("#terms").uncheck();

  console.log(await page.locator("#terms").isChecked());
  await expect( await page.locator("#terms").isChecked()).toBeFalsy();
 //await page.pause();
  await expect(documentLink).toHaveAttribute("class", "blinkingText");

});



test('Child Windows handling', async ({browser}) => {

  const context = await browser.newContext();
  const page = await context.newPage();

  const userName = page.locator("#username");
  await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
  const documentLink = page.locator("[href*='documents-request']");

 const [newPage] = await Promise.all(
  [   
    context.waitForEvent('page'), // Listen to any new pages to open. Three states of promise, pending, rejected, fulfilled.
    documentLink.click()          // New page is opened...
  ]);
 
const text = await  newPage.locator(".red").textContent();
const arrayText = text.split("@");
const domain = arrayText[1].split(" ")[0];
//console.log(domain);

await userName.fill(domain);
await page.pause();
console.log( await userName.inputValue());

});