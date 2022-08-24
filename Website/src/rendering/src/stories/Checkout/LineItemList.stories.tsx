import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import LineItemList from '../../components/Checkout/LineItemList';
import { MockSlice, MockStore } from '../mock-store';
import { loggedInAuthSlice, cartSlice, productCacheSlice } from './CheckoutCommon';

export default {
  title: 'Components/Checkout/LineItemList',
  component: LineItemList,
} as ComponentMeta<typeof LineItemList>;

const Template: ComponentStory<typeof LineItemList> = (args) => <LineItemList {...args} />;

const slices: MockSlice[] = [cartSlice, productCacheSlice, loggedInAuthSlice];

export const Loading = Template.bind({});
const loadingState = {
  initialized: false,
};
Loading.decorators = [
  (Story) => (
    <MockStore sliceOrSlices={{ name: 'ocCurrentCart', state: loadingState }}>
      <Story />
    </MockStore>
  ),
];

export const Editable = Template.bind({});
Editable.args = {
  editable: true,
};
Editable.decorators = [
  (Story) => (
    <MockStore sliceOrSlices={slices}>
      <Story />
    </MockStore>
  ),
];

export const NonEditable = Template.bind({});
NonEditable.args = {
  editable: false,
};
NonEditable.decorators = [
  (Story) => (
    <MockStore sliceOrSlices={slices}>
      <Story />
    </MockStore>
  ),
];
