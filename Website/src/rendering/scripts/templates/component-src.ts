// DEMO TEAM CUSTOMIZATION - Change field name. Change component content.
/**
 * Generates React boilerplate for a component under `src/components`
 * @param componentName - the component name
 * @returns component src boilerplate as a string
 */
function generateComponentSrc(componentName: string): string {
  return `import { Field, withDatasourceCheck } from '@sitecore-jss/sitecore-jss-nextjs';
import { ComponentProps } from 'lib/component-props';

type ${componentName}Props = ComponentProps & {
  fields: {
    exampleToRemove: Field<string>;
  };
};

const ${componentName} = (props: ${componentName}Props): JSX.Element => (
  <div>
    <p>{props.params.name} Component</p>
  </div>
);

export default withDatasourceCheck()<${componentName}Props>(${componentName});
`;
}
// END CUSTOMIZATION

export default generateComponentSrc;
