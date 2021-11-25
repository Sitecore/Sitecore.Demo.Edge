import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import SessionsGrid from '../../components/SessionsGrid';
import { SESSIONS } from '../../models/mock-sessions';

export default {
  title: 'Components/Sessions/SessionsGrid',
  component: SessionsGrid,
} as ComponentMeta<typeof SessionsGrid>;

const Template: ComponentStory<typeof SessionsGrid> = (args) => <SessionsGrid {...args} />;

export const Default = Template.bind({});
Default.args = {
  fields: {
    data: {
      item: {
        children: {
          results: SESSIONS,
        },
      },
    },
  },
};
