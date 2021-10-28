import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import SessionList, { SessionListProps } from '../../components/SessionList';

export default {
  title: 'Components/Sessions/SessionList',
  component: SessionList,
} as ComponentMeta<typeof SessionList>;

const Template: ComponentStory<typeof SessionList> = (args: SessionListProps) => (
  <SessionList {...args} />
);

const sessions = [
  {
    fields: {
      Name: {
        value: 'Fuel For Life: Nutrition 101',
      },
      Speakers: [
        {
          fields: {
            Name: {
              value: 'Elle Smith',
            },
          },
        },
      ],
      Rooms: [
        {
          fields: {
            Name: {
              value: 'Room 1',
            },
          },
        },
      ],
      Day: [
        {
          fields: {
            Name: {
              value: 'Day 1',
            },
          },
        },
      ],
      Timeslots: [
        {
          name: {
            value: '9 am',
          },
        },
      ],
      Premium: {
        value: true,
      },
    },
  },
  {
    fields: {
      Name: {
        value: 'Mountain Biking: Tales From The Trail',
      },
      Speakers: [
        {
          fields: {
            Name: {
              value: 'Chris Williams',
            },
          },
        },
        {
          fields: {
            Name: {
              value: 'Chris Williams',
            },
          },
        },
        {
          fields: {
            Name: {
              value: 'Chris Williams',
            },
          },
        },
        {
          fields: {
            Name: {
              value: 'Chris Williams',
            },
          },
        },
      ],
      Rooms: [
        {
          fields: {
            Name: {
              value: 'Room 1',
            },
          },
        },
      ],
      Day: [
        {
          fields: {
            Name: {
              value: 'Day 2',
            },
          },
        },
      ],
      Timeslots: [
        {
          name: {
            value: '10 am',
          },
        },
      ],
      Premium: {
        value: true,
      },
    },
  },
  {
    fields: {
      Name: {
        value: 'Train Smarted, not harder',
      },
      Speakers: [
        {
          fields: {
            Name: {
              value: 'John Johnson',
            },
          },
        },
        {
          fields: {
            Name: {
              value: 'John Johnson',
            },
          },
        },
        {
          fields: {
            Name: {
              value: 'John Johnson',
            },
          },
        },
        {
          fields: {
            Name: {
              value: 'John Johnson',
            },
          },
        },
      ],
      Rooms: [
        {
          fields: {
            Name: {
              value: 'Room 2',
            },
          },
        },
      ],
      Day: [
        {
          fields: {
            Name: {
              value: 'Day 3',
            },
          },
        },
      ],
      Timeslots: [
        {
          name: {
            value: '9 am',
          },
        },
      ],
      Premium: {
        value: false,
      },
    },
  },
  {
    fields: {
      Name: {
        value: '7 Mindset Strategies To Raise Your Game',
      },
      Speakers: [
        {
          fields: {
            Name: {
              value: 'Tom Hudson',
            },
          },
        },
      ],
      Rooms: [
        {
          fields: {
            Name: {
              value: 'Room 3',
            },
          },
        },
      ],
      Day: [
        {
          fields: {
            Name: {
              value: 'Day 3',
            },
          },
        },
      ],
      Timeslots: [
        {
          name: {
            value: '10 am',
          },
        },
      ],
      Premium: {
        value: false,
      },
    },
  },
];

export const WithoutSpeakers = Template.bind({});
WithoutSpeakers.args = {
  sessions,
  showSpeakers: false,
};

export const WithSpeakers = Template.bind({});
WithSpeakers.args = {
  sessions,
  showSpeakers: true,
};
