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

const rooms = [
  {
    fields: {
      Name: {
        value: 'Room 1',
      },
    },
  },
  {
    fields: {
      Name: {
        value: 'Room 2',
      },
    },
  },
];

const timeslots = [
  {
    fields: {
      Name: {
        value: '8 am',
      },
    },
  },
  {
    fields: {
      Name: {
        value: '9 am',
      },
    },
  },
];

const days = [
  {
    fields: {
      Name: {
        value: 'Day 1',
      },
    },
  },
];

const session1 = {
  fields: {
    Name: {
      value: 'Fitbit',
    },
    Image: {
      value: {
        src: '/assets/img/tickets/Banner2.jpg',
      },
    },
    Speakers: [speaker],
    Day: days,
    Rooms: rooms,
    Timeslots: timeslots,
    Premium: {
      value: true,
    },
  },
} as Session;

const session2 = {
  fields: {
    Name: {
      value: 'Fitbit',
    },
    Image: {
      value: {
        src: '/assets/img/tickets/Banner2.jpg',
      },
    },
    Speakers: [speaker],
    Day: days,
    Rooms: rooms,
    Timeslots: timeslots,
    Premium: {
      value: false,
    },
  },
} as Session;

const session3 = {
  fields: {
    Name: {
      value: 'Fitbit',
    },
    Image: {
      value: {
        src: '/assets/img/tickets/Banner2.jpg',
      },
    },
    Speakers: [speaker],
    Day: days,
    Rooms: rooms,
    Timeslots: timeslots,
    Premium: {
      value: true,
    },
  },
} as Session;

const session4 = {
  fields: {
    Name: {
      value: 'Fitbit',
    },
    Image: {
      value: {
        src: '/assets/img/tickets/Banner2.jpg',
      },
    },
    Speakers: [speaker],
    Day: days,
    Rooms: rooms,
    Timeslots: timeslots,
    Premium: {
      value: false,
    },
  },
} as Session;

export const Default = Template.bind({});
Default.args = {
  fields: {
    items: [session1, session2, session3, session4],
  },
};
