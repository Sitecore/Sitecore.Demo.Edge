import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import PaymentAndBillingForm from '../../components/Payment/PaymentAndBillingForm';

export default {
  title: 'Components/Payment/PaymentAndBillingForm',
  component: PaymentAndBillingForm,
} as ComponentMeta<typeof PaymentAndBillingForm>;

const Template: ComponentStory<typeof PaymentAndBillingForm> = () => <PaymentAndBillingForm />;

export const Default = Template.bind({});
Default.args = {
  params: {
    name: 'PaymentAndBillingForm',
  },
};
