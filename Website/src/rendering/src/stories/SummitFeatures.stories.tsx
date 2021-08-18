import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import SummitFeatures from '../components/SummitFeatures';

export default {
  title: 'Components/SummitFeatures',
  component: SummitFeatures,
} as ComponentMeta<typeof SummitFeatures>;

const Template: ComponentStory<typeof SummitFeatures> = (args) => <SummitFeatures {...args} />;

export const Default = Template.bind({});
Default.args = {
  params: {
    name: 'SummitFeatures',
  },
};
