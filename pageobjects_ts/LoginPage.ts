import { Locator, Page } from "@playwright/test";

export class LoginPage {

userName: Locator;
password: Locator;
signInbutton: Locator;
page:Page;

constructor(page: Page){
  
        this.page = page;
        this.userName = page.locator("#userEmail");
        this.password = page.locator("#userPassword");
        this.signInbutton = page.locator("[value='Login']");
        console.log("pankaj");
}

 async goTo()
 {
    await this.page.goto("https://rahulshettyacademy.com/client");
 }


async validLogin(username: string, password: string){

    await this.userName.fill(username);
    await this.password.fill(password);
    await this.signInbutton.click();
    await this.page.locator(".card-body b").first().waitFor();
    //await page.waitForLoadState('networkidle');

}

}

//module.exports = {LoginPage};