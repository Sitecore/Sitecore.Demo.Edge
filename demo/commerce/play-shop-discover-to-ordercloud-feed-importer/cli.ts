#!/usr/bin/env node

/* tslint:disable: no-console */
import { Option, program } from 'commander';
import packageInfo from './package.json';
import feedimporter from './src/index';
import chalk from 'chalk';
import figlet from 'figlet';
import clear from 'clear';
import ora from 'ora';

// display banner
clear();
console.log(chalk.cyanBright(figlet.textSync('sitecore', { horizontalLayout: 'full' })));

program
  .name('npm run start --')
  .version(packageInfo.version, '-v, --version')
  .description('A tool to import a Sitecore Discover feed into OrderCloud')
  .option('-u, --username <string>', 'username for portal credentials https://ordercloud.io/')
  .option('-p, --password <string>', 'password for portal credentials https://ordercloud.io/')
  .option(
    '-m --marketplaceID <string>',
    'ID for the OrderCloud marketplace where products should be loaded into'
  )
  .addOption(
    new Option('-t, --template <type>', 'an existing template feed')
      .choices(['playsummit'])
      .default('playsummit')
  )
  .option(
    '-f, --productFilePath <path>',
    'filepath to a Sitecore Discover product feed, should adhere to Sitecore Discover standard'
  )
  .option(
    '-c, --categoryFilePath <path>',
    'filepath to a Sitecore Discover category feed, should adhere to Sitecore Discover standard'
  )
  .option('-i, --prefixImageUrls', '(Optional) prefix image urls with catalog id', false)
  .option('-b, --buyerID <string>', '(Optional) ID of an EXISTING buyer')
  .option('-x, --catalogID <string>', '(Optional) ID of an EXISTING catalog')
  .addOption(
    new Option('-e, --environment <ordercloudenvironment>')
      .choices(['sandbox', 'staging', 'production'])
      .default('sandbox')
  )
  .parse(process.argv);

const options = program.opts();
options.username = process.env.DEBUG_USERNAME || options.username;
options.password = process.env.DEBUG_PASSWORD || options.password;
options.marketplaceID = process.env.DEBUG_MARKETPLACE_ID || options.marketplaceID;
options.template = process.env.DEBUG_TEMPLATE || options.template;
options.productFilePath = process.env.DEBUG_PRODUCT_FILE_PATH || options.productFilePath;
options.categoryFilePath = process.env.DEBUG_CATEGORY_FILE_PATH || options.categoryFilePath;
options.prefixImageUrls = process.env.DEBUG_PREFIX_IMAGE_URLS || options.prefixImageUrls;
options.buyerID = process.env.DEBUG_BUYER_ID || options.buyerID;
options.catalogID = process.env.DEBUG_CATALOG_ID || options.catalogID;
options.filepath = process.env.DEBUG_FILEPATH || options.filepath;
options.environment = process.env.DEBUG_ENVIRONMENT || options.environment;

if (!options.username) {
  console.error(chalk.bold.red('> Portal username must be provided'));
  program.help(); // This exits the process
}

if (!options.password) {
  console.error(chalk.bold.red('> Portal password must be provided'));
  program.help(); // This exits the process
}

if (!options.marketplaceID) {
  console.error(chalk.bold.red('> Marketplace ID must be provided'));
  program.help(); // This exits the process
}

// error on unknown commands
program.on('command:*', function () {
  console.error(chalk.bold.red('> Invalid command: See list of available commands.'));
  program.help(); // This exits the process
});

const spinner = ora().start();
feedimporter
  .run({
    username: options.username,
    password: options.password,
    marketplaceID: options.marketplaceID,
    template: options.template,
    productFilePath: options.productFilePath,
    categoryFilePath: options.categoryFilePath,
    prefixImageUrls: options.prefixImageUrls,
    buyerID: options.buyerID,
    catalogID: options.catalogID,
    environment: options.environment,
  })
  .then(() => {
    spinner.stop();
    console.log(chalk.greenBright('Done! ✨'));
    console.log(
      chalk.yellowBright('Check out your shiny new products & categories') +
        chalk.magentaBright(' on ordercloud') +
        chalk.yellowBright('.')
    );
  })
  .catch((err) => {
    spinner.stop();
    console.error(chalk.redBright('Aaww 💩 Something went wrong:'));
    console.error(chalk.redBright(err.message || err.statusText));
    if (
      err.message !==
      'Error logging in to portal. Please make sure your username and password are correct'
    ) {
      console.error(chalk.redBright(err.stack));
    }
    if (err.isOrderCloudError) {
      console.log('');
      console.error(
        chalk.redBright(
          `${err.request.method} ${err.request.protocol + err.request.host + err.request.path}`
        )
      );
      console.error(chalk.redBright(JSON.stringify(err.errors, null, 4)));
    }
    process.exit(1); // prevent execution of another command after this
  });

process.on('unhandledRejection', (err) => console.error(err));
