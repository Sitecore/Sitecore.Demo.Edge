(function () {
	targetingPassed();
	var pushState = history.pushState;
	history.pushState = function() {
		pushState.apply(history, arguments);
		targetingPassed();
	};
})();