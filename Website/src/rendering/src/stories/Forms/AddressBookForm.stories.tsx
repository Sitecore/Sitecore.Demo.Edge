import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import AddressBookForm from '../../components/Forms/AddressBookForm';
import { formAddress } from './FormsCommon';

export default {
  title: 'Components/Forms/AddressBookForm',
  component: AddressBookForm,
  decorators: [
    (Story) => (
      <section className="shop-container section address-book-form-section">
        <div className="form-wrapper">
          <Story />
        </div>
      </section>
    ),
  ],
} as ComponentMeta<typeof AddressBookForm>;

const Template: ComponentStory<typeof AddressBookForm> = (args) => <AddressBookForm {...args} />;

export const Default = Template.bind({});
Default.args = {};

export const WithAddress = Template.bind({});
WithAddress.args = {
  address: formAddress,
};

export const Editing = Template.bind({});
Editing.args = {
  address: formAddress,
  isEditing: true,
};
