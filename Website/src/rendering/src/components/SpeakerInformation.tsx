import {
  faFacebookF,
  faTwitter,
  faLinkedinIn,
  faInstagram,
} from '@fortawesome/free-brands-svg-icons';
import { ComponentProps } from 'lib/component-props';
import { Field, ImageField, Image, RichText, Text } from '@sitecore-jss/sitecore-jss-nextjs';
import { Session } from 'src/types/session';
import SocialIcon from './SocialIcon';
import SpeakerInfoLine from './SpeakerInfoLine';

export type SpeakerInformationProps = ComponentProps & {
  fields: {
    Name: Field<string>;
    Role: Field<string>;
    Picture: ImageField;
    JobTitle: Field<string>;
    Company: Field<string>;
    Location: Field<string>;
    Description: Field<string>;
    FacebookProfileLink?: Field<string>;
    TwitterProfileLink?: Field<string>;
    InstagramProfileLink?: Field<string>;
    LinkedinProfileLink?: Field<string>;
    Sessions: Session[];
    Featured: Field<boolean>;
  };
};

const SpeakerInformation = (props: SpeakerInformationProps): JSX.Element => {
  const featuredEyebrow = props.fields.Featured?.value && <div className="eyebrow">Featured</div>;

  const sessions = props.fields.Sessions && props.fields.Sessions.length > 0 && (
    <div className="talks-section">
      <h2 className="talks-title">Talks</h2>
      {props.fields.Sessions.map((session, index) => (
        <div key={index} className="talk">
          <p>Mon, 19th | 9:00 AM</p>
          <p className="talk-name">{session.name}</p>
        </div>
      ))}
    </div>
  );

  return (
    <section className="section information-section speaker-information">
      <div className="section__content left__content">
        <div className="information-grid">
          <div className="image-col">
            <div>
              <Image field={props.fields?.Picture} alt={props.fields?.Name?.value} />
              <div className="external-website-icons">
                <SocialIcon Icon={faFacebookF} Link={props.fields.FacebookProfileLink} />
                <SocialIcon Icon={faTwitter} Link={props.fields.TwitterProfileLink} />
                <SocialIcon Icon={faLinkedinIn} Link={props.fields.LinkedinProfileLink} />
                <SocialIcon Icon={faInstagram} Link={props.fields.InstagramProfileLink} />
              </div>
            </div>

            <SpeakerInfoLine title="Position" field={props.fields.JobTitle} />
            <SpeakerInfoLine title="Company" field={props.fields.Company} />
            <SpeakerInfoLine title="Location" field={props.fields.Location} />
          </div>
          <div className="description-col">
            <div>
              <Text tag="div" className="eyebrow" field={props.fields.Role} />
              {featuredEyebrow}
            </div>
            <Text tag="h1" className="name" field={props.fields.Name} />
            <RichText field={props.fields.Description} />
            {sessions}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SpeakerInformation;
