import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import SessionsGrid from '../../components/SessionsGrid';
import { CustomSpeaker } from 'src/types/speaker';
import { CustomSession } from 'src/types/session';

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
} as CustomSpeaker;

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
} as CustomSession;

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
} as CustomSession;

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
} as CustomSession;

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
} as CustomSession;

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
