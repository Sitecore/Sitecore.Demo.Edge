(function () {
	var totalCount = 0;
	for(var i = 0; i < guest.sessions.length; i++){
		if(guest.sessions[i].events && guest.sessions[i].events.length > 0){
			for(var e = 0; e < guest.sessions[i].events.length; e++){
				var event = guest.sessions[i].events[e];
				if(event && event.type === "VIEW" && event.arbitraryData && event.arbitraryData.page && event.arbitraryData.page.startsWith("/sessions") ){
					totalCount++;
				}
				if(event.type === "SUBSCRIBE_TO_UPDATES_IDENTITY"){
					return false;
				}
			}
		}
	}
	if(totalCount === 4 || (totalCount > 4 && totalCount % 10 === 0)) {
		return true;
	}
	return false;
})();
