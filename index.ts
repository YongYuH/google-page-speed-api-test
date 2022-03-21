import 'dotenv/config'
import { updateSpreadSheet } from './updateSpreadSheet'

const main = async () => {
  const siteUrl = process.env.SITE_URL;
  const spreadsheetId = process.env.SHEET_ID;
  const sheetName = process.env.SHEET_NAME;

  if (siteUrl && spreadsheetId && sheetName) {
    await updateSpreadSheet({
      siteUrl,
      spreadsheetId,
      sheetName,
    });
  }
};

main()