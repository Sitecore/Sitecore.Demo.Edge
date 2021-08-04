import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import TestimonyList, { Testimony } from '../components/TestimonyList';

export default {
  title: 'Components/TestimonyList',
  component: TestimonyList,
} as ComponentMeta<typeof TestimonyList>;

const Template: ComponentStory<typeof TestimonyList> = (args) => <TestimonyList {...args} />;

const testimony1 = {
  fields: {
    Provider: {
      value: 'Fitbit',
    },
    Testimony: {
      value:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur sodales mi in magna accumsan, vitae finibus libero fringilla. Duis posuere a lorem quis pretium. Sed varius dolor non mi ornare pulvinar.',
    },
    Logo: {
      value: {
        src: '/assets/img/sponsors/sponsors-fitbit.svg',
      },
    },
  },
} as Testimony;

const testimony2 = {
  fields: {
    Provider: {
      value: 'Striva',
    },
    Testimony: {
      value:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur sodales mi in magna accumsan, vitae finibus libero fringilla. Duis posuere a lorem quis pretium. Sed varius dolor non mi ornare pulvinar.',
    },
    Logo: {
      value: {
        src: '/assets/img/sponsors/sponsors-fitbit.svg',
      },
    },
  },
} as Testimony;

const testimony3 = {
  fields: {
    Provider: {
      value: 'Alba',
    },
    Testimony: {
      value:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur sodales mi in magna accumsan, vitae finibus libero fringilla. Duis posuere a lorem quis pretium. Sed varius dolor non mi ornare pulvinar.',
    },
    Logo: {
      value: {
        src: '/assets/img/sponsors/sponsors-fitbit.svg',
      },
    },
  },
} as Testimony;

export const Default = Template.bind({});
Default.args = {
  fields: {
    Title: {
      value: 'TESTIMONIES',
    },
    Subtitle: {
      value:
        'Curabitur sodales mi in magna accumsan, vitae finibus libero fringilla. Duis posuere a lorem quis pretium.',
    },
    Companies: [testimony1, testimony2, testimony3],
  },
};
