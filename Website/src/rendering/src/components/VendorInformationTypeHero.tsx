import { Field, ImageField } from '@sitecore-jss/sitecore-jss-nextjs';
import { ComponentProps } from 'lib/component-props';
import InformationPageHero from './InformationPageHero';

export type VendorInformationPageHeroProps = ComponentProps & {
  fields: {
    Name: Field<string>;
    Logo: ImageField;
    Level: Field<string>;
    FacebookProfileLink?: Field<string>;
    TwitterProfileLink?: Field<string>;
    InstagramProfileLink?: Field<string>;
    LinkedinProfileLink?: Field<string>;
  };
};

const VendorInformationTypeHero = (props: VendorInformationPageHeroProps): JSX.Element => {
  const { fields, ...propsRest } = props;
  const newFields = {
    Name: fields.Name,
    Image: fields.Logo,
    FacebookProfileLink: fields.FacebookProfileLink,
    TwitterProfileLink: fields.TwitterProfileLink,
    InstagramProfileLink: fields.InstagramProfileLink,
    LinkedinProfileLink: fields.LinkedinProfileLink,
  };
  const qualificative = props.fields.Level?.value ? props.fields.Level.value : '';

  return (
    <InformationPageHero
      {...propsRest}
      fields={newFields}
      type="vendor"
      qualificative={qualificative}
    />
  );
};

export default VendorInformationTypeHero;
