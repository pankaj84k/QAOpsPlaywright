const base = require("@playwright/test");
const { APiUtils } = require('./APiUtils.js');
const { request } = require("@playwright/test");
const orderPayLoad = {
  orders: [{ country: "India", productOrderedId: "6960eae1c941646b7a8b3ed3" }],
};



const loginPayLoad = {
  userEmail: "pankajkainth002@gmail.com",
  userPassword: "Rahulshettyacademy@002",
};

exports.customtest = base.test.extend(
  
  {
  authenticatedPage: async ({ browser }, use) => {
    const context = await browser.newContext();
    const page = await context.newPage();

    await page.goto("https://rahulshettyacademy.com/client");
    await page.locator("#userEmail").fill("rahulshettyw@gmail.com");
    await page.locator("#userPassword").fill("Learning@830$3mK3");
    await page.locator("[value='Login']").click();
    //await page.waitForLoadState('networkidle');
    await use(page);
    await context.close();

  },

  createOrder : async({}, use)=> 
  {
  let response;
  const apiContext = await request.newContext();
  const apiUtils = new APiUtils(apiContext, loginPayLoad);
  response = await apiUtils.createOrder(orderPayLoad);
  await use(response);
  //
  await apiContext.dispose();
  },

  testDataForOrder : {
    productName : 'ADIDAS ORIGINAL'
  }

});
