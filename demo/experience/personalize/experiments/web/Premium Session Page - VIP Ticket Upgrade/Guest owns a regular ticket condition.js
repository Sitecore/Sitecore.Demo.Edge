// Use server-side JavaScript to filter your audience further
// You have full access to the guest context which can be accessed under guest, e.g. guest.email
// Any truthy return value will pass the audience filter, it is recommended to return an object
// The value returned can be accessed from the variant API response as 'filter'

// Returns true if the guest owns a regular ticket. Returns false otherwise.
(function () {
	var TICKET_DATA_EXTENSION_NAME = "Ticket";
	var REGULAR_TICKET_ID = 1;
	var REGULAR_TICKET_NAME = "Regular Ticket";

	for (var dataExtensionIndex = 0; dataExtensionIndex < guest.dataExtensions.length; dataExtensionIndex++) {
		var dataExtension = guest.dataExtensions[dataExtensionIndex];

		if (dataExtension.name === TICKET_DATA_EXTENSION_NAME) {
			return dataExtension.values.ticketId === REGULAR_TICKET_ID || dataExtension.values.ticketName === REGULAR_TICKET_NAME;
		}
	}

	return false;
})();