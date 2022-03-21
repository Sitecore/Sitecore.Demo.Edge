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