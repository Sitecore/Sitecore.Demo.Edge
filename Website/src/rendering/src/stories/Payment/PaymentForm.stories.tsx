import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import PaymentForm from '../../components/Payment/PaymentForm';

export default {
  title: 'Components/Payment/PaymentForm',
  component: PaymentForm,
} as ComponentMeta<typeof PaymentForm>;

const Template: ComponentStory<typeof PaymentForm> = () => <PaymentForm />;

export const Default = Template.bind({});
Default.args = {
  params: {
    name: 'PaymentForm',
  },
};
