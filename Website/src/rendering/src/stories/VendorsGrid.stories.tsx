import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import VendorsGrid  from '../components/VendorsGrid';

export default {
  title: 'Example/VendorsGrid',
  component: VendorsGrid,
} as ComponentMeta<typeof VendorsGrid>;

const Template: ComponentStory<typeof VendorsGrid> = () => <VendorsGrid />;

export const Deafult = Template.bind({});
Deafult.args = {};
