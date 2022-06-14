import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import TextBlockSection from '../../components/PageContent/TextBlockSection';

export default {
  title: 'Components/PageContent/TextBlockSection',
  component: TextBlockSection,
} as ComponentMeta<typeof TextBlockSection>;

const Template: ComponentStory<typeof TextBlockSection> = (args) => <TextBlockSection {...args} />;

export const Default = Template.bind({});
Default.args = {
  fields: {
    Text: {
      value:
        '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur sodales mi in magna accumsan, vitae finibus libero fringilla. Duis posuere a lorem quis pretium. Sed varius dolor non mi ornare pulvinar.</p><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur sodales mi in magna accumsan, vitae finibus libero fringilla. Duis posuere a lorem quis pretium. Sed varius dolor non mi ornare pulvinar.</p><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur sodales mi in magna accumsan, vitae finibus libero fringilla. Duis posuere a lorem quis pretium. Sed varius dolor non mi ornare pulvinar.</p>',
    },
  },
  // Required for withDatasourceCheck
  rendering: {
    componentName: 'TextBlockSection',
    dataSource: '/sitecore',
  },
};
