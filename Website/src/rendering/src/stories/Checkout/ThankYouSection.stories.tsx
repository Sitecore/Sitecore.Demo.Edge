import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import ThankYouSection from '../../components/Checkout/ThankYouSection';
import { MockStore } from '../mock-store';
import { anonymousAuthSlice, cartSlice, loggedInAuthSlice } from './CheckoutCommon';

export default {
  title: 'Components/Checkout/ThankYouSection',
  component: ThankYouSection,
} as ComponentMeta<typeof ThankYouSection>;

const Template: ComponentStory<typeof ThankYouSection> = () => <ThankYouSection />;

export const LoggedIn = Template.bind({});
LoggedIn.args = {};
LoggedIn.decorators = [
  (Story) => (
    <MockStore sliceOrSlices={[loggedInAuthSlice, cartSlice]}>
      <Story />
    </MockStore>
  ),
];

export const Anonymous = Template.bind({});
Anonymous.args = {};
Anonymous.decorators = [
  (Story) => (
    <MockStore sliceOrSlices={[anonymousAuthSlice, cartSlice]}>
      <Story />
    </MockStore>
  ),
];
