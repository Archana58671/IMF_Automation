    Feature: Admin tab of IMF

# Background: Launch IMF Application
#  When I launch IMF application

    @1
    Scenario: Verify Home page
        Then I should see All Investments, My Investments and Action Required tabs on Home page
        And  I should see Admin, Home and searh icons and three dots at the right corner of the page
        And  Woodside Logo should be present at the left corner of the page
        When I Click on three dots present at the right corner
        Then It should show user name and user email id
     @2   
    Scenario: Verify Admin tab
        And I click on Admin icon
        Then User should navigate to Admin page 
        And should see Objectives and Deliverables,Roadmap,Location,Asset,Phase,Investment Type,Label tabs

    @3
    Scenario Outline: Verifying Tabs
        And I click on Admin icon
        Then User should navigate to Admin page 
        When I click on "<Tabname>" tab
        Then I should navigate to "<Tabname>" tab and see "<column1>" and "<column2>" columns
        And I should see Search icon and Add button
        And Action column should show edit and Delete icon for each row

        Examples:
            | Tabname  | column1  | column2 |
            | Location | Location |Action   |
            | Asset    | Asset    |Action   |
            | Phase    | Phase    |Action   |
            | Investment Type    | Investment Type    |Action   |
            
     @4
    Scenario: Verify Label tab
        And I click on Admin icon
        Then User should navigate to Admin page 
        When I click on Label tab
        Then I should navigate to Label tab and see Type, Label and Action columns
        And I should see Search icon and Add button
        And Action column should show edit and Delete icon for each row

       @5
    Scenario Outline: Adding Records Location, Asset, Phase, InvestmentType tabs
        And I click on Admin icon
        Then User should navigate to Admin page 
        When I click on "<Tabname>" tab
        Then I should navigate to "<Tabname>" tab and see "<Tabname>" and "<column2>" columns
        When I click on Add button
        Then Add "<Tabname>" popup should open
       When I Enter the "<Tabname>" name in "<column1>"  free text field and click on Add button 
        Then "<Tabname>" add successful toaster message should appear and newly added "<column1>" should appear in the list
        When I click on Add button
        Then Add "<Tabname>" popup should open
        When I Enter the "<Tabname>" name in "<column1>"  free text field and click on Cancel button 
        Then Newly added "<column1>" should not appear in the list and No toster message

    Examples:
            | Tabname  | column1  | column2 |
            | Location | location |Action   |
            | Asset    | asset    |Action   |
            | Phase    | phase    |Action   |
            | Investment Type    | investmentType    |Action   |

         @6         
    Scenario Outline: Adding a Label
        And I click on Admin icon
        Then User should navigate to Admin page 
        When I click on Label tab
        Then I should navigate to Label tab and see Type, Label and Action columns
        When I click on Add button
        Then Add Label popup should open
        When I select Type as Form Label, Enter the Label name in Label free text field and click on Add button 
        Then Form Label add successful toaster message should appear and newly added Form Label should appear in the list
        When I click on Add button
        Then Add Label popup should open
        When I select Type as Document, Enter the Label name in Label free text field and click on Add button 
        Then Document add successful toaster message should appear and newly added Document should appear in the list
        When I click on Add button
        Then Add Label popup should open
        When I select Type as Form Label, Enter the Label name in Label free text field and click on Cancel button 
        Then Newly added Label should not appear in the list and No toster message
              
  @7
