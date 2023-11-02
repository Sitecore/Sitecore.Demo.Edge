# Full Stack Experience - Subscribe to update emails

[Serialized assets](/demo/experience/personalize/experiences/fullStack/Subscribe%20to%20update%20emails)

## How to Replicate

1. Navigate to the full stack experiences page.

   ![Full Stack experiences page](/docs/cdp-personalize/experiences/fullStack/Full-stack-experiences-page.png)

2. Click the "Create Experience" button.

   ![Create dialog](/docs/cdp-personalize/experiences/fullStack/Create-dialog.png)

3. Choose "Triggered Experience".

   ![Choose name](/docs/cdp-personalize/experiences/fullStack/Create-dialog-name.png)

4. Enter the following information:

   | Field | Value                      |
   | ----- | -------------------------- |
   | Name  | Subscribe to update emails |

5. Click the "Create" button.

   ![API tab](/docs/cdp-personalize/experiences/fullStack/Choose-connection.png)

6. In the choose connection sidebar, click the "Sitecore Send add subscriber to updates" connection name.

   ![Triggered full stack experience API tab](/docs/cdp-personalize/experiences/fullStack/Triggered-full-stack-experience-api-tab.png)

7. In the API tab, replace the content with the content of [this file](/demo/experience/personalize/experiences/fullStack/Subscribe%20to%20update%20emails/Personalisation.txt).
8. Click the "Save" button.
9. Click the "Close" button.

   ![After API](After-api.png)

10. Trigger

    1. Under "Trigger", click the "Add" button.
    2. In the trigger sidebar, choose the "Custom Trigger" option.

       ![Choose trigger](/docs/cdp-personalize/experiences/fullStack/Triggered-custom-trigger.png)

    3. Enter the following information:

       | Field                     | Value                         |
       | ------------------------- | ----------------------------- |
       | Name                      | SUBSCRIBE_TO_UPDATES_IDENTITY |
       | Description               | Subscribe to update emails    |
       | Event Identifier Operator | Equals                        |
       | Event Identifier Value    | SUBSCRIBE_TO_UPDATES_IDENTITY |

    4. Click the "Save" button.

       ![After trigger](After-trigger.png)

11. Decisioning

    1. Under "Decisioning", click the "Add" button.

       ![Decision model sidebar](/docs/cdp-personalize/experiences/fullStack/Choose-decision-model.png)

    2. Next to the "Get Website Base URL" decision model, click the "Add" button.

       ![After decision model add](After-decision-model-add.png)

    3. Close the decisioning side panel.

       ![After decision model](After-decision-model.png)

12. At the top of the page, click the "Start" button.

    ![Start](/docs/cdp-personalize/experiments/web/Start.png)

13. Click the "Start" button.
