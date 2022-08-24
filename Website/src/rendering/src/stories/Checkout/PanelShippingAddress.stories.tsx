import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { MockStore } from '../mock-store';
import PanelShippingAddress from '../../components/Checkout/PanelShippingAddress';
import { EntityState } from '@reduxjs/toolkit';
import { DAddress } from '../../models/ordercloud/DAddress';
import {
  addressBookSlice,
  anonymousAuthSlice,
  emptyAddressBookSlice,
  loggedInAuthSlice,
} from './CheckoutCommon';
import { DeliveryTypes } from '../../models/ordercloud/DOrder';

export default {
  title: 'Components/Checkout/PanelShippingAddress',
  component: PanelShippingAddress,
} as ComponentMeta<typeof PanelShippingAddress>;

const Template: ComponentStory<typeof PanelShippingAddress> = () => (
  <section className="checkout-details shop-container">
    <PanelShippingAddress />
  </section>
);

export const WithSavedAddress = Template.bind({});
WithSavedAddress.args = {};

const mockState = {
  initialized: true,
  order: {
    xp: {
      DeliveryType: DeliveryTypes.Ship,
    },
  },
  shippingAddress: {
    ID: '',
    AddressName: 'Marty Byrde Home',
    FirstName: 'Marty',
    LastName: 'Byrde',
    Street1: '6818 Gaines Ferry Road',
    City: 'Flowery Branch',
    State: 'GA',
    Zip: '30542',
    Country: 'US',
  },
};

WithSavedAddress.decorators = [
  (Story) => (
    <MockStore
      sliceOrSlices={[
        { name: 'ocCurrentCart', state: mockState },
        loggedInAuthSlice,
        addressBookSlice,
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
      DeliveryType: DeliveryTypes.Ship,
    },
  },
};
CreatingNewAddress.decorators = [
  (Story) => (
    <MockStore
      sliceOrSlices={[
        { name: 'ocCurrentCart', state: mockState2 },
        anonymousAuthSlice,
        emptyAddressBookSlice,
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
      DeliveryType: DeliveryTypes.Ship,
    },
  },
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
        loggedInAuthSlice,
        { name: 'ocAddressBook', state: addressBookState3 },
      ]}
    >
      <Story />
    </MockStore>
  ),
];
