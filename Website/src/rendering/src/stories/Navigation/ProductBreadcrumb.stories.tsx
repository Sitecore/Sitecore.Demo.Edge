import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import ProductBreadcrumb from '../../components/Navigation/ProductBreadcrumb';
import { DiscoverService } from '../../services/DiscoverService';

export default {
  title: 'Components/Navigation/ProductBreadcrumb',
  component: ProductBreadcrumb,
} as ComponentMeta<typeof ProductBreadcrumb>;

const Template: ComponentStory<typeof ProductBreadcrumb> = (args) => (
  <div>
    <ProductBreadcrumb {...args} />
  </div>
);

DiscoverService({
  isStorybook: true,
});

export const RootCategoryProduct = Template.bind({});
RootCategoryProduct.args = {
  productName: 'Activities best seller',
  productUrl: '',
  ccid: 'PSA0',
};

export const FirstLevelCategoryProduct = Template.bind({});
FirstLevelCategoryProduct.args = {
  productName: 'Running best seller',
  productUrl: '',
  ccid: 'PSAR',
};

export const SecondLevelCategoryProduct = Template.bind({});
SecondLevelCategoryProduct.args = {
  productName: 'Running Accessories best seller',
  productUrl: '',
  ccid: 'PSARA',
};
