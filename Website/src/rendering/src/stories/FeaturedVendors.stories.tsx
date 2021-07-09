import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import FeaturedVendors  from '../components/FeaturedVendors';

export default {
  title: 'Example/FeaturedVendors',
  component: FeaturedVendors,
} as ComponentMeta<typeof FeaturedVendors>;

const Template: ComponentStory<typeof FeaturedVendors> = () => <FeaturedVendors />;

export const Deafult = Template.bind({});
Deafult.args = {};