Scenario Outline: Adding Duplicate records in Location, Asset, Phase, InvestmentType tabs
        And I click on Admin icon
        Then User should navigate to Admin page 
        When I click on "<Tabname>" tab
        Then I should navigate to "<Tabname>" tab and see "<Tabname>" and "<column2>" columns
        When I click Add button for adding duplicate record
        Then Add "<Tabname>" popup should open
        When I Enter "<Tabname>" name in "<column1>" free text field and click on Add button 
        Then "<Tabname>" already exists. Could not add the "<Tabname>". toaster message should appear and there should not be two "<Tabname>" with same name

        Examples:
            | Tabname  | column1  | column2 |
            | Location | location |Action   |
            | Asset    | asset    |Action   |
            | Phase    | phase    |Action   |
            | Investment Type    | investmentType    |Action   |

      @8
    Scenario: Adding a Duplicate record in Label tab
        And I click on Admin icon
        Then User should navigate to Admin page 
        When I click on Label tab
        Then I should navigate to Label tab and see Type, Label and Action columns
        When I click Add button for creating duplicate Form Labels
        Then Add Label popup should open
        When I select Type Form Label, Enter the Label name in Label free text field and click on Add button 
        Then Form Label already exists. Could not add the Form Label. toaster message should appear and there should not be two Form Labels with same name
        When I click Add button for creating duplicate Documents
        Then Add Label popup should open
        When I select Type Document, Enter the Label name in Label free text field and click on Add button 
        Then Document already exists. Could not add the Document. toaster message should appear and there should not be two Documents with same name
    
      @9
     Scenario: Creating a duplicate records By Editing in Location, Asset, Phase, InvestmentType tabs
        And I click on Admin icon
        Then User should navigate to Admin page 
        When I click on "<Tabname>" tab
        Then I should navigate to "<Tabname>" tab and see "<Tabname>" and "<column2>" columns
        When I click on Edit button of any record in Action column
        Then Edit "<Tabname>" popup should open
        When I Enter the "<Tabname>" name in "<column1>" free text field and click on Save button 
        Then "<Tabname>" already exists. Could not save the "<Tabname>" toaster message should appear and there should not be two "<Tabname>" with same name
       
     Examples:
            | Tabname  | column1  | column2 |
            | Location | location |Action   |
            | Asset    | asset    |Action   |
            | Phase    | phase    |Action   |
            | Investment Type    | investmentType    |Action   |

    
      @10
    Scenario: Creating a duplicate record By Editing a Label
        And I click on Admin icon
        Then User should navigate to Admin page 
        When I click on Label tab
        Then I should navigate to Label tab and see Type, Label and Action columns
        When I click on Edit button of any record of type Form Label in Action column
        Then Edit Form Label popup should open
        When I Edit the Label in Label free text field and click on Save button 
        Then Form Label already exists. Could not save the Form Label toaster message should appear and there should not be two Form Labels with same name
        When I click on Edit button of any record of type Document in Action column
        Then Edit Document popup should open
        When I Edit Label of Document Type in Label free text field and click on Save button 
        Then Document already exists. Could not save the Document toaster message should appear and there should not be two Documents with same name


         @11
        Scenario Outline: Editing Records in Location, Asset, Phase, InvestmentType tabs
        And I click on Admin icon
        Then User should navigate to Admin page 
        When I click on "<Tabname>" tab
        Then I should navigate to "<Tabname>" tab and see "<Tabname>" and "<column2>" columns
        When I click on Edit button of any record in Action column
        Then Edit "<Tabname>" popup should open
        When I Edit the "<Tabname>" name in "<column1>" free text field and click on Save button 
        Then "<Tabname>" edit successful toaster message should appear and "<Tabname>" should get updated as Edited by user
        When I click on Edit button of any record in Action column
        Then Edit "<Tabname>" popup should open
        When I Edit the "<Tabname>" name in "<column1>" free text field and click on Cancel button
        Then "<Tabname>" should not get updated as Edited by user and No toster message
        
        Examples:
            | Tabname  | column1  | column2 |
            | Location | location |Action   |
            | Asset    | asset    |Action   |
            | Phase    | phase    |Action   |
            | Investment Type    | investmentType    |Action   |

       @12
    Scenario: Editing a Label
        And I click on Admin icon
        Then User should navigate to Admin page 
        When I click on Label tab
        Then I should navigate to Label tab and see Type, Label and Action columns
        When I click on Edit button of any record of type Form Label in Action column
        Then Edit Form Label popup should open
         When I Edit Label in Label free text field and click on Save button
        Then Form Label edit successful toaster message should appear and Label should get updated as Edited by user
        When I click on Edit button of any record of type Document in Action column
        Then Edit Document popup should open
        When I Edit Label in Label free text field and click on Save button 
        Then Document edit successful toaster message should appear and Label should get updated as Edited by user
        When I click on Edit button of any record of type Form Label in Action column
        Then Edit Form Label popup should open
        When I Edit the Label in Label free text field and click on Cancel button 
        Then Label should not get updated as Edited by user and No toster message
       

         @13
    Scenario Outline: Searching a record in Location, Asset, Phase, InvestmentType, Label tabs
        And I click on Admin icon
        Then User should navigate to Admin page 
        When I click on "<Tabname>" tab
        Then I should navigate to "<Tabname>" tab and see "<Tabname>" and "<column2>" columns
        When I Enter the name partially in Search bar
        Then The records containing or matching the words should be filtered and populated in the table
        When I Enter the name completely in Search bar
        Then It should show the exact match only
        When I Enter the words which are not there in the table
        Then It should show No Data found ! Message

        Examples:
        |Tabname     | column2|
        |Location    | Action|
        |Asset        |Action|
        |Phase        |Action|
        |Investment Type|Action|
       |Label        |Action|


      @14
