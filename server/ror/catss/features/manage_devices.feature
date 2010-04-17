@wip
Feature: Manage followed devices
  In order to manage devices
  As a user
  I want to be able to add and remove devices
  Scenario: Add a new device
    Given I am on the New Device page
    When I fill in the following:
      | Name | Toiwo                          |
      | Imei | 1234566788787                  |
    And I press "Add"
    Then I should see "Device created"
    And I should see "Toiwo"
    And I should see "1234566788787"
    And I should see a timestamp no older than 1 minute
    # TODO: Who
  Scenario Outline: Add an invalid device
    Given I am on the New Device page
    When I fill in "Name" with "<name>"
    And I fill in "Imei" with "<imei>"
    And I press "Add"
    Then I should see "<error>"
    Examples:
      | name  | imei |  error          |
      |       | x    |  can’t be blank |
      | x     |      |  can’t be blank |
  Scenario: List devices
    # TODO: Who

