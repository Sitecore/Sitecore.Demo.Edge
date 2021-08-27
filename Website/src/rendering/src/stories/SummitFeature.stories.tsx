import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import SummitFeature from '../components/SummitFeature';

export default {
  title: 'Components/SummitFeature',
  component: SummitFeature,
} as ComponentMeta<typeof SummitFeature>;

const Template: ComponentStory<typeof SummitFeature> = (args) => <SummitFeature {...args} />;

export const Default = Template.bind({});
Default.args = {
  params: {
    name: 'SummitFeature',
  },
};
