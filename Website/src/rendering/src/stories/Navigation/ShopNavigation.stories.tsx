import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import ShopNavigation from '../../components/Navigation/ShopNavigation';
import { DiscoverService } from '../../services/DiscoverService';
import { mockDiscoverData } from '../mock-discover-data';
import { MockStore } from '../mock-store';
import { cartSlice, loggedInAuthSlice } from '../Checkout/CheckoutCommon';

export default {
  title: 'Components/Navigation/ShopNavigation',
  component: ShopNavigation,
} as ComponentMeta<typeof ShopNavigation>;

const Template: ComponentStory<typeof ShopNavigation> = (args) => <ShopNavigation {...args} />;

DiscoverService();

export const Default = Template.bind({});
Default.args = {
  previewSearchProps: mockDiscoverData.previewSearchProps,
};
Default.decorators = [
  (Story) => (
    <MockStore sliceOrSlices={[cartSlice, loggedInAuthSlice]}>
      <Story />
    </MockStore>
  ),
];
