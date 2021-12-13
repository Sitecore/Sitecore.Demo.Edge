import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import PaymentConfirmed from '../../components/Payment/PaymentConfirmed';

export default {
  title: 'Components/Payment/PaymentConfirmed',
  component: PaymentConfirmed,
} as ComponentMeta<typeof PaymentConfirmed>;

const Template: ComponentStory<typeof PaymentConfirmed> = () => <PaymentConfirmed />;

export const Default = Template.bind({});
Default.args = {
  params: {
    name: 'PaymentConfirmed',
  },
};
