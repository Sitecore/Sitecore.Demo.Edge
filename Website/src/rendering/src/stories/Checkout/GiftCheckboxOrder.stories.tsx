import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import GiftCheckboxOrder from '../../components/Checkout/GiftCheckboxOrder';

export default {
  title: 'Components/Checkout/GiftCheckboxOrder',
  component: GiftCheckboxOrder,
} as ComponentMeta<typeof GiftCheckboxOrder>;

const Template: ComponentStory<typeof GiftCheckboxOrder> = (args) => (
  <GiftCheckboxOrder {...args} />
);

export const Default = Template.bind({});
Default.args = {
  order: {},
};
