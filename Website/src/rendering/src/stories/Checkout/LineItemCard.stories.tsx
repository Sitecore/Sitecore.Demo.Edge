import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import LineItemCard from '../../components/Checkout/LineItemCard';

export default {
  title: 'Components/Checkout/LineItemCard',
  component: LineItemCard,
} as ComponentMeta<typeof LineItemCard>;

const Template: ComponentStory<typeof LineItemCard> = (args) => <LineItemCard {...args} />;

export const Default = Template.bind({});
Default.args = {
  lineItem: {
    ProductID: 'PD123',
    Quantity: 2,
  },
};
