const { test, expect, request } = require("@playwright/test");
const { APiUtils } = require("../Utils/APiUtils");
const { clear } = require("node:console");

const loginPayLoad = {
  userEmail: "pankajkainth002@gmail.com",
  userPassword: "Rahulshettyacademy@002",
};

const orderPayLoad = {
  orders: [{ country: "India", productOrderedId: "6960eae1c941646b7a8b3ed3" }],
};

let orderId;
let token;
let response;

test.beforeAll(async () => {
  //Login API
  const apiContext = await request.newContext();
  const apiUtils = new APiUtils(apiContext, loginPayLoad);
  response = await apiUtils.createOrder(orderPayLoad);
  //
});

//before all - test1, test2, test3

//create order is success
test(" @API Place the order", async ({ page }) => {
  //APiUtils = new APiUtils(apiContext, loginPayLoad);
  //const orderId = createOrder(orderPayLoad);

  page.addInitScript((value) => {
    window.localStorage.setItem("token", value);
  }, response.token);

  //await page.goto("https://rahulshettyacademy.com/client");
  //await page.locator("#userEmail").fill(email);
  //await page.locator("#userPassword").fill("Iamking@000");
  //await page.locator("[value='Login']").click();

  //await page.waitForLoadState('networkidle');

  await page.goto("https://rahulshettyacademy.com/client");
  const email = "pankajkainth002@gmail.com"; //"anshika@gmail.com";
  const productName = "ZARA COAT 3";

  await page.locator("button[routerLink*='myorders']").click();

  await page.locator("tbody").waitFor();
  const rows = await page.locator("tbody tr");

  for (let i = 0; i < (await rows.count()); i++) {
    const rawOrderId = await rows.nth(i).locator("th").textContent();

    if (response.orderId.includes(rawOrderId)) {
      await rows.nth(i).locator("button").first().click();
    }
  }

  const orderIdDetails = await page.locator(".col-text").textContent();
  await page.pause();
  expect(response.orderId.includes(orderIdDetails)).toBeTruthy();
});
