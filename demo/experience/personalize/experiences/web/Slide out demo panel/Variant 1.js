// Adds a unique variant identifier to CSS when deployed to ensure CSS does not impact styling of other elements.
var compiledCSS = Boxever.templating.compile(variant.assets.css)(variant);
var styleTag = document.getElementById('style-' + variant.ref);
if (styleTag) {
    styleTag.innerHTML = compiledCSS;
}
// End Adds a unique variant identifier to CSS when deployed to ensure CSS does not impact styling of other elements.

// Add FontAwesome to the page
var fontAwesomeScriptElement = document.createElement('script');
fontAwesomeScriptElement.src = 'https://kit.fontawesome.com/b19590b5e3.js';
document.body.appendChild(fontAwesomeScriptElement);

// make space in the body for the experience
insertHTMLAfter('body');

/* code to operate the demobar */
var bxContent = document.getElementById('bx-demobar');
var bxDemobarOpenToggle = bxContent.querySelector('.bx-demobar__openToggle');
bxDemobarOpenToggle.onclick = function () {
  if (!bxContent.classList.contains('open')) {
    bxContent.classList.add('open');
  }
};
var bxDemobarClose = bxContent.querySelector('.bx-demobar__closeButton');
bxDemobarClose.onclick = function () {
  if (bxContent.classList.contains('open')) {
    bxContent.classList.remove('open');
  }
  // Refresh guest sidebar web experience after closing demo panel
  if (window.refreshGuestSidebarWebExperience && typeof window.refreshGuestSidebarWebExperience === "function") {
    window.refreshGuestSidebarWebExperience();
  }
};

/* code to make accordion work */
const accordionBtns = document.querySelectorAll(".demobar-accordion-button");

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

/* toast */
function showToast() {
  var toast = document.getElementById("saveMsg");
  toast.style = "display:block";
  setTimeout(() => { toast.style = "display:none"; }, 1500);
}

/* bind for buttons */
document.getElementById("identifyUserButton").onclick = identifyUser;
document.getElementById("addToCartButton").onclick = addToCart;
document.getElementById("forceCloseButton").onclick = sendForceClose;
document.getElementById("customEventButton").onclick = sendCustomEvent;
document.getElementById("checkoutCartButton").onclick = checkoutCartEvent;
document.getElementById("clearCartButton").onclick = clearCartEvent;
document.getElementById("anonymousButton").onclick = anonymousEvent;

/* Event methods */
function identifyUser() {
  var identityEvent = {
    browser_id: Boxever.getID(),
    channel: document.getElementById("Channel").value,
    type: "IDENTITY",
    language: document.getElementById("Language").value,
    currency: document.getElementById("Currency").value,
    page: window.location.pathname,
    pos: document.getElementById("PointOfSale").value,
    email: document.getElementById("identifyUserEmail").value,
    identifiers: [
      {
        provider: document.getElementById("identifyProviderName").value,
        id: document.getElementById("identifyUserName").value,
      },
    ],
  };

  identityEvent = Boxever.addUTMParams(identityEvent);
  Boxever.eventCreate(identityEvent, function (data) {}, "json");
  showToast();
  return false;
}


function addToCart() {
  var addEvent = {
    channel: document.getElementById("Channel").value,
    type: "ADD",
    language: document.getElementById("Language").value,
    currency: document.getElementById("Currency").value,
    page: window.location.pathname,
    pos: document.getElementById("PointOfSale").value,
    browser_id: Boxever.getID(),
    product: {
      type: document.getElementById("addProductType").value,
      item_id: "ITEM_1",
      name: document.getElementById("addProductName").value,
      currency: document.getElementById("Currency").value,
      price: document.getElementById("addPrice").value,
      product_id: document.getElementById("addSKU").value,
      origin: "",
      destination: "",
      flight_type: "",
      pax_type: "",
      quantity: document.getElementById("addQuantity").value,
    },
  };

  addEvent = Boxever.addUTMParams(addEvent);
  Boxever.eventCreate(addEvent, function (data) {}, "json");
  showToast();
  return false;
}

function sendForceClose() {
  var closeSessionEvent = {
    browser_id: Boxever.getID(),
    channel: document.getElementById("Channel").value,
    language: document.getElementById("Language").value,
    currency: document.getElementById("Currency").value,
    pos: document.getElementById("PointOfSale").value,
    type: "FORCE_CLOSE",
    _bx_extended_message: "1",
  };

  Boxever.eventCreate(closeSessionEvent, function (data) {}, "json");
  showToast();
  return false;
}

function sendCustomEvent() {
  var customEvent = {
    browser_id: Boxever.getID(),
    channel: document.getElementById("Channel").value,
    type: document.getElementById("customType").value,
    pos: document.getElementById("PointOfSale").value,
  };

  Boxever.eventCreate(customEvent, function (data) {}, "json");
  showToast();
  return false;
}


function checkoutCartEvent() {
  var closeSessionEvent = {
    browser_id: Boxever.getID(),
    channel: document.getElementById("Channel").value,
    language: document.getElementById("Language").value,
    currency: document.getElementById("Currency").value,
    pos: document.getElementById("PointOfSale").value,
    page: window.location.pathname,
    type: "CHECKOUT",
    reference_id: document.getElementById("checkoutRef").value,
    status: document.getElementById("checkoutStatus").value
  };

  Boxever.eventCreate(closeSessionEvent, function (data) {}, "json");
  showToast();
  return false;
}

function clearCartEvent() {
  var clearCartEvent = {
    browser_id: Boxever.getID(),
    channel: document.getElementById("Channel").value,
    language: document.getElementById("Language").value,
    currency: document.getElementById("Currency").value,
    pos: document.getElementById("PointOfSale").value,
    page: window.location.pathname,
    type: "CLEAR_CART",
  };

  Boxever.eventCreate(clearCartEvent, function (data) {}, "json");
  showToast();
  return false;
}

function anonymousEvent() {
    Boxever.reset();
}
