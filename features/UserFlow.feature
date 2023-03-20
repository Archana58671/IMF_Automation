   Feature: User Flow

    @53
    Scenario: To verify Error messages in Create Investment Page
        And I click on Create button
        Then Create New Investment page should open
        And should show Investment Details, Investment Description, Investment Leads and Team Members section
        And Save and Next buttons
        When I click on Next button
        Then Each field should show error message
        When I fill some of the fields and click on Next button
        Then Should show the error message only at unfilled fields

    @54
    Scenario: Save As Draft a Investment
        And I click on Create button
        Then Create New Investment page should open
        When I Fill investment name in Investment Details section
        And I click on Save button
        Then Please fill-up 'Investment Name and Investment Type' before saving ! toaster message should appear
        When I Fill Investment Name and Investment Type
        And I click on Save button
        Then Investment save successful toaster message should appear
        When I click on Home button
        Then User should navigate to Home page and Should see a saved Investment with Draft state in My Investment tab
        When I Click on Drafted Investment
        Then User should navigate to a page where he saved it as a draft and details entered while saving as draft should be prefilled

    @55
    Scenario: Verify User Roadmap tab
        And I click on Create button
        Then Create New Investment page should open
        When I Fill All the fields in create new investment page
        And I click on Next button
        Then I should navigate to Roadmap page and see Investment name at the top, Investment Type and Roadmap dropdown and Back, Save As Draft, Next buttons
        When I Select Roadmap
        Then It should show the Roadmap of selected Investment Type in details page and Roadmap
        And Roadmap should show Phases, number of number of objectives that phase contains
        And Objectives of particular phase at the below of that phase and Star mark at the end of mandatory Objective
        When I Click on any Objective
        Then Information section should open at the right end and it should show the Information of that Objective
        When I click on Next button
        And I click on Back button
        When I click on Roadmap dropdown again
        Then Change Warning popup should appear
        And Should show message If you change roadmap from Roadmapname to anything else, the changes you have made if any in Objective & Deliverable, Review will be lost ! And Okay button


    @56
    Scenario: Verify Create Investment Details page
        And I get all FormLabels form Admin tab
        And I click on Create button
        Then Create New Investment page should open
        And should show Investment Details, Investment Description, Investment Leads and Team Members section
        And Investment Details section should contain Investment Name, Investment Type, Location, Asset and Year fields
        And Investment Description section should contain a free text field
        And Investment Leads section should conation all the fields which are included as Form Label Type in Label tab of Admin page
        And Team Members section should contain add button
        When I Click on Team Members add button
        Then Add Team Member popup should open and it should contain Roel and User fields and Add and Cancel buttons

    @57
    Scenario: Verify User Objective and Deliverable page
        And I click on Create button
        Then Create New Investment page should open
        When I Fill All the fields in create new investment page
        And I click on Next button
        Then I should navigate to Roadmap page and see Investment name at the top, Investment Type and Roadmap dropdown and Back, Save As Draft, Next buttons
        When I Select Roadmap
        And I click on Next button
        Then I should navigate to Objectives and Deliverable page And Page should show Investent Type, Roadmap name and Reset Phase, Back, Next, Save As Draft buttons
        And  It should show the Roadmap for selected Investment Type and Roadmap
        And Objectives and Deliverables of first phase of that Roadmap
        And Each objective and Deliverable should show 3 dots and star mark if that objective is mandatory at the left side of that Objective
        And Toggle button for Non mandatory Objective
        When I hover the mouse on 3 dots of any objective
        Then It should show view and add buttons
        When I hover the mouse on 3 dots of any deliverable
        Then It should show view button

    @58
    Scenario: As a User Add Objective for your Investment
        And I click on Create button
        Then Create New Investment page should open
        When I Fill All the fields in create new investment page
        And I click on Next button
        Then I should navigate to Roadmap page and see Investment name at the top, Investment Type and Roadmap dropdown and Back, Save As Draft, Next buttons
        When I Select Roadmap
        And I click on Next button
        Then I should navigate to Objectives and Deliverable page And Page should show Investent Type, Roadmap name and Reset Phase, Back, Next, Save As Draft buttons
        When I click on add Objective button
        Then Add Objective popup should open
        When I click on Deliverable Details section and Add Deliverable button
        Then It should show Add Deliverable heading, Title and Information fields
        And I fill all the details in Deliverable details section and click on add button
        When I click on Objective Details section
        And I fill all details in Objective details section and click on add button
        Then Objective add successful toaster message should appear
        And Objective should get added to that Investment

    @59
    Scenario: As a User Add Deliverable for your Investment
        And I click on Create button
        Then Create New Investment page should open
        When I Fill All the fields in create new investment page
        And I click on Next button
        Then I should navigate to Roadmap page and see Investment name at the top, Investment Type and Roadmap dropdown and Back, Save As Draft, Next buttons
        When I Select Roadmap
        And I click on Next button
        Then I should navigate to Objectives and Deliverable page And Page should show Investent Type, Roadmap name and Reset Phase, Back, Next, Save As Draft buttons
        And I hover the mouse on 3 dots of any objective
        When I click on add icon
        Then Add Deliverable popup should open and it should contain Title and Informatin free text fields, Add and Cancel buttons
        When I Enter the details and click on Add button
        Then Deliverable add successful toaster message should appear and that deliverable should be added to that Objective

    @60
    Scenario: View Objective of User Objective and Deliverable page
        And I click on Create button
        Then Create New Investment page should open
        When I Fill All the fields in create new investment page
        And I click on Next button
        Then I should navigate to Roadmap page and see Investment name at the top, Investment Type and Roadmap dropdown and Back, Save As Draft, Next buttons
        When I Select Roadmap
        And I click on Next button
        Then I should navigate to Objectives and Deliverable page And Page should show Investent Type, Roadmap name and Reset Phase, Back, Next, Save As Draft buttons
        When I hover the mouse on 3 dots of any objective
        And I click on view icon
        Then View Objective popup should open and should show Title, Information and Discipline of that Objective
        And It should show Mandatory word if that objective is mandatory and Close button
        When I click on Close button
        Then Popup should get closed

    @61
    Scenario: View Deliverable of User Objective and Deliverable page
        And I click on Create button
        Then Create New Investment page should open
        When I Fill All the fields in create new investment page
        And I click on Next button
        Then I should navigate to Roadmap page and see Investment name at the top, Investment Type and Roadmap dropdown and Back, Save As Draft, Next buttons
        When I Select Roadmap
        And I click on Next button
        Then I should navigate to Objectives and Deliverable page And Page should show Investent Type, Roadmap name and Reset Phase, Back, Next, Save As Draft buttons
        When I hover the mouse on 3 dots of any deliverable
        When I click view icon of deliverable
        Then View Deliverable popup should open and should show Title and Information fields and Close button
        When I click on Close button
        Then Popup should get closed

    
    @62
    Scenario: Inactivate mandatory Objective
        And I click on Create button
        Then Create New Investment page should open
        When I Fill All the fields in create new investment page
        And I click on Next button
        Then I should navigate to Roadmap page and see Investment name at the top, Investment Type and Roadmap dropdown and Back, Save As Draft, Next buttons
        When I Select Roadmap
        And I click on Next button
        Then I should navigate to Objectives and Deliverable page And Page should show Investent Type, Roadmap name and Reset Phase, Back, Next, Save As Draft buttons
        When I click on toggle button present at mandatory Objective
        Then Justification popup should open and it should contain Save and Cancel button
        When I enter justification and click on Save button
        Then Mandatory Objective and its deliverables should become Inactive
        When I click on Next button
        And I click on Objective and Deliverable button present in Review section
        Then Review Objective and Deliverable page should open
        When I click on view button of inactivated objective
        Then view objective popup should open
        And It should show Title, Information, Discipline and Justification
        And I click on Close button
        And I close the Review Objective and Deliverable page
        When I click on Back button
        And I Activate Inactivated mandatory objective
        And I click on Next button
        And I click on Objective and Deliverable button present in Review section
        Then Review Objective and Deliverable page should open
        When I click on view button of activated objective
        Then view objective popup should open
        And Popup should show Title, Information, Discipline and Justification should not be there
        And I click on Close button
        And I close the Review Objective and Deliverable page

    @63
    Scenario: Inactivate Deliverable
        And I click on Create button
        Then Create New Investment page should open
        When I Fill All the fields in create new investment page
        And I click on Next button
        Then I should navigate to Roadmap page and see Investment name at the top, Investment Type and Roadmap dropdown and Back, Save As Draft, Next buttons
        When I Select Roadmap
        And I click on Next button
        Then I should navigate to Objectives and Deliverable page And Page should show Investent Type, Roadmap name and Reset Phase, Back, Next, Save As Draft buttons
        When I click on toggle button present at Deliverable
        Then Deliverable should become Inactive
        When I click on toggle button present at Inactive Deliverable
        Then Deliverable should become Active

    @64
    Scenario: Inactivate All Deliverable
        And I click on Create button
        Then Create New Investment page should open
        When I Fill All the fields in create new investment page
        And I click on Next button
        Then I should navigate to Roadmap page and see Investment name at the top, Investment Type and Roadmap dropdown and Back, Save As Draft, Next buttons
        When I Select Roadmap
        And I click on Next button
        Then I should navigate to Objectives and Deliverable page And Page should show Investent Type, Roadmap name and Reset Phase, Back, Next, Save As Draft buttons
        When I Inactivate all Deliverables of particular Objective then I should get Objective must have at least 1 deliverable toaster message

    @65
    Scenario: Reset Phase of User Objective and Deliverable page
        And I click on Create button
        Then Create New Investment page should open
        When I Fill All the fields in create new investment page
        And I click on Next button
        Then I should navigate to Roadmap page and see Investment name at the top, Investment Type and Roadmap dropdown and Back, Save As Draft, Next buttons
        When I Select Roadmap
        And I click on Next button
        Then I should navigate to Objectives and Deliverable page And Page should show Investent Type, Roadmap name and Reset Phase, Back, Next, Save As Draft buttons
        When I hover the mouse on 3 dots of any objective
        When I click on add icon
        Then Add Deliverable popup should open and it should contain Title and Informatin free text fields, Add and Cancel buttons
        When I Enter the details and click on Add button
        Then Deliverable add successful toaster message should appear and that deliverable should be added to that Objective
        When I click on Reset Phase button
        Then Change Warning popup should open with message If you reset phase phasename,the phase will revert back to the default data, the changes you have made if any in Objective & Deliverable, Review will be lost !, Confirm and Cancel buttons
        When I click on Cancel button
        Then Newly added objective should not get deleted
        When I click on Reset Phase button
        Then Change Warning popup should open with message If you reset phase phasename,the phase will revert back to the default data, the changes you have made if any in Objective & Deliverable, Review will be lost !, Confirm and Cancel buttons
        When I click on Confirm button
        Then Phase reset successful toaster message should appear and newly added objective should get deleted

    @66
    Scenario: Edit Deliverable added by User for particular Investment
        And I click on Create button
        Then Create New Investment page should open
        When I Fill All the fields in create new investment page
        And I click on Next button
        Then I should navigate to Roadmap page and see Investment name at the top, Investment Type and Roadmap dropdown and Back, Save As Draft, Next buttons
        When I Select Roadmap
        And I click on Next button
        Then I should navigate to Objectives and Deliverable page And Page should show Investent Type, Roadmap name and Reset Phase, Back, Next, Save As Draft buttons
        When I hover the mouse on 3 dots of any objective
        When I click on add icon
        Then Add Deliverable popup should open and it should contain Title and Informatin free text fields, Add and Cancel buttons
        When I Enter all details and click on Add button in deliverable details section
        Then Deliverable add successful toaster message should appear and that deliverable should be added to that Objective
        When I hover the mouse on 3 dots of newly added deliverable
        When I click edit icon of newly added deliverable
        Then Edit Deliverable popup should open and it should show Title and Information fields
        And All fields should be editable and it should show Save and Cancel buttons
        When I Edit the Deliverable and clicks Save button
        Then Deliverable edit successful toaster message should appear
        And  Deliverable should gets updated as edited by user

    @67
    Scenario: Delete Deliverable added by User for particular Investment
        And I click on Create button
        Then Create New Investment page should open
        When I Fill All the fields in create new investment page
        And I click on Next button
        Then I should navigate to Roadmap page and see Investment name at the top, Investment Type and Roadmap dropdown and Back, Save As Draft, Next buttons
        When I Select Roadmap
        And I click on Next button
        Then I should navigate to Objectives and Deliverable page And Page should show Investent Type, Roadmap name and Reset Phase, Back, Next, Save As Draft buttons
        When I hover the mouse on 3 dots of any objective
        When I click on add icon
        Then Add Deliverable popup should open and it should contain Title and Informatin free text fields, Add and Cancel buttons
        When I Enter all details and click on Add button in deliverable details section
        Then Deliverable add successful toaster message should appear and that deliverable should be added to that Objective
        When I hover the mouse on 3 dots of newly added deliverable
        When I click the delete icon of newly added deliverable
        Then Delete Deliverable popup opens with a message Are you sure you want to delete deliverable and Confirm and Cancel button
        When I click on Confirm button
        Then Deliverable delete successful toaster message should appear
        And Deliverable gets deleted

    @68
    Scenario: Delete Objective added by User for particular Investment
        And I click on Create button
        Then Create New Investment page should open
        When I Fill All the fields in create new investment page
        And I click on Next button
        Then I should navigate to Roadmap page and see Investment name at the top, Investment Type and Roadmap dropdown and Back, Save As Draft, Next buttons
        When I Select Roadmap
        And I click on Next button
        Then I should navigate to Objectives and Deliverable page And Page should show Investent Type, Roadmap name and Reset Phase, Back, Next, Save As Draft buttons
        When I click on add Objective button
        Then Add Objective popup should open
        When I click on Deliverable Details section and Add Deliverable button
        Then It should show Add Deliverable heading, Title and Information fields
        And I fill all the details in Deliverable details section and click on add button
        When I click on Objective Details section
        And I fill all details in Objective details section and click on add button
        Then Objective add successful toaster message should appear
        And Objective should get added to that Investment
        When I hover the mouse on 3 dots of newly added objective
        And I click on Delete button of newly added objective
        Then Delete Objective popup opens with a message Are you sure you want to delete objective and Confirm and Cancel button
        When I click on Confirm button
        Then Objective delete successful toaster message should appear
        And Objective should get deleted

    @69
    Scenario: Edit Objective added by User for particular Investment
        And I click on Create button
        Then Create New Investment page should open
        When I Fill All the fields in create new investment page
        And I click on Next button
        Then I should navigate to Roadmap page and see Investment name at the top, Investment Type and Roadmap dropdown and Back, Save As Draft, Next buttons
        When I Select Roadmap
        And I click on Next button
        Then I should navigate to Objectives and Deliverable page And Page should show Investent Type, Roadmap name and Reset Phase, Back, Next, Save As Draft buttons
        When I click on add Objective button
        Then Add Objective popup should open
        When I click on Deliverable Details section and Add Deliverable button
        Then It should show Add Deliverable heading, Title and Information fields
        And I fill all the details in Deliverable details section and click on add button
        When I click on Objective Details section
        And I fill all details in Objective details section and click on add button
        Then Objective add successful toaster message should appear
        And Objective should get added to that Investment
        When I hover the mouse on 3 dots of newly added objective
        And I click on edit button of newly added objective
        Then Then Edit Objective popup should open and it should show Title, Information, Discipline fields
        And All fields should editable and it should show Save and Cancel buttons
        When I Edit the Objective and click on Save button
        Then Objective edit successful toaster message should appear
        Then Objective should gets updated as edited by user

    @70
    Scenario: Delete Investment of DRAFT state
        Then I should see All Investments, My Investments and Action Required tabs on Home page
        And I click on Create button
        Then Create New Investment page should open
        When I Fill Investment Name and Investment Type
        And I click on Save button
        Then Investment save successful toaster message should appear
        When I click on Home button
        When I hover the mouse on any Investment of Draft state
        Then I should see Delete button
        When I click on delete button present on investment of draft state
        Then Delete Investment popup should open
        And It should have message Are you sure you want to delete investment and Confirm and Cancel buttons
        When I click on Confirm button
        Then Investment delete successful toaster message should appear
        And Investment should get deleted

    @71
    Scenario: cancelling Delete Investment of DRAFT state
        Then I should see All Investments, My Investments and Action Required tabs on Home page
        And I click on Create button
        Then Create New Investment page should open
        When I Fill Investment Name and Investment Type
        And I click on Save button
        Then Investment save successful toaster message should appear
        When I click on Home button
        When I hover the mouse on any Investment of Draft state
        Then I should see Delete button
        When I click on delete button present on investment of draft state
        Then Delete Investment popup should open
        And It should have message Are you sure you want to delete investment and Confirm and Cancel buttons
        When I click on Cancel button
        Then Investment should not get deleted

    @72
    Scenario: As a User edit DRAFT state Investment
        Then I should see All Investments, My Investments and Action Required tabs on Home page
        And I click on Create button
        Then Create New Investment page should open
        When I Fill Investment Name and Investment Type
        And I click on Save button
        Then Investment save successful toaster message should appear
        When I click on Home button
        When I click on any Investment of Draft state
        Then Investment shoud open
        And All fields should be editable
        When I edit the investment and click on Save button
        Then Investment save successful toaster message should appear
        When I click on Home button
        Then I should see Investment with edited details

    @73
    Scenario: Verify Review page
        And I click on Create button
        Then Create New Investment page should open
        When I Fill All the fields in create new investment page
        And I click on Next button
        Then I should navigate to Roadmap page and see Investment name at the top, Investment Type and Roadmap dropdown and Back, Save As Draft, Next buttons
        When I Select Roadmap
        And I click on Next button
        Then I should navigate to Objectives and Deliverable page And Page should show Investent Type, Roadmap name and Reset Phase, Back, Next, Save As Draft buttons
        When I click on Next button
        Then I should navigate to Review page and should see Investment Type, Roadmap, Phase and Status
        And Investment Documents, Approver and Review Investment sections
        And Details, Roadmap, Objective and Deliverable, Back, Save and Send buttons

    @74
    Scenario: Verify Review-Details page
        And I click on Create button
        Then Create New Investment page should open
        When I Fill All the fields in create new investment page
        And I click on Next button
        Then I should navigate to Roadmap page and see Investment name at the top, Investment Type and Roadmap dropdown and Back, Save As Draft, Next buttons
        When I Select Roadmap
        And I click on Next button
        Then I should navigate to Objectives and Deliverable page And Page should show Investent Type, Roadmap name and Reset Phase, Back, Next, Save As Draft buttons
        When I click on Next button
        Then I should navigate to Review page and should see Investment Type, Roadmap, Phase and Status
        When I click on Details button present in Review section
        Then It should show the detail filled in Details page in view mode

    @75
    Scenario: Verify Review-Roadmap page
        And I click on Create button
        Then Create New Investment page should open
        When I Fill All the fields in create new investment page
        And I click on Next button
        Then I should navigate to Roadmap page and see Investment name at the top, Investment Type and Roadmap dropdown and Back, Save As Draft, Next buttons
        When I Select Roadmap
        And I click on Next button
        Then I should navigate to Objectives and Deliverable page And Page should show Investent Type, Roadmap name and Reset Phase, Back, Next, Save As Draft buttons
        When I click on Next button
        Then I should navigate to Review page and should see Investment Type, Roadmap, Phase and Status
        When I click on Roadmap button present in Review section
        Then It should show the Roadmap selected in roadmap page

    @76
    Scenario: Verify Review-Objectives and Deliverable page
        And I click on Create button
        Then Create New Investment page should open
        When I Fill All the fields in create new investment page
        And I click on Next button
        Then I should navigate to Roadmap page and see Investment name at the top, Investment Type and Roadmap dropdown and Back, Save As Draft, Next buttons
        When I Select Roadmap
        And I click on Next button
        Then I should navigate to Objectives and Deliverable page And Page should show Investent Type, Roadmap name and Reset Phase, Back, Next, Save As Draft buttons
        When I click on Next button
        Then I should navigate to Review page and should see Investment Type, Roadmap, Phase and Status
        When I click on Objective & Deliverable button present in Review section
        Then It should show the Objectives and Deliverable present in Objective & Deliverable page



    @77
    Scenario: Deleting a Phase in user roadmap page
        And I click on Create button
        Then Create New Investment page should open
        When I Fill All fields in create new investment page with investent type as Exploration
        And I click on Next button
        Then I should navigate to Roadmap page and see Investment name at the top, Investment Type and Roadmap dropdown and Back, Save As Draft, Next buttons
        When I Select Roadmap
        And I hover mouse on Phase
        Then It should show Add button at the start and end of that phase and Delete button on that phase
        When I click on delete button of that phase
        Then Delete Phase popup should open and it should show Are you sure you want to delete phase phase name message and Confirm and Cancel buttons
        When I enter justification and click on Confirm button
        Then Phase delete successful toaster message should appear and Phase should gets deleted for that investment

    @78
    Scenario Outline: Apply Filter in My Investments tab
        Then I should see All Investments, My Investments and Action Required tabs on Home page
        And I click on Create button
        When I Fill All the fields in create new investment page
        And I click on Next button
        And I Select Roadmap
        And I click on Next button
        When I click on Next button
        And I fill All the fields in Review page and click on Send button
        When I click on Send button present on Send Approval popup
        Then Investment sent for Approval message should appear
        And I click on Home button
        When I select Status and click on search button
        Then The records containing or matching the selection should be filtered and populated in the table
        When I select Investment Types and click on search button
        Then The records containing or matching the selection should be filtered and populated in the table
        When I select Location and click on search button
        Then The records containing or matching the selection should be filtered and populated in the table
        When I select Asset and click on search button
        Then The records containing or matching the selection should be filtered and populated in the table
        When I select Phase and click on search button
        Then The records containing or matching the selection should be filtered and populated in the table
        When I enter Investment Name and click on search button
        Then The records containing or matching the words should be filtered and populated in table
        When I select year and click on search button
        Then The records containing the year should be filtered and populated in table
        When I enter and select manager and click on search button
        Then The records containing the entered manager name should be filtered and populated in table

    @79
    Scenario Outline: Apply Filter in All Investments tab
        Then I should see All Investments, My Investments and Action Required tabs on Home page
        And I click on Create button
        When I Fill All the fields in create new investment page
        And I click on Next button
        And I Select Roadmap
        And I click on Next button
        When I click on Next button
        And I fill All the fields in Review page and click on Send button
        When I click on Send button present on Send Approval popup
        Then Investment sent for Approval message should appear
        And I click on Home button
        When I click on All Investments tab
        When I select Status and click on search button
        Then The records containing or matching the selection should be filtered and populated in the table
        When I select Investment Types and click on search button
        Then The records containing or matching the selection should be filtered and populated in the table
        When I select Location and click on search button
        Then The records containing or matching the selection should be filtered and populated in the table
        When I select Asset and click on search button
        Then The records containing or matching the selection should be filtered and populated in the table
        When I select Phase and click on search button
        Then The records containing or matching the selection should be filtered and populated in the table
        When I enter Investment Name and click on search button
        Then The records containing or matching the words should be filtered and populated in table
        When I select year and click on search button
        Then The records containing the year should be filtered and populated in table
        When I enter and select manager and click on search button
        Then The records containing the entered manager name should be filtered and populated in table

    @80
    Scenario Outline: Apply Filter in Action Required tab
        Then I should see All Investments, My Investments and Action Required tabs on Home page
        When I click on Action Required tab
        When I select Status and click on search button
        Then The records containing or matching the selection should be filtered and populated in the table
        When I select Investment Types and click on search button
        Then The records containing or matching the selection should be filtered and populated in the table
        When I select Location and click on search button
        Then The records containing or matching the selection should be filtered and populated in the table
        When I select Asset and click on search button
        Then The records containing or matching the selection should be filtered and populated in the table
        When I select Phase and click on search button
        Then The records containing or matching the selection should be filtered and populated in the table
        When I enter Investment Name and click on search button
        Then The records containing or matching the words should be filtered and populated in table
        When I select year and click on search button
        Then The records containing the year should be filtered and populated in table
        When I enter and select manager and click on search button
        Then The records containing the entered manager name should be filtered and populated in table

    @81
    Scenario Outline: Apply Filter in My Investments tab for non existing records
        Then I should see All Investments, My Investments and Action Required tabs on Home page
        When I enter Investment Name which is not existing and click on search button
        Then It should show No Data Found warning message

    @82
    Scenario: Verify Error messages in Review page
        And I click on Create button
        Then Create New Investment page should open
        When I Fill All fields in create new investment page with investent type as Exploration
        And I click on Next button
        Then I should navigate to Roadmap page and see Investment name at the top, Investment Type and Roadmap dropdown and Back, Save As Draft, Next buttons
        When I Select Roadmap
        And I delete Asses phase if its a first phase in Roadmap
        And I click on Next button
        Then I should navigate to Objectives and Deliverable page And Page should show Investent Type, Roadmap name and Reset Phase, Back, Next, Save As Draft buttons
        When I click on Next button
        Then I should navigate to Review page and should see Investment Type, Roadmap, Phase and Status
        When I click on Send button without filling any details
        Then I should get error messages for filling the fileds at below the respective fields

    @83
    Scenario: Verify Error message for inappropriate url in Investment Documents section in Review page
        And I click on Create button
        Then Create New Investment page should open
        When I Fill All fields in create new investment page with investent type as Exploration
        And I click on Next button
        Then I should navigate to Roadmap page and see Investment name at the top, Investment Type and Roadmap dropdown and Back, Save As Draft, Next buttons
        When I Select Roadmap
        And I click on Next button
        Then I should navigate to Objectives and Deliverable page And Page should show Investent Type, Roadmap name and Reset Phase, Back, Next, Save As Draft buttons
        When I click on Next button
        Then I should navigate to Review page and should see Investment Type, Roadmap, Phase and Status
        When I fill invalid urls in the fields of Investment documents section and click on send button
        Then I should get Please Enter Valid URLs error message at Investment documents section

    @84
    Scenario: Verify toaster message for unknown user
        And I click on Create button
        Then Create New Investment page should open
        When I search unknown user in Investment leads or Team meber section
        Then I should get User not found toaster message
        When I click on Add team member and search unknown person
        Then I should get User not found toaster message


    @85
    Scenario: As a user Deleting all Phases
        And I click on Create button
        Then Create New Investment page should open
        When I Fill All the fields in create new investment page
        And I click on Next button
        Then I should navigate to Roadmap page and see Investment name at the top, Investment Type and Roadmap dropdown and Back, Save As Draft, Next buttons
        When I Select Roadmap
        And I hover mouse on Phase
        Then It should show Add button at the start and end of that phase and Delete button on that phase
        When I Delete All phases of the roadmap
        Then I should get Roadmap should have atleast 2 Phases toaster message when 2 Phases are left

    @86
    Scenario: As a User Verify Created By User name
        And I click on Create button
        Then Create New Investment page should open
        When I Fill Investment Name and Investment Type
        And I click on Save button
        Then I should see info icon beside investment name
        And  I verfiy Created by User name by hovering mouse on info icon
        When I Fill remaining fields in create new investment page
        And I click on Next button
        When I Select Roadmap
        And  I verfiy Created by User name by hovering mouse on info icon
        And I click on Next button
        And  I verfiy Created by User name by hovering mouse on info icon
        And I click on Next button
        And  I verfiy Created by User name by hovering mouse on info icon


    @87
    Scenario: Creating two Investments with same name
        When I take existing Investment name
        And I click on Create button
        Then Create New Investment page should open
        When I Enter Investment name same as existing investment name and click anywhere in the page
        Then This investment name already exists !  Toaster message should appear and Investment name should gets cleared from the investment name field

    @88
    Scenario: Merging All phases
        And I click on Create button
        Then Create New Investment page should open
        When I Fill All fields in create new investment page with investent type as Exploration
        And I click on Next button
        Then I should navigate to Roadmap page and see Investment name at the top, Investment Type and Roadmap dropdown and Back, Save As Draft, Next buttons
        When I Select Roadmap
        And I merge all phases untill 2 phases left
        When I click on merge button for Merging last 2 phases
        Then Roadmap must have 2 phases tooaster message should appear
        And There should be 2 phases in Roadmap


    @89
    Scenario: Send an Investment for Approval
        And I click on Create button
        When I Fill All the fields in create new investment page
        And I click on Next button
        And I Select Roadmap
        And I click on Next button
        Then I should navigate to Objectives and Deliverable page And Page should show Investent Type, Roadmap name and Reset Phase, Back, Next, Save As Draft buttons
        When I click on Next button
        Then I should navigate to Review page and should see Investment Type, Roadmap, Phase and Status
        And I fill All the fields in Review page and click on Send button
        Then Send For Approval popup should open
        When I click on Send button present on Send Approval popup
        Then Investment sent for Approval message should appear
        And user should recieve submitted email

    @90
    Scenario: Cancel Sending an Investment for Approval
        And I click on Create button
        When I Fill All the fields in create new investment page
        And I click on Next button
        And I Select Roadmap
        And I click on Next button
        Then I should navigate to Objectives and Deliverable page And Page should show Investent Type, Roadmap name and Reset Phase, Back, Next, Save As Draft buttons
        When I click on Next button
        Then I should navigate to Review page and should see Investment Type, Roadmap, Phase and Status
        And I fill All the fields in Review page and click on Send button
        Then Send For Approval popup should open
        When I click on Cancel button
        Then Popup should gets closed and no toaster message

    
    @91
    Scenario: Verify Filter icon in all tabs of Dashboard
        Then I should see filter icon in the right corner of columns
        When I click on Action Required tab
        Then I should see filter icon in the right corner of columns
        When I click on All Investments tab
        Then I should see filter icon in the right corner of columns

 @92
    Scenario: Verify step names in user flow
        When I click on Create button
        Then I should see step name Details should be enabaled and next stpes disabled
        When I Fill All the fields in create new investment page
        And I click on Next button
        Then I should see step name Edit Roadmap should be enabled and Details should be completed and next stpes disabled
        When I Select Roadmap
        And I click on Next button
        Then I should see step name Edit Objective & Deliverable should be enabled and Edit Roadmap should be completed and next stpes disabled
        And I click on Next button
        Then I should see step name Review should be enabled and Edit Objective & Deliverable should be completed