Scenario: Verify Roadmap tab
        And I click on Admin icon
        Then User should navigate to Admin page 
        When I Select Investment Type and Roadmap
        Then It should show the Roadmap of selected Investment Type and Roadmap
        And Roadmap should show Phases, number of number of objectives that phase contains
        When I click on eye icon of first phase
        Then It should show the Objectives below that phase
         


 @15
    Scenario: Adding a Objective
            And I click on Admin icon
            Then User should navigate to Admin page 
            When I click on Objective and Deliverable tab
            And I Select Investment Type and Roadmap
            And I click on Phase and the click on add Objective button
            Then Add Objective popup should open
            When I click on Deliverable Details section and Add Deliverable button
            Then It should show Add Deliverable heading, Title and Information fields
            And I fill all the details in Deliverable details section and click on add button
            When I click on Objective Details section
            And It should show Title, Information, Discipline, Mandatory, Investment Roadmaps, Investment Phases in Objecive details section
            And I fill all the details in Objective details section and click on add button
            Then Objective add successful toaster message should appear 
            And Objective should get added at all the Investment types and Phases which we selected while adding

  @16
Scenario: Verify Objective and Deliverable tab
        And I click on Admin icon
        Then User should navigate to Admin page 
        When I click on Objective and Deliverable tab
        Then I should navigate to Objective and Deliverable tab and see Investment Type and Roadmap dropdowns
        When I Select Investment Type and Roadmap
        Then It should show the Roadmap for selected Investment Type and Roadmap
        And Roadmap should show Phases, number of number of objectives that phase contains
        When I click on any Phase
        Then It should show Objctives and Deliverables and Objectives section should have add button for adding Objectives
        And Objective section should show number of objectives shown on that phase
        And Deliverables section should show deliverables for objects of that phase
        And Each objective and Deliverable should show 3 dots and star mark if that objective is mandatory at the left side of that Objective

  @17
