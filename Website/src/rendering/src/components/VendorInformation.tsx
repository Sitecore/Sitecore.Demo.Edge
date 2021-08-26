import {
  faFacebookF,
  faTwitter,
  faLinkedinIn,
  faInstagram,
} from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ComponentProps } from 'lib/component-props';
import { Field, ImageField, Image, Text, RichText } from '@sitecore-jss/sitecore-jss-nextjs';

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
              {/* TODO: To be turned into links */}
              {!props.fields.FacebookProfileLink ? (
                ''
              ) : (
                <a href={props.fields.FacebookProfileLink.value}>
                  <FontAwesomeIcon icon={faFacebookF} />
                </a>
              )}
              {!props.fields.TwitterProfileLink ? (
                ''
              ) : (
                <a href={props.fields.TwitterProfileLink.value}>
                  <FontAwesomeIcon icon={faTwitter} />
                </a>
              )}
              {!props.fields.LinkedinProfileLink ? (
                ''
              ) : (
                <a href={props.fields.LinkedinProfileLink.value}>
                  <FontAwesomeIcon icon={faLinkedinIn} />
                </a>
              )}
              {!props.fields.InstagramProfileLink ? (
                ''
              ) : (
                <a href={props.fields.InstagramProfileLink.value}>
                  <FontAwesomeIcon icon={faInstagram} />
                </a>
              )}
            </div>
          </div>
        </div>
        <div className="description-col">
          <Text tag="div" className="eyebrow" field={props.fields.Level}></Text>
          <Text tag="h1" className="name" field={props.fields.Name}></Text>
          <RichText field={props.fields.Description} />
        </div>
      </div>
    </div>
  </section>
);

export default VendorInformation;
