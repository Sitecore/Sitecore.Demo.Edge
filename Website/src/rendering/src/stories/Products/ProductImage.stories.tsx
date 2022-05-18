import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import ProductImage from '../../components/Products/ProductImage';
import { cartState } from '../Checkout/CheckoutCommon';

export default {
  title: 'Components/Products/ProductImage',
  component: ProductImage,
} as ComponentMeta<typeof ProductImage>;

const Template: ComponentStory<typeof ProductImage> = (args) => (
  <div className="product-details">
    <div className="product-details-hero">
      <ProductImage {...args} />
    </div>
  </div>
);

const image1 = cartState.lineItems[0].Product.xp.Images[0].Url;
const image2 = cartState.lineItems[1].Product.xp.Images[0].Url;
const image3 = cartState.lineItems[2].Product.xp.Images[0].Url;

export const Zero = Template.bind({});
Zero.args = {
  images: [],
};

export const One = Template.bind({});
One.args = {
  images: [
    {
      Url: image1,
    },
  ],
};

export const Two = Template.bind({});
Two.args = {
  images: [
    {
      Url: image1,
    },
    {
      Url: image2,
    },
  ],
};

export const Three = Template.bind({});
Three.args = {
  images: [
    {
      Url: image1,
    },
    {
      Url: image2,
    },
    {
      Url: image3,
    },
  ],
};

export const Duplicates = Template.bind({});
Duplicates.args = {
  images: [
    {
      Url: image1,
    },
    {
      Url: image1,
    },
    {
      Url: image1,
    },
  ],
};
