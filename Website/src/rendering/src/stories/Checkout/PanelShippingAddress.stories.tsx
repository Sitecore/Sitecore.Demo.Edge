import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { MockStore } from '../mock-store';
import PanelShippingAddress from '../../components/Checkout/PanelShippingAddress';
import { EntityState } from '@reduxjs/toolkit';
import { DAddress } from 'src/models/ordercloud/DAddress';

export default {
  title: 'Components/Checkout/PanelShippingAddress',
  component: PanelShippingAddress,
} as ComponentMeta<typeof PanelShippingAddress>;

const Template: ComponentStory<typeof PanelShippingAddress> = (args) => (
  <PanelShippingAddress {...args} />
);

export const WithSavedAddress = Template.bind({});
WithSavedAddress.args = {};

const mockState = {
  initialized: true,
  shippingAddress: {
    ID: 'mockaddressid',
    AddressName: 'Marty Byrde Home',
    Street1: '6818 Gaines Ferry Road',
    City: 'Flowery Branch',
    State: 'GA',
    Zip: '30542',
    Country: 'US',
  },
};
const authState = {
  isAnonymous: true,
};
const addressBookState = {
  addresses: { ids: [], entities: {} } as EntityState<DAddress>,
};

WithSavedAddress.decorators = [
  (Story) => (
    <MockStore
      sliceOrSlices={[
        { name: 'ocCurrentCart', state: mockState },
        { name: 'ocAuth', state: authState },
        { name: 'ocAddressBook', state: addressBookState },
      ]}
    >
      <Story />
    </MockStore>
  ),
];

export const CreatingNewAddress = Template.bind({});
CreatingNewAddress.args = {};

const mockState2 = {
  initialized: true,
  order: {
    xp: {
      DeliveryType: 'Ship',
    },
  },
};
const authState2 = {
  isAnonymous: true,
};
const addressBookState2 = {
  addresses: { ids: [], entities: {} } as EntityState<DAddress>,
};

CreatingNewAddress.decorators = [
  (Story) => (
    <MockStore
      sliceOrSlices={[
        { name: 'ocCurrentCart', state: mockState2 },
        { name: 'ocAuth', state: authState2 },
        { name: 'ocAddressBook', state: addressBookState2 },
      ]}
    >
      <Story />
    </MockStore>
  ),
];

export const WithSavedAddressesNoneSelected = Template.bind({});
WithSavedAddressesNoneSelected.args = {};

const mockState3 = {
  initialized: true,
  order: {
    xp: {
      DeliveryType: 'Ship',
    },
  },
};
const authState3 = {
  isAnonymous: false,
};
const addressBookState3 = {
  addresses: {
    ids: ['address1', 'address2', 'address3'],
    entities: {
      address1: {
        ID: 'address1',
        AddressName: 'Mr. H Potter',
        Street1: 'The Cupboard under the Stairs',
        Street2: '4 Privet Drive',
        City: 'Little Whinging',
        State: 'SY',
        Zip: '12345',
        Country: 'GB',
      },
      address2: {
        ID: 'address2',
        AddressName: 'Marty Byrde Home',
        Street1: '6818 Gaines Ferry Road',
        City: 'Flowery Branch',
        State: 'GA',
        Zip: '30542',
        Country: 'US',
      },
      address3: {
        ID: 'address3',
        AddressName: 'Sitecore US HQ',
        Street1: '101 California St',
        Street2: '#1600',
        City: 'San Francisco',
        State: 'CA',
        Zip: '456',
        Country: 'US',
      },
    },
  } as EntityState<DAddress>,
};

WithSavedAddressesNoneSelected.decorators = [
  (Story) => (
    <MockStore
      sliceOrSlices={[
        { name: 'ocCurrentCart', state: mockState3 },
        { name: 'ocAuth', state: authState3 },
        { name: 'ocAddressBook', state: addressBookState3 },
      ]}
    >
      <Story />
    </MockStore>
  ),
];
