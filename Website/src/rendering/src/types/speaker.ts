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
    Featured: Field<boolean>;
  };

  url: string;
};

export type MinimalGraphQLSpeaker = {
  name: Field<string>;
  jobTitle: Field<string>;
  url: {
    path: string;
  };
};

export type GraphQLSpeaker = MinimalGraphQLSpeaker & {
  picture: {
    jsonValue: ImageField;
  };
  featured: {
    value: boolean;
  };
};
