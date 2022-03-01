import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import LeftColumn from '../../components/PreviewSearch/LeftColumn';

export default {
  title: 'Components/PreviewSearch/LeftColumn',
  component: LeftColumn,
} as ComponentMeta<typeof LeftColumn>;

const Template: ComponentStory<typeof LeftColumn> = (args) => <LeftColumn {...args} />;

export const Default = Template.bind({});
Default.args = {
  categories: [],
  trendingCategories: [
    {
      id: 'suggestion_idZXF1aXBtZW50',
      in_content: 'product',
      text: 'equipment',
      url: '/shop/category/activities/hiking/equipment',
    },
  ],
  suggestions: [{ freq: 3, id: 'suggestion_idcHVtcA==', in_content: 'product', text: 'pump' }],
  loading: false,
  loaded: false,
  onCategoryChanged: (pumps): void => {
    console.log(pumps);
  },
  onTrendingCategoryChanged: (pumps): void => {
    console.log(pumps);
  },
  onSuggestionChanged: (pumps): void => {
    console.log(pumps);
  },
  redirectUrl: '/hs/search?q=',
};
