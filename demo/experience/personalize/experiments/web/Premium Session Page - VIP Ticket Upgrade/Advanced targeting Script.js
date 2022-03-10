// Use client-side JavaScript to more specifically target users
// NOTE: When your targeting conditions are met you must call targetingPassed()

function evaluateTarget() {
	setTimeout(function() {
		var premiumContentMetaElement = document.querySelector("meta[name='premiumSession']");

		if (premiumContentMetaElement && premiumContentMetaElement.content === "true") {
			targetingPassed();
		}
	}, 5000);
}

(function () {
	evaluateTarget();
	var pushState = history.pushState;
	history.pushState = function() {
		pushState.apply(history, arguments);
		evaluateTarget();
	};
})();