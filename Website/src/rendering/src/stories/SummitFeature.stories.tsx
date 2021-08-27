import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import SummitFeature, { SummitFeatureProps } from '../components/SummitFeature';

export default {
  title: 'Components/SummitFeature',
  component: SummitFeature,
} as ComponentMeta<typeof SummitFeature>;

const Template: ComponentStory<typeof SummitFeature> = (args: SummitFeatureProps) => (
  <SummitFeature {...args} />
);

export const Default = Template.bind({});
Default.args = {
  fields: {
    Title: {
      value: 'Sports and Leisure Expo',
    },
    Description: {
      value: 'This year’s theme is ‘Raise Your Game’ –join us over two days for a global gathering of brands, sports professionals,and innovators.',
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
