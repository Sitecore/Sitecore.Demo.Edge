// Use server-side JavaScript to filter your audience further
// You have full access to the guest context which can be accessed under guest, e.g. guest.email
// Any truthy return value will pass the audience filter, it is recommended to return an object
// The value returned can be accessed from the variant API response as 'filter'

// Returns true if the guest has ever viewed a premium content page. Returns false otherwise.
(function () {
  for (
    var sessionIndex = 0;
    sessionIndex < guest.sessions.length;
    sessionIndex++
  ) {
    var session = guest.sessions[sessionIndex];

    for (var eventIndex = 0; eventIndex < session.events.length; eventIndex++) {
      var event = session.events[eventIndex];

      if (
        event.type === "VIEW" &&
        event.arbitraryData &&
        event.arbitraryData.premiumContent
      ) {
        return true;
      }
    }
  }
  return false;
})();
