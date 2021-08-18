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
  <section className="section">
    <div className="section__content left__content">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
        <div className="col-span-1 md:col-span-1">
          <Image
            className="border border-gray"
            field={props.fields?.Logo}
            alt={props.fields?.Name?.value}
          />
          <div>
            {/* TODO: To be turned into links */}
            {!props.fields.FacebookProfileLink ? (
              ''
            ) : (
              <a href={props.fields.FacebookProfileLink.value}>
                <FontAwesomeIcon className="icon h-4 m-2 inline text-blue" icon={faFacebookF} />
              </a>
            )}
            {!props.fields.TwitterProfileLink ? (
              ''
            ) : (
              <a href={props.fields.TwitterProfileLink.value}>
                <FontAwesomeIcon className="icon h-4 m-2 inline text-blue" icon={faTwitter} />
              </a>
            )}
            {!props.fields.LinkedinProfileLink ? (
              ''
            ) : (
              <a href={props.fields.LinkedinProfileLink.value}>
                <FontAwesomeIcon className="icon h-4 m-2 inline text-blue" icon={faLinkedinIn} />
              </a>
            )}
            {!props.fields.InstagramProfileLink ? (
              ''
            ) : (
              <a href={props.fields.InstagramProfileLink.value}>
                <FontAwesomeIcon className="icon h-4 m-2 inline text-blue" icon={faInstagram} />
              </a>
            )}
          </div>
        </div>
        <div className="col-span-1 md:col-span-3 space-y-5">
          <Text tag="h3" className="uppercase" field={props.fields.Level}></Text>
          <Text
            tag="h2"
            className="text-2xl md:text-3xl font-extrabold text-blue"
            field={props.fields.Name}
          ></Text>
          <RichText field={props.fields.Description} />
        </div>
      </div>
    </div>
  </section>
);

export default VendorInformation;
