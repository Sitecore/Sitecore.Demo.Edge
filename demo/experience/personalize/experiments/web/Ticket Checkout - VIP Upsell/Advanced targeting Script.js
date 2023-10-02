// Use client-side JavaScript to more specifically target users
// NOTE: When your targeting conditions are met you must call targetingPassed()

var regularTicketPaymentPageRegexp = /.+\/tickets\/payment\?ticket=1/i;

function evaluateTarget() {
  if (regularTicketPaymentPageRegexp.test(window.location.href)) {
    targetingPassed();
  }
}

(function () {
  evaluateTarget();
  var pushState = history.pushState;
  history.pushState = function () {
    pushState.apply(history, arguments);
    evaluateTarget();
  };
})();
