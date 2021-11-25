import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import HeroSectionCta, { HeroSectionCtaProps } from '../../components/HeroSectionCta';

export default {
  title: 'Components/Sections/HeroSectionCta',
  component: HeroSectionCta,
} as ComponentMeta<typeof HeroSectionCta>;

const Template: ComponentStory<typeof HeroSectionCta> = (args: HeroSectionCtaProps) => (
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
} as HeroSectionCtaProps;