@93
    Scenario: Verify Help icon
        Then I should see Help icon at the top right corner
        When I hover mouse on Help icon
        Then I should see text Info
        When I click on Help icon
        Then It should navigate to new tab and open sharepoint site
        
@94
    Scenario: Verify TBA in Investment Leads section in details page
        When I click on Create button
        And I Fill Investment Name and Investment Type
        And I click on Investment Leads fields
        Then It should show TBA in dropdown

    @95
    Scenario: Verify IMF Admin email from email notification footer
        And I click on Create button
        When I Fill All the fields in create new investment page
        And I click on Next button
        And I Select Roadmap
        And I click on Next button
        Then I should navigate to Objectives and Deliverable page And Page should show Investent Type, Roadmap name and Reset Phase, Back, Next, Save As Draft buttons
        When I click on Next button
        Then I should navigate to Review page and should see Investment Type, Roadmap, Phase and Status
        And I fill All the fields in Review page and click on Send button
        Then Send For Approval popup should open
        When I click on Send button present on Send Approval popup
        Then Investment sent for Approval message should appear
        And user should recieve submitted email
        And I verify IMF Admin To adress  

  @96
    Scenario: Verify send waring with Investments leads as TBA
        And I click on Create button
        When I Fill All the fields in create new investment page with Investment leads as TBA
        And I click on Next button
        And I Select Roadmap
        And I click on Next button
        Then I should navigate to Objectives and Deliverable page And Page should show Investent Type, Roadmap name and Reset Phase, Back, Next, Save As Draft buttons
        When I click on Next button
        Then I should navigate to Review page and should see Investment Type, Roadmap, Phase and Status
        When I fill All the fields in Review page and click on Send button
        Then Send warning popup should open
        When I click on Yes button
        Then Send For Approval popup should open
        When I click on Send button present on Send Approval popup
        Then Investment sent for Approval message should appear
        And user should recieve submitted email
        And I verify IMF Admin To adress  

