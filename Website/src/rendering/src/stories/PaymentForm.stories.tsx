import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import PaymentForm from '../components/PaymentForm';

export default {
  title: 'Components/PaymentForm',
  component: PaymentForm,
} as ComponentMeta<typeof PaymentForm>;

const Template: ComponentStory<typeof PaymentForm> = (args) => <PaymentForm {...args} />;

export const Default = Template.bind({});
Default.args = {
  params: {
    name: 'PaymentForm',
  },
};
