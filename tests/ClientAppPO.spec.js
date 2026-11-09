const { test, expect } = require("@playwright/test");
const { POManager} = require("../pageobjects/POManager");
const {customtest} = require('../Utils/test-base');
//const { OrderHistoryPage } = require("../pageobjects/OrdersHistoryPage");
//const {LoginPage} = require ('../pageobjects/LoginPage');
//const {DashboardPage} = require('../pageobjects/DashboardPage');
//json->string->Js object

const dataset = JSON.parse(JSON.stringify(require("../Utils/placeorderTestData.json")));


for( const data of dataset)
{

test(`@Web Client App Login for ${data.productName}` , async ({ page }) => {

  const poManager = new POManager(page);

  //const username = "pankajkainth002@gmail.com";
 // const password = "Rahulshettyacademy@002";
  //const productName = "ZARA COAT 3";
  const products = await page.locator(".card-body");
  const loginPage = poManager.getLoginPage();

  await loginPage.goTo();
  await loginPage.validLogin(data.username, data.password);
  
  const dashboardPage = poManager.getDashboardPage();
  await dashboardPage.searchProductAddCart(data.productName);
  await dashboardPage.navigateToCart();

  const cartPage = poManager.getCartPage();
  await cartPage.VerifyProductIsDisplayed(data.productName);
  await cartPage.checkout1();

  const ordersReviewPage = poManager.getOrdersReviewPage();
  await ordersReviewPage.searchCountryAndSelect("ind", "India");
  const orderId = await ordersReviewPage.submitAndGetOrderId();
  console.log(orderId);


  await dashboardPage.navigateToOrders();
  const ordersHistoryPage = poManager.getOrdersHistoryPage();
  await ordersHistoryPage.searchOrderAndSelect(orderId);
  expect(orderId.includes(await ordersHistoryPage.getOrderId())).toBeTruthy();









//   await page.locator("div li").first().waitFor();
//   const bool = await page.locator("h3:has-text('ZARA COAT 3')").isVisible();

//   expect(bool).toBeTruthy();
//   await page.locator("text=Checkout").click();
//   await page.locator("[placeholder*='Country']").pressSequentially("ind", {delay : 150});
//   const dropdown = page.locator(".ta-results");
//   await dropdown.waitFor();
//   const optionsCount = await dropdown.locator("button").count();
//   for (let i = 0; i < optionsCount; i++) {

//     const text = await dropdown.locator("button").nth(i).textContent();

//     if (text ===  " India") {

//       await dropdown.locator("button").nth(i).click();
//       break;
//     }
//   }
//  // await page.pause();

//   await expect(page.locator(".user__name [type='text']").first()).toHaveText(username);
//   await page.locator(".action__submit").click();

//   await expect(page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ");
//   const orderId = await page.locator(".em-spacer-1 .ng-star-inserted").textContent();
//   console.log(orderId);

//   await page.locator("button[routerLink*='myorders']").click();

//   await page.locator("tbody").waitFor();
//   const rows = await page.locator("tbody tr");

//   for (let i=0; i< await rows.count(); i++)
//   {
//     const rawOrderId = await rows.nth(i).locator("th").textContent();
    
//     if (orderId.includes(rawOrderId) )
//     {
//         await rows.nth(i).locator("button").first().click();

//     }
//   }


//   const orderIdDetails = await page.locator(".col-text").textContent();
//   expect(orderId.includes(orderIdDetails)).toBeTruthy();

});
}

customtest(`Client App Login` , async ({ page, testDataForOrder }) => {

  const poManager = new POManager(page);

  //const username = "pankajkainth002@gmail.com";
 // const password = "Rahulshettyacademy@002";
  //const productName = "ZARA COAT 3";
  const products = await page.locator(".card-body");
  const loginPage = poManager.getLoginPage();

  await loginPage.goTo();
  await loginPage.validLogin(testDataForOrder.username, testDataForOrder.password);
  
  const dashboardPage = poManager.getDashboardPage();
  await dashboardPage.searchProductAddCart(testDataForOrder.productName);
  await dashboardPage.navigateToCart();

  const cartPage = poManager.getCartPage();
  await cartPage.VerifyProductIsDisplayed(testDataForOrder.productName);
  await cartPage.checkout1();

  const ordersReviewPage = poManager.getOrdersReviewPage();
  await ordersReviewPage.searchCountryAndSelect("ind", "India");
  const orderId = await ordersReviewPage.submitAndGetOrderId();
  console.log(orderId);


  await dashboardPage.navigateToOrders();
  const ordersHistoryPage = poManager.getOrdersHistoryPage();
  await ordersHistoryPage.searchOrderAndSelect(orderId);
  expect(orderId.includes(await ordersHistoryPage.getOrderId())).toBeTruthy();

});

// Test files will trigger parallel

// Individual tests that are present in files will run in sequence.