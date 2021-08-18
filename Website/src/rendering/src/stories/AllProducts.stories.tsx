import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import AllProducts from '../components/AllProducts';

export default {
  title: 'Components/AllProducts',
  component: AllProducts,
} as ComponentMeta<typeof AllProducts>;

const Template: ComponentStory<typeof AllProducts> = (args) => <AllProducts {...args} />;

export const Default = Template.bind({});
Default.args = {
  params: {
    name: 'AllProducts',
  },
};
