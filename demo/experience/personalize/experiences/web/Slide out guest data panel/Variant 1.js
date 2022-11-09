// Adds a unique variant identifier to CSS when deployed to ensure CSS does not impact styling of other elements.
var compiledCSS = Boxever.templating.compile(variant.assets.css)(variant);
var styleTag = document.getElementById("style-" + variant.ref);
if (styleTag) {
  styleTag.innerHTML = compiledCSS;
}
// End Adds a unique variant identifier to CSS when deployed to ensure CSS does not impact styling of other elements.

// Add FontAwesome to the page
var fontAwesomeScriptElement = document.createElement("script");
fontAwesomeScriptElement.src = "https://kit.fontawesome.com/b19590b5e3.js";
document.body.appendChild(fontAwesomeScriptElement);

// make space in the body for the experience
insertHTMLAfter("body");

/* code to operate the databar */
var bxContent = document.getElementById("bx-databar");
var bxDatabarOpenToggle = bxContent.querySelector(".bx-databar__openToggle");
bxDatabarOpenToggle.onclick = function () {
  if (!bxContent.classList.contains("open")) {
    bxContent.classList.add("open");
  }
};
var bxDatabarCloseButton = bxContent.querySelector(".bx-databar__closeButton");
bxDatabarCloseButton.onclick = function () {
  if (bxContent.classList.contains("open")) {
    bxContent.classList.remove("open");
  }
};

/* code to make accordion work */
const accordionBtns = document.querySelectorAll(".databar-accordion-button");

accordionBtns.forEach((accordion) => {
  accordion.onclick = function () {
    this.parentElement.classList.toggle("is-open");

    let content = this.nextElementSibling;

    if (content.style.maxHeight) {
      //this is if the accordion is open
      content.style.maxHeight = null;
    } else {
      //if the accordion is currently closed
      content.style.maxHeight = content.scrollHeight + "px";
    }
  };
});
