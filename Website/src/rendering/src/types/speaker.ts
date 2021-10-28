import { Field, ImageField } from '@sitecore-jss/sitecore-jss-nextjs';

export type MinimalSpeaker = {
  fields: {
    Name: Field<string>;
  };
};

export type Speaker = MinimalSpeaker & {
  fields: {
    Picture: ImageField;
    JobTitle: Field<string>;
    Company: Field<string>;
    Location: Field<string>;
    Description: Field<string>;
    FacebookProfileLink?: Field<string>;
    TwitterProfileLink?: Field<string>;
    InstagramProfileLink?: Field<string>;
    LinkedinProfileLink?: Field<string>;
  };
};

export type GraphQLSpeaker = {
  // Purposefully using the Sitecore item name instead of the url.path to build the link URLs as the url.path is invalid when the item name contains an hyphen
  itemName: string;
  name: Field<string>;
  picture: {
    jsonValue: ImageField;
  };
  featured: {
    value: boolean;
  };
  role: Field<string>;
};
