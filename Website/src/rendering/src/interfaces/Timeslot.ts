import { Field } from '@sitecore-jss/sitecore-jss-nextjs';

export interface Timeslot {
  name?: string;
  fields?: {
    Name: Field<string>;
  };
}
