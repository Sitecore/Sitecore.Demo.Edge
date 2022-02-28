import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import GiftCheckboxLineItem from '../../components/Checkout/GiftCheckboxLineItem';
import { checkoutLoader } from '../loaders/checkout-loader';

export default {
  title: 'Components/Checkout/GiftCheckbox',
  component: GiftCheckboxLineItem,
} as ComponentMeta<typeof GiftCheckboxLineItem>;

const Template: ComponentStory<typeof GiftCheckboxLineItem> = (args, { loaded: { checkout } }) => (
  <GiftCheckboxLineItem {...args} lineItem={checkout.lineItems[0]} />
);

export const Default = Template.bind({});
Default.args = {};
// loaders property not part of typescript definition this is fixed in storybook 6.4+
// but breaks ability to set environment variables so opting to work around for now
// eslint-disable-next-line @typescript-eslint/no-explicit-any
(Default as any).loaders = [
  async () => ({
    checkout: await checkoutLoader(),
  }),
];
