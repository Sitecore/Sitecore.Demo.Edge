(function () {
	if(!guest.email){
		return false;
	}

	if (guest.dataExtensions.length < 1){
		return true;
	}

	for(var i = 0; i < guest.dataExtensions.length; i++){
		if (guest.dataExtensions[i].name === "Ticket"){
			return false;
		}
	}

	return true;
})();