Scenario: View Objective
        And I click on Admin icon
        Then User should navigate to Admin page 
        When I click on Objective and Deliverable tab
        Then I should navigate to Objective and Deliverable tab and see Investment Type and Roadmap dropdowns
        When I Select Investment Type and Roadmap
        And I Click on any phase and then hover the mouse on 3 dots of any objective
        Then It should show view, add, edit and Delete icons
        When I click on view icon
        Then View Objective popup should open and should show Title, Information and Discipline of that Objective
        And It should show Mandatory word if that objective is mandatory and Close button
        When I click on Close button
        Then Popup should get closed

  @18
    Scenario: Edit Objective 
        And I click on Admin icon
        Then User should navigate to Admin page
        When I click on Objective and Deliverable tab
        Then I should navigate to Objective and Deliverable tab and see Investment Type and Roadmap dropdowns
        When I Select Investment Type and Roadmap
        And I Click on any phase and then hover the mouse on 3 dots of any objective
        Then It should show view, add, edit and Delete icons
        And I click on Phase and the click on add Objective button
        Then Add Objective popup should open
        When I click on Deliverable Details section and Add Deliverable button
        Then It should show Add Deliverable heading, Title and Information fields
        And I fill all the details in Deliverable details section and click on add button
        When I click on Objective Details section
        And It should show Title, Information, Discipline, Mandatory, Investment Roadmaps, Investment Phases in Objecive details section
        And I fill all the details in Objective details section and click on add button
        Then Objective add successful toaster message should appear
        And Objective should get added at all the Investment types and Phases which we selected while adding
        When I click on edit icon
        Then Edit Objective popup should open and it should show Title, Information, Discipline and Mandatory fields 
        And All should be editable and it should show Save and Cancel buttons
        When I Edit the Objective and click on Save button
        Then Objective edit successful toaster message should appear
        And objective should get updated as edited by user for that particular Roadmap and Phase
        When I click edit icon again
        Then Edit Objective popup should open and it should show Title, Information, Discipline and Mandatory fields 
        And All should be editable and it should show Save and Cancel buttons
        When I Edit the Objective and click on Cancel button
        Then Objective should not get updated as edited by user and No toaster message


  @19
    Scenario: Delete Objective
        And I click on Admin icon
        Then User should navigate to Admin page 
        When I click on Objective and Deliverable tab
        Then I should navigate to Objective and Deliverable tab and see Investment Type and Roadmap dropdowns
        When I Select Investment Type and Roadmap
        And I click on Phase and the click on add Objective button
        Then Add Objective popup should open
        When I click on Deliverable Details section and Add Deliverable button
        Then It should show Add Deliverable heading, Title and Information fields
        And I fill all the details in Deliverable details section and click on add button
        When I click on Objective Details section
        And It should show Title, Information, Discipline, Mandatory, Investment Roadmaps, Investment Phases in Objecive details section
        And I fill all the details in Objective details section and click on add button
        Then Objective add successful toaster message should appear
        And Objective should get added at all the Investment types and Phases which we selected while adding
        And I Click on any phase and then hover the mouse on 3 dots of any objective
        When I click on delete icon
        Then Delete Objective popup should open with a message Are you sure you want to delete objective and Confirm and Cancel button 
        When I click on Confirm button
        Then Objective delete successful toaster message should appear
        And Objective should get deleted along with its associated deliverables for that particular Roadmap and Phase
        When I click delete icon again
        When I click on Cancel button
        Then Objective should not get deleted and No toaster message


  @20
    Scenario: Add Deliverable
        And I click on Admin icon
        Then User should navigate to Admin page 
        When I click on Objective and Deliverable tab
        Then I should navigate to Objective and Deliverable tab and see Investment Type and Roadmap dropdowns
        When I Select Investment Type and Roadmap
        And I Click on any phase and then hover the mouse on 3 dots of any objective
        When I click on add icon
        Then Add Deliverable popup should open and it should contain Title and Informatin free text fields, Add and Cancel buttons
        When I Enter all the details and click on Add button
        Then Deliverable add successful toaster message should appear and that deliverable should be added to that particular Objective
        When I click on add icon
        Then Add Deliverable popup should open and it should contain Title and Informatin free text fields, Add and Cancel buttons
        When I Enter all the details and click on Cancel button
        Then That deliverable should not be added to that particular Objective and No toaster message


  @21
    Scenario: View Deliverable
            And I click on Admin icon
            Then User should navigate to Admin page 
            When I click on Objective and Deliverable tab
            Then I should navigate to Objective and Deliverable tab and see Investment Type and Roadmap dropdowns
            When I Select Investment Type and Roadmap
            And I Click on any phase and then hover the mouse on 3 dots of any deliverable
            Then It should show view, edit and Delete icons
            When I click view icon of deliverable
            Then View Deliverable popup should open and should show Title and Information fields and Close button
            When I click on Close button
            Then Popup should get closed

  @22
    Scenario: Edit Deliverable
            And I click on Admin icon
            Then User should navigate to Admin page 
            When I click on Objective and Deliverable tab
            Then I should navigate to Objective and Deliverable tab and see Investment Type and Roadmap dropdowns
            When I Select Investment Type and Roadmap
            And I Click on any phase and then hover the mouse on 3 dots of any deliverable
            Then It should show view, edit and Delete icons
            When I click edit icon of deliverable
            Then Edit Deliverable popup should open and it should show Title and Information fields 
            And All fields should be editable and it should show Save and Cancel buttons
            When I Edit the Deliverable and click on Save button
            Then Deliverable edit successful toaster message should appear
            And Deliverable should get updated as edited by user
            When I click edit icon of deliverable
            Then Edit Deliverable popup should open and it should show Title and Information fields 
            And All fields should be editable and it should show Save and Cancel buttons
            When I Edit the Deliverable and click on Cancel button
            Then Deliverable should not get updated as edited by user and No toaster message


  @23
    Scenario: Delete Deliverable
            And I click on Admin icon
            Then User should navigate to Admin page 
            When I click on Objective and Deliverable tab
            Then I should navigate to Objective and Deliverable tab and see Investment Type and Roadmap dropdowns
            When I Select Investment Type and Roadmap
            And I Click on any phase and then hover the mouse on 3 dots of any deliverable
            Then It should show view, edit and Delete icons
            When I click delete icon of deliverable
            Then Delete Deliverable popup should open with a message Are you sure you want to delete deliverable and Confirm and Cancel button 
            When I click on Confirm button
            Then Deliverable delete successful toaster message should appear
            And Deliverable should get deleted
            When I click delete icon of deliverable
            Then Delete Deliverable popup should open with a message Are you sure you want to delete deliverable and Confirm and Cancel button 
            When I click on Cancel button
            Then Deliverable should not get deleted and No toaster message


  @24
    Scenario: Delete last Deliverable
            And I click on Admin icon
            Then User should navigate to Admin page 
            When I click on Objective and Deliverable tab
            Then I should navigate to Objective and Deliverable tab and see Investment Type and Roadmap dropdowns
            When I Select Investment Type and Roadmap
            And I Click on any phase
            When I click the delete icon of deliverable where only one deliverable is present
            Then You can't delete last Deliverable ! toaster message should appear
            
    @25
    Scenario: Adding a Phase starting to the phase in the Roadmap
            And I click on Admin icon
            Then User should navigate to Admin page 
            When I click on Phase tab
            And I click on Add button
            When I Enter the Phase name in phase freetext field and click on Add button
            Then I will store all the Phases
            When I click on Objective and Deliverable tab
            Then I should navigate to Objective and Deliverable tab and see Investment Type and Roadmap dropdowns
            When I Select Investment Type, Roadmap as Exploration
            Then It should show the Roadmap for selected Investment Type and Roadmap
            When I hover mouse on any Phase
            Then It should show Add button at the start and end of that phase, Edit and Delete button on that phase
            When I click on starting add button of that phase
            Then Add Phase popup should  open and it should contain a drop down
            And Info: If you do not see any Phase, please make sure that it is added in admin Phase tab. Add and Cancel button
            When I Click on dropdown
            Then It should show all the phases available and Already added phases should be in view mode only
            When I slect a phase and click on Add button
            Then Phase add successful toaster message should appear and Phase should get added at the start of the phase on which you have clicked add button



  @26
    Scenario: Adding a Phase in-between in the Roadmap
            And I click on Admin icon
            Then User should navigate to Admin page 
            When I click on Phase tab
            And I click on Add button
            When I Enter the Phase name in phase freetext field and click on Add button
            Then I will store all the Phases
            When I click on Objective and Deliverable tab
            Then I should navigate to Objective and Deliverable tab and see Investment Type and Roadmap dropdowns
            When I Select Investment Type, Roadmap as Exploration
            Then It should show the Roadmap for selected Investment Type and Roadmap
            When I hover mouse on any Phase
            Then It should show Add button at the start and end of that phase, Edit and Delete button on that phase
            When I click on ending add button of that phase
            Then Add Phase popup should  open and it should contain a drop down
            And Info: If you do not see any Phase, please make sure that it is added in admin Phase tab. Add and Cancel button
            When I Click on dropdown
            Then It should show all the phases available and Already added phases should be in view mode only
            When I slect phase and click on Add button
            Then Phase add successful toaster message should appear and Phase should get added at the end of the phase on which you have clicked add button


  @27
    Scenario: Editing a Phase in a Roadmap
            And I click on Admin icon
            Then User should navigate to Admin page 
            When I click on Phase tab
            Then I will store all the Phases
            When I click on Objective and Deliverable tab
            Then I should navigate to Objective and Deliverable tab and see Investment Type and Roadmap dropdowns
            When I Select Investment Type, Roadmap as Exploration
            Then It should show the Roadmap for selected Investment Type and Roadmap
            When I hover mouse on any Phase
            Then It should show Add button at the start and end of that phase, Edit and Delete button on that phase
            When I click on edit button of that phase
            Then Edit Phase popup should open and it should contain a drop down
            And Info: If you do not see any Phase, please make sure that it is added in admin Phase tab. Save and Cancel button
            When I Click on dropdown
            Then It should show all the phases available and Already added phases should be in view mode only
            When I slect phase and clicks Save button
            Then Phase edit successful toaster message should appear and Phase should get updated


  @28
    Scenario: Deleting a Phase in Roadmap
            And I click on Admin icon
            Then User should navigate to Admin page 
            When I click on Phase tab
            Then I will store all the Phases
            When I click on Objective and Deliverable tab
            Then I should navigate to Objective and Deliverable tab and see Investment Type and Roadmap dropdowns
            When I Select Investment Type, Roadmap as Exploration
            Then It should show the Roadmap for selected Investment Type and Roadmap
            When I hover mouse on any Phase
            Then It should show Add button at the start and end of that phase, Edit and Delete button on that phase
            When I click on delete button of that phase
            Then Delete Phase popup should open and it should show Are you sure you want to delete phase message and Confirm and Cancel buttons
            When I click on Confirm button
            Then Phase delete successful toaster message should appear and Phase should get deleted


  @29
