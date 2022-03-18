function showPopup() {
	// Adds a unique variant identifier to CSS when deployed to ensure CSS does not impact styling of other elements.
	var compiledCSS = Boxever.templating.compile(variant.assets.css)(variant);
	var styleTag = document.getElementById('style-' + variant.ref);
	if (styleTag) {
		styleTag.innerHTML = compiledCSS;
	}
	// End Adds a unique variant identifier to CSS when deployed to ensure CSS does not impact styling of other elements.

	// make space in the body for the experience
	insertHTMLBefore('body');
	document.querySelector('#bx-modal_overlay').style.display = 'flex';
	document.body.classList.add('bx-modal_content');
	var bxCardClose = document.querySelector('.bx-modal__btn-close-icon');
	bxCardClose.onclick = function () {
		document.querySelector('#bx-modal_overlay').style.display = 'none';
	};
}

setTimeout(showPopup, 5000);