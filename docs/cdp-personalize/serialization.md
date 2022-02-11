# Sitecore Personalize Serialization

Whenever something is modified in Sitecore Personalize, it should be serialized (or backuped) in this repository as well. This helps to understand the history of the Sitecore Personalize assets, provides a backup in case something goes wrong, and should help to replicate the Sitecore Personalize organisation assets in other organisations.

## Structure

Sitecore Personalize assets are saved in the `\demo\experience\personalize` folder. They are organized the same way as the Sitecore Personalize main menu. Folder names are exactly the same name as the assets in Sitecore Personalize.

## Debug Mode

We save many assets complete JSON representation. To do that, debug mode must be enabled.

1. Hover the bottom-left organisation switcher menu.
2. Navigate to your name, then "Feature Flags".
3. Enable the "debug" flag.

## Downloading an Asset Complete JSON Representation

With debug mode enabled:

1. In the top-right corner of the screen, click the yellow debug cog icon.
2. In the popup top-right corner, click the "Show as JSON" link.
3. In the JSON editor, click the black cog icon.
4. Select "Download".

## Downloading Code Assets

Whenever there is a code editor or JSON view of assets:

1. Click the black cog icon.
2. Select "Download".
3. **Do not rename files unless specified.**

This will download a file with a specific name or with the generic `bx-ace-editor` name.

## Redacting Secrets

Sitecore Personalize complete JSON representations and decision model XML exports can contain authors email addresses and connection secrets like API keys, usernames and passwords. **It is very important to review the downloaded files and redact those secrets.**

### Connection Secrets

These secrets are present in:

- Connections complete JSON representations.
- Decision models XML export that contain data system nodes.
- Full stack experiences and experiments complete JSON representations that are using a destination connection.

To identify the secrets:

1. Carefully review the content of the files to be committed.

To remove the secrets:

1. Change the secret by the word `Redacted`.
2. Save the file.

### Author Email Addresses

These secrets are present in:

- Offers complete JSON representations.
- Offer templates complete JSON representations.

To identify the secrets:

1. Search for the "at" character `@` in the files to be committed.

To remove the secrets:

1. Change the `createdBy` and `updatedBy` values by the word `Redacted`.
2. Save the file.

### Test Request Names and Email Addresses

Personal information can be left in the request body to test connections when creating them.

These secrets are present in:

- Connections complete JSON representations.
- Full stack experiences and experiments complete JSON representations.

To identify the secrets:

1. Search for the "at" character `@` in the files to be committed.

To remove the secrets:

1. Change the names by `test`.
2. Change the email addresses by `test@test.com`.
3. Save the file.

## Experiences and Experiments - Web and Full Stack

1. Download the [complete JSON representation](#downloading-an-asset-complete-json-representation).
2. **IMPORTANT: Carefully review the file and [redact secrets](#redacting-secrets).**

### Variants/Content/Webhook Composer

1. For each variant:
   1. For each tab (HTML, CSS, JavaScript, API):
      1. Download the code [using the black cog icon menu](#downloading-code-assets).
      2. **See the note below for the HTML tab file name.**

#### Variant HTML

The files from the HTML and API tabs have the same name and `.txt` extension.

1. Change the extension of the HTML tab file to `.html`.

### Advanced Targeting Script

1. Download the code [using the black cog icon menu](#downloading-code-assets).
2. Rename the generic file name to `Advanced targeting Script.js`.

### Custom Real-Time Audience

1. Download the code [using the black cog icon menu](#downloading-code-assets).
2. Rename the generic file name to `Custom Real-Time Audience.js`.

## Decision Models

Only serialize the production variants.

### Canvas

At the bottom-left of the canvas are 2 buttons to download an XML and PNG exports.

1. Download the XML.
   1. **IMPORTANT: Carefully review the file and [redact secrets](#redacting-secrets).**
2. Download the PNG.

### Data Systems

1. Take one screenshot of the inputs and outputs of the data system.
2. Name the file with the same name as the data system in the canvas.
3. **IMPORTANT: Edit the image to remove any secret.**

### Decision Tables

1. Take one screenshot of the inputs, outputs, and rules of the decision table.
2. Name the file with the same name as the decision table in the canvas.

### Programmables

1. Download the code [using the black cog icon menu](#downloading-code-assets).

## Offers

1. Download the [complete JSON representation](#downloading-an-asset-complete-json-representation).
2. **IMPORTANT: Review the file and [redact author email addresses](#author-email-addresses).**

## Decision Templates

1. Download the [complete JSON representation](#downloading-an-asset-complete-json-representation).
2. Download the code [using the black cog icon menu](#downloading-code-assets).

## Offer Templates

1. Download the [complete JSON representation](#downloading-an-asset-complete-json-representation).
2. **IMPORTANT: Review the file and [redact author email addresses](#author-email-addresses).**

## Connections

1. Download the [complete JSON representation](#downloading-an-asset-complete-json-representation).
2. **IMPORTANT: Carefully review the file and [redact secrets](#redacting-secrets).**
