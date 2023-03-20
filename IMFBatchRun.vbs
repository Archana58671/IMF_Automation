
'Create Excel Object 			'read excel file for server list 
Set excel = createobject("excel.application")    
excel.Visible = False  

Dim ExcelPath, FSO
'ExcelPath = "C:\Temp\AMS-VBS-Updated13thJuly\ForAMSTeamWithSerenity\AMSAppsSmokeTestFramework\AMS_URL.xls"

set fso = CreateObject("Scripting.FileSystemObject")
ExcelPath = fso.GetAbsolutePathName("Scenarios.xls")
'MsgBox ExcelPath


Set workbook = excel.Workbooks.Open(ExcelPath) 
Set worksheet = excel.Worksheets.Item("Setup")

trackName = worksheet.cells(3,3).value
'runType = worksheet.cells(2,3).value

Set workbook = excel.Workbooks.Open(ExcelPath)
Set worksheet = excel.Worksheets.Item(trackName)

TotalRow1 = worksheet.UsedRange.Rows.Count
		
	
Int YesCnt1 = 0
For i = 2 To TotalRow1	
	If worksheet.cells(i,3).value = "Yes" Then
		YesCnt1 = YesCnt1+1
	End If
Next

strTags = ""
Int y=0
For i = 2 To TotalRow1 	
	If worksheet.cells(i,3).value = "Yes" Then
			'if runType = "Baseline" Then
			'	strTags = strTags &"@b" & worksheet.cells(i,1).value
			'Else
				strTags = strTags &"@" & worksheet.cells(i,1).value
			'End if
		y=y+1
		If y=YesCnt1 Then
			
		Else
			
			strTags = strTags &" or "	
		End If
	End If
Next

'MsgBox strTags

excel.Quit
set excel=Nothing
set workbook = Nothing
set worksheet = Nothing

'cmnd = "cmd /K mvn clean verify -Dcucumber.options=""--tags '" &strTags &"'"
'cmnd = "cmd /K mvn clean verify -Dcucumber.filter.tags="""&strTags &""


cmnd = "cmd /K npx tsc & npx cucumber-js features\\Admin.feature --exit --publish --format json:reports/cucumber_report.json --parallel 1 --tags """&strTags &""

Set oShell= WScript.CreateObject("WSCript.shell")


'MsgBox cmnd

oShell.run cmnd,1,True




