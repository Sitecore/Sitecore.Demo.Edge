import { Field, ImageField } from '@sitecore-jss/sitecore-jss-nextjs';

export type Speaker = {
  fields: {
    Name: Field<string>;
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

export type MinimalGraphQLSpeaker = {
  // Purposefully using the Sitecore item name instead of the url.path to build the link URLs as the url.path is invalid when the item name contains an hyphen
  itemName: string;
  name: Field<string>;
  role: Field<string>;
};

export type GraphQLSpeaker = MinimalGraphQLSpeaker & {
  picture: {
    jsonValue: ImageField;
  };
  featured: {
    value: boolean;
  };
};
