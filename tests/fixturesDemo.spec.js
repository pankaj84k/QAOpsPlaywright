const { expect } = require("@playwright/test");
const { customtest } = require('../Utils/Fixtures.js');


customtest("Fixtures demo", async ({authenticatedPage, createOrder, testDataForOrder})=> {

//Login to application/Create order' and verify if the order is created from History page.
  await authenticatedPage.goto('https://rahulshettyacademy.com/client');
  await authenticatedPage.locator("button[routerLink*='myorders']").click();
  await authenticatedPage.locator("tbody").waitFor();
  await expect(authenticatedPage.getByText(createOrder.orderId)).toBeVisible();
  console.log( testDataForOrder.productName );

})