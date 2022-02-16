import { Field, ImageField } from '@sitecore-jss/sitecore-jss-nextjs';

export type Vendor = {
  fields: {
    Name: Field<string>;
    Level: Field<string>;
    Logo: ImageField;
  };
  url: string;
};
