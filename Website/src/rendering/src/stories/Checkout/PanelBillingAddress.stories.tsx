import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import PanelBillingAddress from '../../components/Checkout/PanelBillingAddress';
import { MockStore } from '../mock-store';
import { EntityState } from '@reduxjs/toolkit';
import { DAddress } from '../../models/ordercloud/DAddress';
import { DeliveryTypes } from '../../models/ordercloud/DOrder';

export default {
  title: 'Components/Checkout/PanelBillingAddress',
  component: PanelBillingAddress,
} as ComponentMeta<typeof PanelBillingAddress>;

const Template: ComponentStory<typeof PanelBillingAddress> = () => (
  <section className="checkout-details shop-container">
    <PanelBillingAddress />
  </section>
);

export const WithSavedBillingAddress = Template.bind({});
WithSavedBillingAddress.args = {};

const mockState = {
  initialized: true,
  order: {
    BillingAddress: {
      ID: 'address2',
      AddressName: 'Marty Byrde Home',
      Street1: '6818 Gaines Ferry Road',
      City: 'Flowery Branch',
      State: 'GA',
      Zip: '30542',
      Country: 'US',
    },
    xp: {
      DeliveryType: DeliveryTypes.Ship,
    },
  },
  shippingAddress: {
    ID: 'address1',
    AddressName: 'Mr. H Potter',
    Street1: 'The Cupboard under the Stairs',
    Street2: '4 Privet Drive',
    City: 'Little Whinging',
    State: 'SY',
    Zip: '12345',
    Country: 'GB',
  },
};

const authState = {
  isAnonymous: false,
};
const addressBookState = {
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

WithSavedBillingAddress.decorators = [
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

export const WithoutSavedBillingAddress = Template.bind({});
WithoutSavedBillingAddress.args = {};

const mockState2 = {
  initialized: true,
  order: {
    xp: {
      DeliveryType: DeliveryTypes.Ship,
    },
  },
  shippingAddress: {
    ID: 'mockaddressid2',
    AddressName: `Crhistian's Cottage House`,
    Street1: '6580 Sunsplash Dr',
    City: 'Minneapolis',
    State: 'MN',
    Zip: '55912',
    Country: 'US',
  },
};

const authState2 = {
  isAnonymous: true,
};
const addressBookState2 = {
  addresses: { ids: [], entities: {} } as EntityState<DAddress>,
};

WithoutSavedBillingAddress.decorators = [
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

export const WithSameBillingAsShipping = Template.bind({});
WithSameBillingAsShipping.args = {};

const mockState3 = {
  initialized: true,
  order: {
    BillingAddress: {
      ID: 'address1',
      AddressName: 'Mr. H Potter',
      Street1: 'The Cupboard under the Stairs',
      Street2: '4 Privet Drive',
      City: 'Little Whinging',
      State: 'SY',
      Zip: '12345',
      Country: 'GB',
    },
    xp: {
      DeliveryType: DeliveryTypes.Ship,
    },
  },
  shippingAddress: {
    ID: 'address1',
    AddressName: 'Mr. H Potter',
    Street1: 'The Cupboard under the Stairs',
    Street2: '4 Privet Drive',
    City: 'Little Whinging',
    State: 'SY',
    Zip: '12345',
    Country: 'GB',
  },
};

const authState3 = {
  isAnonymous: true,
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

WithSameBillingAsShipping.decorators = [
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
