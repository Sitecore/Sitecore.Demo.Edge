// Pick an element that's always on the website like the logo and check for it
if (!document.querySelector(".logo-link")) {
  // This means we are rendering in preview
  // Inject our CSS file into the head
  var link = document.createElement("link");
  link.type = "text/css";
  link.rel = "stylesheet";
  link.href =
    "https://ch.sitecoredemo.com/api/public/content/1219715875454fcaa3470e89a040bf2e?v=faa40351";
  document.getElementsByTagName("head")[0].appendChild(link);

  // Insert the experience into the preview
  insertHTMLAfter("body");

  // And/Or add specific styles to the inserted element
  // E.g.
  // yourElement.style.color = 'red'
  document.querySelector("#bx-modal_overlay").style.display = "flex";
  document.body.classList.add("bx-modal_content");
  var bxCardClose = document.querySelector(".bx-modal__btn-close-icon");
  bxCardClose.onclick = function () {
    document.querySelector("#bx-modal_overlay").style.display = "none";
  };
} else {
  // This means we are rendering on the website
  // Insert the experience into the site as we already do
  // Adds a unique variant identifier to CSS when deployed to ensure CSS does not impact styling of other elements.
  var compiledCSS = Boxever.templating.compile(variant.assets.css)(variant);
  var styleTag = document.getElementById("style-" + variant.ref);
  if (styleTag) {
    styleTag.innerHTML = compiledCSS;
  }
  // End Adds a unique variant identifier to CSS when deployed to ensure CSS does not impact styling of other elements.

  // make space in the body for the experience
  insertHTMLBefore("body");
  document.querySelector("#bx-modal_overlay").style.display = "flex";
  document.body.classList.add("bx-modal_content");
  var bxCardClose = document.querySelector(".bx-modal__btn-close-icon");
  bxCardClose.onclick = function () {
    document.querySelector("#bx-modal_overlay").style.display = "none";
  };
}