Scenario Outline: Deleting a record in Location, Asset, Phase, InvestmentType tabs
        And I click on Admin icon
        Then User should navigate to Admin page 
        When I click on "<Tabname>" tab
        Then I should navigate to "<Tabname>" tab and see "<Tabname>" and "<column2>" columns
        When I click on Delete button of any record in "<column2>" column
        Then Delete "<Tabname>" popup should open with message Are you sure you want to delete "<column1>" and Confirm and Cancel button
        When I click on Confirm button
        Then "<Tabname>" delete successful toaster message should appear and "<Tabname>" should get deleted
        When I click Delete button of any record in "<column2>" column
        Then Delete "<Tabname>" popup should open with message Are you sure you want to delete "<column1>" and Confirm and Cancel button
        When I click on Cancel button
        Then "<Tabname>" should not get deleted and No toaster message
        
        Examples:
            | Tabname  | column1  | column2 |
            | Location | location |Action   |
            | Asset    | asset    |Action   |
            | Phase    | phase    |Action   |
            | Investment Type    | investment type    |Action   |

  @30
    Scenario Outline: Deleting a record in Label tab
        And I click on Admin icon
        Then User should navigate to Admin page 
        When I click on "<Tabname>" tab
        When I click on Delete button of any "<Labelname>" record in "<column1>" column
        Then Delete "<Labelname>" popup should open with message Are you sure you want to delete "<column2>" and Confirm and Cancel button
        When I click on Confirm button
        Then "<Labelname>" delete successful toaster message should appear and "<Labelname>" should gets deleted from that particular label type
        When I click Delete button of any "<Labelname>" record in "<column1>" column
        Then Delete "<Labelname>" popup should open with message Are you sure you want to delete "<column2>" and Confirm and Cancel button
        When I click on Cancel button
        Then "<Labelname>" should not get deleted and no toaster message

         Examples:
            | Tabname  | Labelname  | column1 |column2 |
            | Label    | Form Label |Action   |form label|
            | Label    | Document    |Action  |document|        
        
    @31
    Scenario: To verify Error messages While adding and editing a record in Location, Asset, Phase, InvestmentType, Label tabs
        And I click on Admin icon
        Then User should navigate to Admin page 
        When I click on "<Tabname>" tab
        And I click on Add button
        Then Add "<Tabname>" popup should open
        When I Click on Add button without entering "<Tabname>"
        Then Please Enter "<Tabname>" error message should appear below the "<column1>" field 
        When I Click on Cancel button and then click on Add button
        Then Add "<Tabname>" popup should open
        When I Click on Cancel button without entering "<Tabname>"
        Then Popup should gets closed without any error message
        When I click on Edit button of any record in Action column
        Then Edit "<Tabname>" popup should open
        When I Remove the "<column1>" and click on Save button
        Then Please Enter "<Tabname>" error message should appear
        When I Click on Cancel button and then click on Edit button
        Then Edit "<Tabname>" popup should open
        When I Remove the "<column1>" and click on Cancel button
        Then Popup should gets closed without any error message

    Examples:
            | Tabname  | column1  |column2 |
             | Location | location |Action   |
            | Asset    | asset    |Action   |
            | Phase    | phase    |Action   |
            | Investment Type    | investmentType    |Action   |
            |Label |label|Action|


  @32
