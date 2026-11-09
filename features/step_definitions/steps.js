const { When, Then, Given } = require('@cucumber/cucumber');
const { POManager} = require("../../pageobjects/POManager");
const { expect } = require("@playwright/test");
const playwright = require("@playwright/test");


   Given('A login to Ecommerce application with {string} and {string}',  {timeout: 10*1000 }, async function (username, password) {
           // Write code here that turns the phrase above into concrete actions
 
  //const username = "pankajkainth002@gmail.com";
 // const password = "Rahulshettyacademy@002";
  //const productName = "ZARA COAT 3";
  const products = await this.page.locator(".card-body");
  const loginPage = this.poManager.getLoginPage();
  await loginPage.goTo();
  await loginPage.validLogin(username, password);

         });

  
  When('Add {string} to Cart', async function (productName) {
        this.dashboardPage = this.poManager.getDashboardPage();
       await this.dashboardPage.searchProductAddCart(productName);
       await this.dashboardPage.navigateToCart();
         });


  Then('Verify {string} is displayed in the Cart', async function (productName) {
           // Write code here that turns the phrase above into concrete actions
        const cartPage = this.poManager.getCartPage();
       await cartPage.VerifyProductIsDisplayed(productName);
       await cartPage.checkout1();

        });

 When('Enter valid details and Place the Order', async function () {
           // Write code here that turns the phrase above into concrete actions
            const ordersReviewPage = this.poManager.getOrdersReviewPage();
              await ordersReviewPage.searchCountryAndSelect("ind", "India");
              this.orderId = await ordersReviewPage.submitAndGetOrderId();
              console.log(this.orderId);

         });

  Then('verify order is present in the OrderHistory', async function () {
           // Write code here that turns the phrase above into concrete actions
           await this.dashboardPage.navigateToOrders();
  const ordersHistoryPage = this.poManager.getOrdersHistoryPage();
  await ordersHistoryPage.searchOrderAndSelect(this.orderId);
  expect(this.orderId.includes(await ordersHistoryPage.getOrderId())).toBeTruthy();
         });

       Given('A login to Ecommerce2 application with {string} and {string}', async function (username, password) {

              const userName = this.page.locator("#username");
              const signIn = this.page.locator("#signInBtn");

               // Write code here that turns the phrase above into concrete actions
               await this.page.goto("https://rahulshettyacademy.com/loginpagePractise/");
               console.log(await this.page.title());
              //   //css, xpath
              await userName.fill(username);
              await this.page.locator("[type='password']").fill(password);
              await signIn.click();
         });
       

// await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
//   console.log(await page.title());
  
//   //css, xpath
//   await userName.fill("rahulshetty");
//   await page.locator("[type='password']").fill("Learning@830$3mK2");
//   await signIn.click();
//   //console.log(await page.locator("[style*='block']").textContent());
//   await expect(page.locator("[style*='block']")).toContainText("Incorrect");


         Then('Verify Error message is displayed', async function () {
           // Write code here that turns the phrase above into concrete actions
              console.log(await this.page.locator("[style*='block']").textContent());
              await expect(this.page.locator("[style*='block']")).toContainText("Incorrect");
         });