# Web Experience - Subscribe to update emails campaign

[Serialized assets](/demo/experience/personalize/experiences/web/Subscribe%20to%20update%20emails%20campaign)

## How to Replicate

1. Navigate to the web experiences page.

   ![Web experiences page](/docs/cdp-personalize/experiences/web/Web-experiences-page.png)

2. Click the "Create Experience" button.

   ![Create Experience](/docs/cdp-personalize/experiences/web/Create-experience.png)

3. Enter the following information:

   |Field|Value|
   |-|-|
   |Name|Subscribe to update emails campaign|

4. click the "Create" button.

   ![Create variant](/docs/cdp-personalize/experiments/web/Add-variant.png)

5. Variant 1 - Email Capture Corner
   1. In the create variant sidebar, choose "New Empty Template".

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
   1. Under "Page Targeting", click the "Add" button.

      ![Page Targeting](/docs/cdp-personalize/experiments/web/Page-targeting-empty.png)

   2. Next to "Advanced targeting", click the "Add" button.

      ![Advanced targeting editor](/docs/cdp-personalize/experiments/web/Advanced-targeting-editor.png)

   3. In the JavaScript tab, replace the content by the content of [this file](/demo/experience/personalize/experiences/web/Subscribe%20to%20update%20emails%20campaign/Advanced%20targeting%20Script.js).
   4. Click the "Save" button.
   5. Click the "Close" button.

      ![Page targeting advanced](/docs/cdp-personalize/experiments/web/Page-targeting-advanced.png)

   6. Delete the "Contains" page targeting entry.

      ![Page targeting cleaned](/docs/cdp-personalize/experiments/web/Page-targeting-cleaned.png)

   7. Click the "Save" button.
   8. Close the targeting side panel.

      ![After page targeting](After-page-targeting.png)

7. Audience
   1. Under "Audience", click the "Add" button.

      ![Audience empty](/docs/cdp-personalize/experiments/web/Audience-empty.png)

   2. Click on "Real-time Audience".

      ![Audience templates](/docs/cdp-personalize/experiments/web/Audience-templates.png)

   3. After the audience templates list, click the "Add Custom Code" link.

      ![Audience editor](/docs/cdp-personalize/experiments/web/Audience-editor.png)

   4. In the JavaScript tab, replace the content by the content of [this file](/demo/experience/personalize/experiences/web/Subscribe%20to%20update%20emails%20campaign/Custom%20Real-Time%20Audience.js).
   5. Click the "Save" button.
   6. Click the "Close" button.

      ![Audience custom](/docs/cdp-personalize/experiments/web/Audience-custom.png)

   7. Close the audience side panel.

      ![After audience](After-audience.png)

8. At the top of the page, click the "Start" button.

   ![Start](/docs/cdp-personalize/experiments/web/Start.png)

9. Click the "Run Experience" button.
