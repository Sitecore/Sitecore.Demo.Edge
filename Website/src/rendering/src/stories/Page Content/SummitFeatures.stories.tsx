import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import SummitFeatures from '../../components/Page Content/SummitFeatures';
import SummitFeature, { SummitFeatureProps } from '../../components/Page Content/SummitFeature';
import { ComponentWithChildrenProps } from 'lib/component-props';

export default {
  title: 'Components/Page Content/SummitFeatures',
  component: SummitFeatures,
} as ComponentMeta<typeof SummitFeatures>;

const featureArgs = {
  fields: {
    Title: {
      value: 'Sports and Recreation Expo',
    },
    Description: {
      value:
        'This year’s theme is ‘Raise Your Game’ –join us over two days for a global gathering of brands, sports professionals,and innovators.',
    },
    Link: {
      value: {
        href: '/tickets',
        text: 'Book Tickets',
      },
    },
    Logo: {
      value: {
        src: '/assets/img/categories/hiking.jpg',
      },
    },
  },
} as SummitFeatureProps;

const Template: ComponentStory<typeof SummitFeatures> = (args: ComponentWithChildrenProps) => (
  <SummitFeatures {...args}>
    <SummitFeature {...featureArgs} />
  </SummitFeatures>
);

export const Default = Template.bind({});
Default.args = {
  params: {},
};
