import { Field, ImageField } from '@sitecore-jss/sitecore-jss-nextjs';

export type ProductCategory = {
  fields: {
    Title: Field<string>;
    Picture: ImageField;
  };
};
