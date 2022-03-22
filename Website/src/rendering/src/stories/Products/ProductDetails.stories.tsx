import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import ProductDetails from '../../components/Products/ProductDetails';
import { MockSlice, MockStore } from '../mock-store';
import { authSlice, cartSlice } from '../Checkout/CheckoutCommon';
import { sku, product, specs, variants, moreProducts, similarProducts } from './ProductsCommon';
import ProductDetailsContent from '../../components/Products/ProductDetailsContent';

export default {
  title: 'Components/Products/ProductDetails',
  component: ProductDetails,
} as ComponentMeta<typeof ProductDetailsContent>;

const productSlices: MockSlice[] = [cartSlice, authSlice];

const Template: ComponentStory<typeof ProductDetailsContent> = (args) => (
  <ProductDetailsContent {...args} />
);

export const Default = Template.bind({});
Default.args = {
  sku: sku,
  product: product,
  specs: specs,
  variants: variants,
  moreProducts: moreProducts,
  similarProducts: similarProducts,
};
Default.decorators = [
  (Story) => (
    <MockStore sliceOrSlices={productSlices}>
      <Story />
    </MockStore>
  ),
];

export const RedSmall = Template.bind({});
RedSmall.args = {
  sku: sku,
  product: product,
  specs: specs,
  variants: variants,
  variantID: 'PSPRFSAW-RS',
  moreProducts: moreProducts,
  similarProducts: similarProducts,
};
RedSmall.decorators = [
  (Story) => (
    <MockStore sliceOrSlices={productSlices}>
      <Story />
    </MockStore>
  ),
];

export const GreenMedium = Template.bind({});
GreenMedium.args = {
  sku: sku,
  product: product,
  specs: specs,
  variants: variants,
  variantID: 'PSPRFSAW-GM',
  moreProducts: moreProducts,
  similarProducts: similarProducts,
};
GreenMedium.decorators = [
  (Story) => (
    <MockStore sliceOrSlices={productSlices}>
      <Story />
    </MockStore>
  ),
];

export const BlueLarge = Template.bind({});
BlueLarge.args = {
  sku: sku,
  product: product,
  specs: specs,
  variants: variants,
  variantID: 'PSPRFSAW-BL',
  moreProducts: moreProducts,
  similarProducts: similarProducts,
};
BlueLarge.decorators = [
  (Story) => (
    <MockStore sliceOrSlices={productSlices}>
      <Story />
    </MockStore>
  ),
];
