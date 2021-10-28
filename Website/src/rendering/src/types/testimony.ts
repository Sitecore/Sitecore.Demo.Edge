import { Field, ImageField } from '@sitecore-jss/sitecore-jss-nextjs';

export type Testimony = {
  fields: {
    Provider: Field<string>;
    Testimony: Field<string>;
    Logo: ImageField;
  };
};
