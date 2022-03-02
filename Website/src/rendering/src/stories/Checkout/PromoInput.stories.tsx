import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import PromoInput from '../../components/Checkout/PromoInput';
import { MockStore } from '../mock-store';
import { DOrderPromotion } from 'src/models/ordercloud/DOrderPromotion';

export default {
  title: 'Components/Checkout/PromoInput',
  component: PromoInput,
} as ComponentMeta<typeof PromoInput>;

const Template: ComponentStory<typeof PromoInput> = (args) => <PromoInput {...args} />;

const productCacheState = {
  ids: ['PSPCCCCBC', 'PSPPSSGB', 'PSPRFSAW', 'BUSINESS_CARDS'],
  entities: {
    PSPCCCCBC: {
      PriceSchedule: {
        MinQuantity: 1,
        MaxQuantity: 10,
        RestrictedQuantity: false,
        PriceBreaks: [{ Quantity: 1, Price: 20 }],
      },
    },
    PSPPSSGB: {
      PriceSchedule: {
        MinQuantity: 1,
        MaxQuantity: 10,
        RestrictedQuantity: false,
        PriceBreaks: [{ Quantity: 1, Price: 20 }],
      },
    },
    PSPRFSAW: {
      PriceSchedule: {
        MinQuantity: 1,
        MaxQuantity: 10,
        RestrictedQuantity: false,
        PriceBreaks: [{ Quantity: 1, Price: 20 }],
      },
    },
    BUSINESS_CARDS: {
      PriceSchedule: {
        MinQuantity: 1,
        MaxQuantity: 10,
        RestrictedQuantity: true,
        PriceBreaks: [
          { Quantity: 100, Price: 5.99 },
          { Quantity: 250, Price: 9.99 },
          { Quantity: 500, Price: 14.99 },
          { Quantity: 1000, Price: 19.99 },
        ],
      },
    },
  },
};

const mockStateWithoutApplied = {
  initialized: true,
  promotions: [] as DOrderPromotion[],
};

export const WithoutAppliedPromotions = Template.bind({});
WithoutAppliedPromotions.args = {};

WithoutAppliedPromotions.decorators = [
  (Story) => (
    <MockStore
      sliceOrSlices={[
        { name: 'ocCurrentCart', state: mockStateWithoutApplied },
        { name: 'ocProductCache', state: productCacheState },
      ]}
    >
      <Story />
    </MockStore>
  ),
];

/**ID
Code
Description
Amount */

const mockStateWithApplied = {
  initialized: true,
  promotions: [
    {
      ID: 'promo10off',
      Code: '10off',
      Description: '10% off your order',
      Amount: 5.47,
    },
    {
      ID: 'promofirsttimeuser',
      Code: '20firsttimeuser',
      Description: '$20 off your first order',
      Amount: 20,
    },
  ] as DOrderPromotion[],
};

export const WithAppliedPromotions = Template.bind({});
WithAppliedPromotions.args = {};

WithAppliedPromotions.decorators = [
  (Story) => (
    <MockStore
      sliceOrSlices={[
        { name: 'ocCurrentCart', state: mockStateWithApplied },
        { name: 'ocProductCache', state: productCacheState },
      ]}
    >
      <Story />
    </MockStore>
  ),
];
