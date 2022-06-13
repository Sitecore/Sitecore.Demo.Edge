// DEMO TEAM CUSTOMIZATION - New file to generate a CSS file when scaffolding a component.
/**
 * Generates CSS file boilerplate for a component under `src/assets/css/components`
 * @param componentName - the component name
 * @returns component CSS file boilerplate as a string
 */
function generateCssSrc(componentName: string): string {
  const componentNameTransformRegexp = new RegExp(/([a-z\d])([A-Z])/g);
  const cssClassName = componentName.replace(componentNameTransformRegexp, '$1-$2').toLowerCase();

  return `.${cssClassName} {
}
`;
}

export default generateCssSrc;
