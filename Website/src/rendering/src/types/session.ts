import { Field, ImageField } from '@sitecore-jss/sitecore-jss-nextjs';
import { Timeslot } from '../interfaces/Timeslot';
import { MinimalGraphQLSpeaker } from './speaker';
import { GraphQLDay } from './day';
import { GraphQLRoom } from './room';

export type GraphQLSession = {
  name: Field<string>;
  premium: Field<boolean>;
  imageTransformation: Field<string>;
  url: {
    path: string;
  };
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
