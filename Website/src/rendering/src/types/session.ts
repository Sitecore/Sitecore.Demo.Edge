import { Field, ImageField } from '@sitecore-jss/sitecore-jss-nextjs';
import { Timeslot } from '../interfaces/Timeslot';
import { GraphQLSpeaker, MinimalSpeaker } from './speaker';
import { Day } from './day';
import { Room } from './room';

export type Session = {
  name: string;
  fields: {
    Name: Field<string>;
    Speakers?: MinimalSpeaker[];
    Rooms: Room[];
    Day: Day[];
    Timeslots: Timeslot[];
    Premium: Field<boolean>;
  };
};

export type GraphQLSession = {
  // Purposefully using the Sitecore item name instead of the url.path to build the link URLs as the url.path is invalid when the item name contains an hyphen
  itemName: string;
  name: Field<string>;
  premium: Field<boolean>;
  image: {
    jsonValue: ImageField;
  };
  speakers: {
    targetItems: GraphQLSpeaker[];
  };
  day: {
    targetItems: Day[];
  };
  timeslots: {
    targetItems: Timeslot[];
  };
};
