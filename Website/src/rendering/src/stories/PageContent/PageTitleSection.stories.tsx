import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import PageTitleSection from '../../components/PageContent/PageTitleSection';

export default {
  title: 'Components/PageContent/PageTitleSection',
  component: PageTitleSection,
} as ComponentMeta<typeof PageTitleSection>;

const Template: ComponentStory<typeof PageTitleSection> = (args) => <PageTitleSection {...args} />;

export const Default = Template.bind({});
Default.args = {
  fields: {
    pageTitle: {
      value: 'Example Page Title',
    },
  },
};