@97
    Scenario: cancel sending an Investment with Investments leads as TBA
        And I click on Create button
        When I Fill All the fields in create new investment page with Investment leads as TBA
        And I click on Next button
        And I Select Roadmap
        And I click on Next button
        Then I should navigate to Objectives and Deliverable page And Page should show Investent Type, Roadmap name and Reset Phase, Back, Next, Save As Draft buttons
        When I click on Next button
        Then I should navigate to Review page and should see Investment Type, Roadmap, Phase and Status
        When I fill All the fields in Review page and click on Send button
        Then Send warning popup should open
        When I click on No button
        Then Send For Approval popup should not open and user should remain on review page

  @98      
Scenario: Verify Detail screen Leads
        And I click on Create button
        Then I search and select the user for Investment Review lead
        When I seacrh the user for Investment Manager same as Investment Review lead
        Then It should not allow to select the user, user should be disabled
        Then I seacrh and select other user for Investment Manager
        And I seacrh the user for other Leads, same as Investment Manager
        When I add team member same as Investent Leads other than Investment Review lead
        Then It should allow to add the same user 
        And It should allow to add team member again same as other team member


@99       
Scenario: As a User verify Roadmap page to show only Roadmap by default and have eye icon to show Objectives
        When I click on Create button
        And I Fill All the fields in create new investment page
        And I click on Next button
        When I Select Roadmap
        Then Only Phases of selected Roadmap should appear and each phase should have eye icon on the phase name
        When I click on eye icon of first phase
        Then It should show the Objectives below that phase
        When I click on eye icon of second phase
        Then It should show the Objectives below second phase
        When I again click on eye icon of first phase
        Then It should hide the objectives
        When I click on Next button
        And I click on Next button
        And I click on Roadmap button present in Review section
        Then Review Roadmap page should open
        And It should show only Phases of the Roadmap and each phase should have eye icon on the phase name
        When I click on eye icon of first phase
        Then It should show the Objectives below that phase
        When I click on eye icon of second phase
        Then It should show the Objectives below second phase
        When I again click on eye icon of first phase
        Then It should hide the objectives 

 @100
