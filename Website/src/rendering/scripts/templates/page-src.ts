/**
 * Generates JSS disconnected mode boilerplate for a page under `data/routes`
 * @param pageId - the page id
 * @param pageName - the page name
 * @returns page boilerplate as a string
 */
function generatePageSrc(pageId: string, pageName: string): string {
  return `id: ${pageId}
fields:
  pageTitle: PLAY! Summit - ${pageName}
placeholders:
  jss-header:
    - componentName: Header
      placeholders:
        jss-header-content:
          - componentName: MainNavigation
  jss-main:
    - componentName: Section
      fields:
        cssClass: none
        brightness: light
        title: ${pageName}
        content: Implement this page by replacing this component.
        callToActionText:
    - componentName: Section
      fields:
        cssClass: section__news
        brightness: dark
        title: News and Media
        content: Check out over 2000 sports brands and test drive the latest fitness equipment and technology in our interactive demo space.
        callToActionText: View All News
      placeholders:
        jss-section-content:
          - componentName: NewsGrid
    - componentName: Section
      fields:
        cssClass: section__sponsors
        brightness: light
        title: Premium Sponsors
        content: Sincere thanks to all our event partners and national sponsors that make this year's Play! Summit possible.
        callToActionText: Become an Sponsor
      placeholders:
        jss-section-content:
          - componentName: SponsorsGrid
  jss-footer:
    - componentName: Footer
`;
}

export default generatePageSrc;
