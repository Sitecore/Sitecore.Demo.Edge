import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import SessionsGrid, { Session, Speaker } from '../../components/SessionsGrid';

export default {
  title: 'Components/Sessions/SessionsGrid',
  component: SessionsGrid,
} as ComponentMeta<typeof SessionsGrid>;

const Template: ComponentStory<typeof SessionsGrid> = (args) => <SessionsGrid {...args} />;

const speaker = {
  fields: {
    Name: {
      value: 'Joe Rogan',
    },
    Role: {
      value: 'Speaker',
    },
  },
} as Speaker;

const session1 = {
  fields: {
    Name: {
      value: 'Fitbit',
    },
    Date: {
      value: '2021-07-29T06:00:00Z',
    },
    Image: {
      value: {
        src: '/assets/img/tickets/Banner2.jpg',
      },
    },
    Speakers: [speaker],
  },
} as Session;

const session2 = {
  fields: {
    Name: {
      value: 'Fitbit',
    },
    Date: {
      value: '2021-07-29T06:00:00Z',
    },
    Image: {
      value: {
        src: '/assets/img/tickets/Banner2.jpg',
      },
    },
    Speakers: [speaker],
  },
} as Session;

const session3 = {
  fields: {
    Name: {
      value: 'Fitbit',
    },
    Date: {
      value: '2021-07-29T06:00:00Z',
    },
    Image: {
      value: {
        src: '/assets/img/tickets/Banner2.jpg',
      },
    },
    Speakers: [speaker],
  },
} as Session;

const session4 = {
  fields: {
    Name: {
      value: 'Fitbit',
    },
    Date: {
      value: '2021-07-29T06:00:00Z',
    },
    Image: {
      value: {
        src: '/assets/img/tickets/Banner2.jpg',
      },
    },
    Speakers: [speaker],
  },
} as Session;

export const Default = Template.bind({});
Default.args = {
  fields: {
    items: [session1, session2, session3, session4],
  },
};
