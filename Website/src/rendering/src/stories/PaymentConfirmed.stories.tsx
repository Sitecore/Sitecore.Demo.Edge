import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import PaymentConfirmed from '../components/PaymentConfirmed';

export default {
  title: 'Components/PaymentConfirmed',
  component: PaymentConfirmed,
} as ComponentMeta<typeof PaymentConfirmed>;

const Template: ComponentStory<typeof PaymentConfirmed> = (args) => <PaymentConfirmed {...args} />;

export const Default = Template.bind({});
Default.args = {
  params: {
    name: 'PaymentConfirmed',
  },
};
