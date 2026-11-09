Feature: Ecommerce Validations
  @Regression
  Scenario: Placing the Order
    Given A login to Ecommerce application with "pankajkainth002@gmail.com" and "Rahulshettyacademy@002"
    When Add "ZARA COAT 4" to Cart
    Then Verify "ZARA COAT 3" is displayed in the Cart
    When Enter valid details and Place the Order
    Then verify order is present in the OrderHistory

  @Validation
    Scenario Outline: Placing the Order
    Given A login to Ecommerce2 application with "<username>" and "<password>"
    Then Verify Error message is displayed
    

      Examples:
  | username                   | password               |
  | pankajkainth002@gmail.com  | Rahulshettyacademy@002 |
  | hello@123.com              | Iamhello@12            |

