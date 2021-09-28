import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import FeaturedProducts from '../../components/FeaturedProducts';

export default {
  title: 'Components/Products/FeaturedProducts',
  component: FeaturedProducts,
} as ComponentMeta<typeof FeaturedProducts>;

const Template: ComponentStory<typeof FeaturedProducts> = () => <FeaturedProducts />;

export const Default = Template.bind({});
Default.args = {
  params: {
    name: 'FeaturedProducts',
  },
};
