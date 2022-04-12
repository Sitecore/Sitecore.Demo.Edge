import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import FacetList, { FacetListProps } from '../../components/FullPageSearch/FacetList';
import { DiscoverServiceFactory } from '../../services/DiscoverServiceFactory';

export default {
  title: 'Components/FullPageSearch/FacetList',
  component: FacetList,
} as ComponentMeta<typeof FacetList>;

const Template: ComponentStory<typeof FacetList> = (args) => <FacetList {...args} />;

const facetListProps = {
  facets: [
    {
      display_name: '',
      facetType: '',
      number_of_products: 0,
      values: [
        {
          count: 0,
          id: '',
          in_content: '',
          max: 0,
          min: 0,
          text: '',
        },
      ],
    },
  ],
  onClear: (): void => {
    return null;
  },
  onFacetClick: (): void => {
    return null;
  },
};

export const Default = Template.bind({});
Default.args = DiscoverServiceFactory(
  'storybookFacetList',
  facetListProps
) as Partial<FacetListProps>;
