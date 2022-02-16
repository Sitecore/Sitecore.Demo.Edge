import { Field, ImageField } from '@sitecore-jss/sitecore-jss-nextjs';

export type News = {
  name: Field<string>;
  fields: {
    Title: Field<string>;
    Excerpt: Field<string>;
    PublishDate: Field<string>;
    Image: ImageField;
  };
  url: string;
};
