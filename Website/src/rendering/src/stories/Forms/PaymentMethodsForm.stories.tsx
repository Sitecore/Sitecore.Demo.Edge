import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import PaymentMethodsForm from '../../components/Forms/PaymentMethodsForm';

export default {
  title: 'Components/Forms/PaymentMethodsForm',
  component: PaymentMethodsForm,
  decorators: [
    (Story) => (
      <section className="shop-container section payment-methods-form-section">
        <div className="form-wrapper">
          <Story />
        </div>
      </section>
    ),
  ],
} as ComponentMeta<typeof PaymentMethodsForm>;

const Template: ComponentStory<typeof PaymentMethodsForm> = (args) => (
  <PaymentMethodsForm {...args} />
);

const user = {
  ID: 'mockuser',
  xp: {
    DefaultCreditCardID: 'mockcreditcard',
  },
};

const creditCard = {
  ID: 'mockcreditcard',
  CardType: 'Visa',
  CardholderName: 'Jon Snow',
  PartialAccountNumber: '6123',
  ExpirationDate: new Date().toISOString(),
};

export const Default = Template.bind({});
Default.args = {
  user,
  creditCard: {},
  isEditing: false,
};

export const Editing = Template.bind({});
Editing.args = {
  user,
  creditCard,
  isEditing: true,
};
