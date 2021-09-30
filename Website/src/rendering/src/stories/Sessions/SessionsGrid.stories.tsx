import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import SessionsGrid, { Session, Speaker } from '../../components/SessionsGrid';

export default {
  title: 'Components/Sessions/SessionsGrid',
  component: SessionsGrid,
} as ComponentMeta<typeof SessionsGrid>;

const Template: ComponentStory<typeof SessionsGrid> = (args) => <SessionsGrid {...args} />;

const speaker = {
  name: 'Joe Rogan',
  role: {
    value: 'Speaker',
  },
} as Speaker;

const rooms = [
  {
    name: 'Room 1',
  },
  {
    name: 'Room 2',
  },
];

const timeslots = [
  {
    name: '8 am',
  },
  {
    name: '9 am',
  },
];

const days = [
  {
    name: 'Day 1',
  },
];

const session1 = {
  name: 'Fitbit',
  premium: {
    value: false,
  },
  image: {
    jsonValue: {
      value: {
        src: '/assets/img/tickets/Banner2.jpg',
      },
    },
  },
  speakers: {
    targetItems: [speaker],
  },
  rooms: {
    targetItems: rooms,
  },
  day: {
    targetItems: days,
  },
  timeslots: {
    targetItems: timeslots,
  },
} as Session;

const session2 = {
  name: 'Eat smart',
  premium: {
    value: false,
  },
  image: {
    jsonValue: {
      value: {
        src: '/assets/img/tickets/Banner2.jpg',
      },
    },
  },
  speakers: {
    targetItems: [speaker],
  },
  rooms: {
    targetItems: rooms,
  },
  day: {
    targetItems: days,
  },
  timeslots: {
    targetItems: timeslots,
  },
} as Session;

const session3 = {
  name: 'Premium Session',
  premium: {
    value: true,
  },
  image: {
    jsonValue: {
      value: {
        src: '/assets/img/tickets/Banner2.jpg',
      },
    },
  },
  speakers: {
    targetItems: [speaker],
  },
  rooms: {
    targetItems: rooms,
  },
  day: {
    targetItems: days,
  },
  timeslots: {
    targetItems: timeslots,
  },
} as Session;

const session4 = {
  name: 'Workout',
  premium: {
    value: true,
  },
  image: {
    jsonValue: {
      value: {
        src: '/assets/img/tickets/Banner2.jpg',
      },
    },
  },
  speakers: {
    targetItems: [speaker],
  },
  rooms: {
    targetItems: rooms,
  },
  day: {
    targetItems: days,
  },
  timeslots: {
    targetItems: timeslots,
  },
} as Session;

export const Default = Template.bind({});
Default.args = {
  fields: {
    data: {
      item: {
        children: {
          results: [session1, session2, session3, session4],
        },
      },
    },
  },
};