Scenario: To verify Error messages While adding a Phase in Roadmap
            And I click on Admin icon
            Then User should navigate to Admin page 
            When I click on Objective and Deliverable tab
            Then I should navigate to Objective and Deliverable tab and see Investment Type and Roadmap dropdowns
            When I Select Investment Type and Roadmap
            Then It should show the Roadmap for selected Investment Type and Roadmap
            When I hover mouse on any Phase
            And I click on starting add button of that phase
            Then Add Phase popup should  open and it should contain a drop down
            And Info: If you do not see any Phase, please make sure that it is added in admin Phase tab. Add and Cancel button
            When I Click on Cancel button without selecting phase
            Then Popup should gets closed without any error message
            When I hover mouse on any Phase
            And I click on starting add button of that phase
            And I Click on Add button without selecting phase
            Then Please Select Phase error message should appear
          
@33
Scenario: To verify Error messages While adding a Deliverable
        And I click on Admin icon
        Then User should navigate to Admin page 
        When I click on Objective and Deliverable tab
        And  I Select Investment Type and Roadmap
        And I Click on any phase and then hover the mouse on 3 dots of any objective
        When I click on add icon
        Then Add Deliverable popup should open and it should contain Title and Informatin free text fields, Add and Cancel buttons
        When I click Add button without entering any details
        Then Please Enter Title and Please Enter Information error message should appear

  @34
