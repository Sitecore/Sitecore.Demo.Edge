import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import LineItemList from '../../components/Checkout/LineItemList';
import { MockSlice, MockStore } from '../mock-store';
import { Spec } from 'ordercloud-javascript-sdk';

export default {
  title: 'Components/Checkout/LineItemList',
  component: LineItemList,
} as ComponentMeta<typeof LineItemList>;

const Template: ComponentStory<typeof LineItemList> = (args) => <LineItemList {...args} />;

const cartState = {
  lineItems: [
    {
      ID: 'lineitem1',
      Quantity: 1,
      ProductID: 'PSPCCCCBC',
      Product: {
        Name: 'CenterCycle Carbon Cycling Bottle Cage',
        xp: {
          Images: [
            {
              // TODO: replace with our own hosted images once fixed
              Url: 'https://m.media-amazon.com/images/I/61LPos5CIaL._AC_SL1500_.jpg',
            },
          ],
        },
      },
      Specs: [] as Spec[],
    },
    {
      ID: 'lineitem2',
      Quantity: 2,
      ProductID: 'PSPPSSGB',
      Product: {
        Name: 'Pro Staff Sunday Golf Bag',
        xp: {
          Images: [
            {
              // TODO: replace with our own hosted images once fixed
              Url: 'https://cdn.shopify.com/s/files/1/0150/9084/products/2020_sl1_white_image1_76540d19-28dd-4284-a57f-518cd2472e7f_x1800.jpg?v=1640023075',
            },
          ],
        },
      },
      Specs: [] as Spec[],
    },
    {
      ID: 'lineitem3',
      Quantity: 3,
      ProductID: 'PSPRFSAW',
      Product: {
        Name: 'Robit Fitness Strengthening Ab Wheel',
        xp: {
          Images: [
            {
              // TODO: replace with our own hosted images once fixed
              Url: 'https://assets.roguefitness.com/f_auto,q_auto,c_limit,w_1960,b_rgb:f8f8f8/catalog/Conditioning/Speed%20and%20Agility/Core%20and%20Stability/AD0053/AD0053-H_p1yblu.png',
            },
          ],
        },
      },
      Variant: {
        xp: {
          Images: [
            {
              // TODO: replace with our own hosted images once fixed
              Url: 'https://headstartdemo.blob.core.windows.net/assets/GreenLarge.png',
            },
          ],
        },
      },
      Specs: [
        {
          Value: 'Green',
        },
        {
          Value: 'Large',
        },
      ],
    },
    {
      ID: 'lineitem4',
      Quantity: 100,
      ProductID: 'BUSINESS_CARDS',
      Product: {
        Name: 'Standard Business Cards that also have a super duper really long name',
        xp: {
          Images: [
            {
              // TODO: replace with our own hosted images once fixed
              Url: 'https://static.gotprint.com/tl/en_US/products/business-cards/info/img/desktop/standard.jpg',
            },
          ],
        },
      },
      Specs: [],
    },
  ],
};

const productCacheState = {
  ids: ['PSPCCCCBC', 'PSPPSSGB', 'PSPRFSAW', 'BUSINESS_CARDS'],
  entities: {
    PSPCCCCBC: {
      ID: 'PSPCCCCBC',
      PriceSchedule: {
        MinQuantity: 1,
        MaxQuantity: 10,
        RestrictedQuantity: false,
        PriceBreaks: [{ Quantity: 1, Price: 20 }],
      },
    },
    PSPPSSGB: {
      ID: 'PSPPSSGB',
      PriceSchedule: {
        MinQuantity: 1,
        MaxQuantity: 10,
        RestrictedQuantity: false,
        PriceBreaks: [{ Quantity: 1, Price: 20 }],
      },
    },
    PSPRFSAW: {
      ID: 'PSPRFSAW',
      PriceSchedule: {
        MinQuantity: 1,
        MaxQuantity: 10,
        RestrictedQuantity: false,
        PriceBreaks: [{ Quantity: 1, Price: 20 }],
      },
    },
    BUSINESS_CARDS: {
      ID: 'BUSINESS_CARDS',
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

const slices: MockSlice[] = [
  {
    name: 'ocCurrentCart',
    state: cartState,
  },
  {
    name: 'ocProductCache',
    state: productCacheState,
  },
  {
    name: 'ocAuth',
    state: {
      isAuthenticated: true,
    },
  },
];

export const Editable = Template.bind({});
Editable.args = {
  editable: true,
};
Editable.decorators = [
  (Story) => (
    <MockStore sliceOrSlices={slices}>
      <Story />
    </MockStore>
  ),
];

export const NonEditable = Template.bind({});
NonEditable.args = {
  editable: false,
};
NonEditable.decorators = [
  (Story) => (
    <MockStore sliceOrSlices={slices}>
      <Story />
    </MockStore>
  ),
];
