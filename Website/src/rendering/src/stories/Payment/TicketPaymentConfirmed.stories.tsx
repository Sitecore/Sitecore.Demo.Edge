import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import TicketPaymentConfirmed from '../../components/Payment/TicketPaymentConfirmed';

export default {
  title: 'Components/Payment/TicketPaymentConfirmed',
  component: TicketPaymentConfirmed,
} as ComponentMeta<typeof TicketPaymentConfirmed>;

const Template: ComponentStory<typeof TicketPaymentConfirmed> = () => <TicketPaymentConfirmed />;

export const Default = Template.bind({});
Default.args = {
  params: {
    name: 'TicketPaymentConfirmed',
  },
};
