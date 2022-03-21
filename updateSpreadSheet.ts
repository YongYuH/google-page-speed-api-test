import { google } from 'googleapis'

import { writeGoogleSheet } from './googleSheets/writeGoogleSheet'

interface UpdateSpreadSheetArgs {
  siteUrl: string
  spreadsheetId: string
  sheetName: string
}

const updateSpreadSheet = async (args: UpdateSpreadSheetArgs) => {
  try {
    const { siteUrl, spreadsheetId, sheetName } = args

    const auth = await google.auth.getClient({
      scopes: ["openid"],
    })
    const pagespeedonline = google.pagespeedonline({ version: "v5", auth })

    const res = await pagespeedonline.pagespeedapi.runpagespeed({
      url: siteUrl,
    })

    let sheet: any[][] = []
    /**
     * response data ref: https://developers.google.com/speed/docs/insights/rest/v5/pagespeedapi/runpagespeed
     */
    const data = res?.data
    if (data) {
      /**
       * headerRow = ["URL", "analysisUTCTimestamp", "loadingExperience"]
       */
      let dataRow = []
      dataRow.push(siteUrl)
      dataRow.push(JSON.stringify(data.analysisUTCTimestamp))
      dataRow.push(JSON.stringify(data.loadingExperience))
      sheet.push(dataRow)
    }

    await writeGoogleSheet({ sheetName, spreadsheetId, values: sheet })
  } catch (error) {
    console.log(error)
  }
}

export { updateSpreadSheet }