import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import LineItemCard from '../../components/Checkout/LineItemCard';
import { MockStore } from '../mock-store';
import { DLineItem } from 'src/models/ordercloud/DLineItem';

export default {
  title: 'Components/Checkout/LineItemCard',
  component: LineItemCard,
} as ComponentMeta<typeof LineItemCard>;

const Template: ComponentStory<typeof LineItemCard> = (args) => <LineItemCard {...args} />;

const orderState = {
  initialized: true,
};
const authState = {
  isAuthenticated: true,
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
          { Quantity: 1000, price: 19.99 },
        ],
      },
    },
  },
};
const slices = [
  { name: 'ocCurrentOrder', state: orderState },
  { name: 'ocAuth', state: authState },
  { name: 'ocProductCache', state: productCacheState },
];

export const Default = Template.bind({});
Default.args = {
  editable: true,
  lineItem: {
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
    Specs: [],
  } as DLineItem,
};
Default.decorators = [
  (Story) => (
    <MockStore sliceOrSlices={slices}>
      <Story />
    </MockStore>
  ),
];

export const NonEditable = Template.bind({});
NonEditable.args = {
  editable: false,
  lineItem: {
    ID: 'lineitem1',
    Quantity: 3,
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
    Specs: [],
  } as DLineItem,
};
NonEditable.decorators = [
  (Story) => (
    <MockStore sliceOrSlices={slices}>
      <Story />
    </MockStore>
  ),
];

export const WithSpecs = Template.bind({});
WithSpecs.args = {
  editable: true,
  lineItem: {
    ID: 'lineitem3',
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
  } as DLineItem,
};
WithSpecs.decorators = [
  (Story) => (
    <MockStore sliceOrSlices={slices}>
      <Story />
    </MockStore>
  ),
];

export const WithRestrictedQuantities = Template.bind({});
WithRestrictedQuantities.args = {
  editable: true,
  lineItem: {
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
  } as DLineItem,
};
WithRestrictedQuantities.decorators = [
  (Story) => (
    <MockStore sliceOrSlices={slices}>
      <Story />
    </MockStore>
  ),
];
