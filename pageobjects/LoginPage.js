class LoginPage {

constructor(page){
  
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


async validLogin(username, password){

    await this.userName.type(username);
    await this.password.type(password);
    await this.signInbutton.click();
    await this.page.locator(".card-body b").first().waitFor();
    //await page.waitForLoadState('networkidle');

}

}

module.exports = {LoginPage};