import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import PanelUserDetails from '../../components/Checkout/PanelUserDetails';

export default {
  title: 'Components/Checkout/PanelUserDetails',
  component: PanelUserDetails,
} as ComponentMeta<typeof PanelUserDetails>;

const Template: ComponentStory<typeof PanelUserDetails> = (args) => (
  <section className="checkout-details shop-container">
    <PanelUserDetails {...args} />
  </section>
);

export const Default = Template.bind({});
Default.args = {};
