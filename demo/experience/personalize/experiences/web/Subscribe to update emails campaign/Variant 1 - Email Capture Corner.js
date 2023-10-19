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
  // show popup on bx load
  var bxContent = document.querySelector("#bx-transition-card");
  bxContent.style.display = "flex";
} else {
  // This means we are rendering on the website
  // Insert the experience into the site as we already do
  //Adds a unique variant identifier to CSS when deployed to ensure CSS does not impact styling of other elements.
  var compiledCSS = Boxever.templating.compile(variant.assets.css)(variant);
  var styleTag = document.getElementById("style-" + variant.ref);
  if (styleTag) {
    styleTag.innerHTML = compiledCSS;
  }
  //End

  insertHTMLAfter("body");

  // show popup on bx load
  var bxContent = document.querySelector("#bx-transition-card");
  bxContent.style.display = "flex";
}

function showThankYou() {
  document.querySelector(
    "#bx-" + variant.ref + " #bx-thank_you_modal"
  ).style.display = "flex";
}

function dismissThankYou() {
  document.querySelector(
    "#bx-" + variant.ref + " #bx-thank_you_modal"
  ).style.display = "none";
}

//declarations
const bxEmailCaptureContainer = document.getElementById(
  "bx-email_capture_container"
);
const bxThankYouClose = document.querySelector(
  "#bx-" + variant.ref + " #bx-thank_you_close"
);
const bxThankYouBackdrop = document.querySelector(
  "#bx-" + variant.ref + " #bx-thank_you_backdrop"
);
const bxThankYouContainer = document.querySelector(
  "#bx-" + variant.ref + " #bx-thank_you_modal"
);
const bxClose = bxContent.querySelector(".bx__btn-close");
const bxCTA = document.getElementById("bx-transition-card--primary");

document.getElementById("bx-email_input").value =
  variant && variant.context && variant.context.email
    ? variant.context.email
    : "";
document.getElementById("bx-firstname_input").value =
  variant && variant.context && variant.context.firstname
    ? variant.context.firstname
    : "";
document.getElementById("bx-lastname_input").value =
  variant && variant.context && variant.context.lastname
    ? variant.context.lastname
    : "";

// LIsteners
//on Email submission
bxCTA.onclick = function () {
  let bxEmail = document.getElementById("bx-email_input").value;
  let bxFirstName = document.getElementById("bx-firstname_input").value;
  let bxLastName = document.getElementById("bx-lastname_input").value;
  let emailVerified = validateEmail(bxEmail);
  emailVerified
    ? onSuccessValidation(bxEmail, bxFirstName, bxLastName)
    : //friendly error
      (document.getElementById("bx-email_input").style.backgroundColor =
        "rgba(200,0,0,0.1)");
};

bxClose.onclick = function () {
  bxContent.style.display = "none";
  sendInteractionToBoxever("DISMISSED");
};

bxThankYouClose.onclick = function () {
  dismissThankYou();
};

bxThankYouBackdrop.onclick = function () {
  dismissThankYou();
};

//declare functions
const sendInteractionToBoxever = function (interactionType) {
  let eventToSend = {
    channel: "WEB",
    type: interactionType,
    browser_id: Boxever.getID(),
    language: window.navigator.language,
    currency: "USD",
    page: window.location.pathname + window.location.search,
    pos: "PLAY! Summit",
  };
  Boxever.eventCreate(eventToSend, (data) => {}, "json");
};

const onSuccessValidation = function (email, firstname, lastname) {
  let event = {
    channel: "WEB",
    type: "IDENTITY",
    language: window.navigator.language,
    currency: "USD",
    page: window.location.pathname + window.location.search,
    pos: "PLAY! Summit",
    browser_id: Boxever.getID(),
    email: email,
    firstname: firstname,
    lastname: lastname,
    identifiers: [
      {
        provider: "email",
        id: email,
      },
    ],
  };
  Boxever.eventCreate(event, function (data) {}, "json");

  sendInteractionToBoxever("SUBSCRIBE_TO_UPDATES_IDENTITY");

  bxEmailCaptureContainer.style.display = "none";
  let X = document.querySelector(".bx__btn-close");
  X.style.display = "none";
  showThankYou();
  // flash thank you message
  setTimeout(function () {
    document.querySelector("#bx-transition-card").style.display = "none";
  }, 100);
};

const validateEmail = function (bxEmail) {
  let validation = false;
  let mailformat =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:.[a-zA-Z0-9-]+)*$/.test(
      bxEmail
    );
  mailformat ? (validation = true) : (validation = false);
  return validation;
};
