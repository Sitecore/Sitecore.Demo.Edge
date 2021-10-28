import { Field } from '@sitecore-jss/sitecore-jss-nextjs';

export type Day = {
  name?: Field<string>;

  fields: {
    Name: Field<string>;
  };
};
