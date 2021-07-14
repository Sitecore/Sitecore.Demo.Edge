import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import TextCta  from '../components/TextCta';

export default {
  title: 'Example/TextCta',
  component: TextCta,
} as ComponentMeta<typeof TextCta>;

const Template: ComponentStory<typeof TextCta> = (args) => <TextCta {...args} />;

export const Default = Template.bind({});
Default.args = {
  fields: {
    title: {
      value: 'PLAY! Summit Exclusive Offer'
    },
    subTitle: {
      value: 'We’re partnering with over 2000 brands to offer PLAY! Summit attendees a 20% discount.'
    }
  },
};
