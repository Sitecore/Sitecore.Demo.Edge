import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import CtaSection from '../../components/PageContent/CtaSection';

export default {
  title: 'Components/PageContent/CtaSection',
  component: CtaSection,
} as ComponentMeta<typeof CtaSection>;

const Template: ComponentStory<typeof CtaSection> = (args) => <CtaSection {...args} />;

export const Default = Template.bind({});
Default.args = {
  fields: {
    CallToAction: {
      value: {
        href: '/tickets',
        text: 'Book Tickets',
      },
    },
  },
  // Required for withDatasourceCheck
  rendering: {
    componentName: 'Rendering',
    dataSource: '/sitecore',
  },
};
