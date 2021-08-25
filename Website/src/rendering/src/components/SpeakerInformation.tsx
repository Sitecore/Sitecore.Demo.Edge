import {
  faFacebookF,
  faTwitter,
  faLinkedinIn,
  faInstagram,
} from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ComponentProps } from 'lib/component-props';
import { Field, ImageField, Image, RichText, Text } from '@sitecore-jss/sitecore-jss-nextjs';

export type SpeakerInformationProps = ComponentProps & {
  fields: {
    Name: Field<string>;
    Role: Field<string>;
    Picture: ImageField;
    Position: Field<string>;
    Company: Field<string>;
    Country: Field<string>;
    Description: Field<string>;
    FacebookProfileLink?: Field<string>;
    TwitterProfileLink?: Field<string>;
    InstagramProfileLink?: Field<string>;
    LinkedinProfileLink?: Field<string>;
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
          <div>
            <span className="data-label">Position:</span>{' '}
            <Text field={props.fields.Position}></Text>
          </div>
          <div>
            <span className="data-label">Company:</span> <Text field={props.fields.Company}></Text>
          </div>
          <div>
            <span className="data-label">Country:</span> <Text field={props.fields.Country}></Text>
          </div>
        </div>
        <div className="description-col">
          {/* TODO: Add speaker type in content hub */}
          <Text tag="div" className="eyebrow" field={props.fields.Role}></Text>
          <Text tag="h1" className="name" field={props.fields.Name}></Text>
          <RichText field={props.fields.Description} />
          {/* TODO: Link sessions with speakers and show info here */}
          <div className="talks-section">
            <h2 className="talks-title">Talks</h2>
            <div className="talk">
              <p>Mon, 19th | 9:00 AM</p>
              <p className="talk-name">10 Tips to get the most out of your routines</p>
            </div>
            <div className="talk">
              <p>Mon, 19th | 9:00 AM</p>
              <p className="talk-name">10 Tips to get the most out of your routines</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default SpeakerInformation;
