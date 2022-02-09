(function () {
	var numberOfNonFlowSessions = 0;

	var cdpSessions = guest.sessions;

	for (var i = 0; i < cdpSessions.length; i++) {
		var cdpSession = cdpSessions[i];

		if (cdpSession.sessionType === 'WEB' && cdpSession.pointOfSale && !cdpSession.flowExecutionRef) {
			numberOfNonFlowSessions += 1;

			if (numberOfNonFlowSessions === 2) {
				break;
			}
		}
	}

	return numberOfNonFlowSessions === 2 ? "Welcome back to" : "Welcome to";
})();