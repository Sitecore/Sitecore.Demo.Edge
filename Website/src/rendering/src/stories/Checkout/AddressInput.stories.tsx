import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import AddressInput from '../../components/Checkout/AddressInput';

export default {
  title: 'Components/Checkout/AddressInput',
  component: AddressInput,
} as ComponentMeta<typeof AddressInput>;

const Template: ComponentStory<typeof AddressInput> = (args) => <AddressInput {...args} />;

export const Default = Template.bind({});
Default.args = {
  params: {
    name: 'AddressInput',
  },
  rendering: {
    componentName: 'AddressInput',
    dataSource: '/sitecore',
  },
};
