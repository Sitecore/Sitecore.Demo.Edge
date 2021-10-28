import { ComponentProps } from 'lib/component-props';
import { Field, RichText } from '@sitecore-jss/sitecore-jss-nextjs';
import SessionList from './SessionList';
import { Timeslot } from '../interfaces/Timeslot';

type Speaker = {
  fields: {
    Name: Field<string>;
  };
};

type Room = {
  fields: {
    Name: Field<string>;
  };
};

type Day = {
  fields: {
    Name: Field<string>;
  };
};

type Session = {
  fields: {
    Name: Field<string>;
    Speakers?: Speaker[];
    Rooms: Room[];
    Day: Day[];
    Timeslots: Timeslot[];
    Premium: Field<boolean>;
  };
};

export type VendorInformationProps = ComponentProps & {
  fields: {
    Description: Field<string>;
  };
};

const VendorInformation = (props: VendorInformationProps): JSX.Element => {
  const fakeSessions: Session[] = [
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

  return (
    <section className="section information-section-with-sessions">
      <div className="section__content container">
        <div className="information-grid">
          <div className="description-col">
            <div className="column-title">Vendor history:</div>
            <RichText field={props.fields.Description} />
          </div>
          <div className="sessions-col">
            <div className="column-title">Sessions:</div>
            <SessionList sessions={fakeSessions} showSpeakers={true} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default VendorInformation;
