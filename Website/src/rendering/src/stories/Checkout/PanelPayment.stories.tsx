import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import PanelPayment from '../../components/Checkout/PanelPayment';
import { DPayment } from 'src/models/ordercloud/DPayment';
import { MockStore } from '../mock-store';

export default {
  title: 'Components/Checkout/PanelPayment',
  component: PanelPayment,
} as ComponentMeta<typeof PanelPayment>;

const Template: ComponentStory<typeof PanelPayment> = (args) => <PanelPayment {...args} />;

export const WithSavedPayment = Template.bind({});
WithSavedPayment.args = {};

const getMockExpirationDate = (): string => {
  const now = new Date();
  const nowYear = now.getFullYear();
  now.setFullYear(nowYear + 2);
  return now.toISOString();
};

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
      CreditCard: {
        ID: 'mockcreditcardid',
        CardType: 'Visa',
        CardholderName: 'Jon Snow',
        PartialAccountNumber: '6123',
        ExpirationDate: getMockExpirationDate(),
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