Scenario: As a User verify  Mandatory Objectives star mark in Edit Roadmap page
        When I click on Create button
        And I Fill All the fields in create new investment page
        And I click on Next button
        When I Select Roadmap
        Then Only Phases of selected Roadmap should appear and each phase should have eye icon on the phase name
        When I click on eye icon of first phase
        Then It should show the Objectives below that phase
        And Mandatory objectives should have star icon on the left side of Objectives

@101
    Scenario:Verify History section of the Investment
        When I click on Investment with status LIVE or DONE
        Then I should redirect to Review page
        And I should see All details of Investment and History buttons
        When I click on History button
        Then History sidebar should open and show the comments
        And I enter the comments and close the History side-bar

@102
    Scenario:Send an Investment of HOLD status for Approval
        When I click on Investment with status HOLD
        Then I should redirect to Review page
        And I should see All details of Investment, Back, Send, Save and History buttons
        When I click on Back button
        Then I should navigate to Objectives and Deliverable page and It should allow to add, edit, delete Objectives and deliverables of that phase
        When I click on Back button
        And I click on Back button
        Then I should navigate to Details page and and all fields should be editable except Investment Name and Investment Type
        And I click on next button untill I reach Review page
        And I click on Send button
        And I click on Send button present on Send Approval popup
        Then Investment sent for Approval message should appear

 @103
    Scenario: Send an Investment for Approval without document links for assess phase
        And I click on Create button
        When I Fill All the fields in create new investment page
        And I click on Next button
        And I Select Roadmap
        And I click on Next button
        Then I should navigate to Objectives and Deliverable page And Page should show Investent Type, Roadmap name and Reset Phase, Back, Next, Save As Draft buttons
        When I click on Next button
        Then I should navigate to Review page and should see Investment Type, Roadmap, Phase and Status
        And I should see Optonal text at Investment Documents section heading
        And I fill only Approver field not Investment Document section fields and click on Send button
        Then Send For Approval popup should open
        When I click on Send button present on Send Approval popup
        Then Investment sent for Approval message should appear
        And user should recieve submitted email

 @104
    Scenario: Send an Investment for Approval without document links for phase other than Assess
        And I click on Create button
        When I Fill All the fields in create new investment page
        And I click on Next button
        And I Select Roadmap
        And I delete Asses phase if its a first phase in Roadmap
        And I click on Next button
        Then I should navigate to Objectives and Deliverable page And Page should show Investent Type, Roadmap name and Reset Phase, Back, Next, Save As Draft buttons
        When I click on Next button
        Then I should navigate to Review page and should see Investment Type, Roadmap, Phase and Status
        And I should not see Optonal text at Investment Documents section heading
        And I fill only Approver field not Investment Document section fields and click on Send button
        Then It should show Enter Investment Documnet Links errorr message at Investment Document section
        When I fill all fields of Investment Documents section and click on send button
        Then Send For Approval popup should open
        When I click on Send button present on Send Approval popup
        Then Investment sent for Approval message should appear
        And user should recieve submitted email

  @105  
