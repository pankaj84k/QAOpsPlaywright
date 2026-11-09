const { test, expect } = require("@playwright/test");

test("Security test request intercept", async ({ page }) => {
  const email = "anshika@gmail.com";
  const productName = "ZARA COAT 3";
  const products = await page.locator(".card-body");

  await page.goto("https://rahulshettyacademy.com/client");
  await page.locator("#userEmail").fill(email);
  await page.locator("#userPassword").fill("Iamking@000");
  await page.locator("[value='Login']").click();
  //await page.waitForLoadState('networkidle');
  await page.locator(".card-body b").first().waitFor();

  await page.locator("button[routerLink*='myorders']").click();

  // Login and reach  orders page
  await page.route(
    "https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=*",
    (route) =>
      route.continue({
        url: "https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=621661f884b053f6765465b65",
      }),
  );
  await page.locator("button:has-text('View')").first().click();
  await expect(page.locator("p").last()).toHaveText("You are not authorize to view this order");
 
});
