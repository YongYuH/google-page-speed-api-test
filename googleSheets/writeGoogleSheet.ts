import { google, sheets_v4 } from 'googleapis'

interface WriteGoogleSheetArgs {
  sheetName: sheets_v4.Params$Resource$Spreadsheets$Values$Append['range']
  spreadsheetId: sheets_v4.Params$Resource$Spreadsheets$Values$Append['spreadsheetId']
  values: NonNullable<sheets_v4.Params$Resource$Spreadsheets$Values$Append['requestBody']>['values']
}

/** ref: https://github.com/Zrce/gsc-api-test-video/blob/main/googleSheets/writeGoogleSheet.js */
const writeGoogleSheet = async (args: WriteGoogleSheetArgs) => {
  try {
    const { sheetName, spreadsheetId, values } = args
    const auth = await google.auth.getClient({ scopes: ['https://www.googleapis.com/auth/spreadsheets'] })
    const sheets = google.sheets({ version: 'v4', auth })

    await sheets.spreadsheets.values.append({
      range: sheetName,
      requestBody: {
        values,
      },
      spreadsheetId,
      valueInputOption: 'RAW',
    })
  } catch (error) {
    console.log(error)
  }
}

export { writeGoogleSheet }