Scenario: Verify Tooltips of fields in create investment flow
        And I click on Create button
        When I hover the mouse on Details
        Then Tooltip for Details should appear
        When I hover the mouse on Location
        Then Tooltip for location field should appear
        When I hover the mouse on Asset
        Then Tooltip for Asset field should appear
        When I hover the mouse on Phase Start Year
        Then Tooltip for Phase Start Year field should appear
        When I hover the mouse on Team member
        Then Tooltip for Team member field should appear
        When I Fill All the fields in create new investment page
        And I click on Next button
        And I hover the mouse on Edit Roadmap
        Then Tooltip for Edit Roadmap should appear
        When I Select Roadmap
        And I click on Next button
        And I hover the mouse on Edit Objective and Deliverable
        Then Tooltip for Edit Objective and Deliverable should appear
        And I click on Next button
        When I hover the mouse on Review
        Then Tooltip for Review should appear    
        When I hover the mouse on Approver
        Then Tooltip for Approver field should appear

 @106
    Scenario:As a user edit Investment of LIVE status
        When I click on Investment with status LIVE
        Then I should redirect to Review page
        And I should see All details of Investment, Back and History buttons
        When I click on Back button
        Then I should navigate to Objectives and Deliverable page and It should allow to add, edit, delete Objectives and deliverables of that phase
        When I click on Back button
        And I click on Back button
        Then I should navigate to Details page and and all fields should be editable except Investment Name and Investment Type
        And I click on next button untill I reach Review page
        And I click on Details button present in Review section
        When I close the Review-Details page and click on Objective and deliverable button present in review section
        Then I should see details updated as edited in Edit Objective and deliverable page
        
 @107
