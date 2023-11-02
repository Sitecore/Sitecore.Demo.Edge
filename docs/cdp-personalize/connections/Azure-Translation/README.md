# Connection - Azure Translation

[Serialized assets](/demo/experience/personalize/connections/Azure%20Translation)

## How to Replicate

1. Navigate to the connections listing page under Developer Center.

   ![Connections listing page](/docs/cdp-personalize/connections/Connections-listing-page.png)

2. Click the "Create connection" button.

   ![Add Connection](/docs/cdp-personalize/connections/Add-connection.png)

3. Choose "Data System".

   ![Name and Describe](/docs/cdp-personalize/connections/Name-describe.png)

4. Enter the following information:

   | Field       | Value                                    |
   | ----------- | ---------------------------------------- |
   | Name        | Azure Translation                        |
   | Description | Translate text using azure translate api |
   | Icon        | Other                                    |

5. Click the "Next" button.
6. For authentication, select none.

   ![None Authentication](/docs/cdp-personalize/connections/None-authentication.png)

7. Click the "Next" button.

   ![Request](/docs/cdp-personalize/connections/Post-request.png)

8. Enter the following information:

   | Field              | Value                                                                                                                |
   | ------------------ | -------------------------------------------------------------------------------------------------------------------- |
   | Request Method     | POST                                                                                                                 |
   | Request URL        | `https://api.cognitive.microsofttranslator.com/translate?api-version=3.0&from=${inputLanguage}&to=${outputLanguage}` |
   | Headers            | See below for headers                                                                                                |
   | Connection Timeout | 1000                                                                                                                 |
   | Read Timeout       | 1000                                                                                                                 |
   | Request            | <pre>[<br/> {<br/> "text": "${text}"<br/> }<br/>]</pre>                                                              |

   | Header Name                  | Header Value                                                           |
   | ---------------------------- | ---------------------------------------------------------------------- |
   | Accept                       | application/json                                                       |
   | Accept-Encoding              | gzip                                                                   |
   | Content-Type                 | application/json                                                       |
   | Ocp-Apim-Subscription-Key    | One of your Azure Translation service key (See screenshot below).      |
   | Ocp-Apim-Subscription-Region | Your Azure Translation service location/region (See screenshot below). |

   ![Azure translation key](Azure-translation-key.png)

9. Click the "Test Request" button.

   ![Test request](Test-connection.png)

10. Enter the following information:

    | Field          | Value   |
    | -------------- | ------- |
    | inputLanguage  | en      |
    | outputLanguage | fr      |
    | text           | Welcome |

11. Click the "Run Test" button.
12. Ensure the response box contains a valid response with a `statusCode` of `200`.

    ![Response](Response.png)

13. Click the "Next" button.

    ![Map](Map.png)

14. Set the following input configuration:

    | Key            | Label           |
    | -------------- | --------------- |
    | inputLanguage  | Input Language  |
    | outputLanguage | Output Language |
    | text           | Text            |

15. Set the following output configuration:

    | Key     | Label  | Enabled |
    | ------- | ------ | ------- |
    | result  | Result | Yes     |
    | message |        | No      |

16. Click the "Next" button.
17. In the "Review & Save" step, click the "Save" button.
