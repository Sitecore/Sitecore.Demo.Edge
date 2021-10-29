import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import SpeakerInformation, { SpeakerInformationProps } from '../../components/SpeakerInformation';

export default {
  title: 'Components/Speakers/SpeakerInformation',
  component: SpeakerInformation,
} as ComponentMeta<typeof SpeakerInformation>;

const Template: ComponentStory<typeof SpeakerInformation> = (args: SpeakerInformationProps) => (
  <SpeakerInformation {...args} />
);

const fieldsWithoutSessions = {
  Description: {
    value:
      '<p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.&nbsp;</p><p>At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. At vero eos et accusam et justo.</p><ul><li>Lorem ipsum dolor sit amet</li><li>consetetur sadipscing elitr</li><li>sed diam nonumy eirmod tempor</li><li>invidunt ut labore et dolore</li><li>magna aliquyam erat</li><li>sed diam voluptua</li></ul><p>ad fas dasd asasdf asd fasd fasd fas dfasd f sdfasdfda sd as sdgf sdfg sdfg sdfbghtyurty urty urtyu rtyur tasdasqwqwrt wert wert wert wert sdfg sgd. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. At vero eos et accusam et justo.</p>',
  },
  Sessions: [],
};

const fieldsWithSessions = {
  ...fieldsWithoutSessions,
  ...{
    Sessions: [
      {
        name: 'Fuel For Life Nutrition 101',
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
        name: 'Mountain Biking Tales From The Trail',
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
        name: 'Train Smarter not harder',
        fields: {
          Name: {
            value: 'Train Smarter - not harder',
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
        name: '7 Mindset Strategies To Raise Your Game',
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
    ],
  },
};

export const WithoutSessions = Template.bind({});
WithoutSessions.args = {
  fields: fieldsWithoutSessions,
};

export const WithSessions = Template.bind({});
WithSessions.args = {
  fields: fieldsWithSessions,
};
