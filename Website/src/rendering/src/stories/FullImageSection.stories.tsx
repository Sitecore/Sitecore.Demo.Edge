import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import FullImageSection from '../components/FullImageSection';

export default {
  title: 'Example/FullImageSection',
  component: FullImageSection,
} as ComponentMeta<typeof FullImageSection>;

const Template: ComponentStory<typeof FullImageSection> = (args) => <FullImageSection {...args} />;

export const Default = Template.bind({});
Default.args = {
  fields: {
    cssClass: {
      value: 'section__full-image--offer'
    },
    callToActionLink: {
      value: {
        href: '/shop/discount',
        text: 'Get Discount Code'
      }
    },
    content: {
      value: ''
    },
    position: {
      value: 'left'
    },
    subtitle: {
      value: 'PLAY! Summit Exclusive Offer'
    },
    title: {
      value: 'We’re partnering with over 2000 brands to offer PLAY! Summit attendees a 20% discount on all online and in-person purchases made during this year’s event.'
    }
  },
};
