import { Field } from '@sitecore-jss/sitecore-jss-nextjs';

export type Day = {
  fields: {
    Name: Field<string>;
  };
};

export type GraphQLDay = {
  name: Field<string>;
};
