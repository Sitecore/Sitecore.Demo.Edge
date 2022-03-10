// Use client-side JavaScript to more specifically target users
// NOTE: When your targeting conditions are met you must call targetingPassed() 

(function () {
	targetingPassed();
	var pushState = history.pushState;
	history.pushState = function() {
		pushState.apply(history, arguments);
		targetingPassed();
	};
})();