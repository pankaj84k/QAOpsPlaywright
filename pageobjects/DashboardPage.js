class DashboardPage{

constructor(page)
{
   this.products =  page.locator(".card-body");
   this.productsText = page.locator(".card-body b");
   this.cart = page.locator("[routerlink*='cart']");
   this.orders = page.locator("button[routerlink*='myorders']");
}

async searchProductAddCart(productName)
{
//await page.waitForLoadState('networkidle');
  
  const titles = await this.productsText.allTextContents();
  console.log(titles);
  const counti = await this.products.count();

  for (let i = 0; i < counti; ++i) {
    if ((await this.products.nth(i).locator("b").textContent()) === productName) {
      //add to cart
      await this.products.nth(i).locator("text= Add To Cart").click();
      break;
    }
  }
}


async navigateToOrders()
{
    await this.orders.click();
}


async navigateToCart()
{
  await this.cart.click();

}

}

module.exports = {DashboardPage};