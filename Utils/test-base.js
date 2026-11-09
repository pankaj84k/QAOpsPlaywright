const base = require("@playwright/test");



exports.customtest = base.test.extend({

testDataForOrder:  {
    username: "pankajkainth002@gmail.com",
    password: "Rahulshettyacademy@002",
    productName: "ZARA COAT 3"
  }




}
)