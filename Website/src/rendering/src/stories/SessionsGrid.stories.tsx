import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import SessionsGrid, { Session, Speaker } from '../components/SessionsGrid';

export default {
  title: 'Example/SessionsGrid',
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
    Duration: {
      value: '2 Hours',
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
    Duration: {
      value: '.5 Hour',
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
    Duration: {
      value: '3 Hours',
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
    Duration: {
      value: '1.5 Hours',
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
