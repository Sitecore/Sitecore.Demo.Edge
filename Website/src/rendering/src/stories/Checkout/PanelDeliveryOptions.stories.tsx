import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import PanelDeliveryOptions from '../../components/Checkout/PanelDeliveryOptions';

export default {
  title: 'Components/Checkout/PanelDeliveryOptions',
  component: PanelDeliveryOptions,
} as ComponentMeta<typeof PanelDeliveryOptions>;

const Template: ComponentStory<typeof PanelDeliveryOptions> = (args) => (
  <PanelDeliveryOptions {...args} />
);

export const Default = Template.bind({});
Default.args = {};
