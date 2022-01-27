import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import SessionsGrid from '../../components/Sessions/SessionsGrid';
import { SESSIONS } from '../mock-sessions';

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
