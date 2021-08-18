import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import AllProducts from '../../components/AllProducts';

export default {
  title: 'Components/Products/AllProducts',
  component: AllProducts,
} as ComponentMeta<typeof AllProducts>;

const Template: ComponentStory<typeof AllProducts> = () => <AllProducts />;

export const Default = Template.bind({});
Default.args = {
  params: {
    name: 'AllProducts',
  },
};
