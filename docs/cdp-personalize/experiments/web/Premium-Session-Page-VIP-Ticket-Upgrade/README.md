# Web Experiment - Premium Session Page - VIP Ticket Upgrade

[Serialized assets](/demo/experience/personalize/experiments/web/Premium%20Session%20Page%20-%20VIP%20Ticket%20Upgrade)

## How to Replicate

1. Navigate to the web experiments page.

   ![Web experiments page](..\Web-experiments-page.png)

2. Click the "Create Experiment" button.

   ![Create Experiment](..\Create-experiment.png)

3. Enter the following information:

   |Field|Value|
   |-|-|
   |Name|Premium Session Page - VIP Ticket Upgrade|

4. Click the "Create" button.

   ![Build tab empty](..\Build-empty.png)

5. Variant 2 - Popup takeover - Celebrating Player
   1. Under "Variants", click the "Add" button.

      ![Add variant](..\Add-variant.png)

   2. Choose "New Empty Template".

      ![New empty variant](..\New-empty-variant.png)

   3. In the top-left corner, change the name of the variant.
      1. From: Variant 1
      2. To: Variant 2 - Popup takeover - Celebrating Player
   4. In the HTML tab, replace the content by the content of [this file](/demo/experience/personalize/experiments/web/Premium%20Session%20Page%20-%20VIP%20Ticket%20Upgrade/Variant%202%20-%20Popup%20takeover%20-%20Celebrating%20Player.html).
   5. In the CSS tab, replace the content by the content of [this file](/demo/experience/personalize/experiments/web/Premium%20Session%20Page%20-%20VIP%20Ticket%20Upgrade/Variant%202%20-%20Popup%20takeover%20-%20Celebrating%20Player.css).
   6. In the JavaScript tab, replace the content by the content of [this file](/demo/experience/personalize/experiments/web/Premium%20Session%20Page%20-%20VIP%20Ticket%20Upgrade/Variant%202%20-%20Popup%20takeover%20-%20Celebrating%20Player.js).
   7. In the API tab, replace the content by the content of [this file](/demo/experience/personalize/experiments/web/Premium%20Session%20Page%20-%20VIP%20Ticket%20Upgrade/Variant%202%20-%20Popup%20takeover%20-%20Celebrating%20Player.txt).
   8. Click the "Save" button.
   9. Click the "Close" button.

      ![After variant 2](After-variant-2.png)

6. Variant 1 - Popup takeover - Drifting Rally Car
   1. Under "Variants", next to the "Original" variant, click the "Edit" link.

      ![Original variant empty](..\Original-variant-empty.png)

   2. In the top-left corner, change the name of the variant.
      1. From: Original
      2. To: Variant 1 - Popup takeover - Drifting Rally Car
   3. In the HTML tab, replace the content by the content of [this file](/demo/experience/personalize/experiments/web/Premium%20Session%20Page%20-%20VIP%20Ticket%20Upgrade/Variant%201%20-%20Popup%20takeover%20-%20Drifting%20Rally%20Car.html).
   4. In the CSS tab, replace the content by the content of [this file](/demo/experience/personalize/experiments/web/Premium%20Session%20Page%20-%20VIP%20Ticket%20Upgrade/Variant%201%20-%20Popup%20takeover%20-%20Drifting%20Rally%20Car.css).
   5. In the JavaScript tab, replace the content by the content of [this file](/demo/experience/personalize/experiments/web/Premium%20Session%20Page%20-%20VIP%20Ticket%20Upgrade/Variant%201%20-%20Popup%20takeover%20-%20Drifting%20Rally%20Car.js).
   6. In the API tab, replace the content by the content of [this file](/demo/experience/personalize/experiments/web/Premium%20Session%20Page%20-%20VIP%20Ticket%20Upgrade/Variant%201%20-%20Popup%20takeover%20-%20Drifting%20Rally%20Car.txt).
   7. Click the "Save" button.
   8. Click the "Close" button.

      ![After variant 1](After-variant-1.png)

7. Page Targeting
   1. Under "Page Targeting", click the "Add" button.

      ![Page Targeting](..\Page-targeting-empty.png)

   2. Next to "Advanced targeting", click the "Add" button.

      ![Advanced targeting editor](..\Advanced-targeting-editor.png)

   3. In the JavaScript tab, replace the content by the content of [this file](/demo/experience/personalize/experiments/web/Premium%20Session%20Page%20-%20VIP%20Ticket%20Upgrade/Advanced%20targeting%20Script.js).
   4. Click the "Save" button.
   5. Click the "Close" button.

      ![Page targeting advanced](..\Page-targeting-advanced.png)

   6. Delete the "Contains" page targeting entry.

      ![Page targeting cleaned](..\Page-targeting-cleaned.png)

   7. Click the "Save" button.
   8. Close the targeting side panel.

      ![After page targeting](After-page-targeting.png)

8. Audience
   1. Under "Audience", click the "Add" button.

      ![Audience empty](..\Audience-empty.png)

   2. Click on "Real-time Audience".

      ![Audience templates](..\Audience-templates.png)

   3. After the audience templates list, click the "Add Custom Code" link.

      ![Audience editor](..\Audience-editor.png)

   4. In the JavaScript tab, replace the content by the content of [this file](/demo/experience/personalize/experiments/web/Premium%20Session%20Page%20-%20VIP%20Ticket%20Upgrade/Custom%20Real-Time%20Audience.js).
   5. Click the "Save" button.
   6. Click the "Close" button.

      ![Audience custom](..\Audience-custom.png)

   7. Close the targeting side panel.

      ![After audience](After-audience.png)

9. Goals
   1. Under "Goals", click the "Add" button.

      ![Goals empty](..\Goals-empty.png)

   2. Select "Page View Goal".

      ![Page view goal sidebar](..\Page-view-goal-sidebar.png)

   3. Enter the following information:

      |Field|Value|
      |-|-|
      |Goal name|VIEW|
      |Description|Purchase of a Regular to VIP ticket upgrade|
      |Match condition|Regex|
      |String|`.+/tickets/payment/confirmed\?ticket=3`|

   4. Click the "Save" button.

      ![After goal](After-goal.png)

10. At the top of the page, click the "Start" button.

    ![Start](..\Start.png)

11. Click the "Run Experience" button.
