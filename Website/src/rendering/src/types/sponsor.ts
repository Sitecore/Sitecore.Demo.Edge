import { Field, ImageField } from '@sitecore-jss/sitecore-jss-nextjs';

export type Sponsor = {
  fields: {
    Name: Field<string>;
    Logo: ImageField;
  };
  url: string;
};
