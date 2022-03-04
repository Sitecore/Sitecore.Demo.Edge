# Decision Template - Website Base URL

[Serialized assets](/demo/experience/personalize/library/decisionTemplates/Website%20Base%20URL)

## How to Replicate

1. Navigate to the decision templates page.

   ![Decision templates page](/docs/cdp-personalize/library/decisionTemplates/Decision-templates.png)

2. Click the "Create Template" button.

   ![Create template](/docs/cdp-personalize/library/decisionTemplates/Create.png)

3. Enter the following information:

   |Field|Value|
   |-|-|
   |Name|Website Base URL|

4. Click the "Create" button.
5. Replace the JavaScript tab code with the following code:

   ```JavaScript
   (function () {
   	var cdpSessions = guest.sessions;

   	for (var i = 0; i < cdpSessions.length; i++) {
   		var cdpSession = cdpSessions[i];

   		if (cdpSession.sessionType === 'WEB') {
   			var events = cdpSession.events;

   			for (var j = 0; j < events.length; j++) {
   				var event = events[j];

   				if (event.arbitraryData && event.arbitraryData.websiteBaseUrl) {
   					return event.arbitraryData.websiteBaseUrl;
   				}
   			}
   		}
   	}

   	return '';
   })();
   ```

6. Click the "Settings" tab.

   ![Settings](/docs/cdp-personalize/library/decisionTemplates/Settings-tab.png)

7. Enter the following information:

   |Field|Value|
   |-|-|
   |Description|Gets the PLAY! Summit website base URL from past guest session events.|
   |Output Reference|websiteBaseUrl|
   |Type|String|

8. Click the "Save" button.
9. Turn on the "Published" toggle.

   ![Published](/docs/cdp-personalize/library/decisionTemplates/Published.png)
