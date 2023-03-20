var reporter = require('cucumber-html-reporter');

var options = {
        theme: 'bootstrap',
        jsonFile: 'reports/cucumber_report.json',
        output: 'reports/cucumber_report.html',
        screenshotsDirectory: 'reports/screenshots/',
        storeScreenshots:false,
        reportSuiteAsScenarios: true,
        scenarioTimestamp: true,
        launchReport: true,
        brandTitle:'IMF Report',
        
    
        
        metadata: {
            "Environment": "Test",
            "Browser": "Chrome",
            "Platform": "Windows 10",
            "Parallel": "Scenarios",
            "Executed": "Automation"
        }
    };

    reporter.generate(options);