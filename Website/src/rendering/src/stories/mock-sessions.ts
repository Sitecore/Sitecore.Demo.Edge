import { GraphQLSession } from 'src/types/session';

export const SESSIONS: GraphQLSession[] = [
  {
    name: {
      value: 'Fuel For Life: Nutrition 101',
    },
    url: {
      path: '/session/Fuel-For-Life-Nutrition-101',
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
          name: {
            value: 'Elle Smith',
          },
          jobTitle: {
            value: 'Speaker',
          },
          url: {
            path: '/speaker/Elle-Smith',
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
    url: {
      path: '/session/Mountain-Biking-Tales-From-The-Trail',
    },
    imageTransformation: {
      value: 'medium',
    },
    speakers: {
      targetItems: [
        {
          name: {
            value: 'Chris Williams',
          },
          jobTitle: {
            value: 'Speaker',
          },
          url: {
            path: '/speaker/Chris-Williams',
          },
        },
        {
          name: {
            value: 'Chris Williams',
          },
          jobTitle: {
            value: 'Speaker',
          },
          url: {
            path: '/speaker/Chris-Williams',
          },
        },
        {
          name: {
            value: 'Chris Williams',
          },
          jobTitle: {
            value: 'Speaker',
          },
          url: {
            path: '/speaker/Chris-Williams',
          },
        },
        {
          name: {
            value: 'Chris Williams',
          },
          jobTitle: {
            value: 'Speaker',
          },
          url: {
            path: '/speaker/Chris-Williams',
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
    name: {
      value: 'Train Smarter - not harder',
    },
    url: {
      path: '/session/Train-Smarter-not-harder',
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
          name: {
            value: 'John Johnson',
          },
          jobTitle: {
            value: 'Speaker',
          },
          url: {
            path: '/speaker/John-Johnson',
          },
        },
        {
          name: {
            value: 'John Johnson',
          },
          jobTitle: {
            value: 'Speaker',
          },
          url: {
            path: '/speaker/John-Johnson',
          },
        },
        {
          name: {
            value: 'John Johnson',
          },
          jobTitle: {
            value: 'Speaker',
          },
          url: {
            path: '/speaker/John-Johnson',
          },
        },
        {
          name: {
            value: 'John Johnson',
          },
          jobTitle: {
            value: 'Speaker',
          },
          url: {
            path: '/speaker/John-Johnson',
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
    name: {
      value: '7 Mindset Strategies To Raise Your Game',
    },
    url: {
      path: '/session/7-Mindset-Strategies-To-Raise-Your-Game',
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
          name: {
            value: 'Tom Hudson',
          },
          jobTitle: {
            value: 'Speaker',
          },
          url: {
            path: '/speaker/Tom-Hudson',
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
