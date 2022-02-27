import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import ClickOutside from '../../components/PreviewSearch/ClickOutside';

export default {
  title: 'Components/PreviewSearch/ClickOutside',
  component: ClickOutside,
} as ComponentMeta<typeof ClickOutside>;

const Template: ComponentStory<typeof ClickOutside> = (args) => <ClickOutside {...args} />;

export const Default = Template.bind({});
Default.args = {
  params: {
    name: 'ClickOutside',
  },
  rendering: {
    componentName: 'ClickOutside',
    dataSource: '/sitecore',
  },
};
