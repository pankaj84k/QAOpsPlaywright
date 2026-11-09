//const base = require("@playwright/test");
import {test as baseTest} from '@playwright/test';


interface TestDataForOrder  {
    username: string;
    password: string;
    productName: string;
  };



export const customTest = baseTest.extend<{testDataForOrder: TestDataForOrder}>({

testDataForOrder:  {
    username: "pankajkainth002@gmail.com",
    password: "Rahulshettyacademy@002",
    productName: "ZARA COAT 3"
  }

}
)