import {test, expect} from "@playwright/test";

test('Playwright Special locators', async ({ page}) => {

await page.goto("https://rahulshettyacademy.com/angularpractice/");

await page.getByLabel("Check me out if you Love IceCreams!").click();
await page.getByLabel("Employed").check()
await page.getByLabel("Gender").selectOption("Female");
await page.getByPlaceholder("Password").fill("abc123");
await page.getByRole("button", {name: 'Submit'}).click();
console.log(await page.getByText("Success! The Form has been submitted successfully!.").isVisible());

//5 seconds default timeout for expect assertions --(timeout:10000) Step level
await expect(await page.getByText("Success! The Form has been submitted successfully!.")).toBeVisible({timeout: 10_000});
await page.getByRole("Link", {name: "shop"}).click();
await page.locator("app-card").filter({hasText: 'Nokia Edge'}).getByRole("button").click();
await page.pause();
});



//30 seconds - test timeout error

test('Playwright Test level time out', async ({ page}) => {

  test.setTimeout(60000);
  
const slowExpect = expect.configure({timeout: 9000});
await page.goto("https://rahulshettyacademy.com/angularpractice/");

await page.getByLabel("Check me out if you Love IceCreams!").click();
await page.getByLabel("Employed").check()
await page.getByLabel("Gender").selectOption("Female");
await page.getByPlaceholder("Password").fill("abc123");
await page.getByRole("button", {name: 'Submit'}).click();
console.log(await page.getByText("Success! The Form has been submitted successfully!.").isVisible());

//5 seconds default timeout for expect assertions --(timeout:10000) Step level -- Test level
await slowExpect(await page.getByText("Success! The Form has been submitted successfully!.")).toBeVisible();

await page.getByRole("Link", {name: "shop"}).click();
await slowExpect(page.locator(".my-4").first()).toHaveText("Shop");

//2 more
await page.locator("app-card").filter({hasText: 'Nokia Edge'}).getByRole("button").click();
await page.pause();
});