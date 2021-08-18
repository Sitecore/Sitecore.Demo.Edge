import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import HeroImage, { HeroImageProps } from '../components/HeroImage';

export default {
  title: 'Components/HeroImage',
  component: HeroImage,
} as ComponentMeta<typeof HeroImage>;

const Template: ComponentStory<typeof HeroImage> = (args: HeroImageProps) => (
  <HeroImage {...args} />
);

export const Default = Template.bind({});
Default.args = {
  fields: {
    hero: {
      value: {
        src: '/assets/img/tickets/come-play.jpg',
      },
    },
  },
};
