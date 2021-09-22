import {
  faFacebookF,
  faTwitter,
  faLinkedinIn,
  faInstagram,
} from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ComponentProps } from 'lib/component-props';
import { Field, ImageField, Image, RichText, Text } from '@sitecore-jss/sitecore-jss-nextjs';

type Session = {
  name: Field<string>;
  fields: {
    Name: Field<string>;
    Image: ImageField;
    Date: Field<string>;
  };
};

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

const SpeakerInformation = (props: SpeakerInformationProps): JSX.Element => (
  <section className="section information-section speaker-information">
    <div className="section__content left__content">
      <div className="information-grid">
        <div className="image-col">
          <div>
            <Image field={props.fields?.Picture} alt={props.fields?.Name?.value} />
            <div className="external-website-icons">
              {console.log(props.fields)}
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
          {props.fields.JobTitle && props.fields.JobTitle.value != '' && (
            <div>
              <span className="data-label">Job Title:</span>{' '}
              <Text field={props.fields.JobTitle}></Text>
            </div>
          )}
          {props.fields.Company && props.fields.Company.value != '' && (
            <div>
              <span className="data-label">Company:</span>{' '}
              <Text field={props.fields.Company}></Text>
            </div>
          )}
          {props.fields.Location && props.fields.Location.value != '' && (
            <div>
              <span className="data-label">Location:</span>{' '}
              <Text field={props.fields.Location}></Text>
            </div>
          )}
        </div>
        <div className="description-col">
          <Text tag="div" className="eyebrow" field={props.fields.Role}></Text>
          {props.fields.Featured?.value === true && <div className="eyebrow">Featured</div>}
          <Text tag="h1" className="name" field={props.fields.Name}></Text>
          <RichText field={props.fields.Description} />
          <div className="talks-section">
            {props.fields.Sessions && <h2 className="talks-title">Talks</h2>}
            {props.fields.Sessions &&
              props.fields.Sessions.map((session, index) => (
                <div key={index} className="talk">
                  <p>Mon, 19th | 9:00 AM</p>
                  <p className="talk-name">{session.name}</p>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default SpeakerInformation;
