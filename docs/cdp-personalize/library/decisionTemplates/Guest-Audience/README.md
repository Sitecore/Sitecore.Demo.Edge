# Decision Template - Guest Audience

[Serialized assets](/demo/experience/personalize/library/decisionTemplates/Guest%20Audience)

## How to Replicate

1. Navigate to the decision templates page.

   ![Decision templates page](/docs/cdp-personalize/library/decisionTemplates/Decision-templates.png)

2. Click the "Create Template" button.

   ![Create template](/docs/cdp-personalize/library/decisionTemplates/Create.png)

3. Enter the following information:

   |Field|Value|
   |-|-|
   |Name|Guest Audience|

4. Click the "Create" button.
5. Replace the JavaScript tab code with the following code:

   ```JavaScript
   function getLastSessionPageViews(numberOfPageViews) {
   	var sessionPageViews = [];

   	var cdpSessions = guest.sessions;

   	for (var i = 0; i < cdpSessions.length; i++) {
   		var cdpSession = cdpSessions[i];

   		if (cdpSession.sessionType === 'WEB') {
   			var events = cdpSession.events;

   			for (var j = 0; j < events.length; j++) {
   				var event = events[j];

   				if (event.type === 'VIEW' && event.arbitraryData && event.arbitraryData.sitecoreTemplateName === 'Session') {
   					sessionPageViews.push(event);

   					if (sessionPageViews.length === numberOfPageViews) {
   						break;
   					}
   				}
   			}

   			if (sessionPageViews.length === numberOfPageViews) {
   				break;
   			}
   		}
   	}

   	return sessionPageViews;
   }

   function getAllAudiencesFromPageView(pageView) {
   	if (pageView && pageView.arbitraryData && pageView.arbitraryData.audiences && pageView.arbitraryData.audiences.length > 0) {
   		return pageView.arbitraryData.audiences;
   	}

   	return [];
   }

   (function () {
   	var lastSessionPageViews = getLastSessionPageViews(1);

   	if (lastSessionPageViews.length > 0) {
   		var audiences = getAllAudiencesFromPageView(lastSessionPageViews[0]);

   		if (audiences && audiences.length > 0) {
   			return audiences[0];
   		}
   	}

   	return "";
   })();
   ```

6. Click the "Settings" tab.

   ![Settings](/docs/cdp-personalize/library/decisionTemplates/Settings-tab.png)

7. Enter the following information:

   |Field|Value|
   |-|-|
   |Description|Get the audience of a guest from their last session page view on the website|
   |Output Reference|GuestAudience|
   |Type|String|

8. Click the "Save" button.
9. Turn on the "Published" toggle.

   ![Published](/docs/cdp-personalize/library/decisionTemplates/Published.png)
