import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import FullImageSection from '../../components/Page Content/FullImageSection';

export default {
  title: 'Components/Page Content/FullImageSection',
  component: FullImageSection,
} as ComponentMeta<typeof FullImageSection>;

const Template: ComponentStory<typeof FullImageSection> = (args) => <FullImageSection {...args} />;

export const Left = Template.bind({});
Left.args = {
  fields: {
    cssClass: {
      value: 'section__full-image',
    },
    callToActionLink: {
      value: {
        href: '/shop/product',
        text: 'Get Discount Code',
      },
    },
    content: {
      value:
        'We`re partnering with over 2000 brands to offer PLAY! Summit attendees a <b>20% discount</b> on all online and in-person purchases made during this year`s event.',
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
    backgroundImage: {
      value: {
        src: 'https://playsummit.sitecoresandbox.cloud/api/public/content/77a6a0c2acb5478fa543665a134fa053?v=495de02a',
      },
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
      value: 'section__full-image',
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
    backgroundImage: {
      value: {
        src: 'https://playsummit.sitecoresandbox.cloud/api/public/content/0447b929afd64c82bbc33471ec94d8d9?v=34736a27',
      },
    },
  },
  rendering: {
    componentName: 'Rendering',
    dataSource: '/sitecore',
  },
};

export const CTA = Template.bind({});
CTA.args = {
  fields: {
    cssClass: {
      value: 'section__full-image--cta-only',
    },
    callToActionLink: {
      value: {
        href: '/maps',
        text: 'Venue Map',
      },
    },
    content: {
      value: '',
    },
    position: {
      value: '',
    },
    subtitle: {
      value: '',
    },
    title: {
      value: '',
    },
    backgroundImage: {
      value: {
        src: 'https://playsummit.sitecoresandbox.cloud/api/public/content/2c5d86057936470599815a5251d68c02?v=c9709dc1',
      },
    },
  },
  rendering: {
    componentName: 'Rendering',
    dataSource: '/sitecore',
  },
};
