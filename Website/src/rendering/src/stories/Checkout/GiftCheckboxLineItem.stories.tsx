import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import GiftCheckboxLineItem from '../../components/Checkout/GiftCheckboxLineItem';

export default {
  title: 'Components/Checkout/GiftCheckbox',
  component: GiftCheckboxLineItem,
} as ComponentMeta<typeof GiftCheckboxLineItem>;

const Template: ComponentStory<typeof GiftCheckboxLineItem> = (args) => (
  <GiftCheckboxLineItem {...args} />
);

export const Default = Template.bind({});
Default.args = {};
