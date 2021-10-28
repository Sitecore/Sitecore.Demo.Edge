import { Field, ImageField } from '@sitecore-jss/sitecore-jss-nextjs';
import { Timeslot } from '../interfaces/Timeslot';
import { GraphQLSpeaker } from './speaker';
import { Day } from './day';

export type Session = {
  name: Field<string>;
  fields: {
    Name: Field<string>;
    Image: ImageField;
    Date: Field<string>;
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
