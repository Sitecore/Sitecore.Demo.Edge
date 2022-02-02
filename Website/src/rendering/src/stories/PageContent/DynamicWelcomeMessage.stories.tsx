import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import DynamicWelcomeMessage from '../../components/PageContent/DynamicWelcomeMessage';

export default {
  title: 'Components/PageContent/DynamicWelcomeMessage',
  component: DynamicWelcomeMessage,
} as ComponentMeta<typeof DynamicWelcomeMessage>;

const Template: ComponentStory<typeof DynamicWelcomeMessage> = () => <DynamicWelcomeMessage />;

export const Default = Template.bind({});
Default.args = {
  params: {
    name: 'DynamicWelcomeMessage',
  },
  rendering: {
    componentName: 'DynamicWelcomeMessage',
    dataSource: '/sitecore',
  },
};
