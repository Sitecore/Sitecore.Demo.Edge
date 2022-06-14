import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import ImageSection from '../../components/PageContent/ImageSection';

export default {
  title: 'Components/PageContent/ImageSection',
  component: ImageSection,
} as ComponentMeta<typeof ImageSection>;

const Template: ComponentStory<typeof ImageSection> = (args) => <ImageSection {...args} />;

export const Default = Template.bind({});
Default.args = {
  fields: {
    Image: {
      value: {
        src: '/assets/img/tickets/come-play.jpg',
      },
    },
  },
  // Required for withDatasourceCheck
  rendering: {
    componentName: 'ImageSection',
    dataSource: '/sitecore',
  },
};
