# Full Stack Experience - Session Browse Abandonment

[Serialized assets](/demo/experience/personalize/experiences/fullstack/Session%20Browse%20Abandonment)

## How to Replicate

1. Navigate to the full stack experiences page.

   ![Full Stack experiences page](/docs/cdp-personalize/experiences/fullStack/Full-stack-experiences-page.png)

2. Click the "Create Experience" button.

   ![Create dialog](/docs/cdp-personalize/experiences/fullStack/Create-dialog.png)

3. Choose "Triggered Experience".

   ![Choose name](/docs/cdp-personalize/experiences/fullStack/Create-dialog-name.png)

4. Enter the following information:

   |Field|Value|
   |-|-|
   |Name|Session Browse Abandonment|

5. Click the "Create" button.

   ![API tab](/docs/cdp-personalize/experiences/fullStack/Choose-connection.png)

6. In the choose connection sidebar, click the "Sitecore Send Session Browse Abandonment" connection name.

   ![Triggered full stack experience API tab](/docs/cdp-personalize/experiences/fullStack/Triggered-full-stack-experience-api-tab.png)

7. In the API tab, replace the content by the content of [this file](/demo/experience/personalize/experiences/fullStack/Session%20Browse%20Abandonment/Personalisation.txt).
8. Click the "Save" button.
9. Click the "Close" button.

   ![After API](After-api.png)

10. Trigger
    1. Under "Trigger", click the "Add" button.

       ![Choose trigger](/docs/cdp-personalize/experiences/fullStack/Triggered-triggers-list.png)

    2. In the trigger sidebar, choose the "Session Closed" trigger.
    3. Click the "Save" button.

       ![After trigger](After-trigger.png)

11. Audience
    1. Under "Audience", click the "Add" button.

       ![Audience empty](/docs/cdp-personalize/experiments/web/Audience-empty.png)

    2. Click on "Real-time Audience".

       ![Audience templates](/docs/cdp-personalize/experiments/web/Audience-templates.png)

    3. After the audience templates list, click the "Add Custom Code" link.

       ![Audience editor](/docs/cdp-personalize/experiments/web/Audience-editor.png)

    4. In the JavaScript tab, replace the content by the content of [this file](/demo/experience/personalize/experiences/fullStack/Session%20Browse%20Abandonment/Custom%20Real-Time%20Audience.js).
    5. Click the "Save" button.
    6. Click the "Close" button.

       ![Audience custom](/docs/cdp-personalize/experiments/web/Audience-custom.png)

    7. Close the audience side panel.

       ![After audience](After-audience.png)

12. Decisioning
    1. Under "Decisioning", click the "Add" button.

       ![Decision model sidebar](/docs/cdp-personalize/experiences/fullStack/Choose-decision-model.png)

    2. Next to the "Get Website Base URL" decision model, click the "Add" button.

       ![After decision model add](After-decision-model-add.png)

    3. Close the decisioning side panel.

       ![After decision model](After-decision-model.png)

13. At the top of the page, click the "Start" button.

    ![Start](/docs/cdp-personalize/experiments/web/Start.png)

14. Click the "Run Experience" button.
