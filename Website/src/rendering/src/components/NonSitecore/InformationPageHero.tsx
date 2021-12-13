import { Field, ImageField, Text } from '@sitecore-jss/sitecore-jss-nextjs';
import { ComponentProps } from 'lib/component-props';
import {
  faFacebookF,
  faTwitter,
  faLinkedinIn,
  faInstagram,
} from '@fortawesome/free-brands-svg-icons';
import SocialIcon from './SocialIcon';

export type InformationPageHeroProps = ComponentProps & {
  fields: {
    Name: Field<string>;
    Image: ImageField;
    FacebookProfileLink?: Field<string>;
    TwitterProfileLink?: Field<string>;
    InstagramProfileLink?: Field<string>;
    LinkedinProfileLink?: Field<string>;
  };
  type: string;
  qualificative: string;
  informations?: JSX.Element;
};

const InformationPageHero = (props: InformationPageHeroProps): JSX.Element => {
  const informations = props.informations ? (
    <div className="informations">{props.informations}</div>
  ) : undefined;

  const lowerCaseQualificative = props.qualificative.toLowerCase();

  return (
    <section
      className={`information-page-hero ${props.type}-information-page-hero ${lowerCaseQualificative}`}
    >
      <div className="content">
        <div className="image-container">
          {/* Purposefully not using a JSS Image component here to avoid width/height HTML attributes on the img tag */}
          <img src={props.fields.Image.value?.src} alt="Image" loading="lazy" />
        </div>
        <div className="gradient-container"></div>
        <div className="content-container">
          <div className={`container-content-text`}>
            <div>
              <p className="title">
                Meet the <span className="information-type">{lowerCaseQualificative}</span>{' '}
                {props.type}:
              </p>
              <h1 className="name">
                <Text field={props.fields.Name} />
              </h1>
            </div>
            {informations}
            <div className="external-website-icons">
              <SocialIcon Icon={faFacebookF} Link={props.fields.FacebookProfileLink} />
              <SocialIcon Icon={faTwitter} Link={props.fields.TwitterProfileLink} />
              <SocialIcon Icon={faLinkedinIn} Link={props.fields.LinkedinProfileLink} />
              <SocialIcon Icon={faInstagram} Link={props.fields.InstagramProfileLink} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InformationPageHero;
