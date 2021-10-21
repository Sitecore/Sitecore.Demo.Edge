import { Field, ImageField, Text, Image } from '@sitecore-jss/sitecore-jss-nextjs';
import { ComponentProps } from 'lib/component-props';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faFacebookF,
  faTwitter,
  faLinkedinIn,
  faInstagram,
} from '@fortawesome/free-brands-svg-icons';

export type InformationPageHeroProps = ComponentProps & {
  fields: {
    Name: Field<string>;
    Level: Field<string>;
    Logo: ImageField;
    FacebookProfileLink?: Field<string>;
    TwitterProfileLink?: Field<string>;
    InstagramProfileLink?: Field<string>;
    LinkedinProfileLink?: Field<string>;
  };
  type: string;
};

const InformationPageHero = (props: InformationPageHeroProps): JSX.Element => (
  <section className={`information-page-hero ${props.type}-information-page-hero`}>
    <div className="content">
      <div className="image-container">
        <Image field={props.fields.Logo} alt="Logo" loading="lazy" />
      </div>
      <div className="content-container">
        <div className="container-content-text">
          <div>
            <p className="title">
              Meet the <Text className="information-type" tag="span" field={props.fields.Level} />{' '}
              {props.type}:
            </p>
            <h1 className="name">
              <Text field={props.fields.Name} />
            </h1>
          </div>
          <div className="informations">
            <div>
              <span className="label">Job Title:</span> <span>International Sales Director</span>
            </div>
            <div>
              <span className="label">Company:</span> <span>Solstice</span>
            </div>
            <div>
              <span className="label">Location:</span> <span>Paris, France</span>
            </div>
          </div>
          <div className="external-website-icons">
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
    </div>
  </section>
);

export default InformationPageHero;
