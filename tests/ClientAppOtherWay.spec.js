const { test, expect } = require("@playwright/test");

test("Browser Context Playwright test", async ({ page }) => {

  const email = "anshika@gmail.com";
  const productName = "ZARA COAT 3";
  const products = await page.locator(".card-body");

  await page.goto("https://rahulshettyacademy.com/client");
  await page.getByPlaceholder("email@example.com").fill(email);
  await page.getByPlaceholder("enter your passsword").fill("Iamking@000");
  await page.getByRole('button', {name: "Login"}).click();
  //await page.locator("[value='Login']").click();
  //await page.waitForLoadState('networkidle');
  await page.locator(".card-body b").first().waitFor();
  const titles = await page.locator(".card-body b").allTextContents();
  console.log(titles);

  page.locator(".cart-body").filter({hasText:"ZARA COAT 3"}).getByRole("button", {name:"Add to Cart"}).click();


  await page.getByRole("Listitem").getByRole('button', {name:"Cart"}).click();
/*const counti = await products.count();
  for (let i = 0; i < counti; ++i) {
    if ((await products.nth(i).locator("b").textContent()) === productName) {
      //add to cart
      await products.nth(i).locator("text= Add To Cart").click();
      break;
    }
  }*/
  //await page.pause();
//await page.locator("[routerlink*='cart']").click();


  await page.locator("div li").first().waitFor();
  //const bool = await page.locator("h3:has-text('ZARA COAT 3')").isVisible();
  //expect(bool).toBeTruthy();
  await expect (page.getByText("ZARA COAT 3")).toBeVisible();
  
  await page.getByRole("button", {name: "Checkout"}).click();

  await page.getByPlaceholder("Select Country").pressSequentially("ind", {delay : 150});
//await page.locator("text=Checkout").click();
//  await page.locator("[placeholder*='Country']").pressSequentially("ind", {delay : 150});

  await page.getByRole("button", {name: "India"}).nth(1).click();

/*  const dropdown = page.locator(".ta-results");
  await dropdown.waitFor();
  const optionsCount = await dropdown.locator("button").count();
  for (let i = 0; i < optionsCount; i++) {

    const text = await dropdown.locator("button").nth(i).textContent();

    if (text ===  " India") {

      await dropdown.locator("button").nth(i).click();
      break;
    }
  }*/
 // await page.pause();

  await expect(page.locator(".user__name [type='text']").first()).toHaveText(email);


//  await page.locator(".action__submit").click();
    await page.getByText("PLACE ORDER").click();   
    await expect (page.getByText(" Thankyou for the order. ")).toBeVisible();

  //await expect(page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ");

  //============================================================================================
  const orderId = await page.locator(".em-spacer-1 .ng-star-inserted").textContent();
  console.log(orderId);

  await page.locator("button[routerLink*='myorders']").click();

  await page.locator("tbody").waitFor();
  const rows = await page.locator("tbody tr");

  for (let i=0; i< await rows.count(); i++)
  {
    const rawOrderId = await rows.nth(i).locator("th").textContent();
    
    if (orderId.includes(rawOrderId) )
    {
        await rows.nth(i).locator("button").first().click();

    }
  }


  const orderIdDetails = await page.locator(".col-text").textContent();
  expect(orderId.includes(orderIdDetails)).toBeTruthy();

});
