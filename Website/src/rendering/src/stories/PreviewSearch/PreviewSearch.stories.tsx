import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import PreviewSearch from '../../components/PreviewSearch/PreviewSearch';
import { mockDiscoverData } from '../mock-discover-data';

export default {
  title: 'Components/PreviewSearch/PreviewSearch',
  component: PreviewSearch,
} as ComponentMeta<typeof PreviewSearch>;

const Template: ComponentStory<typeof PreviewSearch> = (args) => <PreviewSearch {...args} />;

export const Default = Template.bind({});
Default.args = mockDiscoverData.previewSearchProps;
Default.decorators = [
  (Story) => (
    <div className="shop-navigation">
      <div className="shop-navigation-content">
        <div className="shop-search-input-container">
          <Story />
        </div>
      </div>
    </div>
  ),
];
