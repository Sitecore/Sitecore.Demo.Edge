import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import HeroImage, { HeroImageProps } from '../../components/PageContent/HeroImage';

export default {
  title: 'Components/PageContent/HeroImage',
  component: HeroImage,
} as ComponentMeta<typeof HeroImage>;

const Template: ComponentStory<typeof HeroImage> = (args: HeroImageProps) => (
  <HeroImage {...args} />
);

export const WithImage = Template.bind({});
WithImage.args = {
  fields: {
    hero: {
      value: {
        src: '/assets/img/tickets/come-play.jpg',
      },
    },
  },
  rendering: {
    componentName: 'Rendering',
    dataSource: '/sitecore',
  },
};

export const WithoutImage = Template.bind({});
WithoutImage.args = {
  fields: {
    hero: {
      value: {
        src: '',
      },
    },
  },
  rendering: {
    componentName: 'Rendering',
    dataSource: '/sitecore',
  },
};
