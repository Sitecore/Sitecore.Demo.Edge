import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import FacetList from '../../components/FullPageSearch/FacetList';

export default {
  title: 'Components/FullPageSearch/FacetList',
  component: FacetList,
} as ComponentMeta<typeof FacetList>;

const Template: ComponentStory<typeof FacetList> = (args) => <FacetList {...args} />;

const exampleFacet = {
  display_name: 'Price',
  facetType: 'price',
  number_of_products: 8,
  value: [
    {
      count: 2,
      id: 'facet_ideyJtYXgiOjE1LCJtaW4iOjV9',
      in_content: 'product',
      max: 15,
      min: 5,
      text: '5 - 15',
    },
  ],
};

export const Default = Template.bind({});
Default.args = {
  facets: [exampleFacet],
  onClear: () => {
    return null;
  },
  onFacetClick: () => {
    return null;
  },
};
