# Web Experience - Website - Audience-based website home page hero V2

[Serialized assets](/demo/experience/personalize/experiences/web/Website%20-%20Audience-based%20website%20home%20page%20hero)

## How to Replicate

1. Navigate to the web experiences page.

   ![Web experiences page](/docs/cdp-personalize/experiences/web/Web-experiences-page.png)

2. Click the "Create Experience" button.

   ![Create Experience](/docs/cdp-personalize/experiences/web/Create-experience.png)

3. Enter the following information:

   | Field | Value                                              |
   | ----- | -------------------------------------------------- |
   | Name  | Website - Audience-based website home page hero V2 |

4. click the "Create" button.

   ![Create variant](/docs/cdp-personalize/experiments/web/Add-variant.png)

5. Home Page Hero

   1. In the create variant sidebar, choose "Create template".

      ![New empty variant](/docs/cdp-personalize/experiments/web/New-empty-variant.png)

   2. In the top-left corner, change the name of the variant.
      1. From: Variant 1
      2. To: Home Page Hero
   3. In the HTML tab, replace the content by the content of [this file](/demo/experience/personalize/experiences/web/Website%20-%20Audience-based%20website%20home%20page%20hero%20V2/Home%20Page%20Hero.html).
   4. In the CSS tab, replace the content by the content of [this file](/demo/experience/personalize/experiences/web/Website%20-%20Audience-based%20website%20home%20page%20hero%20V2/Home%20Page%20Hero.css).
   5. In the JavaScript tab, replace the content by the content of [this file](/demo/experience/personalize/experiences/web/Website%20-%20Audience-based%20website%20home%20page%20hero%20V2/Home%20Page%20Hero.js).
   6. In the API tab, replace the content by the content of [this file](/demo/experience/personalize/experiences/web/Website%20-%20Audience-based%20website%20home%20page%20hero%20V2/Home%20Page%20Hero.txt).
   7. Click the "Save" button.
   8. Click the "Close" button.

      ![After variant 1](After-variant-1.png)

6. Page Targeting

   1. Under "Page Targeting", click the "Specific Pages" and then the "Add conditions" button.

      ![Page Targeting](/docs/cdp-personalize/experiments/web/Page-targeting-empty.png)

   2. Under "Advanced targeting", click the "Add script" button.

      ![Advanced targeting editor](/docs/cdp-personalize/experiments/web/Advanced-targeting-editor.png)

   3. In the JavaScript tab, replace the content by the content of [this file](/demo/experience/personalize/experiences/web/Website%20-%20Audience-based%20website%20home%20page%20hero%20V2/Advanced%20targeting%20Script.js).
   4. Click the "Save" button.
   5. Click the back button.

      ![Page targeting advanced](/docs/cdp-personalize/experiments/web/Page-targeting-advanced.png)

   6. Delete the "Contains" page targeting entry.

      ![Page targeting cleaned](/docs/cdp-personalize/experiments/web/Page-targeting-cleaned.png)

   7. Click the "Save" button.
   8. Close the targeting side panel.

      ![After page targeting](After-page-targeting.png)

7. Decisioning

   1. Under "Decisioning", click the "Add" button.

      ![Decision model sidebar](/docs/cdp-personalize/experiences/fullStack/Choose-decision-model.png)

   2. Next to the "Audience-based website home page hero" decision model, click the "Add" button.

      ![After decision model add](After-decision-model-add.png)

   3. Close the decisioning side panel.

      ![After decision model](After-decision-model.png)

8. Goals

   1. Under "Goals", click the "Add goals" button.

      ![Goals empty](/docs/cdp-personalize/experiments/web/Goals-empty.png)

   2. Select "Page View Goal".

      ![Page view goal sidebar](/docs/cdp-personalize/experiences/web/Page-view-goal-sidebar.png)

   3. Enter the following information:

      | Field             | Value                    |
      | ----------------- | ------------------------ |
      | Goal name         | Visited the tickets page |
      | Description       | Visited the tickets page |
      | Match condition   | Regex                    |
      | String            | `.+/tickets`             |
      | Target Result (%) | 50                       |

   4. Click the "Save" button.

      ![After goal](After-goal.png)

9. At the top of the page, click the "Start" button.

   ![Start](/docs/cdp-personalize/experiments/web/Start.png)

10. Click the "Start" button.
