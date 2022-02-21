import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import ThreeColumnCta from '../../components/PageContent/ThreeColumnCta';

export default {
  title: 'Components/PageContent/ThreeColumnCta',
  component: ThreeColumnCta,
} as ComponentMeta<typeof ThreeColumnCta>;

const Template: ComponentStory<typeof ThreeColumnCta> = (args) => <ThreeColumnCta {...args} />;

export const Default = Template.bind({});
Default.args = {
  fields: {
    leftHeading: {
      value: '200,000+',
    },
    leftDescription: {
      value: 'Visitors',
    },
    middleHeading: {
      value: '90+',
    },
    middleDescription: {
      value: 'Globally recognised speakers',
    },
    rightHeading: {
      value: '300+',
    },
    rightDescription: {
      value: 'Exhibitors',
    },
  },
  rendering: {
    componentName: 'Rendering',
    dataSource: '/sitecore',
  },
};
