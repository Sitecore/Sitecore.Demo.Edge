import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import QuantityInput from '../../components/Checkout/QuantityInput';
import { DPriceSchedule } from 'src/models/ordercloud/DPriceSchedule';
import { RequiredDeep } from 'ordercloud-javascript-sdk';

export default {
  title: 'Components/Checkout/QuantityInput',
  component: QuantityInput,
} as ComponentMeta<typeof QuantityInput>;

const Template: ComponentStory<typeof QuantityInput> = (args) => <QuantityInput {...args} />;

export const Default = Template.bind({});
Default.args = {
  controlId: 'label1',
  priceSchedule: {
    ID: 'priceschedule1',
    MinQuantity: 1,
    MaxQuantity: 10,
    RestrictedQuantity: false,
    PriceBreaks: [{ Quantity: 1, Price: 20 }],
  } as RequiredDeep<DPriceSchedule>,
  disabled: false,
  quantity: 1,
  onChange: () => {
    return null;
  },
};

export const WithDisabled = Template.bind({});
WithDisabled.args = {
  controlId: 'label1',
  priceSchedule: {
    ID: 'priceschedule1',
    MinQuantity: 1,
    MaxQuantity: 10,
    RestrictedQuantity: false,
    PriceBreaks: [{ Quantity: 1, Price: 20 }],
  } as RequiredDeep<DPriceSchedule>,
  disabled: true,
  quantity: 0,
  onChange: () => {
    return null;
  },
};

export const WithRestrictedQuantities = Template.bind({});
WithDisabled.args = {
  controlId: 'label1',
  priceSchedule: {
    ID: 'priceschedule1',
    MinQuantity: 1,
    MaxQuantity: 10,
    RestrictedQuantity: true,
    PriceBreaks: [
      { Quantity: 100, Price: 5.99 },
      { Quantity: 250, Price: 9.99 },
      { Quantity: 500, Price: 14.99 },
      { Quantity: 1000, Price: 19.99 },
    ],
  } as RequiredDeep<DPriceSchedule>,
  disabled: true,
  quantity: 0,
  onChange: () => {
    return null;
  },
};
