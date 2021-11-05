import { Field } from '@sitecore-jss/sitecore-jss-nextjs';

export type Room = {
  fields: {
    Name: Field<string>;
  };
};

export type GraphQLRoom = {
  name: Field<string>;
};
