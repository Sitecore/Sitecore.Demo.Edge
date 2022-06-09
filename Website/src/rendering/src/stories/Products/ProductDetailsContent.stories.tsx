import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { MockSlice, MockStore } from '../mock-store';
import { loggedInAuthSlice, cartSlice } from '../Checkout/CheckoutCommon';
import { product, specs, variants } from './ProductsCommon';
import ProductDetailsContent from '../../components/Products/ProductDetailsContent';

export default {
  title: 'Components/Products/ProductDetailsContent',
  component: ProductDetailsContent,
} as ComponentMeta<typeof ProductDetailsContent>;

const productSlices: MockSlice[] = [cartSlice, loggedInAuthSlice];

const Template: ComponentStory<typeof ProductDetailsContent> = (args) => (
  <MockStore sliceOrSlices={productSlices}>
    <ProductDetailsContent {...args} />
  </MockStore>
);

export const Default = Template.bind({});
Default.args = {
  product: product,
  specs: specs,
  variants: variants,
};

export const OnSale = Template.bind({});
OnSale.args = {
  product: {
    ...product,
    PriceSchedule: {
      ...product.PriceSchedule,
      PriceBreaks: [
        {
          Quantity: 1,
          Price: 15.99,
          SalePrice: 10.99,
        },
      ],
    },
  },
  specs: specs,
  variants: variants,
};

export const RedSmall = Template.bind({});
RedSmall.args = {
  product: product,
  specs: specs,
  variants: variants,
  variantID: 'PSPRFSAW-RS',
};

export const GreenMedium = Template.bind({});
GreenMedium.args = {
  product: product,
  specs: specs,
  variants: variants,
  variantID: 'PSPRFSAW-GM',
};

export const BlueLarge = Template.bind({});
BlueLarge.args = {
  product: product,
  specs: specs,
  variants: variants,
  variantID: 'PSPRFSAW-BL',
};

export const NoVariants = Template.bind({});
NoVariants.args = {
  product: product,
  specs: [specs[1]],
  variants: [],
};

export const NoImages = Template.bind({});
NoImages.args = {
  product: {
    ...product,
    xp: {
      ...product.xp,
      Images: [],
    },
  },
  specs: specs,
  variants: [],
};
