import { GraphQLSession } from 'src/types/session';

export const SESSIONS: GraphQLSession[] = [
  {
    itemName: 'Fuel For Life Nutrition 101',
    name: {
      value: 'Fuel For Life: Nutrition 101',
    },
    image: {
      jsonValue: {
        value: {
          src: '/assets/img/tickets/Banner2.jpg',
        },
      },
    },
    imageTransformation: {
      value: 'medium',
    },
    speakers: {
      targetItems: [
        {
          itemName: 'Elle Smith',
          name: {
            value: 'Elle Smith',
          },
          role: {
            value: 'Speaker',
          },
        },
      ],
    },
    rooms: {
      targetItems: [
        {
          name: {
            value: 'Room 1',
          },
        },
      ],
    },
    day: {
      targetItems: [
        {
          name: {
            value: 'Day 1',
          },
        },
      ],
    },
    timeslots: {
      targetItems: [
        {
          name: {
            value: '9 am',
          },
        },
      ],
    },
    premium: {
      value: true,
    },
  },
  {
    itemName: 'Mountain Biking Tales From The Trail',
    name: {
      value: 'Mountain Biking: Tales From The Trail',
    },
    image: {
      jsonValue: {
        value: {
          src: '/assets/img/tickets/Banner2.jpg',
        },
      },
    },
    imageTransformation: {
      value: 'medium',
    },
    speakers: {
      targetItems: [
        {
          itemName: 'Chris Williams',
          name: {
            value: 'Chris Williams',
          },
          role: {
            value: 'Speaker',
          },
        },
        {
          itemName: 'Chris Williams',
          name: {
            value: 'Chris Williams',
          },
          role: {
            value: 'Speaker',
          },
        },
        {
          itemName: 'Chris Williams',
          name: {
            value: 'Chris Williams',
          },
          role: {
            value: 'Speaker',
          },
        },
        {
          itemName: 'Chris Williams',
          name: {
            value: 'Chris Williams',
          },
          role: {
            value: 'Speaker',
          },
        },
      ],
    },
    rooms: {
      targetItems: [
        {
          name: {
            value: 'Room 1',
          },
        },
      ],
    },
    day: {
      targetItems: [
        {
          name: {
            value: 'Day 2',
          },
        },
      ],
    },
    timeslots: {
      targetItems: [
        {
          name: {
            value: '10 am',
          },
        },
      ],
    },
    premium: {
      value: true,
    },
  },
  {
    itemName: 'Train Smarter not harder',
    name: {
      value: 'Train Smarter - not harder',
    },
    image: {
      jsonValue: {
        value: {
          src: '/assets/img/tickets/Banner2.jpg',
        },
      },
    },
    imageTransformation: {
      value: 'medium',
    },
    speakers: {
      targetItems: [
        {
          itemName: 'John Johnson',
          name: {
            value: 'John Johnson',
          },
          role: {
            value: 'Speaker',
          },
        },
        {
          itemName: 'John Johnson',
          name: {
            value: 'John Johnson',
          },
          role: {
            value: 'Speaker',
          },
        },
        {
          itemName: 'John Johnson',
          name: {
            value: 'John Johnson',
          },
          role: {
            value: 'Speaker',
          },
        },
        {
          itemName: 'John Johnson',
          name: {
            value: 'John Johnson',
          },
          role: {
            value: 'Speaker',
          },
        },
      ],
    },
    rooms: {
      targetItems: [
        {
          name: {
            value: 'Room 2',
          },
        },
      ],
    },
    day: {
      targetItems: [
        {
          name: {
            value: 'Day 3',
          },
        },
      ],
    },
    timeslots: {
      targetItems: [
        {
          name: {
            value: '9 am',
          },
        },
      ],
    },
    premium: {
      value: false,
    },
  },
  {
    itemName: '7 Mindset Strategies To Raise Your Game',
    name: {
      value: '7 Mindset Strategies To Raise Your Game',
    },
    image: {
      jsonValue: {
        value: {
          src: '/assets/img/tickets/Banner2.jpg',
        },
      },
    },
    imageTransformation: {
      value: 'medium',
    },
    speakers: {
      targetItems: [
        {
          itemName: 'Tom Hudson',
          name: {
            value: 'Tom Hudson',
          },
          role: {
            value: 'Speaker',
          },
        },
      ],
    },
    rooms: {
      targetItems: [
        {
          name: {
            value: 'Room 3',
          },
        },
      ],
    },
    day: {
      targetItems: [
        {
          name: {
            value: 'Day 3',
          },
        },
      ],
    },
    timeslots: {
      targetItems: [
        {
          name: {
            value: '10 am',
          },
        },
      ],
    },
    premium: {
      value: false,
    },
  },
];
