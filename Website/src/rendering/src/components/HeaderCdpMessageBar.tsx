// React throws an error if the root element of the component is removed from the DOM.
// The #header-personalized-message-bar div outerHTML will be set by Sitecore Personalize.
// Thus, we wrap it in another div that becomes the component root element and React is happy.
const HeaderCdpMessageBar = (): JSX.Element => (
  <div>
    <div id="header-personalized-message-bar"></div>
  </div>
);

export default HeaderCdpMessageBar;
