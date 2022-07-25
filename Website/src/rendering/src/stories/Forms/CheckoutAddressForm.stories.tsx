import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import CheckoutAddressForm from '../../components/Forms/CheckoutAddressForm';
import { formAddress } from './FormsCommon';

export default {
  title: 'Components/Forms/CheckoutAddressForm',
  component: CheckoutAddressForm,
  decorators: [
    (Story) => (
      <section className="shop-container">
        <Story />
      </section>
    ),
  ],
} as ComponentMeta<typeof CheckoutAddressForm>;

const Template: ComponentStory<typeof CheckoutAddressForm> = (args) => (
  <CheckoutAddressForm {...args} />
);

export const Default = Template.bind({});
Default.args = {};

export const Loading = Template.bind({});
Loading.args = {
  loading: true,
};

export const SaveToAddressBook = Template.bind({});
SaveToAddressBook.args = {
  showSaveToAddressBook: true,
};

export const WithAddress = Template.bind({});
WithAddress.args = {
  address: formAddress,
};

export const Editing = Template.bind({});
Editing.args = {
  address: formAddress,
  isEditing: true,
  showSaveToAddressBook: true,
};
