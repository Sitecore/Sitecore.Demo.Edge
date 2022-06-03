import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import CheckoutAddressList from '../../components/Checkout/CheckoutAddressList';
import { DBuyerAddress } from 'src/models/ordercloud/DBuyerAddress';

export default {
  title: 'Components/Checkout/CheckoutAddressList',
  component: CheckoutAddressList,
} as ComponentMeta<typeof CheckoutAddressList>;

const Template: ComponentStory<typeof CheckoutAddressList> = (args) => (
  <CheckoutAddressList {...args} />
);

const addresses: DBuyerAddress[] = [
  {
    ID: 'address1',
    AddressName: 'Mr. H Potter',
    Street1: 'The Cupboard under the Stairs',
    Street2: '4 Privet Drive',
    City: 'Little Whinging',
    State: 'SY',
    Zip: '12345',
    Country: 'GB',
  },
  {
    ID: 'address2',
    AddressName: 'Marty Byrde Home',
    Street1: '6818 Gaines Ferry Road',
    City: 'Flowery Branch',
    State: 'GA',
    Zip: '30542',
    Country: 'US',
  },
  {
    ID: 'address3',
    AddressName: 'Sitecore US HQ',
    Street1: '101 California St',
    Street2: '#1600',
    City: 'San Francisco',
    State: 'CA',
    Country: 'US',
  },
  {
    ID: 'address4',
    Street1: '1514 East 18th St',
    Street2: 'Apt #104',
    City: 'Minneapolis',
    State: 'MN',
    Zip: '55404',
    Country: 'US',
  },
];

export const Default = Template.bind({});
Default.args = {
  addresses,
  activeAddressId: null,
};
