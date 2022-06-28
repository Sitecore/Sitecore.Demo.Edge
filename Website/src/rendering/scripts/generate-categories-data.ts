import fs from 'fs';
import path from 'path';
import csv from 'csvtojson';

async function csvToJson(filepath: string): Promise<unknown[]> {
  const csvStr = fs.readFileSync(filepath, {
    encoding: 'utf8',
  });
  const jsonArray = await csv({
    includeColumns: /ccid|image_url|^name$|^url_path$|^title$|^desc$/,
  }).fromString(csvStr);

  return jsonArray;
}

(async function exportCategoriesData(): Promise<void> {
  const inputFile = path.join(__dirname, '/../discover-feeds/playsummit_category_feed.csv');

  const outputDir = path.join(__dirname, '/../src/temp/');
  const outputFile = path.join(outputDir, 'categoriesData.ts');

  const categoriesData = await csvToJson(inputFile);

  fs.writeFileSync(
    outputFile,
    'export const categoriesData = ' + JSON.stringify(categoriesData),
    'utf8'
  );
})();
