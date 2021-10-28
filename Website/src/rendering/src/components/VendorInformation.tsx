import {
  faFacebookF,
  faTwitter,
  faLinkedinIn,
  faInstagram,
} from '@fortawesome/free-brands-svg-icons';
import { ComponentProps } from 'lib/component-props';
import { Field, ImageField, Image, Text, RichText } from '@sitecore-jss/sitecore-jss-nextjs';
import SocialIcon from './SocialIcon';

export type VendorInformationProps = ComponentProps & {
  fields: {
    Name: Field<string>;
    Level: Field<string>;
    Logo: ImageField;
    Description: Field<string>;
    FacebookProfileLink?: Field<string>;
    TwitterProfileLink?: Field<string>;
    InstagramProfileLink?: Field<string>;
    LinkedinProfileLink?: Field<string>;
  };
};

const VendorInformation = (props: VendorInformationProps): JSX.Element => (
  <section className="section information-section">
    <div className="section__content left__content">
      <div className="information-grid">
        <div className="image-col">
          <div>
            <Image field={props.fields?.Logo} alt={props.fields?.Name?.value} />
            <div className="external-website-icons">
              <SocialIcon Icon={faFacebookF} Link={props.fields.FacebookProfileLink} />
              <SocialIcon Icon={faTwitter} Link={props.fields.TwitterProfileLink} />
              <SocialIcon Icon={faLinkedinIn} Link={props.fields.LinkedinProfileLink} />
              <SocialIcon Icon={faInstagram} Link={props.fields.InstagramProfileLink} />
            </div>
          </div>
        </div>
        <div className="description-col">
          <div>
            <Text tag="div" className="eyebrow" field={props.fields.Level} />
          </div>
          <Text tag="h1" className="name" field={props.fields.Name} />
          <RichText field={props.fields.Description} />
        </div>
      </div>
    </div>
  </section>
);

export default VendorInformation;
