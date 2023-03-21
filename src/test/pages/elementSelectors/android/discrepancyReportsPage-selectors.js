module.exports = {
    // addReportIcon : e => mob.$('android=.text("close add")'),
 addReportIcon : e => mob.$('//*[@name="close"]'),
 addNewReportPage : e => mob.$('android=.text("New Discrepancy Report")'),
 scanLocation : e => mob.$('android=.text("SCAN LOCATION")'),
 startButton : e => mob.$('android=.text("START")'),
 storageLocation : e => mob.$("//input[@placeholder=\"Type '/' or start typing a location name\"]"),
 enterDiscrepancyReportName : name => mob.$('//input[@placeholder="' + name + '"]'),
 discrepancyReportsPage : e => mob.$('android=.textContains("Discrepancy Report")'),
 createdReport : string => mob.$('android=.text("Report - ' + string + '")'), //${D.randomString}
 scanningItem : string => mob.$('android=.text("Scanning Items - Report - ' + string + '")'), //${D.randomString}
 runReport : e => mob.$('android=.text("RUN REPORT")'),
 searchIcon : text => mob.$('//input[@placeholder="' + text + '"]'),
 editIcon : e => mob.$('android=.text("close create").index(0)'),
 loadingSpinner : e => mob.$('android=.resourceId("lbl-38")')
}
