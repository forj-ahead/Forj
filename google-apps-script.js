// Forj Lead Capture — Google Apps Script
// ─────────────────────────────────────────────────────────────────
// SETUP (one-time, ~5 minutes):
//
// 1. Go to https://sheets.new and create a blank Google Sheet.
//    Name it "Forj Leads".
//
// 2. In the sheet, click Extensions → Apps Script.
//
// 3. Delete everything in the editor and paste this entire file.
//
// 4. Click Save (floppy disk icon), then click Deploy → New deployment.
//    - Type: Web app
//    - Execute as: Me
//    - Who has access: Anyone
//    Click Deploy, authorize when prompted, and copy the Web App URL.
//
// 5. In Layout.astro, replace PASTE_YOUR_APPS_SCRIPT_URL_HERE
//    with the URL you just copied.
//
// 6. Rebuild and redeploy the site. Done — leads will now appear
//    as rows in your Google Sheet automatically.
// ─────────────────────────────────────────────────────────────────

const SHEET_NAME = 'Leads';

// Column headers — must match the order in appendRow() below
const HEADERS = ['Timestamp', 'Name', 'Business', 'Email', 'Phone', 'Industry', 'Plan', 'Website', 'Message'];

function doPost(e) {
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    let sheet = ss.getSheetByName(SHEET_NAME);

    // Create the sheet and add headers if it doesn't exist yet
    if (!sheet) {
      sheet = ss.insertSheet(SHEET_NAME);
      sheet.appendRow(HEADERS);
      sheet.getRange(1, 1, 1, HEADERS.length).setFontWeight('bold');
      sheet.setFrozenRows(1);
    }

    const data = JSON.parse(e.postData.contents);

    sheet.appendRow([
      data.timestamp || new Date().toISOString(),
      data.name || '',
      data.business || '',
      data.email || '',
      data.phone || '',
      data.industry || '',
      data.plan || '',
      data.website || '',
      data.message || '',
    ]);

    return ContentService
      .createTextOutput(JSON.stringify({ status: 'ok' }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ status: 'error', message: err.message }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// Allows testing via GET in the browser
function doGet() {
  return ContentService
    .createTextOutput('Forj lead capture is running.')
    .setMimeType(ContentService.MimeType.TEXT);
}
