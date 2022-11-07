// Use client-side JavaScript to more specifically target users
// NOTE: When your targeting conditions are met you must call targetingPassed()

(function () {
  // Add a delay to prevent race conditions (in ms)
  const timeDelaySeconds = 500;
  window.setTimeout(targetingPassed, timeDelaySeconds);

  var pushState = history.pushState;
  history.pushState = function () {
    pushState.apply(history, arguments);
    window.setTimeout(targetingPassed, timeDelaySeconds);
  };

  window.refreshGuestSidebarWebExperience = function () {
    window.setTimeout(targetingPassed, timeDelaySeconds);
  };
})();
