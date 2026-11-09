Feature: Ecommerce Validations we are doing here
@Validation
@foo
  Scenario Outline: placing the order
    Given A login to Ecommerce2 application with "<username>" and "<password>"
    Then Verify Error message is displayed
    
  Examples:
  | username                   | password               |
  | pankajkainth002@gmail.com  | Rahulshettyacademy@002 |
  | hello@123.com              | Iamhello@12            |





    # parameterization, parallel, html, rerun failed tests