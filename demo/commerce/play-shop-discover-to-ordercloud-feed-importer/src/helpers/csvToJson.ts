import * as fs from 'fs';
import csv from 'csvtojson';

/**
 * @filepath should be the path to a file
 */
export async function csvToJson(filepath: string): Promise<any[]> {
  const csvStr = fs.readFileSync(filepath, {
    encoding: 'utf8',
  });
  const json = await csv().fromString(csvStr);

  return json;
}
