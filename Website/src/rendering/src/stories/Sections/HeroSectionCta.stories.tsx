import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import HeroSectionCta, { HeroCtaProps } from '../../components/HeroSectionCta';

export default {
  title: 'Components/Sections/HeroSectionCta',
  component: HeroSectionCta,
} as ComponentMeta<typeof HeroSectionCta>;

const Template: ComponentStory<typeof HeroSectionCta> = (args: HeroCtaProps) => (
  <HeroSectionCta {...args} />
);

export const Default = Template.bind({});
Default.args = {
  fields: {
    Link: {
      value: {
        href: '/tickets',
        text: 'Book Tickets',
      },
    },
  },
} as HeroCtaProps;
