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