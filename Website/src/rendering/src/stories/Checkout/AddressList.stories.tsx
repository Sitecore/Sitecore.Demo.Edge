import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import AddressList from '../../components/Checkout/AddressList';
import { DBuyerAddress } from 'src/models/ordercloud/DBuyerAddress';

export default {
  title: 'Components/Checkout/AddressList',
  component: AddressList,
} as ComponentMeta<typeof AddressList>;

const Template: ComponentStory<typeof AddressList> = (args) => <AddressList {...args} />;

const addresses: DBuyerAddress[] = [
  {
    AddressName: 'Mr. H Potter',
    Street1: 'The Cupboard under the Stairs',
    Street2: '4 Privet Drive',
    City: 'Little Whinging',
    State: 'SY',
    Zip: '12345',
    Country: 'GB',
  },
  {
    AddressName: 'Marty Byrde Home',
    Street1: '6818 Gaines Ferry Road',
    City: 'Flowery Branch',
    State: 'GA',
    Zip: '30542',
    Country: 'US',
  },
  {
    AddressName: 'Sitecore US HQ',
    Street1: '101 California St',
    Street2: '#1600',
    City: 'San Francisco',
    State: 'CA',
    Country: 'US',
  },
  {
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
