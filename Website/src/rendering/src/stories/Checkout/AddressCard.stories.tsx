import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import AddressCard from '../../components/Checkout/AddressCard';

export default {
  title: 'Components/Checkout/AddressCard',
  component: AddressCard,
} as ComponentMeta<typeof AddressCard>;

const Template: ComponentStory<typeof AddressCard> = (args) => <AddressCard {...args} />;

export const Default = Template.bind({});
Default.args = {
  address: {
    AddressName: 'Marty Byrde Home',
    Street1: '6818 Gaines Ferry Road',
    City: 'Flowery Branch',
    State: 'GA',
    Zip: '30542',
    Country: 'US',
  },
};

export const WithStreet2 = Template.bind({});
WithStreet2.args = {
  address: {
    AddressName: 'Mr. H Potter',
    Street1: 'The Cupboard under the Stairs',
    Street2: '4 Privet Drive',
    City: 'Little Whinging',
    State: 'SY',
    Zip: '12345',
    Country: 'GB',
  },
};

export const IsActive = Template.bind({});
IsActive.args = {
  address: {
    AddressName: 'Mr. H Potter',
    Street1: 'The Cupboard under the Stairs',
    Street2: '4 Privet Drive',
    City: 'Little Whinging',
    State: 'SY',
    Zip: '12345',
    Country: 'GB',
  },
};

export const WithLeastData = Template.bind({});
WithLeastData.args = {
  address: {
    Street1: '4 Privet Drive',
    City: 'Little Whinging',
    State: 'SY',
    Zip: '12345',
    Country: 'GB',
  },
};
