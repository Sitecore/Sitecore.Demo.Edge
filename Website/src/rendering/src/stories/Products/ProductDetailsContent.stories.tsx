import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { MockSlice, MockStore } from '../mock-store';
import { authSlice, cartSlice } from '../Checkout/CheckoutCommon';
import { sku, product, specs, variants } from './ProductsCommon';
import ProductDetailsContent from '../../components/Products/ProductDetailsContent';

export default {
  title: 'Components/Products/ProductDetailsContent',
  component: ProductDetailsContent,
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
};
BlueLarge.decorators = [
  (Story) => (
    <MockStore sliceOrSlices={productSlices}>
      <Story />
    </MockStore>
  ),
];
