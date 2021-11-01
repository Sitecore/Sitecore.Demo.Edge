import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import Promo, { PromoProps } from '../components/Promo';

export default {
  title: 'Components/Promo',
  component: Promo,
} as ComponentMeta<typeof Promo>;

const Template: ComponentStory<typeof Promo> = (args: PromoProps) => <Promo {...args} />;

export const Default = Template.bind({});
Default.args = {
  fields: {
    cssClass: {
      value: '',
    },
    position: {
      value: 'left',
    },
    title: {
      value: 'Sports and Recreation Expo',
    },
    subtitle: {
      value: 'RAISE YOUR GAME',
    },
    content: {
      value: 'Join us in person or online for the fifth annual PLAY! Summit.',
    },
    callToActionLink: {
      value: {
        href: '/tickets',
        text: 'Book Tickets',
      },
    },
  },
} as PromoProps;
