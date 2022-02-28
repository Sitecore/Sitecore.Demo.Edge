import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import GiftCheckboxOrder from '../../components/Checkout/GiftCheckboxOrder';
import { checkoutLoader } from '../loaders/checkout-loader';

export default {
  title: 'Components/Checkout/GiftCheckboxOrder',
  component: GiftCheckboxOrder,
} as ComponentMeta<typeof GiftCheckboxOrder>;

const Template: ComponentStory<typeof GiftCheckboxOrder> = (args, { loaded: { checkout } }) => (
  <GiftCheckboxOrder {...args} order={checkout.order} />
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
