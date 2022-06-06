import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import PanelPayment from '../../components/Checkout/PanelPayment';
import { DPayment } from 'src/models/ordercloud/DPayment';
import { MockStore } from '../mock-store';
import { getMockExpirationDate } from '../utils';

export default {
  title: 'Components/Checkout/PanelPayment',
  component: PanelPayment,
} as ComponentMeta<typeof PanelPayment>;

const Template: ComponentStory<typeof PanelPayment> = (args) => (
  <section className="checkout-details shop-container">
    <PanelPayment {...args} />
  </section>
);

export const WithSavedPayment = Template.bind({});
WithSavedPayment.args = {};

const mockStateSavedPayment = {
  initialized: true,
  order: {
    ID: 'mock-id',
    Total: 100,
  },
  payments: [
    {
      ID: 'mockpaymentid',
      Type: 'CreditCard',
      CreditCardID: 'mock-creditcard-id',
      Accepted: true,
      Amount: 100,
      xp: {
        CreditCard: {
          ID: 'mockcreditcardid',
          CardType: 'Visa',
          CardholderName: 'Jon Snow',
          PartialAccountNumber: '6123',
          ExpirationDate: getMockExpirationDate(),
        },
      },
    },
  ] as DPayment[],
};

WithSavedPayment.decorators = [
  (Story) => (
    <MockStore sliceOrSlices={{ name: 'ocCurrentCart', state: mockStateSavedPayment }}>
      <Story />
    </MockStore>
  ),
];

export const WithoutSavedPayment = Template.bind({});
WithoutSavedPayment.args = {};

const mockStateNoSavedPayment = {
  initialized: true,
  order: {
    ID: 'mock-id',
    Total: 100,
  },
  payments: [] as DPayment[],
};

WithoutSavedPayment.decorators = [
  (Story) => (
    <MockStore sliceOrSlices={{ name: 'ocCurrentCart', state: mockStateNoSavedPayment }}>
      <Story />
    </MockStore>
  ),
];
