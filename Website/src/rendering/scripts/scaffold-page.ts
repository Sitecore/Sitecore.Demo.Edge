/*
  Page Scaffolding Script
  This is a script that enables scaffolding a new PLAY! Summit page using `jss newpage <PageName>`.
  The default convention is that page names must contain only letters.

  If the <PageName> parameter includes a path, it must be relative to the data/routes folder.
  For example, `jss newpage speakers/Joe` will create a page named `Joe` in
  `data/routes/speakers/joe/en.yml`. Specifying a relative path is optional, and just providing
  the name is ok for a root level page.
*/

/* eslint-disable no-throw-literal,no-console */

import fs from 'fs';
import path from 'path';
import chalk from 'chalk';
import generatePageSrc from './templates/page-src';

const pageRootPath = 'data/routes';

// Matches page names that contain only letters.
// Optionally, the page name can be preceded by a relative path
const nameParamFormat = new RegExp(/^((?:[A-Za-z]+\/)*)([A-Za-z]+)$/);
const pageArg = process.argv[2];

if (!pageArg) {
  throw 'Page name was not passed. Usage: jss newpage <PageName>';
}

const regExResult = nameParamFormat.exec(pageArg);

if (regExResult === null) {
  throw `Page name should contain only letters. If specifying a path, it must be relative to data/routes`;
}

const pagePath = regExResult[1];
const pageName = regExResult[2];
const pageId = pageName.toLowerCase();
const folderName = pageId;
const filename = `en.yml`;

scaffoldFile(pageRootPath, generatePageSrc(pageId, pageName), filename);

console.log(
  chalk.green(`
Scaffolding of ${pageName} complete.`)
);

/**
 * Force to use `crlf` line endings, we are using `crlf` across the project.
 * Replace: `lf` (\n), `cr` (\r)
 * @param {string} content
 */
function editLineEndings(content: string) {
  return content.replace(/\r|\n/gm, '\r\n');
}

/**
 * Creates a file relative to the specified path if the file doesn't exist. Creates directories as needed.
 * @param {string} rootPath - the root path
 * @param {string} fileContent - the file content
 * @param {string} filename - the filename
 * @returns the new file's filepath
 */
function scaffoldFile(rootPath: string, fileContent: string, filename: string): string | null {
  const outputDir = path.join(rootPath, pagePath, folderName);
  const outputFile = path.join(outputDir, filename);

  if (fs.existsSync(outputFile)) {
    console.log(chalk.red(`Skipping creating ${outputFile}; already exists.`));
    return null;
  }

  fs.mkdirSync(outputDir, { recursive: true });
  fs.writeFileSync(outputFile, editLineEndings(fileContent), 'utf8');
  console.log(chalk.green(`File ${outputFile} has been scaffolded.`));
  return outputFile;
}
