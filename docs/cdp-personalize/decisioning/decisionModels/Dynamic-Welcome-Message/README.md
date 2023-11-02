# Decision Model - Dynamic Welcome Message

[Serialized assets](/demo/experience/personalize/decisioning/decisionModels/Dynamic%20Welcome%20Message)

## How to Replicate

1. Navigate to the decision models page by clicking on Decisioning.

   ![Decision models page](/docs/cdp-personalize/decisioning/decisionModels/Decision-models-page.png)

2. Click the "Create Decision Model" button.

   ![Create](/docs/cdp-personalize/decisioning/decisionModels/Create.png)

3. Enter the following information:

   | Field | Value                   |
   | ----- | ----------------------- |
   | Title | Dynamic Welcome Message |

4. Click the "Create" button.

   ![Variants screen](/docs/cdp-personalize/decisioning/decisionModels/Variants.png)

5. In the draft column, click the "Add Variant" button.

   ![Create variant](/docs/cdp-personalize/decisioning/decisionModels/Create-variant.png)

6. Enter the following information:

   | Field | Value |
   | ----- | ----- |
   | Title | v1    |

   The variant will be displayed in the draft column.

   ![Draft variant](/docs/cdp-personalize/decisioning/decisionModels/Draft-variant.png)

7. Click the v1 variant card.

   ![Empty canvas](/docs/cdp-personalize/decisioning/decisionModels/Empty-canvas.png)

8. In a new browser tab, open the [GitHub decision model XML file](/demo/experience/personalize/decisioning/decisionModels/Dynamic%20Welcome%20Message/v14.xml).

   ![XML file](GitHub.png)

9. In the file content header, click the "Raw" button.

   ![Raw](/docs/cdp-personalize/decisioning/decisionModels/Raw.png)

   The XML file will be displayed without the GitHub user interface.

10. Save this file on your computer.
11. Edit the file in a text editor.
12. Search for the `Redacted` word and replace the occurences following these instructions:

    | `Redacted` occurrences                                  | Replacement                                                                             |
    | ------------------------------------------------------- | --------------------------------------------------------------------------------------- |
    | `"authType":"BASIC","username":"Redacted"`              | Replace `Redacted` by your MaxMind account ID.                                          |
    | `"name":"Ocp-Apim-Subscription-Key","value":"Redacted"` | Replace `Redacted` by one of your Azure Translation service key (See screenshot below). |

    ![Azure Translation service key](/docs/cdp-personalize/connections/Azure-Translation/Azure-translation-key.png)

13. If needed, adjust the `eastus` value of the `Ocp-Apim-Subscription-Region` attribute to match your Azure Translation service location/region.
14. Save the file.
15. Back in Sitecore Personalize, in the canvas, click the "Import XML" button.

    ![Import XML button](/docs/cdp-personalize/decisioning/decisionModels/Import-XML-button.png)

16. In the native open file window, choose the edited XML file, then click the "Open" button.
17. Once the canvas has updated, click the blue "Save" or checkmark ✔ button.
18. Click the "Close" button.

    ![Draft variant](/docs/cdp-personalize/decisioning/decisionModels/Draft-variant.png)

19. Drag the v1 variant to the production column.

    ![Move to production](/docs/cdp-personalize/decisioning/decisionModels/Move-to-production.png)

20. Click the "Move to Production" button.

    ![Production](/docs/cdp-personalize/decisioning/decisionModels/Production.png)
