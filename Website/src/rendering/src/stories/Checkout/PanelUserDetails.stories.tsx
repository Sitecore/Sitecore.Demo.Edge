import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import PanelUserDetails from '../../components/Checkout/PanelUserDetails';
import { MockStore } from '../mock-store';
import { cartSlice } from './CheckoutCommon';

export default {
  title: 'Components/Checkout/PanelUserDetails',
  component: PanelUserDetails,
} as ComponentMeta<typeof PanelUserDetails>;

const Template: ComponentStory<typeof PanelUserDetails> = (args) => <PanelUserDetails {...args} />;

export const Default = Template.bind({});
Default.args = {};
Default.decorators = [
  (Story) => (
    <MockStore sliceOrSlices={cartSlice}>
      <Story />
    </MockStore>
  ),
];
