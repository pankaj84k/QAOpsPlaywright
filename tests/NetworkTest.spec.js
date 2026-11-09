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
const fakePayLoadOrders = {data:[],message:"No Orders"};

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
test("Place the order", async ({ page }) => {
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

  await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*",
    async route=>{

              const response = await page.request.fetch(route.request());
              let body = JSON.stringify(fakePayLoadOrders);
              route.fulfill({
                  response,
                  body,
    });
              //intercepting response - API response -> {Plawright faleresponse}-> Browser -> render data on frontend

           });

 

  const email = "pankajkainth002@gmail.com"; //"anshika@gmail.com";
  const productName = "ZARA COAT 3";

  await page.locator("button[routerLink*='myorders']").click();
  page.waitForResponse("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*");


  console.log( await page.locator(".mt-4").textContent());
  console.log( "Hi");


   await page.pause();

  //await page.locator("tbody").waitFor();
  //onst rows = await page.locator("tbody tr");




});
