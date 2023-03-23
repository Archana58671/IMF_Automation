 Feature: Approver flow

     @122
    Scenario:Cancel Approving the Investment
        When I click on Action Required tab
        Then I should see Investments with APPROVAL PENDING status
        When I click on any Investment
        Then I should redirect to Approval page
        And I should see All details of Investment, Approve and History buttons
        When I click on History button
        Then History sidebar should open and show the comments if entered by user
        And I enter the comments and close the History side-bar
        When I click on Approve button
        Then Approve Investment Phase popup should open
        When I enter the comments and click on Cancel button
        Then Investmet phase approve successful message should not appear and aaprover should remain in same page
    

    @123
    Scenario:Approve the Investment
        When I click on Action Required tab
        Then I should see Investments with APPROVAL PENDING status
        When I click on any Investment
        Then I should redirect to Approval page
        And I should see All details of Investment, Approve and History buttons
        When I click on History button
        Then History sidebar should open and show the comments if entered by user
        And I enter the comments and close the History side-bar
        When I click on Approve button
       Then Approve Investment Phase popup should open
        When I enter the comments and click on Confirm button
        Then Investmet phase approve successful message should appear and Approver should redirect to Action Required tab
        And Approved investment should not be present in Approvers Action Required tab

    

@124
    Scenario:Cancel Holding the Investment
        When I click on Action Required tab
        Then I should see Investments with APPROVAL PENDING status
        When I click on any Investment
        Then I should redirect to Approval page
        And I should see All details of Investment, Approve and History buttons
        When I click on History button
        Then History sidebar should open and show the comments if entered by user
        And I enter the comments and close the History side-bar
        When I click on Hold button
        Then Hold Investment Phase popup should open
        When I enter the comments and click on Cancel button
        Then Investmet phase hold successful message should not appear and aaprover should remain in same page

@125
    Scenario:Hold the Investment
        When I click on Action Required tab
        Then I should see Investments with APPROVAL PENDING status
        When I click on any Investment
        Then I should redirect to Approval page
        And I should see All details of Investment, Approve and History buttons
        When I click on History button
        Then History sidebar should open and show the comments if entered by user
        And I enter the comments and close the History side-bar
        When I click on Hold button
        Then Hold Investment Phase popup should open
        When I enter the comments and click on Confirm button
        Then Investmet phase hold successful message should appear and Approver should redirect to Action Required tab
        And Hold investment should not be present in Approvers Action Required tab


@126
    Scenario:Approve the Investment without entering any comments
        When I click on Action Required tab
        Then I should see Investments with APPROVAL PENDING status
        When I click on any Investment
        Then I should redirect to Approval page
        And I should see All details of Investment, Approve and History buttons
        When I click on History button
        Then History sidebar should open and show the comments if entered by user
        And I enter the comments and close the History side-bar
        When I click on Approve button
       Then Approve Investment Phase popup should open
        When I click on Confirm button
        Then Investmet phase approve successful message should appear and Approver should redirect to Action Required tab
        And Approved investment should not be present in Approvers Action Required tab


