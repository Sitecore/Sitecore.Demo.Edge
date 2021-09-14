import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import PaymentProgress from '../components/PaymentProgress';

export default {
  title: 'Components/PaymentProgress',
  component: PaymentProgress,
} as ComponentMeta<typeof PaymentProgress>;

const Template: ComponentStory<typeof PaymentProgress> = (args) => <PaymentProgress {...args} />;

export const Default = Template.bind({});
Default.args = {
  params: {
    name: 'PaymentProgress',
  },
};
