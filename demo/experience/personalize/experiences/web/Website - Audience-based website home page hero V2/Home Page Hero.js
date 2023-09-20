//if (variant.context.decisionOffers.length > 0 && document.getElementById('cdp-audience-based-hero')) {
    replaceHTML('#cdp-audience-based-home-page-hero');
    var compiledCSS = Boxever.templating.compile(variant.assets.css)(variant);
    var styleTag = document.getElementById('style-' + variant.ref);
    if (styleTag) {
        styleTag.innerHTML = compiledCSS;
    }
//}
