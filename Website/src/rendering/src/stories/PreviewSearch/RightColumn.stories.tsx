import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import RightColumn, { RightColumnProps } from '../../components/PreviewSearch/RightColumn';
import { DiscoverServiceFactory } from '../../services/DiscoverServiceFactory';
import { Product } from '../../models/discover/Product';

export default {
  title: 'Components/PreviewSearch/RightColumn',
  component: RightColumn,
} as ComponentMeta<typeof RightColumn>;

const Template: ComponentStory<typeof RightColumn> = (args) => <RightColumn {...args} />;

const rightColumnProps = {
  products: [] as Product[],
  loading: false,
  loaded: false,
  selectedKeyword: '',
};

export const Default = Template.bind({});
Default.args = DiscoverServiceFactory(
  'storybookRightColumn',
  rightColumnProps
) as Partial<RightColumnProps>;
