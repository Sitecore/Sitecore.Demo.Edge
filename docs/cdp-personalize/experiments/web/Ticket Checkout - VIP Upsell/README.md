# Web Experiment - Premium Session Page - VIP Ticket Upgrade

[Serialized assets](/demo/experience/personalize/experiments/web/Ticket%20Checkout%20-%20VIP%20Upsell/)

## How to Replicate

1. Navigate to the web experiments page.

   ![Web experiments page](/docs/cdp-personalize/experiments/web/Web-experiments-page.png)

2. Click the "Create Experiment" button.

   ![Create Experiment](/docs/cdp-personalize/experiments/web/Create-experiment.png)

3. Enter the following information:

   | Field | Value                        |
   | ----- | ---------------------------- |
   | Name  | Ticket Checkout - VIP Upsell |

4. Click the "Create" button.

   ![Build tab empty](/docs/cdp-personalize/experiments/web/Build-empty.png)

5. Variant 2 - Popup takeover - Celebrating Player

   1. Under "Variants", click the "Create variant" button.

      ![Add variant](/docs/cdp-personalize/experiments/web/Add-variant.png)

   2. Choose "Create template".

      ![New empty variant](/docs/cdp-personalize/experiments/web/New-empty-variant.png)

   3. In the top-left corner, change the name of the variant.
      1. From: Variant 1
      2. To: Variant 2 - Popup takeover - Celebrating Player
   4. In the HTML tab, replace the content by the content of [this file](/demo/experience/personalize/experiments/web/Ticket%20Checkout%20-%20VIP%20Upsell/Variant%202%20-%20Popup%20takeover%20-%20Celebrating%20Player.html).
   5. In the CSS tab, replace the content by the content of [this file](/demo/experience/personalize/experiments/web/Ticket%20Checkout%20-%20VIP%20Upsell/Variant%202%20-%20Popup%20takeover%20-%20Celebrating%20Player.css).
   6. In the JavaScript tab, replace the content by the content of [this file](/demo/experience/personalize/experiments/web/Ticket%20Checkout%20-%20VIP%20Upsell/Variant%202%20-%20Popup%20takeover%20-%20Celebrating%20Player.js).
   7. In the API tab, replace the content by the content of [this file](/demo/experience/personalize/experiments/web/Ticket%20Checkout%20-%20VIP%20Upsell/Variant%202%20-%20Popup%20takeover%20-%20Celebrating%20Player.txt).
   8. Click the "Save" button.
   9. Click the back button.

      ![After variant 2](After-variant-2.png)

6. Variant 1 - Popup takeover - Drifting Rally Car

   1. Under "Variants", next to the "Original" variant, click the "Edit" link.

      ![Original variant empty](/docs/cdp-personalize/experiments/web/Original-variant-empty.png)

   2. In the top-left corner, change the name of the variant.
      1. From: Original
      2. To: Variant 1 - Popup takeover - Drifting Rally Car
   3. In the HTML tab, replace the content with the content of [this file](/demo/experience/personalize/experiments/web/Ticket%20Checkout%20-%20VIP%20Upsell/Variant%201%20-%20Popup%20takeover%20-%20Drifting%20Rally%20Car.html).
   4. In the CSS tab, replace the content with the content of [this file](/demo/experience/personalize/experiments/web/Ticket%20Checkout%20-%20VIP%20Upsell/Variant%201%20-%20Popup%20takeover%20-%20Drifting%20Rally%20Car.css).
   5. In the JavaScript tab, replace the content with the content of [this file](/demo/experience/personalize/experiments/web/Ticket%20Checkout%20-%20VIP%20Upsell/Variant%201%20-%20Popup%20takeover%20-%20Drifting%20Rally%20Car.js).
   6. In the API tab, replace the content with the content of [this file](/demo/experience/personalize/experiments/web/Ticket%20Checkout%20-%20VIP%20Upsell/Variant%201%20-%20Popup%20takeover%20-%20Drifting%20Rally%20Car.txt).
   7. Click the "Save" button.
   8. Click the back button.

      ![After variant 1](After-variant-1.png)

7. Page Targeting

   1. Under "Page Targeting", click on "Specific pages" and then the "Add conditions" button.

      ![Page Targeting](/docs/cdp-personalize/experiments/web/Page-targeting-empty.png)

   2. Next to "Advanced targeting", click the "Add" button.

      ![Advanced targeting editor](/docs/cdp-personalize/experiments/web/Advanced-targeting-editor.png)

   3. In the JavaScript tab, replace the content with the content of [this file](/demo/experience/personalize/experiments/web/Premium%20Session%20Page%20-%20VIP%20Ticket%20Upgrade/Advanced%20targeting%20Script.js).
   4. Click the "Save" button.
   5. Click the back button.

      ![Page targeting advanced](/docs/cdp-personalize/experiments/web/Page-targeting-advanced.png)

   6. Delete the "Contains" page targeting entry.

      ![Page targeting cleaned](/docs/cdp-personalize/experiments/web/Page-targeting-cleaned.png)

   7. Click the "Save" button.
   8. Close the targeting side panel.

      ![After page targeting](After-page-targeting.png)

8. Filter

   1. Under "Filter", click the "Add" button.

      ![Filter empty](/docs/cdp-personalize/experiments/web/Filter-empty.png)

   2. Click on "Add condition".

      ![Filter templates](/docs/cdp-personalize/experiments/web/Filter-templates.png)

   3. Click on "Create".

      ![Filter editor](/docs/cdp-personalize/experiments/web/Filter-editor.png)

   4. Click "Edit" and replace the content with the content of [this file](/demo/experience/personalize/experiments/web/Ticket%20Checkout%20-%20VIP%20Upsell/Guest%20has%20viewed%20a%20premium%20content%20page%20condition.js).
   5. Click the "Save" button.
   6. Click the "Close" button.

      ![Filter custom](/docs/cdp-personalize/experiments/web/Filter-custom.png)

   7. Close the filter side panel.

      ![After filter](After-filter.png)

9. Goals

   1. Under "Goals", click the "Add" button.

      ![Goals empty](/docs/cdp-personalize/experiments/web/Goals-empty.png)

   2. Select "Page View Goal".

      ![Page view goal sidebar](/docs/cdp-personalize/experiments/web/Page-view-goal-sidebar.png)

   3. Enter the following information:

      | Field           | Value                                    |
      | --------------- | ---------------------------------------- |
      | Goal name       | VIEW                                     |
      | Description     | Purchase of a VIP ticket                 |
      | Match condition | Regex                                    |
      | String          | `.+/tickets/payment/confirmed\?ticket=2` |

   4. Click the "Save" button.

      ![After goal](After-goal.png)

10. At the top of the page, click the "Start" button.

    ![Start](/docs/cdp-personalize/experiments/web/Start.png)

11. Click the "Start" button.
