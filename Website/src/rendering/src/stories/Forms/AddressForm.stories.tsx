import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import AddressForm from '../../components/Forms/AddressForm';

export default {
  title: 'Components/Forms/AddressForm',
  component: AddressForm,
} as ComponentMeta<typeof AddressForm>;

const Template: ComponentStory<typeof AddressForm> = (args) => <AddressForm {...args} />;

export const Loading = Template.bind({});
Loading.args = {
  loading: true,
};

export const Default = Template.bind({});
Default.args = {};

export const WithAddress = Template.bind({});
WithAddress.args = {
  address: {
    AddressName: 'Marty Byrde Home',
    Street1: '6818 Gaines Ferry Road',
    City: 'Flowery Branch',
    State: 'GA',
    Zip: '30542',
    Country: 'US',
  },
};