Scenario:As a User Mark As Done for Last LIVE phase of investment
         When I click on the last LIVE phase Investment
         Then I should redirect to Review page
         When I click on Mark As Done button
         Then I should see the mark as done popup
         When I click on Confirm button
         Then I should see Investment Closed meesage and I should redirect to Action Required tab
         When I click on My Investments tab
         Then last phase of the investment status should be DONE


####### User flow but need Admin acess

    @108
    Scenario: Adding a Phase starting to the particular phase in user roadmap page
        When I click on Admin icon
        And I click on Phase tab
        And I click on Add button
        When I Enter the Phase name in phase freetext field and click on Add button
        When I click on Objective and Deliverable tab
        And I Select Investment Type and Roadmap
        When I hover mouse on any Phase
        When I click on starting add button of that phase
        Then Add Phase popup should  open and it should contain a drop down
        When I Click on dropdown
        When I slect newly added phase and click on Add button
        When I click on Home button
        And I click on Create button
        Then Create New Investment page should open
        When I Fill All fields in create new investment page with investent type as Exploration
        And I click on Next button
        Then I should navigate to Roadmap page and see Investment name at the top, Investment Type and Roadmap dropdown and Back, Save As Draft, Next buttons
        When I Select Roadmap
        And I hover mouse on Phase
        Then It should show Add button at the start and end of that phase and Delete button on that phase
        When I click on starting add button of that phase
        Then Add Phase popup should  open and it should contain drop down and Free text field for entering justification
        And Info: If you do not see any required Phase, please contact IMF admin. Add and Cancel button
        When I Click on dropdown
        Then It should show all the phases available and Already added phases should be in view mode only
        When I slect a phase and enter justification and click on Add button
        Then Phase add successful toaster message should appear, Phase should get added at the start of the phase on which you have clicked add button
        When I click on Admin icon
        Then Select Greenfield roadmap and verfiy newly added phase in Exploration should have same objectives as Greenfield
        And I delete the phase added in Greenfield rodmap


    @109
    Scenario: Adding a Phase at the end of particular phase in user roadmap page
        When I click on Admin icon
        And I click on Phase tab
        And I click on Add button
        When I Enter the Phase name in phase freetext field and click on Add button
        When I click on Objective and Deliverable tab
        And I Select Investment Type and Roadmap
        When I hover mouse on any Phase
        When I click on starting add button of that phase
        Then Add Phase popup should  open and it should contain a drop down
        When I Click on dropdown
        When I slect newly added phase and click on Add button
        When I click on Home button
        And I click on Create button
        Then Create New Investment page should open
        When I Fill All fields in create new investment page with investent type as Exploration
        And I click on Next button
        Then I should navigate to Roadmap page and see Investment name at the top, Investment Type and Roadmap dropdown and Back, Save As Draft, Next buttons
        When I Select Roadmap
        And I hover mouse on Phase
        Then It should show Add button at the start and end of that phase and Delete button on that phase
        When I click on ending add button of that phase
        Then Add Phase popup should  open and it should contain drop down and Free text field for entering justification
        And Info: If you do not see any required Phase, please contact IMF admin. Add and Cancel button
        When I Click on dropdown
        Then It should show all the phases available and Already added phases should be in view mode only
        When I slect a phase and enter justification and click on Add button
        Then Phase add successful toaster message should appear, Phase should get added at the end of the phase on which you have clicked add button
        When I click on Admin icon
        Then Select Greenfield roadmap and verfiy newly added phase in Exploration should have same objectives as Greenfield
        And I delete the phase added in Greenfield rodmap


    @110
    Scenario: Reset Roadmap
        When I click on Admin icon
        And I click on Phase tab
        And I click on Add button
        When I Enter the Phase name in phase freetext field and click on Add button
        When I click on Objective and Deliverable tab
        And I Select Investment Type and Roadmap
        When I hover mouse on any Phase
        When I click on starting add button of that phase
        Then Add Phase popup should  open and it should contain a drop down
        When I Click on dropdown
        When I slect newly added phase and click on Add button
        When I click on Home button
        And I click on Create button
        Then Create New Investment page should open
        When I Fill All fields in create new investment page with investent type as Exploration
        And I click on Next button
        Then I should navigate to Roadmap page and see Investment name at the top, Investment Type and Roadmap dropdown and Back, Save As Draft, Next buttons
        When I Select Roadmap
        And I hover mouse on Phase
        Then It should show Add button at the start and end of that phase and Delete button on that phase
        When I click on starting add button of that phase
        When I Click on dropdown
        When I slect a phase and enter justification and click on Add button
        Then Phase add successful toaster message should appear, Phase should get added at the start of the phase on which you have clicked add button
        When I click on Reset Roadmap button
        Then I should get a Warningpopup with message If you reset roadmap roadmap name, the roadmap will revert back to the default data, the changes you have made if any in Roadmap, Objective & Deliverable, Review will be lost !
        When I click on Confirm button
        Then Roadmap should revert back to default data
        And I delete the phase added in Greenfield rodmap

    @111
    Scenario: Cancel Reset Roadmap
        When I click on Admin icon
        And I click on Phase tab
        And I click on Add button
        When I Enter the Phase name in phase freetext field and click on Add button
        When I click on Objective and Deliverable tab
        And I Select Investment Type and Roadmap
        When I hover mouse on any Phase
        When I click on starting add button of that phase
        Then Add Phase popup should  open and it should contain a drop down
        When I Click on dropdown
        When I slect newly added phase and click on Add button
        When I click on Home button
        And I click on Create button
        Then Create New Investment page should open
        When I Fill All fields in create new investment page with investent type as Exploration
        And I click on Next button
        Then I should navigate to Roadmap page and see Investment name at the top, Investment Type and Roadmap dropdown and Back, Save As Draft, Next buttons
        When I Select Roadmap
        And I hover mouse on Phase
        Then It should show Add button at the start and end of that phase and Delete button on that phase
        When I click on starting add button of that phase
        When I Click on dropdown
        When I slect a phase and enter justification and click on Add button
        Then Phase add successful toaster message should appear, Phase should get added at the start of the phase on which you have clicked add button
        When I click on Reset Roadmap button
        Then I should get a Warningpopup with message If you reset roadmap roadmap name, the roadmap will revert back to the default data, the changes you have made if any in Roadmap, Objective & Deliverable, Review will be lost !
        When I click on Cancel button
        Then Roadmap should not revert back to default data
        And I delete the phase added in Greenfield rodmap


    @112
    Scenario: As a Admin Verify Created By User name
        And I click on Create button
        Then Create New Investment page should open
        When I Fill Investment Name and Investment Type
        And I click on Save button
        When I click on Home button
        And I click on All Investments tab
        When I click on any Investment
        Then I come back to Details page if investment is not on details page
        And  I verfiy CreatedBy User name by hovering mouse on info icon
        When I Fill remaining fields in create new investment page
        When I click on Next button
        Then I verfiy CreatedBy User name by hovering mouse on info icon
        When I click Next button in Roadmap page
        Then I verfiy CreatedBy User name by hovering mouse on info icon
        When I click on Next button
        Then I verfiy CreatedBy User name by hovering mouse on info icon

    @113
    Scenario: Verifying justification after Adding a Phase in user Roadmap page
        When I click on Admin icon
        And I click on Phase tab
        And I click on Add button
        When I Enter the Phase name in phase freetext field and click on Add button
        When I click on Objective and Deliverable tab
        And I Select Investment Type and Roadmap
        When I hover mouse on any Phase
        When I click on starting add button of that phase
        Then Add Phase popup should  open and it should contain a drop down
        When I Click on dropdown
        When I slect newly added phase and click on Add button
        When I click on Home button
        And I click on Create button
        Then Create New Investment page should open
        When I Fill All fields in create new investment page with investent type as Exploration
        And I click on Next button
        Then I should navigate to Roadmap page and see Investment name at the top, Investment Type and Roadmap dropdown and Back, Save As Draft, Next buttons
        When I Select Roadmap
        And I hover mouse on Phase
        Then It should show Add button at the start and end of that phase and Delete button on that phase
        When I click on ending add button of that phase
        Then Add Phase popup should  open and it should contain drop down and Free text field for entering justification
        And Info: If you do not see any required Phase, please contact IMF admin. Add and Cancel button
        When I Click on dropdown
        Then It should show all the phases available and Already added phases should be in view mode only
        When I slect a phase and enter justification and click on Add button
        Then Phase add successful toaster message should appear, Phase should get added at the end of the phase on which you have clicked add button
        When I click on Next button
        Then I should navigate to Objectives and Deliverable page And Page should show Investent Type, Roadmap name and Reset Phase, Back, Next, Save As Draft buttons
        When I click on Next button
        Then I should navigate to Review page and should see Investment Type, Roadmap, Phase and Status
        When I click on Roadmap button present in Review section
        And Click on Justification button
        Then Justification popup should open
        Then I should see the justification entered while adding a phase, name of user, justification added date and time
        And I close the Justification popup and Review-Roadmap page
        And I delete the phase added in Greenfield rodmap

    @114
    Scenario: Verifying a justification after Deletig a phase in user roadmap page
        When I click on Admin icon
        And I click on Phase tab
        And I click on Add button
        When I Enter the Phase name in phase freetext field and click on Add button
        When I click on Objective and Deliverable tab
        And I Select Investment Type and Roadmap
        When I hover mouse on any Phase
        When I click on starting add button of that phase
        Then Add Phase popup should  open and it should contain a drop down
        When I Click on dropdown
        When I slect newly added phase and click on Add button
        When I click on Home button
        And I click on Create button
        Then Create New Investment page should open
        When I Fill All fields in create new investment page with investent type as Exploration
        And I click on Next button
        Then I should navigate to Roadmap page and see Investment name at the top, Investment Type and Roadmap dropdown and Back, Save As Draft, Next buttons
        When I Select Roadmap
        And I hover mouse on Phase
        Then It should show Add button at the start and end of that phase and Delete button on that phase
        When I click on starting add button of that phase
        Then Add Phase popup should  open and it should contain drop down and Free text field for entering justification
        And Info: If you do not see any required Phase, please contact IMF admin. Add and Cancel button
        When I Click on dropdown
        Then It should show all the phases available and Already added phases should be in view mode only
        When I slect a phase and enter justification and click on Add button
        Then Phase add successful toaster message should appear, Phase should get added at the start of the phase on which you have clicked add button
        When I hover mouse on Phase
        And I click on delete button of that phase
        Then Delete Phase popup should open and it should show Are you sure you want to delete phase phase name message and Confirm and Cancel buttons
        When I enter justification and click on Confirm button
        Then Phase delete successful toaster message should appear and Phase should gets deleted for that investment
        When I click on Next button
        Then I should navigate to Objectives and Deliverable page And Page should show Investent Type, Roadmap name and Reset Phase, Back, Next, Save As Draft buttons
        When I click on Next button
        Then I should navigate to Review page and should see Investment Type, Roadmap, Phase and Status
        When I click on Roadmap button present in Review section
        And Click on Justification button
        Then Justification popup should open
        Then I should see the justification entered while deleting a phase, name of user, justification added date and time
        And I close the Justification popup and Review-Roadmap page
        And I delete the phase added in Greenfield rodmap


    @115
    Scenario: Adding a Phase with 0 Objective in user flow
        When I click on Admin icon
        And I click on Phase tab
        And I click on Add button
        When I Enter the Phase name in phase freetext field and click on Add button
        When I click on Objective and Deliverable tab
        And I Select Investment Type and Roadmap
        When I hover mouse on any Phase
        When I click on starting add button of that phase
        Then Add Phase popup should  open and it should contain a drop down
        When I Click on dropdown
        When I slect newly added phase and click on Add button
        When I click on Home button
        And I click on Create button
        And I Fill All fields in create new investment page with investent type as Exploration
        And I click on Next button
        And I Select Roadmap
        And I hover mouse on Phase
        And I click on starting add button of that phase
        When I Click on dropdown
        When I slect newly added phase, enter justification and click on Add button
        When I click on Next button
        And I click on Next button
        Then Phase must have atleast 1 Objective toaster message should appear
        And User should be on Objective and Deliverable page
        And I delete the phase added in Greenfield rodmap

    @116
    Scenario: Merging two phases
        When I click on Admin icon
        And I click on Phase tab
        And I click on Add button
        When I Enter the Phase name in phase freetext field and click on Add button
        When I click on Objective and Deliverable tab
        And I Select Investment Type and Roadmap
        When I hover mouse on any Phase
        When I click on starting add button of that phase
        Then Add Phase popup should  open and it should contain a drop down
        When I Click on dropdown
        When I slect newly added phase and click on Add button
        When I click on Home button
        And I click on Create button
        Then Create New Investment page should open
        When I Fill All the fields in create new investment page
        And I click on Next button
        Then I should navigate to Roadmap page and see Investment name at the top, Investment Type and Roadmap dropdown and Back, Save As Draft, Next buttons
        When I Select Roadmap
        And I hover mouse on Phase
        When I click on Merge button
        Then Merge Phase popup should open with message are you sure you want to merge phases and Justification field
        When I enter justification and click on Merge button
        Then Phase merge successful toaster message should appear
        And Phses should get merged as one phase having both phase names
        And I delete the phase added in Greenfield rodmap

    @117
     Scenario: Cancel Merging two phases
        When I click on Admin icon
        And I click on Phase tab
        And I click on Add button
        When I Enter the Phase name in phase freetext field and click on Add button
        When I click on Objective and Deliverable tab
        And I Select Investment Type and Roadmap
        When I hover mouse on any Phase
        When I click on starting add button of that phase
        Then Add Phase popup should  open and it should contain a drop down
        When I Click on dropdown
        When I slect newly added phase and click on Add button
        When I click on Home button
        And I click on Create button
        Then Create New Investment page should open
        When I Fill All the fields in create new investment page
        And I click on Next button
        Then I should navigate to Roadmap page and see Investment name at the top, Investment Type and Roadmap dropdown and Back, Save As Draft, Next buttons
        When I Select Roadmap
        And I hover mouse on Phase
        When I click on Merge button
        Then Merge Phase popup should open with message are you sure you want to merge phases and Justification field
        When I enter justification and click on Cancel button
        And Phses should not get merged as one phase and No toaster message
        And I delete the phase added in Greenfield rodmap



    @118
    Scenario: Verify Data sync in current phase with Admin data
        And I click on Create button
        Then Create New Investment page should open
        When I Fill All fields in create new investment page with investent type as Exploration
        And I click on Next button
        Then I should navigate to Roadmap page and see Investment name at the top, Investment Type and Roadmap dropdown and Back, Save As Draft, Next buttons
        When I Select Roadmap
        And I click on Next button
        And I click on Home button
        And I click on Admin icon
        Then I add a deliverable to the investment type which is selected while creating an investment
        And I come back to the investments objective and deliverable page
        And I click on Back button
        And I click on Next button
        Then I should see newly added deliverable in first phase

