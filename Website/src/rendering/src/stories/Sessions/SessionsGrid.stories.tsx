import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import SessionsGrid, { Session, Speaker } from '../../components/SessionsGrid';

export default {
  title: 'Components/Sessions/SessionsGrid',
  component: SessionsGrid,
} as ComponentMeta<typeof SessionsGrid>;

const Template: ComponentStory<typeof SessionsGrid> = (args) => <SessionsGrid {...args} />;

const speaker = {
  name: {
    value: 'Joe Rogan',
  },
  role: {
    value: 'Speaker',
  },
} as Speaker;

const timeslots = [
  {
    name: {
      value: '8 am',
    },
  },
  {
    name: {
      value: '9 am',
    },
  },
];

const days = [
  {
    name: {
      value: 'Day 1',
    },
  },
];

const session1 = {
  itemName: 'Fitbit',
  name: {
    value: 'Fitbit',
  },
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
  day: {
    targetItems: days,
  },
  timeslots: {
    targetItems: timeslots,
  },
} as Session;

const session2 = {
  itemName: 'Eat smart',
  name: {
    value: 'Eat smart',
  },
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
  day: {
    targetItems: days,
  },
  timeslots: {
    targetItems: timeslots,
  },
} as Session;

const session3 = {
  itemName: 'Premium Session',
  name: {
    value: 'Premium Session',
  },
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
  day: {
    targetItems: days,
  },
  timeslots: {
    targetItems: timeslots,
  },
} as Session;

const session4 = {
  itemName: 'Workout',
  name: {
    value: 'Workout',
  },
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
