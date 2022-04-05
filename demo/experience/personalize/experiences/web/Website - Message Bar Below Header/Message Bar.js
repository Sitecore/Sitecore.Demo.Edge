// Adds a unique variant identifier to CSS when deployed to ensure CSS does not impact styling of other elements.
var compiledCSS = Boxever.templating.compile(variant.assets.css)(variant);
var styleTag = document.getElementById('style-' + variant.ref);
if (styleTag) {
	styleTag.innerHTML = compiledCSS;
}
// End Adds a unique variant identifier to CSS when deployed to ensure CSS does not impact styling of other elements.

replaceHTML("header-cdp-message-bar");


// Declarations
const bxButton = document.querySelector("#bx-"+variant.ref+ ' #bx_TopBanner-button');

// Declare BX function event
const sendInteractionToBoxever = function(interactionType){
	let eventToSend = {
		"channel": "WEB",
		"type": "[[ Experience ID | String | HEADER_MESSAGE_BAR | { required: true }]]_" + interactionType,
		"language": "EN",
		"currency": "CAD",
		"pos": "PLAY! Summit",
		"browser_id": Boxever.getID(),
		"page": window.location.pathname + window.location.search,
	};
	Boxever.eventCreate(eventToSend, function(data){ }, 'json');
}

// Listen on CTA button
bxButton.onclick = function(){
	sendInteractionToBoxever("CLICKED")
	location.href = "[[Button Link]]";
};