@119
    Scenario: Verify Data sync in current phase with Admin data afetr save as draft in Objective and deliverables page
        And I click on Create button
        Then Create New Investment page should open
        When I Fill All fields in create new investment page with investent type as Exploration
        And I click on Next button
        Then I should navigate to Roadmap page and see Investment name at the top, Investment Type and Roadmap dropdown and Back, Save As Draft, Next buttons
        When I Select Roadmap
        And I click on Next button
        And I click on Save button
        And I click on Home button
        And I click on Admin icon
        Then I add a deliverable to the investment type which is selected while creating an investment
        And I come back to the investments objective and deliverable page
        And I click on Back button
        And I click on Next button
        Then I should not see newly added deliverable in first phase


    @120
    Scenario: Verify Reset Phase button in Objective and Deliverable page after Merging starting two phases
        When I click on Admin icon
        And I click on Phase tab
        And I click on Add button
        When I Enter the Phase name in phase freetext field and click on Add button
        When I click on Objective and Deliverable tab
        And I Select Investment Type and Roadmap
        When I hover mouse on any Phase
        When I click on starting add button of that phase
        Then Add Phase popup should  open and it should contain a drop down
        When I Click on dropdown
        When I slect newly added phase and click on Add button
        When I click on Home button
        And I click on Create button
        Then Create New Investment page should open
        When I Fill All the fields in create new investment page
        And I click on Next button
        Then I should navigate to Roadmap page and see Investment name at the top, Investment Type and Roadmap dropdown and Back, Save As Draft, Next buttons
        When I Select Roadmap
        And I hover mouse on Phase
        When I click on Merge button
        Then Merge Phase popup should open with message are you sure you want to merge phases and Justification field
        When I enter justification and click on Merge button
        Then Phase merge successful toaster message should appear
        And Phses should get merged as one phase having both phase names
        When I click on Next button
        Then I should not see Reset Phase button
        And I delete the phase added in Greenfield rodmap


    @121
    Scenario: Verify justification in Roadmap-Review page after Merging two phases
        When I click on Admin icon
        And I click on Phase tab
        And I click on Add button
        When I Enter the Phase name in phase freetext field and click on Add button
        When I click on Objective and Deliverable tab
        And I Select Investment Type and Roadmap
        When I hover mouse on any Phase
        When I click on starting add button of that phase
        Then Add Phase popup should  open and it should contain a drop down
        When I Click on dropdown
        When I slect newly added phase and click on Add button
        When I click on Home button
        And I click on Create button
        Then Create New Investment page should open
        When I Fill All the fields in create new investment page
        And I click on Next button
        Then I should navigate to Roadmap page and see Investment name at the top, Investment Type and Roadmap dropdown and Back, Save As Draft, Next buttons
        When I Select Roadmap
        And I hover mouse on Phase
        When I click on Merge button
        Then Merge Phase popup should open with message are you sure you want to merge phases and Justification field
        When I enter justification and click on Merge button
        Then Phase merge successful toaster message should appear
        When I click on Next button
        Then I should navigate to Objectives and Deliverable page And Page should show Investent Type, Roadmap name and Reset Phase, Back, Next, Save As Draft buttons
        When I click on Next button
        Then I should navigate to Review page and should see Investment Type, Roadmap, Phase and Status
        When I click on Roadmap button present in Review section
        And Click on Justification button
        Then Justification popup should open
        Then I should see the justification entered while merging a phase, name of user, justification added date and time
        And I close the Justification popup and Review-Roadmap page
        And I delete the phase added in Greenfield rodmap

##################