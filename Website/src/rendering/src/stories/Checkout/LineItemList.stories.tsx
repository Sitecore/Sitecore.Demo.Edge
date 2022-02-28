import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import LineItemList from '../../components/Checkout/LineItemList';
import { checkoutLoader } from '../loaders/checkout-loader';

export default {
  title: 'Components/Checkout/LineItemList',
  component: LineItemList,
} as ComponentMeta<typeof LineItemList>;

const Template: ComponentStory<typeof LineItemList> = (args) => <LineItemList {...args} />;

export const Editable = Template.bind({});
Editable.args = {
  editable: true,
};
// loaders property not part of typescript definition this is fixed in storybook 6.4+
// but breaks ability to set environment variables so opting to work around for now
// eslint-disable-next-line @typescript-eslint/no-explicit-any
(Editable as any).loaders = [
  async () => ({
    checkout: await checkoutLoader(),
  }),
];

export const NonEditable = Template.bind({});
NonEditable.args = {
  editable: false,
};
// eslint-disable-next-line @typescript-eslint/no-explicit-any
(NonEditable as any).loaders = [
  async () => ({
    checkout: await checkoutLoader(),
  }),
];
