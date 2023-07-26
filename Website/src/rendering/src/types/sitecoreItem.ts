import { Field } from '@sitecore-jss/sitecore-jss-nextjs';

export type SitecoreItem = {
  name: Field<string>;
  url: string;
};