Scenario: To verify Error messages While editing a Deliverable
            And I click on Admin icon
            Then User should navigate to Admin page 
            When I click on Objective and Deliverable tab
            And  I Select Investment Type and Roadmap
            And I Click on any phase and then hover the mouse on 3 dots of any deliverable
            Then It should show view, edit and Delete icons
            When I click edit icon of deliverable
            Then Edit Deliverable popup should open and it should show Title and Information fields 
            When I remove the Title and click on Save button
            Then Please Enter Title error message should appear

  @35
Scenario: To verify Error messages While editing a Objective 
        And I click on Admin icon
        Then User should navigate to Admin page 
        When I click on Objective and Deliverable tab
        When I Select Investment Type and Roadmap
        And I Click on any phase and then hover the mouse on 3 dots of any objective
        Then It should show view, add, edit and Delete icons
        When I click on the edit icon
        Then Edit Objective popup should open and it should show Title, Information, Discipline and Mandatory fields 
        When I remove the Title and click on Save button
        Then Please Enter Title error message should appear

  @36
Scenario: To verify Error messages While adding a Objective 
            And I click on Admin icon
            Then User should navigate to Admin page 
            When I click on Objective and Deliverable tab
            And I Select Investment Type and Roadmap
            And I click on Phase and the click on add Objective button
            Then Add Objective popup should open
            When I click Add button without entering any details
            Then It should show the error message at each field



@37
    Scenario:As a Admin Send an Investment of HOLD status for Approval
        When I click on All Investments tab
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


@38
    Scenario: As a Admin Resend an investment for Approval
        And I click on All Investments tab
        When I hover the mouse on any Investment of state Approval Pending and click on message icon
        Then I should navigate to Review page see status as Approval Pending and Resend Approval button Admin Action section
        When I click on Resend Approval button
        Then Resend Approval popup should open
        When I click on Confirm button
        Then Investment phase resent for approval toaster message should appear

    @39
    Scenario: As a Admin cancel Resending an investment for Approval
        And I click on All Investments tab
        When I hover the mouse on any Investment of state Approval Pending and click on message icon
        Then I should navigate to Review page see status as Approval Pending and Resend Approval button Admin Action section
        When I click on Resend Approval button
        Then Resend Approval popup should open
        When I click on Cancel button
        Then Popup should gets closed and no toaster message

    @40
    Scenario: As a Admin edit DRAFT state Investment
        Then I should see All Investments, My Investments and Action Required tabs on Home page
        And I click on Create button
        Then Create New Investment page should open
        When I Fill Investment Name and Investment Type
        And I click on Save button
        Then Investment save successful toaster message should appear
        When I click on Home button
        When I click on All Investments tab
        Then I should navigate to All Investments tab
        When I click on any Investment of Draft state
        Then Investment shoud open
        And All fields should be editable
        When I edit the investment and click on Save button
        Then Investment save successful toaster message should appear
        When I click on Home button
        And I click on All Investments tab
        Then I should see Investment with edited details

@41
    Scenario: As a Admin Delete Investment of DRAFT state
        Then I should see All Investments, My Investments and Action Required tabs on Home page
        And I click on Create button
        Then Create New Investment page should open
        When I Fill Investment Name and Investment Type
        And I click on Save button
        Then Investment save successful toaster message should appear
        When I click on Home button
        When I click on All Investments tab
        Then I should navigate to All Investments tab
        When I hover the mouse on any Investment of Draft state
        Then I should see Delete button
        When I click on delete button present on investment of draft state
        Then Delete Investment popup should open
        And It should have message Are you sure you want to delete investment and Confirm and Cancel buttons
        When I click on Confirm button
        Then Investment delete successful toaster message should appear
        Then Investment should get deleted



@42       
Scenario: As a Admin verify Roadmap page to show only Roadmap by default and have eye icon to show Objectives in Admin page
        When I click on Admin icon
        And I Select Investment Type and Roadmap
        Then Only Phases of selected Roadmap should appear and each phase should have eye icon on the phase name
        When I click on eye icon of first phase
        Then It should show the Objectives below that phase
        When I click on eye icon of second phase
        Then It should show the Objectives below second phase
        When I again click on eye icon of first phase
        Then It should hide the objectives

 @43
Scenario: Verify Mandatory Objectives star mark in Roadmap tab of Admin page
        And I click on Admin icon
        Then User should navigate to Admin page 
        When I Select Investment Type and Roadmap
        Then It should show the Roadmap of selected Investment Type and Roadmap
        And Roadmap should show Phases, number of number of objectives that phase contains
        When I click on eye icon of first phase
        Then It should show the Objectives below that phase
        And Mandatory objectives should have star icon on the left side of Objectives

 @44
