import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import FullImageSection from '../../components/PageContent/FullImageSection';

export default {
  title: 'Components/PageContent/FullImageSection',
  component: FullImageSection,
} as ComponentMeta<typeof FullImageSection>;

const Template: ComponentStory<typeof FullImageSection> = (args) => <FullImageSection {...args} />;

export const Left = Template.bind({});
Left.args = {
  fields: {
    cssClass: {
      value: 'full-image-section-offer',
    },
    callToActionLink: {
      value: {
        href: '/shop/product',
        text: 'Get Discount Code',
      },
    },
    content: {
      value:
        'We’re partnering with over 2000 brands to offer PLAY! Summit attendees a <b>20% discount</b> on all online and in-person purchases made during this year’s event.',
    },
    position: {
      value: 'left',
    },
    subtitle: {
      value: 'Do not miss',
    },
    title: {
      value: 'PLAY! Summit Exclusive Offer',
    },
  },
  rendering: {
    componentName: 'Rendering',
    dataSource: '/sitecore',
  },
};

export const Right = Template.bind({});
Right.args = {
  fields: {
    cssClass: {
      value: 'full-image-section-speaker',
    },
    callToActionLink: {
      value: {
        href: '/tickets',
        text: 'Book your seat',
      },
    },
    content: {
      value:
        'Join <b>Tour de France</b> champion Chris Williams for an exclusive Q & A in which he’ll discuss his professional journey and highlights from his career.',
    },
    position: {
      value: 'right',
    },
    subtitle: {
      value: 'Guest speaker',
    },
    title: {
      value: 'Chris Williams',
    },
  },
  rendering: {
    componentName: 'Rendering',
    dataSource: '/sitecore',
  },
};
