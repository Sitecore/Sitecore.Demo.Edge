# Web Experience - Subscribe to update emails campaign

[Serialized assets](/demo/experience/personalize/experiences/web/Subscribe%20to%20update%20emails%20campaign)

## How to Replicate

1. Navigate to the web experiences page.

   ![Web experiences page](/docs/cdp-personalize/experiences/web/Web-experiences-page.png)

2. Click the "Create Experience" button.

   ![Create Experience](/docs/cdp-personalize/experiences/web/Create-experience.png)

3. Enter the following information:

   | Field | Value                               |
   | ----- | ----------------------------------- |
   | Name  | Subscribe to update emails campaign |

4. click the "Create" button.

   ![Create variant](/docs/cdp-personalize/experiments/web/Add-variant.png)

5. Variant 1 - Email Capture Corner

   1. In the create variant sidebar, choose "Create template".

      ![New empty variant](/docs/cdp-personalize/experiments/web/New-empty-variant.png)

   2. In the top-left corner, change the name of the variant.
      1. From: Variant 1
      2. To: Variant 1 - Email Capture Corner
   3. In the HTML tab, replace the content by the content of [this file](/demo/experience/personalize/experiences/web/Subscribe%20to%20update%20emails%20campaign/Variant%201%20-%20Email%20Capture%20Corner.html).
   4. In the CSS tab, replace the content by the content of [this file](/demo/experience/personalize/experiences/web/Subscribe%20to%20update%20emails%20campaign/Variant%201%20-%20Email%20Capture%20Corner.css).
   5. In the JavaScript tab, replace the content by the content of [this file](/demo/experience/personalize/experiences/web/Subscribe%20to%20update%20emails%20campaign/Variant%201%20-%20Email%20Capture%20Corner.js).
   6. In the API tab, replace the content by the content of [this file](/demo/experience/personalize/experiences/web/Subscribe%20to%20update%20emails%20campaign/Variant%201%20-%20Email%20Capture%20Corner.txt).
   7. Click the "Save" button.
   8. Click the "Close" button.

      ![After variant 1](After-variant-1.png)

6. Page Targeting

   1. Under "Page Targeting", click the "Specific Pages" and then the "Add conditions" button.

      ![Page Targeting](/docs/cdp-personalize/experiments/web/Page-targeting-empty.png)

   2. Under "Advanced targeting", click the "Add script" button.

      ![Advanced targeting editor](/docs/cdp-personalize/experiments/web/Advanced-targeting-editor.png)

   3. In the JavaScript tab, replace the content by the content of [this file](/demo/experience/personalize/experiences/web/Subscribe%20to%20update%20emails%20campaign/Advanced%20targeting%20Script.js).
   4. Click the "Save" button.
   5. Click the back button.

      ![Page targeting advanced](/docs/cdp-personalize/experiments/web/Page-targeting-advanced.png)

   6. Delete the "Contains" page targeting entry.

      ![Page targeting cleaned](/docs/cdp-personalize/experiments/web/Page-targeting-cleaned.png)

   7. Click the "Save" button.
   8. Close the targeting side panel.

      ![After page targeting](After-page-targeting.png)

7. Filter

   1. Under "Filter", click the "Add filter" button.

      ![Filter empty](/docs/cdp-personalize/experiments/web/Filter-empty.png)

   2. Click on "Add condition".

      ![Filter templates](/docs/cdp-personalize/experiments/web/Filter-templates.png)

   3. Click on "Create".

      ![Filter editor](/docs/cdp-personalize/experiments/web/Filter-editor.png)

   4. Click "Edit" and replace the content with the content of [this file](/demo/experience/personalize/experiences/web/Subscribe%20to%20update%20emails%20campaign/Show%20Sign%20Up%20For%20Session%20Updates%20form%20to%20guests%20every%205,%2010,%2020%20etc.%20session%20page%20views%20condition.js).
   5. Click the "Save" button.
   6. Click the "Close" button.

      ![Filter custom](/docs/cdp-personalize/experiments/web/Filter-custom.png)

   7. Close the filter side panel.

      ![After filter](After-filter.png)

8. At the top of the page, click the "Start" button.

   ![Start](/docs/cdp-personalize/experiments/web/Start.png)

9. Click the "Start" button.
