import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import QuantityInput from '../../components/Checkout/QuantityInput';
import { RequiredDeep } from 'ordercloud-javascript-sdk';
import { DPriceSchedule } from 'src/models/ordercloud/DPriceSchedule';

export default {
  title: 'Components/Checkout/QuantityInput',
  component: QuantityInput,
} as ComponentMeta<typeof QuantityInput>;

const Template: ComponentStory<typeof QuantityInput> = (args) => <QuantityInput {...args} />;

export const Default = Template.bind({});
Default.args = {
  controlId: 'quantity-input-id',
  priceSchedule: {} as RequiredDeep<DPriceSchedule>,
  quantity: 2,
  onChange: () => console.log('quantity updated'),
};
