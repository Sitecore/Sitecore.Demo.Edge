import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import CreditCardCard from '../../components/Checkout/CreditCardCard';

export default {
  title: 'Components/Checkout/CreditCardCard',
  component: CreditCardCard,
} as ComponentMeta<typeof CreditCardCard>;

const Template: ComponentStory<typeof CreditCardCard> = (args) => <CreditCardCard {...args} />;

export const Default = Template.bind({});
Default.args = {
  creditCard: {
    CardType: 'Visa',
    CardholderName: 'Jon Snow',
    PartialAccountNumber: '6123',
    ExpirationDate: new Date().toISOString(),
  },
};