Scenario:As a Admin edit Investment of LIVE status
        When I click on All Investments tab
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

 @45
   Scenario:As a Admin Change the Approver of APPROVAL PENDING status investments
        When I click on Create button
        When I Fill All the fields in create new investment page
        And I click on Next button
        And I Select Roadmap
        And I click on Next button
        When I click on Next button
        And I fill All the fields in Review page and click on Send button
        When I click on Send button present on Send Approval popup
        Then Investment sent for Approval message should appear
        When I click on newly created investment
        Then I should redirect to Review page
        And I should see All details of Investment, and History button
        When I click on Change Approver button 
        Then Change Approver popup should open
        When I change the Approver and click on save button
        Then Approver update successful toaster message should appear and Approver name should get updated


 @46
Scenario:As a Admin cancel Changing the Approver of APPROVAL PENDING status investments
        When I click on Create button
        When I Fill All the fields in create new investment page
        And I click on Next button
        And I Select Roadmap
        And I click on Next button
        When I click on Next button
        And I fill All the fields in Review page and click on Send button
        When I click on Send button present on Send Approval popup
        Then Investment sent for Approval message should appear
        When I click on newly created investment
        Then I should redirect to Review page
        And I should see All details of Investment, and History button
        When I click on Change Approver button 
        Then Change Approver popup should open
        When I change the Approver and click on Cancel button
        Then No toaster message should appear and Approver name should not get updated


 @47
   Scenario:As a Admin Change the Team member of APPROVAL PENDING status investments
        When I click on Create button
        When I Fill All the fields in create new investment page
        And I click on Next button
        And I Select Roadmap
        And I click on Next button
        When I click on Next button
        And I fill All the fields in Review page and click on Send button
        When I click on Send button present on Send Approval popup
        Then Investment sent for Approval message should appear
        When I click on newly created investment
        Then I should redirect to Review page
        And I should see All details of Investment, and History button
        When I click on Change Team Member button 
        Then Change Team Member popup should open
        When I Add the new team member and click on save button
        Then Team Member update successful toaster message should appear and Team Member name should get added


 @48
   Scenario:As a Admin Cancel Changing the Team member of APPROVAL PENDING status investments
        When I click on Create button
        When I Fill All the fields in create new investment page
        And I click on Next button
        And I Select Roadmap
        And I click on Next button
        When I click on Next button
        And I fill All the fields in Review page and click on Send button
        When I click on Send button present on Send Approval popup
        Then Investment sent for Approval message should appear
        When I click on newly created investment
        Then I should redirect to Review page
        And I should see All details of Investment, and History button
        When I click on Change Team Member button 
        Then Change Team Member popup should open
        When I Add the new team member and click on Cancel button
        Then No toaster message should appear and Team Member name should not get added

 @49
 Scenario:As a Admin verify Dynamic tooltips for Investent leads and Investment Documents
         When I click on Admin icon
         And I click on Label tab
         Then I store the tooltip text of Labels
         When I come to home page and Click on Create button
         Then I hover the mouse on Investment Leads and verify the tooltips
         And I Fill All the fields in create new investment page
         When I click on Next button
         And I Select Roadmap
         And I click on Next button
         And I click on Next button
         Then I hover the mouse on Investment Documents and verify the tooltips
         When I change the tooltip text in Admin page
         Then I should see the updated tooltip for respective fields when i hover the mouse on those fields


 @50
Scenario:As a Admin Mark As Done for Last LIVE phase of investment
         When I click on All Investments tab
         And I click on last LIVE phase Investment
         Then I should redirect to Review page
         When I click on Mark As Done button
         Then I should see mark as done popup
         When I click on Confirm button
         Then I should see Investment Closed meesage and I should redirect to Action Required tab
         When I click on All Investments tab
         Then last phase of investment status should be DONE



 @51
   Scenario: Deleting phases added by script in Phase tab
         When I click on Admin icon
         And I click on Phase tab
         Then I delete all phases added by Script

   
 @52   
     Scenario: As a Admin Delete All Investments of DRAFT state
        Then I should see All Investments, My Investments and Action Required tabs on Home page
        And I click on Create button
        Then Create New Investment page should open
        When I Fill Investment Name and Investment Type
        And I click on Save button
        Then Investment save successful toaster message should appear
        When I click on Home button
        When I click on All Investments tab
        Then I should navigate to All Investments tab
        When I delete All Investments present in DRAFT state
        Then There should not be any Draft state investments in Dashboard