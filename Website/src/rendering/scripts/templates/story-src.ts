// DEMO TEAM CUSTOMIZATION - New file to generate a storybook story when scaffolding a component.
/**
 * Generates Storybook story boilerplate for a component under `src/stories`
 * @param componentName - the component name
 * @returns component story boilerplate as a string
 */
function generateStorySrc(componentName: string, componentPath: string): string {
  const parentFolders = componentPath.replace(/\w+/g, '..');

  return `import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import ${componentName} from '../${parentFolders}components/${componentPath}${componentName}';

export default {
  title: 'Components/${componentPath}${componentName}',
  component: ${componentName},
} as ComponentMeta<typeof ${componentName}>;

const Template: ComponentStory<typeof ${componentName}> = (args) => <${componentName} {...args} />;

export const Default = Template.bind({});
Default.args = {
  params: {
    name: '${componentName}',
  },
  rendering: {
    componentName: '${componentName}',
    dataSource: '/sitecore',
  },
};
`;
}

export default generateStorySrc;
