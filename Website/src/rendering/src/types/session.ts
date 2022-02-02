import { Field, ImageField } from '@sitecore-jss/sitecore-jss-nextjs';
import { Timeslot } from '../interfaces/Timeslot';
import { MinimalGraphQLSpeaker } from './speaker';
import { GraphQLDay } from './day';
import { GraphQLRoom } from './room';

export type GraphQLSession = {
  // Purposefully using the Sitecore item name instead of the url.path to build the link URLs as the url.path is invalid when the item name contains an hyphen
  itemName: string;
  name: Field<string>;
  premium: Field<boolean>;
  imageTransformation: Field<string>;
  url:  {
    path: string;
  }
  image?: {
    jsonValue: ImageField;
  };
  speakers: {
    targetItems: MinimalGraphQLSpeaker[];
  };
  rooms: {
    targetItems: GraphQLRoom[];
  };
  day: {
    targetItems: GraphQLDay[];
  };
  timeslots: {
    targetItems: Timeslot[];
  };
};

type Audience = {
  displayName: string;
};

export type SessionPageFields = {
  Premium: {
    value: boolean;
  };
  Audience: Audience[];
};
