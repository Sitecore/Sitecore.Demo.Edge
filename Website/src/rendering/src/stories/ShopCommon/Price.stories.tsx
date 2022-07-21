import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import Price from '../../components/ShopCommon/Price';

export default {
  title: 'Components/ShopCommon/Price',
  component: Price,
} as ComponentMeta<typeof Price>;

const Template: ComponentStory<typeof Price> = (args) => <Price {...args} />;

const baseArgs = {
  price: 16.99,
  finalPrice: 16.99,
};

export const Default = Template.bind({});
Default.args = {
  ...baseArgs,
};

export const Loading = Template.bind({});
Loading.args = {
  ...baseArgs,
  loading: true,
};

export const WithDiscount = Template.bind({});
WithDiscount.args = {
  ...baseArgs,
  finalPrice: 12.99,
};

export const SizeLarge = Template.bind({});
SizeLarge.args = {
  ...baseArgs,
  finalPrice: 12.99,
  sizeL: true,
};

export const AlternativeTheme = Template.bind({});
AlternativeTheme.args = {
  ...baseArgs,
  finalPrice: 12.99,
  altTheme: true,
};

export const RangePrice = Template.bind({});
RangePrice.args = {
  ...baseArgs,
  max: 16.99,
  min: 12.99,
};
